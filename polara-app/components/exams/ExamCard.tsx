'use client'

import { formatDistanceToNow } from 'date-fns'
import { Calendar, Trash2, Target, BookOpen } from 'lucide-react'
import { deleteExam } from '@/app/(dashboard)/exams/actions'
import { useState } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

type ExamCardProps = {
    exam: {
        id: string
        title: string
        date: string
        topics: string | null
        target_grade: string | null
        course: {
            name: string
            color_code: string | null
        } | null
    }
}

export function ExamCard({ exam }: ExamCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this exam?')) return
        setIsDeleting(true)
        try {
            await deleteExam(exam.id)
        } catch (error) {
            alert('Failed to delete exam')
            setIsDeleting(false)
        }
    }

    const examDate = new Date(exam.date)
    const timeUntil = formatDistanceToNow(examDate, { addSuffix: true })
    const isPast = new Date() > examDate

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
        >
            <div>
                <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {exam.course && (
                            <span
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                style={{
                                    backgroundColor: `${exam.course.color_code}20`,
                                    color: exam.course.color_code || '#3b82f6'
                                }}
                            >
                                {exam.course.name}
                            </span>
                        )}
                    </div>
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                            onClick={handleDelete}
                            className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                    {exam.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className={clsx(isPast ? "text-red-500" : "text-green-600")}>
                            {examDate.toLocaleDateString()} • {timeUntil}
                        </span>
                    </div>

                    {exam.target_grade && (
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>Target: {exam.target_grade}</span>
                        </div>
                    )}

                    {exam.topics && (
                        <div className="flex items-start gap-2">
                            <BookOpen className="mt-0.5 h-4 w-4 shrink-0" />
                            <p className="line-clamp-2">{exam.topics}</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
