import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Module-level singleton — stateless client, safe to reuse across requests
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function requireAdmin(token: string): Promise<boolean> {
  const { data: { user }, error } = await adminClient.auth.getUser(token)
  if (error || !user) return false
  const { data: profile } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  return profile?.role === 'admin'
}

function extractToken(req: NextRequest): string | null {
  return req.headers.get('authorization')?.replace('Bearer ', '') ?? null
}

// POST /api/admin/enrollments — grant course access to a user
export async function POST(req: NextRequest) {
  const t = extractToken(req)
  if (!t || !(await requireAdmin(t))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { userId, courseId } = body ?? {}
  if (!userId || !courseId) {
    return NextResponse.json({ error: 'userId and courseId are required' }, { status: 400 })
  }

  const { error } = await adminClient
    .from('enrollments')
    .upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id', ignoreDuplicates: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// DELETE /api/admin/enrollments — revoke course access from a user
export async function DELETE(req: NextRequest) {
  const t = extractToken(req)
  if (!t || !(await requireAdmin(t))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { userId, courseId } = body ?? {}
  if (!userId || !courseId) {
    return NextResponse.json({ error: 'userId and courseId are required' }, { status: 400 })
  }

  const { error } = await adminClient
    .from('enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
