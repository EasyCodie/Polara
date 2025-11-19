import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                </h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Welcome Card */}
                <div className="col-span-full rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Welcome back, {user?.email}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Here's what's on your schedule for today.
                    </p>
                </div>

                {/* Stats Cards Placeholders */}
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tasks Due Today
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        0
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Study Hours
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        0h
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Exam Readiness
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        --%
                    </p>
                </div>
            </div>
        </div>
    )
}
