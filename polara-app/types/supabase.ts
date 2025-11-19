export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    avatar_url: string | null
                    preferences: Json | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    preferences?: Json | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    preferences?: Json | null
                    updated_at?: string | null
                }
            }
            courses: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    color_code: string | null
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    color_code?: string | null
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    color_code?: string | null
                    description?: string | null
                    created_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string | null
                    title: string
                    description: string | null
                    due_date: string | null
                    difficulty: 'Easy' | 'Medium' | 'Hard' | null
                    status: 'Todo' | 'In_Progress' | 'Done' | null
                    estimated_duration: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id?: string | null
                    title: string
                    description?: string | null
                    due_date?: string | null
                    difficulty?: 'Easy' | 'Medium' | 'Hard' | null
                    status?: 'Todo' | 'In_Progress' | 'Done' | null
                    estimated_duration?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string | null
                    title?: string
                    description?: string | null
                    due_date?: string | null
                    difficulty?: 'Easy' | 'Medium' | 'Hard' | null
                    status?: 'Todo' | 'In_Progress' | 'Done' | null
                    estimated_duration?: number | null
                    created_at?: string
                }
            }
            study_sessions: {
                Row: {
                    id: string
                    user_id: string
                    task_id: string | null
                    scheduled_start: string | null
                    scheduled_end: string | null
                    actual_duration: number | null
                    status: 'Pending' | 'Completed' | 'Skipped' | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    task_id?: string | null
                    scheduled_start?: string | null
                    scheduled_end?: string | null
                    actual_duration?: number | null
                    status?: 'Pending' | 'Completed' | 'Skipped' | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    task_id?: string | null
                    scheduled_start?: string | null
                    scheduled_end?: string | null
                    actual_duration?: number | null
                    status?: 'Pending' | 'Completed' | 'Skipped' | null
                    created_at?: string
                }
            }
            exams: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string | null
                    date: string
                    weight: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id?: string | null
                    date: string
                    weight?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string | null
                    date?: string
                    weight?: number | null
                    created_at?: string
                }
            }
        }
    }
}
