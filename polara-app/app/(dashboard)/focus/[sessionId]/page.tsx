import { createClient } from '@/utils/supabase/server'
import { FocusTimer } from '@/components/focus/FocusTimer'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{
        sessionId: string
    }>
}

export default async function FocusPage({ params }: Props) {
    const { sessionId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: session } = await supabase
        .from('study_sessions')
        .select(`
      *,
      task:tasks (
        title,
        description,
        course:courses (
          name,
          color_code
        )
      )
    `)
        .eq('id', sessionId)
        .eq('user_id', user?.id)
        .single()

    if (!session) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Minimal Header */}
            <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto flex max-w-3xl items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Exit Focus Mode
                    </Link>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        Focus Mode
                    </div>
                    <div className="w-20" /> {/* Spacer for centering */}
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-12">
                <div className="mb-12 text-center">
                    <div className="mb-4 flex justify-center">
                        {session.task.course && (
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: `${session.task.course.color_code}20`,
                                    color: session.task.course.color_code
                                }}
                            >
                                {session.task.course.name}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {session.task.title}
                    </h1>
                    {session.task.description && (
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            {session.task.description}
                        </p>
                    )}
                </div>

                <FocusTimer
                    sessionId={session.id}
                    initialDuration={session.actual_duration || 25}
                />
            </main>
        </div>
    )
}
