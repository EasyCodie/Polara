const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

async function seedAdmin() {
    const email = 'admin@polara.app'
    const password = 'password123'

    console.log(`Attempting to create user: ${email}`)

    // Check if user exists
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
        console.error('Error listing users:', listError)
        return
    }

    const existingUser = users.users.find(u => u.email === email)

    if (existingUser) {
        console.log('User already exists. ID:', existingUser.id)
        return
    }

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: 'Admin User' }
    })

    if (error) {
        console.error('Error creating user:', error)
    } else {
        console.log('User created successfully:', data.user.id)
    }
}

seedAdmin()
