'use server'

import { createClient } from '@/utils/supabase/server'
import { breakdownTask } from '@/lib/scheduling/breakdown'
import { revalidatePath } from 'next/cache'

export async function autoScheduleTask(taskId: string) {
    const supabase = await createClient()

    // 1. Fetch the task
    const { data: task, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single()

    if (taskError || !task) {
        throw new Error('Task not found')
    }

    // 2. Generate sessions
    const sessions = breakdownTask(task)

    // 3. Insert sessions
    const { error: insertError } = await supabase
        .from('study_sessions')
        .insert(sessions)

    if (insertError) {
        console.error('Error creating sessions:', insertError)
        throw new Error('Failed to create study sessions')
    }

    revalidatePath('/tasks')
}
