import { getTodaySessions } from '@/app/(dashboard)/dashboard/actions'
import { TodayHeader } from '@/components/dashboard/TodayHeader'
import { TodayProgress } from '@/components/dashboard/TodayProgress'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
    const sessions = await getTodaySessions()

    const total = sessions.length
    const completed = sessions.filter((s: any) => s.status === 'Completed').length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <TodayHeader />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>

                    {sessions.length > 0 ? (
                        <div className="space-y-4">
                            {sessions.map((session: any) => (
                                <SessionCard key={session.id} session={session} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center dark:border-gray-700">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No sessions for today</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Check your <Link href="/schedule" className="text-indigo-600 hover:underline">Schedule</Link> or add new tasks.
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <TodayProgress total={total} completed={completed} />

                    {/* Placeholder for future Focus Mode / Stats */}
                    <div className="rounded-lg border border-gray-200 bg-indigo-50 p-4 dark:border-gray-700 dark:bg-indigo-900/10">
                        <h3 className="font-medium text-indigo-900 dark:text-indigo-100">Focus Tip</h3>
                        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                            Break your work into 25-minute chunks for better retention.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
