'use client'

import { Clock, CheckCircle2, PlayCircle, Circle } from 'lucide-react'
import { updateSessionStatus } from '@/app/(dashboard)/dashboard/actions'
import { useState } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import { motion } from 'framer-motion'

type SessionCardProps = {
    session: {
        id: string
        scheduled_start: string
        scheduled_end: string
        actual_duration: number
        status: 'Pending' | 'In Progress' | 'Completed' | 'Skipped'
        task: {
            title: string
            course: {
                name: string
                color_code: string | null
            } | null
        }
    }
}

export function SessionCard({ session }: SessionCardProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleStatusChange = async (newStatus: 'Pending' | 'In Progress' | 'Completed') => {
        setIsLoading(true)
        try {
            await updateSessionStatus(session.id, newStatus)
        } catch (error) {
            alert('Failed to update status')
        } finally {
            setIsLoading(false)
        }
    }

    const isCompleted = session.status === 'Completed'
    const isInProgress = session.status === 'In Progress'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={clsx(
                "flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-colors",
                isCompleted ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10" :
                    isInProgress ? "border-primary/20 bg-primary/5" :
                        "border-border bg-card"
            )}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className={clsx(
                        "truncate text-sm font-medium",
                        isCompleted ? "text-green-900 dark:text-green-100 line-through" : "text-foreground"
                    )}>
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
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                        {new Date(session.scheduled_start).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        {' - '}
                        {new Date(session.scheduled_end).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{session.actual_duration} min</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {session.status === 'Pending' && (
                    <Link
                        href={`/focus/${session.id}`}
                        onClick={() => handleStatusChange('In Progress')}
                        className="rounded-full p-2 text-primary hover:bg-primary/10"
                        title="Start Session"
                    >
                        <PlayCircle className="h-6 w-6" />
                    </Link>
                )}

                {session.status === 'In Progress' && (
                    <Link
                        href={`/focus/${session.id}`}
                        className="rounded-full p-2 text-primary hover:bg-primary/10"
                        title="Resume Session"
                    >
                        <PlayCircle className="h-6 w-6" />
                    </Link>
                )}

                {session.status === 'Completed' && (
                    <div className="p-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                )}
            </div>
        </motion.div>
    )
}
