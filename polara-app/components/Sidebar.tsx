'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, CheckSquare, Calendar, BarChart2, Settings, LogOut, GraduationCap, X } from 'lucide-react'
import { clsx } from 'clsx'
import { signout } from '@/app/login/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'


const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Exams', href: '/exams', icon: GraduationCap },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
]

type SidebarProps = {
    isOpen?: boolean
    onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (onClose) onClose()
    }, [pathname, onClose])

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
            <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20">
                        <img src="/logo.png" alt="Polara Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-xl font-bold text-sidebar-primary">Polara</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="h-6 w-6" />
                    </button>
                )}
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
                                    ? 'bg-sidebar-accent text-sidebar-primary'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive
                                        ? 'text-sidebar-primary'
                                        : 'text-muted-foreground group-hover:text-sidebar-foreground',
                                    'mr-3 h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-sidebar-border p-4">
                <Link
                    href="/settings"
                    className="group flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-2"
                >
                    <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-sidebar-foreground" />
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

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:h-full lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar lg:hidden"
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
