import { createClient } from '@/utils/supabase/server'
import { Calendar, Clock } from 'lucide-react'
import { runAutoSchedule } from './actions'
import { clsx } from 'clsx'

// Client component for the button to avoid interactivity issues in server component
import { ScheduleButton } from '@/components/schedule/ScheduleButton'
import { SessionItem } from '@/components/schedule/SessionItem'

export default async function SchedulePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch scheduled sessions
    const { data: sessions } = await supabase
        .from('study_sessions')
        .select(`
      *,
      task:tasks (
        title,
        course:courses (
          name,
          color_code
        )
      )
    `)
        .eq('user_id', user?.id)
        .not('scheduled_start', 'is', null)
        .order('scheduled_start', { ascending: true })

    // Group by date
    const groupedSessions = (sessions || []).reduce((acc: any, session) => {
        const date = new Date(session.scheduled_start).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
        if (!acc[date]) acc[date] = []
        acc[date].push(session)
        return acc
    }, {})

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Schedule</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Upcoming study sessions based on your availability.
                    </p>
                </div>
                <ScheduleButton />
            </div>

            <div className="space-y-8">
                {(Object.entries(groupedSessions) as [string, any[]][]).map(([date, daySessions]) => (
                    <div key={date} className="space-y-3">
                        <h3 className="sticky top-0 bg-gray-50 py-2 text-sm font-semibold text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            {date}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-1">
                            {daySessions.map((session: any) => (
                                <SessionItem key={session.id} session={session} />
                            ))}
                        </div>
                    </div>
                ))}

                {(!sessions || sessions.length === 0) && (
                    <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center dark:border-gray-700">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No sessions scheduled</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Click "Generate Schedule" to organize your pending tasks.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
