'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronDown,
  Clock,
  Plus,
  RefreshCw,
  Shield,
  ShieldOff,
  Users,
  Wifi,
  X,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import StatsWidget from '@/components/dashboard/StatsWidget'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { COURSES } from '@/data/courses'
import type { Course } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

// ─── Loading screen ───────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [ready, setReady] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [togglingRoleId, setTogglingRoleId] = useState<string | null>(null)
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null)
  // Track in-progress enrollment mutations: Set of "userId:courseId"
  const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set())

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoading) return
    if (!user) { router.replace('/login'); return }
    if (user.role !== 'admin') { router.replace('/dashboard'); return }
    setReady(true)
  }, [user, isLoading, router])

  // ── Data fetch ──────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setDataLoading(true)

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

    // Fetch emails from server route (needs service role)
    let emailMap: Record<string, string> = {}
    const accessToken = sessionResult.data.session?.access_token
    if (accessToken) {
      try {
        const res = await fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (res.ok) {
          const { users: authUsers } = await res.json()
          emailMap = Object.fromEntries(
            authUsers.map((u: { id: string; email: string }) => [u.id, u.email])
          )
        }
      } catch {
        // continue without emails
      }
    }

    const timeMap: Record<string, number> = {}
    for (const ts of timeSessions ?? []) {
      timeMap[ts.user_id] = (timeMap[ts.user_id] ?? 0) + (ts.duration_seconds ?? 0)
    }

    const enrollMap: Record<string, string[]> = {}
    for (const e of enrollments ?? []) {
      if (!enrollMap[e.user_id]) enrollMap[e.user_id] = []
      enrollMap[e.user_id].push(e.course_id)
    }

    setUsers(
      (profiles ?? []).map((p) => ({
        id: p.id,
        full_name: p.full_name ?? 'Sin nombre',
        email: emailMap[p.id] ?? '—',
        role: p.role as 'user' | 'admin',
        last_seen_at: p.last_seen_at,
        created_at: p.created_at,
        enrolledCourseIds: enrollMap[p.id] ?? [],
        totalMinutes: Math.round((timeMap[p.id] ?? 0) / 60),
      }))
    )
    setDataLoading(false)
  }, [])

  useEffect(() => {
    if (ready) fetchData()
  }, [ready, fetchData])

  // ── Role toggle ─────────────────────────────────────────────────────────────
  const toggleRole = async (target: AdminUser) => {
    if (target.id === user?.id) return
    setTogglingRoleId(target.id)
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
    setTogglingRoleId(null)
  }

  // ── Enrollment toggle ───────────────────────────────────────────────────────
  const toggleEnrollment = async (target: AdminUser, courseId: string) => {
    const key = `${target.id}:${courseId}`
    if (pendingKeys.has(key)) return

    const isEnrolled = target.enrolledCourseIds.includes(courseId)
    const method = isEnrolled ? 'DELETE' : 'POST'

    // Optimistic update
    setPendingKeys((prev) => new Set(prev).add(key))
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== target.id) return u
        return {
          ...u,
          enrolledCourseIds: isEnrolled
            ? u.enrolledCourseIds.filter((id) => id !== courseId)
            : [...u.enrolledCourseIds, courseId],
        }
      })
    )

    const { data: session } = await supabase.auth.getSession()
    const token = session.session?.access_token

    if (!token) {
      // Revert
      setUsers((prev) => prev.map((u) => (u.id === target.id ? target : u)))
      setPendingKeys((prev) => { const s = new Set(prev); s.delete(key); return s })
      return
    }

    const res = await fetch('/api/admin/enrollments', {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: target.id, courseId }),
    })

    if (!res.ok) {
      // Revert on server error
      setUsers((prev) => prev.map((u) => (u.id === target.id ? target : u)))
    }

    setPendingKeys((prev) => { const s = new Set(prev); s.delete(key); return s })
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  if (isLoading || !ready || dataLoading) return <LoadingScreen />

  const onlineCount = users.filter((u) => isOnline(u.last_seen_at)).length
  const totalEnrollments = users.reduce((acc, u) => acc + u.enrolledCourseIds.length, 0)
  const totalHours = Math.round(users.reduce((acc, u) => acc + u.totalMinutes, 0) / 60)

  return (
    <main className="min-h-screen bg-scene">
      <Navbar />

      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.05) 1px,transparent 1px)',
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
              Gestiona usuarios, roles, acceso a cursos y monitoriza la plataforma.
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
            { title: 'Total usuarios', value: users.length, subtitle: 'registrados', icon: Users },
            { title: 'Online ahora', value: onlineCount, subtitle: 'últimos 5 min', icon: Wifi },
            { title: 'Matrículas', value: totalEnrollments, subtitle: 'en cursos activos', icon: BookOpen },
            { title: 'Horas de formación', value: `${totalHours}h`, subtitle: 'tiempo total acumulado', icon: Clock },
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

        {/* Users */}
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

            {/* Desktop table header */}
            <div className="hidden lg:grid grid-cols-[minmax(0,2fr)_100px_100px_minmax(0,1.5fr)_80px_auto] gap-4 px-6 py-3 border-b border-cobalt-600/10 bg-cobalt-950/30">
              {['Usuario', 'Rol', 'Estado', 'Cursos activos', 'Tiempo', 'Acciones'].map((h) => (
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
                const isExpanded = expandedUserId === u.id
                const courseNames = u.enrolledCourseIds.map(
                  (id) => COURSES.find((c) => c.id === id)?.title ?? id
                )

                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    className="border-b border-cobalt-600/8 last:border-0"
                  >
                    {/* ── Mobile layout ── */}
                    <div className="lg:hidden flex items-start gap-4 px-5 py-4">
                      <Avatar name={u.full_name} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-ink-1 font-semibold text-sm">{u.full_name}</span>
                          {u.role === 'admin' && <AdminBadge />}
                          <OnlineDot online={online} />
                        </div>
                        <p className="text-ink-3 text-xs mt-0.5 truncate">{u.email}</p>
                        <p className="text-ink-4 text-xs mt-0.5">Desde {formatDate(u.created_at)}</p>

                        {courseNames.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {courseNames.map((name) => (
                              <span key={name} className="px-2 py-0.5 bg-cobalt-950/50 border border-cobalt-600/15 rounded text-ink-3 text-xs">
                                {name.length > 30 ? name.slice(0, 30) + '…' : name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className="text-ink-3 text-xs font-mono mr-auto">
                            {formatMinutes(u.totalMinutes)}
                          </span>
                          {!isSelf && (
                            <RoleButton
                              user={u}
                              loading={togglingRoleId === u.id}
                              onToggle={() => toggleRole(u)}
                            />
                          )}
                          <ExpandButton
                            expanded={isExpanded}
                            onToggle={() => setExpandedUserId(isExpanded ? null : u.id)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Desktop layout ── */}
                    <div className="hidden lg:grid grid-cols-[minmax(0,2fr)_100px_100px_minmax(0,1.5fr)_80px_auto] gap-4 items-center px-6 py-4 hover:bg-cobalt-950/20 transition-colors duration-200">

                      {/* Usuario */}
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={u.full_name} small />
                        <div className="min-w-0">
                          <p className="text-ink-1 font-medium text-sm truncate">{u.full_name}</p>
                          <p className="text-ink-3 text-xs truncate">{u.email}</p>
                          <p className="text-ink-4 text-xs">{formatDate(u.created_at)}</p>
                        </div>
                      </div>

                      {/* Rol */}
                      <div>
                        {u.role === 'admin' ? <AdminBadge /> : <span className="text-ink-4 text-xs font-mono">user</span>}
                      </div>

                      {/* Estado */}
                      <div className="flex items-center gap-2">
                        <OnlineDot online={online} />
                        <span className={`text-xs ${online ? 'text-emerald-400' : 'text-ink-4'}`}>
                          {online ? 'Online' : 'Offline'}
                        </span>
                      </div>

                      {/* Cursos activos */}
                      <div className="flex flex-wrap gap-1">
                        {courseNames.length > 0 ? (
                          courseNames.map((name) => (
                            <span key={name} className="px-2 py-0.5 bg-cobalt-950/50 border border-cobalt-600/15 rounded text-ink-3 text-xs">
                              {name.length > 26 ? name.slice(0, 26) + '…' : name}
                            </span>
                          ))
                        ) : (
                          <span className="text-ink-4 text-xs">Sin cursos</span>
                        )}
                      </div>

                      {/* Tiempo */}
                      <div>
                        <span className="text-ink-2 text-sm font-mono">{formatMinutes(u.totalMinutes)}</span>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center gap-2">
                        {!isSelf && (
                          <RoleButton
                            user={u}
                            loading={togglingRoleId === u.id}
                            onToggle={() => toggleRole(u)}
                          />
                        )}
                        {isSelf && <span className="text-ink-4 text-xs">Tú</span>}
                        <ExpandButton
                          expanded={isExpanded}
                          onToggle={() => setExpandedUserId(isExpanded ? null : u.id)}
                        />
                      </div>
                    </div>

                    {/* ── Expanded course management panel ── */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 lg:px-6 pb-5 border-t border-cobalt-600/10 bg-cobalt-950/20">
                            <div className="flex items-center gap-2 pt-4 mb-4">
                              <BookOpen size={13} className="text-cobalt-400" />
                              <span className="text-cobalt-400 text-xs font-medium uppercase tracking-wider">
                                Gestión de acceso a cursos — {u.full_name}
                              </span>
                            </div>

                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                              {COURSES.map((course) => (
                                <CourseAccessCard
                                  key={course.id}
                                  course={course}
                                  enrolled={u.enrolledCourseIds.includes(course.id)}
                                  pending={pendingKeys.has(`${u.id}:${course.id}`)}
                                  onToggle={() => toggleEnrollment(u, course.id)}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ name, small }: { name: string; small?: boolean }) {
  const size = small ? 'w-9 h-9' : 'w-10 h-10'
  const text = small ? 'text-xs' : 'text-sm'
  return (
    <div className={`${size} rounded-xl bg-gradient-to-br from-cobalt-600/30 to-cobalt-800/20 border border-cobalt-600/20 flex items-center justify-center flex-shrink-0`}>
      <span className={`text-cobalt-300 ${text} font-bold font-mono`}>{initials(name)}</span>
    </div>
  )
}

function AdminBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-cobalt-600/15 border border-cobalt-600/25 rounded text-cobalt-300 text-xs font-mono">
      <Shield size={9} /> admin
    </span>
  )
}

function OnlineDot({ online }: { online: boolean }) {
  return (
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${online ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'bg-ink-4'}`} />
  )
}

function RoleButton({ user, loading, onToggle }: { user: AdminUser; loading: boolean; onToggle: () => void }) {
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
        <><ShieldOff size={12} /> Quitar admin</>
      ) : (
        <><Shield size={12} /> Hacer admin</>
      )}
    </button>
  )
}

function ExpandButton({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={expanded ? 'Cerrar gestión de cursos' : 'Gestionar cursos'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cobalt-600/10 border border-cobalt-600/20 text-cobalt-300 hover:bg-cobalt-600/20 transition-all duration-200"
    >
      <BookOpen size={12} />
      Cursos
      <ChevronDown size={12} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
    </button>
  )
}

function CourseAccessCard({
  course,
  enrolled,
  pending,
  onToggle,
}: {
  course: Course
  enrolled: boolean
  pending: boolean
  onToggle: () => void
}) {
  return (
    <div className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 ${
      enrolled
        ? 'bg-emerald-500/5 border-emerald-500/20'
        : 'bg-cobalt-950/30 border-cobalt-600/10'
    }`}>
      <div className="min-w-0 flex-1">
        <p className="text-ink-1 text-sm font-medium leading-snug">
          {course.title.length > 40 ? course.title.slice(0, 40) + '…' : course.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-mono ${enrolled ? 'text-emerald-400' : 'text-ink-4'}`}>
            {enrolled ? '✓ Activo' : '— Sin acceso'}
          </span>
          <span className="text-ink-5 text-xs">·</span>
          <span className="text-ink-4 text-xs">{LEVEL_LABEL[course.level] ?? course.level}</span>
          <span className="text-ink-5 text-xs">·</span>
          <span className="text-ink-4 text-xs">{course.duration}h</span>
        </div>
      </div>

      <button
        onClick={onToggle}
        disabled={pending}
        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 ${
          enrolled
            ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
        }`}
      >
        {pending ? (
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        ) : enrolled ? (
          <><X size={12} /> Revocar</>
        ) : (
          <><Plus size={12} /> Conceder</>
        )}
      </button>
    </div>
  )
}
