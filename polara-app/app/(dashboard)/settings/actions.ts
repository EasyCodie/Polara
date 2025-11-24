'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type AvailabilitySlot = {
    id?: string
    day_of_week: number
    start_time: string
    end_time: string
    is_active: boolean
}

export async function getAvailability() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('user_id', user.id)
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true })

    if (error) {
        console.error('Error fetching availability:', error)
        return []
    }

    return data
}

export async function saveAvailability(slots: AvailabilitySlot[]) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    // We'll do a full replace strategy for simplicity for now, 
    // or we can try to upsert. 
    // A simple approach for this MVP: Delete all for user and insert new ones.
    // But that might be destructive if we have IDs linked elsewhere (not yet).
    // Let's try to be smarter: 
    // Actually, for a settings form that sends the "complete state", 
    // deleting and re-inserting is often the cleanest way to handle removals + additions + updates simultaneously
    // without complex diffing logic, provided there are no foreign keys pointing TO these slots yet.
    // There are no FKs pointing to availability_slots yet.

    // 1. Delete existing slots
    const { error: deleteError } = await supabase
        .from('availability_slots')
        .delete()
        .eq('user_id', user.id)

    if (deleteError) {
        console.error('Error clearing old availability:', deleteError)
        throw new Error('Failed to update availability')
    }

    // 2. Insert new slots
    if (slots.length > 0) {
        const { error: insertError } = await supabase
            .from('availability_slots')
            .insert(
                slots.map(slot => ({
                    user_id: user.id,
                    day_of_week: slot.day_of_week,
                    start_time: slot.start_time,
                    end_time: slot.end_time,
                    is_active: slot.is_active
                }))
            )

        if (insertError) {
            console.error('Error inserting new availability:', insertError)
            throw new Error('Failed to update availability')
        }
    }

    revalidatePath('/settings')
    return { success: true }
}
