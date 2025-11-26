'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createCourse } from '@/app/(dashboard)/courses/actions'


const COLORS = [
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#84cc16', // lime
    '#22c55e', // green
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#a855f7', // purple
    '#ec4899', // pink
]

export function AddCourseButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Course
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="relative z-50 w-full max-w-2xl transform overflow-hidden rounded-xl bg-card p-8 shadow-xl transition-all border border-border">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">
                                Add New Course
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
                                await createCourse(formData)
                                setIsOpen(false)
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-foreground"
                                    placeholder="e.g. Advanced Calculus"
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
                                    placeholder="Professor Smith, Mon/Wed 10am"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Color Tag
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {COLORS.map((color) => (
                                        <label key={color} className="relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color_code"
                                                value={color}
                                                className="peer sr-only"
                                                defaultChecked={color === COLORS[6]}
                                            />
                                            <div
                                                className="h-8 w-8 rounded-full ring-2 ring-transparent ring-offset-2 transition-all peer-checked:ring-primary peer-hover:scale-110"
                                                style={{ backgroundColor: color }}
                                            />
                                        </label>
                                    ))}
                                </div>
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
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
