import { createClient } from '@/utils/supabase/server'
import { addDays, format, parse, isBefore, addMinutes } from 'date-fns'

type AvailabilitySlot = {
    day_of_week: number
    start_time: string
    end_time: string
}

type SessionWithTask = {
    id: string
    actual_duration: number // using this as the planned duration for now, or we should have a separate 'planned_duration'
    task: {
        id: string
        due_date: string | null
        priority: 'Low' | 'Medium' | 'High' | null
    }
}

export async function scheduleSessions(userId: string) {
    const supabase = await createClient()

    // 1. Fetch Availability
    const { data: slots, error: slotsError } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)

    if (slotsError) throw new Error('Failed to fetch availability: ' + slotsError.message)

    // 2. Fetch Pending Sessions
    const { data: sessions, error: sessionsError } = await supabase
        .from('study_sessions')
        .select(`
      id,
      actual_duration,
      task:tasks (
        id,
        due_date,
        priority
      )
    `)
        .eq('user_id', userId)
        .eq('status', 'Pending')
        .is('scheduled_start', null)

    if (sessionsError) throw new Error('Failed to fetch sessions: ' + sessionsError.message)

    if (!sessions || sessions.length === 0) return { scheduled: 0, message: 'No pending sessions found.' }
    if (!slots || slots.length === 0) return { scheduled: 0, message: 'No availability slots found. Please configure your settings.' }

    // 3. Fetch Existing Scheduled Sessions (Busy Times)
    const today = new Date()
    const endOfPeriod = addDays(today, 7)

    const { data: busySessions, error: busyError } = await supabase
        .from('study_sessions')
        .select('scheduled_start, scheduled_end')
        .eq('user_id', userId)
        .not('scheduled_start', 'is', null)
        .gte('scheduled_start', today.toISOString())
        .lte('scheduled_end', endOfPeriod.toISOString())

    if (busyError) throw new Error('Failed to fetch existing schedule: ' + busyError.message)

    // 4. Sort Sessions
    const priorityWeight = { High: 3, Medium: 2, Low: 1 }

    const sortedSessions = (sessions as any[]).sort((a, b) => {
        const dateA = a.task.due_date ? new Date(a.task.due_date).getTime() : Infinity
        const dateB = b.task.due_date ? new Date(b.task.due_date).getTime() : Infinity
        if (dateA !== dateB) return dateA - dateB

        const pA = priorityWeight[a.task.priority as keyof typeof priorityWeight] || 0
        const pB = priorityWeight[b.task.priority as keyof typeof priorityWeight] || 0
        return pB - pA
    })

    // 5. Allocate Slots with Conflict Resolution
    let scheduledCount = 0
    const updates = []

    const slotsByDay = (slots as AvailabilitySlot[]).reduce((acc, slot) => {
        if (!acc[slot.day_of_week]) acc[slot.day_of_week] = []
        acc[slot.day_of_week].push(slot)
        return acc
    }, {} as Record<number, AvailabilitySlot[]>)

    for (let i = 0; i < 7; i++) {
        const currentDate = addDays(today, i)
        const dayOfWeek = currentDate.getDay()
        const dateKey = format(currentDate, 'yyyy-MM-dd')

        const dailySlots = slotsByDay[dayOfWeek] || []

        // Convert abstract slots to concrete time ranges for this day
        let availableRanges = dailySlots.map(slot => ({
            start: parse(slot.start_time, 'HH:mm:ss', currentDate),
            end: parse(slot.end_time, 'HH:mm:ss', currentDate)
        })).sort((a, b) => a.start.getTime() - b.start.getTime())

        // Filter busy sessions for this day
        const dailyBusy = (busySessions || []).filter(s => {
            const start = new Date(s.scheduled_start)
            return format(start, 'yyyy-MM-dd') === dateKey
        }).map(s => ({
            start: new Date(s.scheduled_start),
            end: new Date(s.scheduled_end)
        })).sort((a, b) => a.start.getTime() - b.start.getTime())

        // Subtract busy ranges from available ranges
        for (const busy of dailyBusy) {
            const newRanges = []
            for (const range of availableRanges) {
                // Case 1: Busy is completely outside range (before or after)
                if (busy.end <= range.start || busy.start >= range.end) {
                    newRanges.push(range)
                }
                // Case 2: Busy overlaps
                else {
                    // If busy starts after range start, keep the pre-busy part
                    if (busy.start > range.start) {
                        newRanges.push({ start: range.start, end: busy.start })
                    }
                    // If busy ends before range end, keep the post-busy part
                    if (busy.end < range.end) {
                        newRanges.push({ start: busy.end, end: range.end })
                    }
                }
            }
            availableRanges = newRanges
        }

        // Sort ranges again just in case
        availableRanges.sort((a, b) => a.start.getTime() - b.start.getTime())

        // Initialize cursors for these calculated free ranges
        const rangesWithCursor = availableRanges.map(r => ({ ...r, cursor: r.start }))

        // Try to fit sessions
        for (const range of rangesWithCursor) {
            while (sortedSessions.length > 0) {
                const session = sortedSessions[0]
                const durationMins = session.actual_duration || 30

                const proposedStart = range.cursor
                const proposedEnd = addMinutes(proposedStart, durationMins)

                if (isBefore(proposedEnd, range.end) || proposedEnd.getTime() === range.end.getTime()) {
                    updates.push({
                        id: session.id,
                        scheduled_start: proposedStart.toISOString(),
                        scheduled_end: proposedEnd.toISOString()
                    })

                    range.cursor = proposedEnd
                    sortedSessions.shift()
                    scheduledCount++
                } else {
                    break
                }
            }
            if (sortedSessions.length === 0) break
        }
        if (sortedSessions.length === 0) break
    }

    // 6. Batch Update DB
    if (updates.length > 0) {
        await Promise.all(updates.map(update =>
            supabase.from('study_sessions').update({
                scheduled_start: update.scheduled_start,
                scheduled_end: update.scheduled_end
            }).eq('id', update.id)
        ))
    }

    return { scheduled: scheduledCount, remaining: sortedSessions.length }
}
