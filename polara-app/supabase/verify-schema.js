const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function verifySchema() {
    console.log('Verifying courses table existence...')

    // Try to insert a dummy record (will fail RLS or constraints, but should show table exists)
    // Or just select.
    const { data, error } = await supabase
        .from('courses')
        .select('count')
        .limit(1)

    if (error) {
        console.error('Error accessing courses table:', error)
        if (error.code === 'PGRST205') {
            console.log('\n!!! DIAGNOSIS: Schema Cache Stale or Table Missing !!!')
            console.log('The Supabase API does not see the "courses" table.')
            console.log('If you created the table in the SQL Editor, you MUST reload the schema cache.')
        }
    } else {
        console.log('Success! "courses" table is accessible.')
    }
}

verifySchema()
