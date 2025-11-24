'use client'

import { useState } from 'react'
import { Plus, Trash2, Save, Clock } from 'lucide-react'
import { saveAvailability, type AvailabilitySlot } from '@/app/(dashboard)/settings/actions'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function AvailabilityForm({ initialSlots }: { initialSlots: any[] }) {
    const [slots, setSlots] = useState<AvailabilitySlot[]>(initialSlots || [])
    const [isSaving, setIsSaving] = useState(false)

    const addSlot = (dayIndex: number) => {
        setSlots([
            ...slots,
            {
                day_of_week: dayIndex,
                start_time: '09:00',
                end_time: '17:00',
                is_active: true
            }
        ])
    }

    const removeSlot = (index: number) => {
        setSlots(slots.filter((_, i) => i !== index))
    }

    const updateSlot = (index: number, field: keyof AvailabilitySlot, value: any) => {
        const newSlots = [...slots]
        newSlots[index] = { ...newSlots[index], [field]: value }
        setSlots(newSlots)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await saveAvailability(slots)
            alert('Availability saved!')
        } catch (error) {
            alert('Failed to save availability')
        } finally {
            setIsSaving(false)
        }
    }

    // Group slots by day for display
    const slotsByDay = DAYS.map((day, index) => ({
        dayName: day,
        dayIndex: index,
        daySlots: slots.filter(s => s.day_of_week === index).sort((a, b) => a.start_time.localeCompare(b.start_time))
    }))

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Weekly Schedule</h2>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
                >
                    <Save className="-ml-1 mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                {slotsByDay.map(({ dayName, dayIndex, daySlots }) => (
                    <div key={dayName} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-white">{dayName}</h3>
                            <button
                                onClick={() => addSlot(dayIndex)}
                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                + Add Slot
                            </button>
                        </div>

                        {daySlots.length === 0 ? (
                            <p className="text-sm text-gray-500 italic dark:text-gray-400">No availability set.</p>
                        ) : (
                            <div className="space-y-3">
                                {daySlots.map((slot, i) => {
                                    // Find the actual index in the main slots array to update/remove
                                    const realIndex = slots.indexOf(slot)

                                    return (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <input
                                                    type="time"
                                                    value={slot.start_time}
                                                    onChange={(e) => updateSlot(realIndex, 'start_time', e.target.value)}
                                                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                />
                                                <span className="text-gray-500">-</span>
                                                <input
                                                    type="time"
                                                    value={slot.end_time}
                                                    onChange={(e) => updateSlot(realIndex, 'end_time', e.target.value)}
                                                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeSlot(realIndex)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
