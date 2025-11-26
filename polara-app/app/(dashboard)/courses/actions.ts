'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function getCourses() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching courses:', error)
        return []
    }

    return courses
}

export async function createCourse(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const color_code = formData.get('color_code') as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { error } = await supabase.from('courses').insert({
        user_id: user.id,
        name,
        description,
        color_code,
    })

    if (error) {
        console.error('Error creating course:', error)
        throw new Error('Failed to create course')
    }

    revalidatePath('/courses')
}

export async function deleteCourse(courseId: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('courses').delete().eq('id', courseId)

    if (error) {
        console.error('Error deleting course:', error)
        throw new Error('Failed to delete course')
    }

    revalidatePath('/courses')
}
