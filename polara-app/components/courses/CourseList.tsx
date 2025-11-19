'use client'

import { Trash2 } from 'lucide-react'
import { deleteCourse } from '@/app/(dashboard)/courses/actions'

type Course = {
    id: string
    name: string
    description: string | null
    color_code: string | null
}

export function CourseList({ courses }: { courses: Course[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <div
                    key={course.id}
                    className="relative flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                    <div>
                        <div className="flex items-center justify-between">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: course.color_code || '#3b82f6' }}
                            />
                            <button
                                onClick={() => deleteCourse(course.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete course"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                            {course.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {course.description || 'No description'}
                        </p>
                    </div>
                </div>
            ))}
            {courses.length === 0 && (
                <div className="col-span-full flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    No courses found. Add one to get started!
                </div>
            )}
        </div>
    )
}
