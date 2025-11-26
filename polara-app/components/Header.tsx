'use client'

import { Menu } from 'lucide-react'

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6 lg:px-8">
            <button
                type="button"
                className="lg:hidden -ml-2 p-2 text-muted-foreground hover:text-foreground"
                onClick={onMenuClick}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 justify-end">
                {/* Add user profile dropdown or other header items here */}
                <div className="flex items-center">
                    {/* Placeholder for future header content */}
                </div>
            </div>
        </header>
    )
}
