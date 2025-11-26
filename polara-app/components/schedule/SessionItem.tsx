'use client'

import { Clock, Trash2 } from 'lucide-react'
import { deleteSession } from '@/app/(dashboard)/schedule/actions'
import { useState } from 'react'

type SessionItemProps = {
    session: {
        id: string
        scheduled_start: string
        scheduled_end: string
        actual_duration: number
        task: {
            title: string
            course: {
                name: string
                color_code: string | null
            } | null
        }
    }
}

export function SessionItem({ session }: SessionItemProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this session?')) return

        setIsDeleting(true)
        try {
            await deleteSession(session.id)
        } catch (error) {
            alert('Failed to delete session')
            setIsDeleting(false)
        }
    }

    if (isDeleting) {
        return null // Optimistically hide
    }

    return (
        <div
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
        >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-medium text-foreground">
                        {session.task.title}
                    </h4>
                    {session.task.course && (
                        <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{
                                backgroundColor: `${session.task.course.color_code}20`,
                                color: session.task.course.color_code || '#3b82f6'
                            }}
                        >
                            {session.task.course.name}
                        </span>
                    )}
                </div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>
                        {new Date(session.scheduled_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(session.scheduled_end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{session.actual_duration} min</span>
                </div>
            </div>

            <button
                onClick={handleDelete}
                className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                title="Delete Session"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    )
}
