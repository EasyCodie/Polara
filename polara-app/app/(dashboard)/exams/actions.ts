'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getExams() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: exams, error } = await supabase
        .from('exams')
        .select(`
            *,
            course:courses (
                name,
                color_code
            )
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching exams:', error)
        return []
    }

    return exams
}

export async function createExam(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const title = formData.get('title') as string
    const courseId = formData.get('courseId') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const topics = formData.get('topics') as string
    const targetGrade = formData.get('targetGrade') as string

    // Combine date and time
    const dateTime = new Date(`${date}T${time}`).toISOString()

    const { error } = await supabase
        .from('exams')
        .insert({
            user_id: user.id,
            title,
            course_id: courseId,
            date: dateTime,
            topics,
            target_grade: targetGrade
        })

    if (error) {
        console.error('Error creating exam:', error)
        throw new Error('Failed to create exam')
    }

    revalidatePath('/exams')
    redirect('/exams')
}

export async function deleteExam(examId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', examId)

    if (error) {
        throw new Error('Failed to delete exam')
    }

    revalidatePath('/exams')
}
