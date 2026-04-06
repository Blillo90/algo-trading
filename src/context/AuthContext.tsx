'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AuthUser } from '@/types'
import { supabase } from '@/lib/supabase/client'

// ─── Cookie helpers ───────────────────────────────────────────────────────────
// The 'algo-auth' cookie is a routing marker read by middleware.ts.
// It mirrors the Supabase session state so the server can redirect
// unauthenticated requests to /login without waiting for client hydration.
// It is NOT a security token — Supabase RLS enforces actual data access.

function setSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = 'algo-auth=1; path=/; SameSite=Lax; Max-Age=86400'
}

function clearSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = 'algo-auth=; path=/; SameSite=Lax; Max-Age=0'
}

// ─── Protected routes (same list as middleware.ts) ────────────────────────────
const PROTECTED_PREFIXES = ['/dashboard', '/admin', '/curso']

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
}

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Build AuthUser from Supabase ─────────────────────────────────────────────

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

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Monotonically increasing counter — cancels stale buildAuthUser promises
  const sessionGenRef = useRef(0)

  useEffect(() => {
    let isMounted = true

    // Restore session on mount (page refresh / initial load)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return
      if (session?.user) {
        setSessionCookie()
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        if (isMounted) setUser(authUser)
      } else {
        clearSessionCookie()
      }
      if (isMounted) setIsLoading(false)
    })

    // React to auth changes: token refresh, sign-in from another tab, expiry, etc.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSessionCookie()
        const gen = ++sessionGenRef.current
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        if (sessionGenRef.current === gen) {
          setUser(authUser)
          setIsLoading(false)
        }
      } else {
        // SIGNED_OUT, TOKEN_REFRESHED with no session, or session expired
        sessionGenRef.current++
        clearSessionCookie()
        setUser(null)
        setIsLoading(false)

        // If the user is currently on a protected page, push them out.
        // Uses window.location to get the live pathname (avoids stale closure).
        if (typeof window !== 'undefined' && isProtectedPath(window.location.pathname)) {
          router.replace('/login')
          router.refresh()
        }
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { success: false, error: 'Email o contraseña incorrectos' }
    }
    setSessionCookie()
    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    // Cancel any in-flight buildAuthUser calls
    sessionGenRef.current++

    // Clear state and cookie immediately — UI responds before network
    setUser(null)
    clearSessionCookie()

    // Revoke the Supabase session
    await supabase.auth.signOut()

    // Replace (not push) so the protected page is removed from history,
    // then refresh so server components re-render without cached state.
    router.replace('/login')
    router.refresh()
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
