'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AuthUser } from '@/types'
import { supabase } from '@/lib/supabase/client'

interface LoginResult {
  success: boolean
  error?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function buildAuthUser(userId: string, email: string): Promise<AuthUser> {
  const [{ data: profile }, { data: enrollments }] = await Promise.all([
    supabase.from('profiles').select('full_name, role').eq('id', userId).single(),
    supabase.from('enrollments').select('course_id').eq('user_id', userId),
  ])

  return {
    id: userId,
    email,
    name: profile?.full_name ?? email.split('@')[0],
    role: (profile?.role ?? 'user') as 'user' | 'admin',
    enrolledCourseIds: enrollments?.map((e: { course_id: string }) => e.course_id) ?? [],
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Monotonically increasing counter used to cancel stale buildAuthUser promises.
  // When logout fires (or SIGNED_OUT arrives), we increment this so any in-flight
  // async call can detect it is stale and skip the setUser call.
  const sessionGenRef = useRef(0)

  useEffect(() => {
    let isMounted = true

    // Restore session on mount — runs once
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return
      if (session?.user) {
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        if (isMounted) setUser(authUser)
      }
      if (isMounted) setIsLoading(false)
    })

    // Keep in sync across tab focus, token refresh, sign-in/out from other tabs
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Snapshot the current generation before the async gap
        const gen = ++sessionGenRef.current
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        // Only apply the result if no newer auth event has superseded this one
        if (sessionGenRef.current === gen) {
          setUser(authUser)
          setIsLoading(false)
        }
      } else {
        // SIGNED_OUT or expired session — invalidate any in-flight buildAuthUser calls
        sessionGenRef.current++
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { success: false, error: 'Email o contraseña incorrectos' }
    }
    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    // 1. Cancel any in-flight buildAuthUser calls immediately
    sessionGenRef.current++

    // 2. Clear local state right away — UI responds without waiting for network
    setUser(null)

    // 3. Invalidate the Supabase session (clears localStorage tokens)
    await supabase.auth.signOut()

    // 4. Navigate to home and force server components to re-render
    router.push('/')
    router.refresh()
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
