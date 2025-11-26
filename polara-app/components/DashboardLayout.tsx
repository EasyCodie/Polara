'use client'

import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useState } from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-1 flex-col lg:pl-64">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 py-6">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
