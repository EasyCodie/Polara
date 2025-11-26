'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import { runAutoSchedule } from '@/app/(dashboard)/schedule/actions'


export function ScheduleButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSchedule = async () => {
        setIsLoading(true)
        try {
            const result = await runAutoSchedule() as any
            if (result.success) {
                alert(`Scheduled ${result.scheduled} sessions!`)
            } else {
                alert('Failed to schedule: ' + result.error)
            }
        } catch (err) {
            alert('An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleSchedule}
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
            {isLoading ? (
                <Loader2 className="-ml-1 mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Play className="-ml-1 mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Generating...' : 'Generate Schedule'}
        </button>
    )
}
