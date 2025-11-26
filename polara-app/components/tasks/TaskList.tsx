'use client'

import { Trash2, CheckCircle, Circle, Clock, Wand2 } from 'lucide-react'
import { deleteTask, updateTaskStatus } from '@/app/(dashboard)/tasks/actions'
import { clsx } from 'clsx'

type Task = {
    id: string
    title: string
    description: string | null
    status: 'Todo' | 'In_Progress' | 'Done' | null
    difficulty: 'Easy' | 'Medium' | 'Hard' | null
    priority: 'Low' | 'Medium' | 'High' | null
    due_date: string | null
    estimated_duration: number | null
    course: {
        name: string
        color_code: string | null
    } | null
}

export function TaskList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                const newStatus = task.status === 'Done' ? 'Todo' : 'Done'
                                updateTaskStatus(task.id, newStatus)
                            }}
                            className={clsx(
                                'flex h-6 w-6 items-center justify-center rounded-full border transition-colors',
                                task.status === 'Done'
                                    ? 'border-green-500 bg-green-50 text-green-600 dark:bg-green-900/20'
                                    : 'border-input text-transparent hover:border-muted-foreground'
                            )}
                        >
                            <CheckCircle className="h-4 w-4" />
                        </button>

                        <div>
                            <h3 className={clsx(
                                "text-sm font-medium",
                                task.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'
                            )}>
                                {task.title}
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                {task.course && (
                                    <span
                                        className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                                        style={{
                                            backgroundColor: `${task.course.color_code}20`,
                                            color: task.course.color_code || '#3b82f6'
                                        }}
                                    >
                                        {task.course.name}
                                    </span>
                                )}
                                {task.due_date && (
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(task.due_date).toLocaleDateString('en-GB')}
                                    </span>
                                )}
                                {task.difficulty && (
                                    <span className={clsx(
                                        "px-1.5 py-0.5 rounded border",
                                        task.difficulty === 'Hard' ? 'border-red-200 text-red-700 bg-red-50 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400' :
                                            task.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                'border-green-200 text-green-700 bg-green-50 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400'
                                    )}>
                                        {task.difficulty}
                                    </span>
                                )}
                                {task.priority && (
                                    <span className={clsx(
                                        "px-1.5 py-0.5 rounded border text-[10px] uppercase tracking-wider font-semibold",
                                        task.priority === 'High' ? 'border-orange-200 text-orange-700 bg-orange-50 dark:border-orange-900 dark:bg-orange-900/20 dark:text-orange-400' :
                                            task.priority === 'Medium' ? 'border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400' :
                                                'border-border text-muted-foreground bg-muted'
                                    )}>
                                        {task.priority}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={async () => {
                                const { autoScheduleTask } = await import('@/app/(dashboard)/tasks/schedule-actions')
                                await autoScheduleTask(task.id)
                                alert('Task broken down into sessions!')
                            }}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title="Auto-Schedule (Break down task)"
                        >
                            <Wand2 className="h-4 w-4" />
                        </button>

                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete task"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
            {tasks.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
                    No tasks found. Create one to start studying!
                </div>
            )}
        </div>
    )
}
