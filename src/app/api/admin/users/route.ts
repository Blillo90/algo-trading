import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Module-level singleton — stateless client, safe to reuse across requests
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: { user }, error } = await adminClient.auth.getUser(token)
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Run role check and user listing in parallel
  const [{ data: profile }, { data: { users } }] = await Promise.all([
    adminClient.from('profiles').select('role').eq('id', user.id).single(),
    adminClient.auth.admin.listUsers({ perPage: 1000 }),
  ])

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({
    users: users.map((u) => ({ id: u.id, email: u.email ?? '' })),
  })
}
