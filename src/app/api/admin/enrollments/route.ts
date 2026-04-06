import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function requireAdmin(token: string): Promise<boolean> {
  const client = serviceClient()
  const { data: { user }, error } = await client.auth.getUser(token)
  if (error || !user) return false
  const { data: profile } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  return profile?.role === 'admin'
}

function token(req: NextRequest): string | null {
  return req.headers.get('authorization')?.replace('Bearer ', '') ?? null
}

// POST /api/admin/enrollments — grant course access to a user
export async function POST(req: NextRequest) {
  const t = token(req)
  if (!t || !(await requireAdmin(t))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { userId, courseId } = body ?? {}
  if (!userId || !courseId) {
    return NextResponse.json({ error: 'userId and courseId are required' }, { status: 400 })
  }

  const client = serviceClient()

  // Upsert — unique(user_id, course_id) constraint prevents duplicates at DB level
  const { error } = await client
    .from('enrollments')
    .upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id', ignoreDuplicates: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// DELETE /api/admin/enrollments — revoke course access from a user
export async function DELETE(req: NextRequest) {
  const t = token(req)
  if (!t || !(await requireAdmin(t))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { userId, courseId } = body ?? {}
  if (!userId || !courseId) {
    return NextResponse.json({ error: 'userId and courseId are required' }, { status: 400 })
  }

  const client = serviceClient()
  const { error } = await client
    .from('enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
