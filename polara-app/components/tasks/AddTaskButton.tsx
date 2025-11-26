'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createTask } from '@/app/(dashboard)/tasks/actions'


type Course = {
    id: string
    name: string
}

export function AddTaskButton({ courses }: { courses: Course[] }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Task
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="relative z-50 w-full max-w-2xl transform overflow-hidden rounded-xl bg-card p-8 shadow-xl transition-all border border-border">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">
                                Add New Task
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            action={async (formData) => {
                                await createTask(formData)
                                setIsOpen(false)
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    placeholder="e.g. Chapter 5 Exercises"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="course_id"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Course
                                    </label>
                                    <select
                                        name="course_id"
                                        id="course_id"
                                        className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    >
                                        <option value="">Select a course...</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="due_date"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="due_date"
                                        id="due_date"
                                        className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="difficulty"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Difficulty
                                    </label>
                                    <select
                                        name="difficulty"
                                        id="difficulty"
                                        defaultValue="Medium"
                                        className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        id="priority"
                                        defaultValue="Medium"
                                        className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="estimated_duration"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Est. Duration (mins)
                                </label>
                                <input
                                    type="number"
                                    name="estimated_duration"
                                    id="estimated_duration"
                                    min="0"
                                    step="15"
                                    className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
