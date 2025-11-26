import { getStudyStats } from './actions'
import { StudyCharts } from '@/components/analytics/StudyCharts'
import { Clock, CheckCircle2, TrendingUp } from 'lucide-react'

export default async function AnalyticsPage() {
    const stats = await getStudyStats()

    if (!stats) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track your study progress and habits.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Study Time</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sessions Completed</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSessions}</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Focus Score</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Coming Soon</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <StudyCharts
                dailyStats={stats.dailyStats}
                courseStats={stats.courseStats}
            />
        </div>
    )
}
