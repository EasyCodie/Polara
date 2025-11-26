'use client'

export function TodayHeader() {
    const date = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good Morning!</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                It's {date}. Here is your focus for today.
            </p>
        </div>
    )
}
