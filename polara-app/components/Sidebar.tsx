'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, CheckSquare, Calendar, BarChart2, Settings, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { signout } from '@/app/login/actions'

const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Polara</span>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                                    'mr-3 h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                <Link
                    href="/settings"
                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white mb-2"
                >
                    <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                    Settings
                </Link>
                <form action={signout}>
                    <button
                        type="submit"
                        className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 dark:text-red-400" />
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}
