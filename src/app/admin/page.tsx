'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Clock, RefreshCw, Shield, ShieldOff, Users, Wifi } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import StatsWidget from '@/components/dashboard/StatsWidget'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { COURSES } from '@/data/courses'

interface AdminUser {
  id: string
  full_name: string
  email: string
  role: 'user' | 'admin'
  last_seen_at: string | null
  created_at: string
  enrolledCourseIds: string[]
  totalMinutes: number
}

function isOnline(lastSeenAt: string | null): boolean {
  if (!lastSeenAt) return false
  return new Date(lastSeenAt) > new Date(Date.now() - 5 * 60 * 1000)
}

function formatMinutes(minutes: number): string {
  if (minutes === 0) return '—'
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-scene flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cobalt-600/30 border-t-cobalt-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink-3 text-sm">Cargando panel...</p>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  // Guard: must be logged in and admin
  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/dashboard'); return }
    setReady(true)
  }, [user, isLoading, router])

  const fetchData = useCallback(async () => {
    setDataLoading(true)

    // Fetch all data in parallel
    const [
      { data: profiles },
      { data: enrollments },
      { data: timeSessions },
      sessionResult,
    ] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, full_name, role, last_seen_at, created_at')
        .order('created_at', { ascending: true }),
      supabase.from('enrollments').select('user_id, course_id'),
      supabase
        .from('course_time_sessions')
        .select('user_id, duration_seconds')
        .not('ended_at', 'is', null),
      supabase.auth.getSession(),
    ])

    // Fetch emails via server API route
    let emailMap: Record<string, string> = {}
    const token = sessionResult.data.session?.access_token
    if (token) {
      try {
        const res = await fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const { users: authUsers } = await res.json()
          emailMap = Object.fromEntries(
            authUsers.map((u: { id: string; email: string }) => [u.id, u.email])
          )
        }
      } catch {
        // emails unavailable — continue without them
      }
    }

    // Aggregate time per user (seconds → minutes)
    const timeMap: Record<string, number> = {}
    for (const ts of timeSessions ?? []) {
      timeMap[ts.user_id] = (timeMap[ts.user_id] ?? 0) + (ts.duration_seconds ?? 0)
    }

    // Enrollment map per user
    const enrollMap: Record<string, string[]> = {}
    for (const e of enrollments ?? []) {
      if (!enrollMap[e.user_id]) enrollMap[e.user_id] = []
      enrollMap[e.user_id].push(e.course_id)
    }

    const adminUsers: AdminUser[] = (profiles ?? []).map((p) => ({
      id: p.id,
      full_name: p.full_name ?? 'Sin nombre',
      email: emailMap[p.id] ?? '—',
      role: p.role as 'user' | 'admin',
      last_seen_at: p.last_seen_at,
      created_at: p.created_at,
      enrolledCourseIds: enrollMap[p.id] ?? [],
      totalMinutes: Math.round((timeMap[p.id] ?? 0) / 60),
    }))

    setUsers(adminUsers)
    setDataLoading(false)
  }, [])

  useEffect(() => {
    if (ready) fetchData()
  }, [ready, fetchData])

  const toggleRole = async (target: AdminUser) => {
    if (target.id === user?.id) return
    setTogglingId(target.id)
    const newRole = target.role === 'admin' ? 'user' : 'admin'
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', target.id)
    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === target.id ? { ...u, role: newRole } : u))
      )
    }
    setTogglingId(null)
  }

  if (isLoading || !ready || dataLoading) return <LoadingScreen />

  const onlineCount = users.filter((u) => isOnline(u.last_seen_at)).length
  const totalEnrollments = users.reduce((acc, u) => acc + u.enrolledCourseIds.length, 0)
  const totalHours = Math.round(
    users.reduce((acc, u) => acc + u.totalMinutes, 0) / 60
  )

  return (
    <main className="min-h-screen bg-scene">
      <Navbar />

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-cobalt-400" />
              <span className="text-cobalt-400 text-xs font-medium font-mono uppercase tracking-wider">
                Panel de administración
              </span>
            </div>
            <h1 className="font-syne font-bold text-3xl md:text-4xl text-ink-1">
              Usuarios y{' '}
              <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
                actividad
              </span>
            </h1>
            <p className="text-ink-3 mt-2 text-sm">
              Gestiona usuarios, roles y monitoriza el progreso de la plataforma.
            </p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 text-sm text-ink-3 hover:text-ink-1 bg-surface border border-cobalt-600/15 rounded-xl hover:border-cobalt-600/35 transition-all duration-200 mt-2"
          >
            <RefreshCw size={14} />
            Actualizar
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: 'Total usuarios',
              value: users.length,
              subtitle: 'registrados',
              icon: Users,
            },
            {
              title: 'Online ahora',
              value: onlineCount,
              subtitle: 'últimos 5 min',
              icon: Wifi,
            },
            {
              title: 'Matrículas',
              value: totalEnrollments,
              subtitle: 'en cursos activos',
              icon: BookOpen,
            },
            {
              title: 'Horas de formación',
              value: `${totalHours}h`,
              subtitle: 'tiempo total acumulado',
              icon: Clock,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <StatsWidget
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </div>

        {/* Users table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-xl text-ink-1">Usuarios</h2>
            <span className="text-ink-3 text-sm font-mono">{users.length} registrados</span>
          </div>

          <div className="bg-surface border border-cobalt-600/15 rounded-2xl overflow-hidden">

            {/* Desktop header */}
            <div className="hidden lg:grid grid-cols-[minmax(0,2fr)_100px_100px_minmax(0,2fr)_90px_120px] gap-4 px-6 py-3 border-b border-cobalt-600/10 bg-cobalt-950/30">
              {['Usuario', 'Rol', 'Estado', 'Cursos', 'Tiempo', 'Acción'].map((h) => (
                <span key={h} className="text-ink-4 text-xs font-medium uppercase tracking-wider">
                  {h}
                </span>
              ))}
            </div>

            {users.length === 0 ? (
              <div className="p-12 text-center">
                <Users size={36} className="text-cobalt-600/30 mx-auto mb-3" />
                <p className="text-ink-3 text-sm">No hay usuarios registrados</p>
              </div>
            ) : (
              users.map((u, i) => {
                const online = isOnline(u.last_seen_at)
                const isSelf = u.id === user?.id
                const courseNames = u.enrolledCourseIds.map(
                  (id) => COURSES.find((c) => c.id === id)?.title ?? id
                )

                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    className="border-b border-cobalt-600/8 last:border-0 hover:bg-cobalt-950/20 transition-colors duration-200"
                  >
                    {/* ── Mobile / tablet layout ── */}
                    <div className="lg:hidden flex items-start gap-4 px-5 py-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-600/30 to-cobalt-800/20 border border-cobalt-600/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-cobalt-300 text-sm font-bold font-mono">
                          {initials(u.full_name)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-ink-1 font-semibold text-sm">{u.full_name}</span>
                          {u.role === 'admin' && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-cobalt-600/15 border border-cobalt-600/25 rounded text-cobalt-300 text-xs font-mono">
                              <Shield size={9} /> admin
                            </span>
                          )}
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              online
                                ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]'
                                : 'bg-ink-4'
                            }`}
                          />
                        </div>
                        <p className="text-ink-3 text-xs mt-0.5 truncate">{u.email}</p>
                        <p className="text-ink-4 text-xs mt-0.5">Desde {formatDate(u.created_at)}</p>

                        {courseNames.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {courseNames.map((name) => (
                              <span
                                key={name}
                                className="px-2 py-0.5 bg-cobalt-950/50 border border-cobalt-600/15 rounded text-ink-3 text-xs"
                              >
                                {name.length > 30 ? name.slice(0, 30) + '…' : name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-ink-3 text-xs font-mono">
                            {formatMinutes(u.totalMinutes)}
                          </span>
                          {!isSelf && (
                            <ToggleButton
                              user={u}
                              loading={togglingId === u.id}
                              onToggle={() => toggleRole(u)}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── Desktop layout ── */}
                    <div className="hidden lg:grid grid-cols-[minmax(0,2fr)_100px_100px_minmax(0,2fr)_90px_120px] gap-4 items-center px-6 py-4">

                      {/* Usuario */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cobalt-600/30 to-cobalt-800/20 border border-cobalt-600/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-cobalt-300 text-xs font-bold font-mono">
                            {initials(u.full_name)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-ink-1 font-medium text-sm truncate">{u.full_name}</p>
                          <p className="text-ink-3 text-xs truncate">{u.email}</p>
                          <p className="text-ink-4 text-xs">{formatDate(u.created_at)}</p>
                        </div>
                      </div>

                      {/* Rol */}
                      <div>
                        {u.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-cobalt-600/15 border border-cobalt-600/25 rounded-lg text-cobalt-300 text-xs font-mono">
                            <Shield size={10} /> admin
                          </span>
                        ) : (
                          <span className="text-ink-4 text-xs font-mono">user</span>
                        )}
                      </div>

                      {/* Estado */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            online
                              ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]'
                              : 'bg-ink-4'
                          }`}
                        />
                        <span className={`text-xs ${online ? 'text-emerald-400' : 'text-ink-4'}`}>
                          {online ? 'Online' : 'Offline'}
                        </span>
                      </div>

                      {/* Cursos */}
                      <div className="flex flex-wrap gap-1">
                        {courseNames.length > 0 ? (
                          courseNames.map((name) => (
                            <span
                              key={name}
                              className="px-2 py-0.5 bg-cobalt-950/50 border border-cobalt-600/15 rounded text-ink-3 text-xs"
                            >
                              {name.length > 28 ? name.slice(0, 28) + '…' : name}
                            </span>
                          ))
                        ) : (
                          <span className="text-ink-4 text-xs">Sin cursos</span>
                        )}
                      </div>

                      {/* Tiempo */}
                      <div>
                        <span className="text-ink-2 text-sm font-mono">
                          {formatMinutes(u.totalMinutes)}
                        </span>
                      </div>

                      {/* Acción */}
                      <div>
                        {isSelf ? (
                          <span className="text-ink-4 text-xs">Tú</span>
                        ) : (
                          <ToggleButton
                            user={u}
                            loading={togglingId === u.id}
                            onToggle={() => toggleRole(u)}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function ToggleButton({
  user,
  loading,
  onToggle,
}: {
  user: AdminUser
  loading: boolean
  onToggle: () => void
}) {
  const isAdmin = user.role === 'admin'
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 ${
        isAdmin
          ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
          : 'bg-cobalt-600/10 border border-cobalt-600/20 text-cobalt-300 hover:bg-cobalt-600/20'
      }`}
    >
      {loading ? (
        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
      ) : isAdmin ? (
        <>
          <ShieldOff size={12} />
          Quitar admin
        </>
      ) : (
        <>
          <Shield size={12} />
          Hacer admin
        </>
      )}
    </button>
  )
}
