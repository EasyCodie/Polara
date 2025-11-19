import { createClient } from '@/utils/supabase/server'
import { TaskList } from '@/components/tasks/TaskList'
import { AddTaskButton } from '@/components/tasks/AddTaskButton'

export default async function TasksPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: tasks } = await supabase
        .from('tasks')
        .select(`
      *,
      course:courses(name, color_code)
    `)
        .eq('user_id', user?.id!)
        .order('due_date', { ascending: true })

    const { data: courses } = await supabase
        .from('courses')
        .select('id, name')
        .eq('user_id', user?.id!)
        .order('name')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Tasks
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage your assignments and study goals.
                    </p>
                </div>
                <AddTaskButton courses={courses || []} />
            </div>

            <TaskList tasks={tasks || []} />
        </div>
    )
}
