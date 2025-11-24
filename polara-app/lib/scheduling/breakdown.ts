import { Database } from '@/types/supabase'

type Task = Database['public']['Tables']['tasks']['Row']
type StudySessionInsert = Database['public']['Tables']['study_sessions']['Insert']

const MAX_SESSION_DURATION = 60 // minutes
const MIN_SESSION_DURATION = 30 // minutes
const BREAK_DURATION = 10 // minutes

/**
 * Breaks down a task into multiple study sessions based on its estimated duration.
 * 
 * Rules:
 * 1. If duration <= MAX_SESSION_DURATION, return 1 session.
 * 2. If duration > MAX_SESSION_DURATION, split into chunks of MAX_SESSION_DURATION.
 * 3. The last chunk must be at least MIN_SESSION_DURATION. If not, combine with previous.
 * 
 * Example: 
 * - 45 mins -> [45]
 * - 90 mins -> [45, 45] (Split evenly)
 * - 140 mins -> [60, 60, 20] -> [60, 40, 40] (Rebalanced) or just [60, 80]? 
 *   Let's stick to: fill MAX, then remainder. If remainder < MIN, steal from previous.
 */
export function breakdownTask(task: Task): StudySessionInsert[] {
    if (!task.estimated_duration) {
        // Default to one 30 min session if no duration specified
        return [{
            user_id: task.user_id,
            task_id: task.id,
            actual_duration: 30,
            status: 'Pending'
        }]
    }

    const totalDuration = task.estimated_duration
    const sessions: StudySessionInsert[] = []

    let remaining = totalDuration

    while (remaining > 0) {
        let sessionDuration = Math.min(remaining, MAX_SESSION_DURATION)

        // Check if the remainder after this session would be too small
        const nextRemaining = remaining - sessionDuration
        if (nextRemaining > 0 && nextRemaining < MIN_SESSION_DURATION) {
            // If the last chunk is too small (e.g. 10 mins), we have two options:
            // 1. Add it to this session (making it > MAX)
            // 2. Split the difference with this session

            // Let's try to equalize the last two sessions
            // Current sessionDuration is MAX (60). Next is say 10. Total 70.
            // Split into 35 and 35.
            const totalForLastTwo = sessionDuration + nextRemaining
            sessionDuration = Math.floor(totalForLastTwo / 2)
            // The next iteration will pick up the rest
        }

        sessions.push({
            user_id: task.user_id,
            task_id: task.id,
            actual_duration: sessionDuration,
            status: 'Pending'
        })

        remaining -= sessionDuration
    }

    return sessions
}
