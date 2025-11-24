import { AvailabilityForm } from '@/components/settings/AvailabilityForm'
import { getAvailability } from './actions'

export default async function SettingsPage() {
    const availability = await getAvailability()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your study preferences and availability.
                </p>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <AvailabilityForm initialSlots={availability} />
            </div>
        </div>
    )
}
