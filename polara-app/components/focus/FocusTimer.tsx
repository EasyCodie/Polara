'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, SkipForward, CheckCircle2 } from 'lucide-react'
import { updateSessionStatus } from '@/app/(dashboard)/dashboard/actions'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'

type FocusTimerProps = {
    sessionId: string
    initialDuration: number // in minutes
    onComplete?: () => void
}

type TimerMode = 'focus' | 'break'

export function FocusTimer({ sessionId, initialDuration, onComplete }: FocusTimerProps) {
    const router = useRouter()
    const [mode, setMode] = useState<TimerMode>('focus')
    const [timeLeft, setTimeLeft] = useState(initialDuration * 60)
    const [isActive, setIsActive] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    // Audio refs (optional, placeholders for now)
    // const startSound = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
            handleTimerComplete()
        }

        return () => clearInterval(interval)
    }, [isActive, timeLeft])

    const handleTimerComplete = () => {
        if (mode === 'focus') {
            // Focus session done, switch to break?
            // For MVP, just notify and maybe auto-switch or ask.
            // Let's switch to break automatically for flow.
            if (confirm('Focus session complete! Start a 5-minute break?')) {
                setMode('break')
                setTimeLeft(5 * 60)
                setIsActive(true)
            } else {
                // User might want to be done
            }
        } else {
            alert('Break over! Ready to focus again?')
            setMode('focus')
            setTimeLeft(initialDuration * 60)
        }
    }

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === 'focus' ? initialDuration * 60 : 5 * 60)
    }

    const skipBreak = () => {
        setMode('focus')
        setTimeLeft(initialDuration * 60)
        setIsActive(false)
    }

    const handleCompleteSession = async () => {
        if (!confirm('Are you sure you want to mark this session as completed?')) return

        try {
            await updateSessionStatus(sessionId, 'Completed')
            setIsCompleted(true)
            if (onComplete) onComplete()
            router.push('/') // Go back to dashboard (root)
        } catch (error) {
            alert('Failed to update session status')
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progress = mode === 'focus'
        ? ((initialDuration * 60 - timeLeft) / (initialDuration * 60)) * 100
        : ((5 * 60 - timeLeft) / (5 * 60)) * 100

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            {/* Timer Display */}
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-8 border-gray-100 dark:border-gray-800">
                {/* Progress Ring (Simple SVG or CSS conic gradient could go here, using simple border for now) */}
                <div
                    className={clsx(
                        "absolute inset-0 rounded-full border-8 transition-all duration-1000",
                        mode === 'focus' ? "border-indigo-600" : "border-green-500"
                    )}
                    style={{
                        clipPath: `inset(0 0 ${100 - progress}% 0)` // Simple vertical fill effect for MVP, ring is harder without SVG
                        // Better approach for ring: SVG
                    }}
                />

                {/* SVG Ring Implementation */}
                <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                    <circle
                        cx="120"
                        cy="120"
                        r="112"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-100 dark:text-gray-800"
                    />
                    <circle
                        cx="120"
                        cy="120"
                        r="112"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 112}
                        strokeDashoffset={2 * Math.PI * 112 * (1 - progress / 100)}
                        className={clsx(
                            "transition-all duration-1000 ease-linear",
                            mode === 'focus' ? "text-indigo-600" : "text-green-500"
                        )}
                    />
                </svg>

                <div className="z-10 text-center">
                    <div className={clsx(
                        "text-5xl font-bold tabular-nums",
                        mode === 'focus' ? "text-gray-900 dark:text-white" : "text-green-600 dark:text-green-400"
                    )}>
                        {formatTime(timeLeft)}
                    </div>
                    <p className="mt-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                        {mode === 'focus' ? 'Focus' : 'Break'}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTimer}
                    className={clsx(
                        "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
                        isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
                    )}
                >
                    {isActive ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    title="Reset Timer"
                >
                    <RotateCcw className="h-4 w-4" />
                </button>

                {mode === 'break' && (
                    <button
                        onClick={skipBreak}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        title="Skip Break"
                    >
                        <SkipForward className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Session Actions */}
            <div className="w-full max-w-xs border-t border-gray-200 pt-8 dark:border-gray-800">
                <button
                    onClick={handleCompleteSession}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
                >
                    <CheckCircle2 className="h-5 w-5" />
                    Complete Session
                </button>
            </div>
        </div>
    )
}
