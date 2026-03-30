'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
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
    supabase.from('profiles').select('full_name').eq('id', userId).single(),
    supabase.from('enrollments').select('course_id').eq('user_id', userId),
  ])

  return {
    id: userId,
    email,
    name: profile?.full_name ?? email.split('@')[0],
    enrolledCourseIds: enrollments?.map((e: { course_id: string }) => e.course_id) ?? [],
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        setUser(authUser)
      }
      setIsLoading(false)
    })

    // Keep in sync with Supabase auth state (tab focus, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = await buildAuthUser(session.user.id, session.user.email!)
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { success: false, error: 'Email o contraseña incorrectos' }
    }
    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
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
