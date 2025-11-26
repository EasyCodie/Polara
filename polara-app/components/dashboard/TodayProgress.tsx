'use client'

type TodayProgressProps = {
    total: number
    completed: number
}

export function TodayProgress({ total, completed }: TodayProgressProps) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">Daily Progress</span>
                <span className="text-gray-900 dark:text-white">{percentage}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {completed} of {total} sessions completed
            </p>
        </div>
    )
}
