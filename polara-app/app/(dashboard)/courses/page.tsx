import { createClient } from '@/utils/supabase/server'
import { CourseList } from '@/components/courses/CourseList'
import { AddCourseButton } from '@/components/courses/AddCourseButton'

export default async function CoursesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user?.id!)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Courses
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage your subjects and color codes.
                    </p>
                </div>
                <AddCourseButton />
            </div>

            <CourseList courses={courses || []} />
        </div>
    )
}
