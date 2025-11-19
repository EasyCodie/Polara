import { createClient } from '@/utils/supabase/server'
import { signout } from './login/actions'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Polara Dev Verification</h1>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          {user ? (
            <div className="space-y-2">
              <p className="text-green-600 font-bold">✓ Logged In</p>
              <p>Email: {user.email}</p>
              <p>User ID: {user.id}</p>
              <form action={signout}>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-amber-600 font-bold">⚠ Not Logged In</p>
              <Link
                href="/login"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>

        {user && (
          <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Database Connection</h2>
            {profile ? (
              <div className="space-y-2">
                <p className="text-green-600 font-bold">✓ Connected to 'profiles'</p>
                <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(profile, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-600 font-bold">✗ Profile not found</p>
                <p className="text-xs text-gray-500">
                  Did you run the SQL migration? The trigger should have created a profile.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
