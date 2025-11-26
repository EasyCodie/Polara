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
                    className="relative flex flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div>
                        <div className="flex items-center justify-between">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: course.color_code || '#3b82f6' }}
                            />
                            <button
                                onClick={() => deleteCourse(course.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                                title="Delete course"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-foreground">
                            {course.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {course.description || 'No description'}
                        </p>
                    </div>
                </div>
            ))}
            {courses.length === 0 && (
                <div className="col-span-full flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
                    No courses found. Add one to get started!
                </div>
            )}
        </div>
    )
}
