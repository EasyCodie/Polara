'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getTodaySessions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

    const { data: sessions, error } = await supabase
        .from('study_sessions')
        .select(`
      *,
      task:tasks (
        title,
        course:courses (
          name,
          color_code
        )
      )
    `)
        .eq('user_id', user.id)
        .gte('scheduled_start', startOfDay)
        .lte('scheduled_start', endOfDay)
        .order('scheduled_start', { ascending: true })

    if (error) {
        console.error('Error fetching today sessions:', error)
        return []
    }

    return sessions
}

export async function updateSessionStatus(sessionId: string, status: 'Pending' | 'In Progress' | 'Completed' | 'Skipped') {
    const supabase = await createClient()

    const { error } = await supabase
        .from('study_sessions')
        .update({ status })
        .eq('id', sessionId)

    if (error) {
        throw new Error('Failed to update session status')
    }

    revalidatePath('/')
}
