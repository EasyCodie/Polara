'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createTask(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const course_id = formData.get('course_id') as string
    const due_date = formData.get('due_date') as string
    const difficulty = formData.get('difficulty') as string
    const estimated_duration = formData.get('estimated_duration') as string
    const description = formData.get('description') as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { error } = await supabase.from('tasks').insert({
        user_id: user.id,
        title,
        course_id: course_id || null,
        due_date: due_date || null,
        difficulty: difficulty || 'Medium',
        estimated_duration: estimated_duration ? parseInt(estimated_duration) : null,
        description,
        status: 'Todo'
    })

    if (error) {
        console.error('Error creating task:', error)
        throw new Error('Failed to create task')
    }

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
