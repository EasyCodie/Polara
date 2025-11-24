'use server'

import { scheduleSessions } from '@/lib/scheduling/scheduler'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function runAutoSchedule() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    try {
        const result = await scheduleSessions(user.id)
        revalidatePath('/schedule')
        return { success: true, ...result }
    } catch (error: any) {
        console.error('Scheduling failed:', error)
        return { success: false, error: error.message }
    }
}

export async function deleteSession(sessionId: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('study_sessions').delete().eq('id', sessionId)

    if (error) {
        console.error('Error deleting session:', error)
        throw new Error('Failed to delete session')
    }

    revalidatePath('/schedule')
}
