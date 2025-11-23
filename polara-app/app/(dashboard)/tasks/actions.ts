'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createTask(formData: FormData) {
    revalidatePath('/tasks')
}

export async function deleteTask(taskId: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('tasks').delete().eq('id', taskId)

    if (error) {
        console.error('Error deleting task:', error)
        throw new Error('Failed to delete task')
    }

    revalidatePath('/tasks')
}

export async function updateTaskStatus(taskId: string, status: 'Todo' | 'In_Progress' | 'Done') {
    const supabase = await createClient()

    const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId)

    if (error) {
        console.error('Error updating task status:', error)
        throw new Error('Failed to update task status')
    }

    revalidatePath('/tasks')
}
