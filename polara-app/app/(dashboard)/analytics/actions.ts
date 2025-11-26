'use server'

import { createClient } from '@/utils/supabase/server'

export async function getStudyStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch all completed sessions
    const { data: sessions, error } = await supabase
        .from('study_sessions')
        .select(`
            *,
            task:tasks (
                course:courses (
                    name,
                    color_code
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('status', 'Completed')

    if (error) {
        console.error('Error fetching study stats:', error)
        return null
    }

    // Aggregate Data

    // 1. Total Stats
    const totalSessions = sessions.length
    const totalMinutes = sessions.reduce((acc, session) => acc + (session.actual_duration || 0), 0)
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10

    // 2. By Course (Pie Chart)
    const courseStatsMap = new Map<string, { name: string, value: number, color: string }>()

    sessions.forEach(session => {
        const courseName = session.task?.course?.name || 'Uncategorized'
        const color = session.task?.course?.color_code || '#9ca3af'

        if (!courseStatsMap.has(courseName)) {
            courseStatsMap.set(courseName, { name: courseName, value: 0, color })
        }

        const current = courseStatsMap.get(courseName)!
        current.value += (session.actual_duration || 0)
    })

    const courseStats = Array.from(courseStatsMap.values())

    // 3. Last 7 Days (Bar Chart)
    const dailyStatsMap = new Map<string, number>()
    const today = new Date()

    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' }) // e.g., "Mon"
        dailyStatsMap.set(dateStr, 0)
    }

    // Fill with data
    sessions.forEach(session => {
        if (!session.scheduled_start) return
        const date = new Date(session.scheduled_start)
        const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' })

        // Only count if it's within the last 7 days (roughly check if key exists)
        if (dailyStatsMap.has(dateStr)) {
            // Check if it's actually recent (simple check: within last 7 days)
            const diffTime = Math.abs(today.getTime() - date.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            if (diffDays <= 7) {
                const current = dailyStatsMap.get(dateStr)!
                dailyStatsMap.set(dateStr, current + (session.actual_duration || 0))
            }
        }
    })

    const dailyStats = Array.from(dailyStatsMap.entries()).map(([name, minutes]) => ({
        name,
        hours: Math.round((minutes / 60) * 10) / 10
    }))

    return {
        totalSessions,
        totalHours,
        courseStats,
        dailyStats
    }
}
