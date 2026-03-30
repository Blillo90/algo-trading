'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Trophy, Clock, TrendingUp } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import StatsWidget from '@/components/dashboard/StatsWidget'
import DashboardCourseCard from '@/components/dashboard/DashboardCourseCard'
import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/hooks/useProgress'
import { COURSES } from '@/data/courses'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#030810] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#94A3B8] text-sm">Cargando...</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { getTotalStats } = useProgress()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <LoadingScreen />
  }

  const enrolledCourses = COURSES.filter((c) => user.enrolledCourseIds.includes(c.id))
  const { totalCompleted, totalLessons, estimatedHours, overallPercentage } = getTotalStats(
    user.id,
    enrolledCourses
  )

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const todayFormatted = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <main className="min-h-screen bg-[#030810]">
      <Navbar />

      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[#94A3B8] text-sm mb-1">{todayFormatted}</p>
          <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">
            Bienvenido,{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              {user.name.split(' ')[0]}
            </span>
          </h1>
          <p className="text-[#94A3B8] mt-2">
            {overallPercentage > 0
              ? `Llevas un ${overallPercentage}% de progreso global. ¡Sigue así!`
              : 'Comienza tu formación accediendo a uno de tus cursos.'}
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: 'Progreso total',
              value: `${overallPercentage}%`,
              subtitle: 'del programa completado',
              icon: TrendingUp,
            },
            {
              title: 'Lecciones completadas',
              value: totalCompleted,
              subtitle: `de ${totalLessons} totales`,
              icon: Trophy,
            },
            {
              title: 'Horas completadas',
              value: `${estimatedHours}h`,
              subtitle: 'tiempo de formación',
              icon: Clock,
            },
            {
              title: 'Cursos activos',
              value: enrolledCourses.length,
              subtitle: 'en progreso',
              icon: BookOpen,
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

        {/* Courses section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-syne font-bold text-xl text-white">Mis cursos</h2>
            <span className="text-[#94A3B8] text-sm">{enrolledCourses.length} inscritos</span>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course) => (
                <DashboardCourseCard key={course.id} course={course} userId={user.id} />
              ))}
            </div>
          ) : (
            <div className="bg-[#0A1628] border border-[#2563EB]/15 rounded-2xl p-12 text-center">
              <BookOpen size={36} className="text-[#2563EB]/40 mx-auto mb-4" />
              <h3 className="text-[#E2E8F0] font-semibold mb-2">No tienes cursos aún</h3>
              <p className="text-[#94A3B8] text-sm mb-5">
                Explora nuestro catálogo y encuentra el programa que mejor se adapta a tus
                objetivos.
              </p>
              <a
                href="/cursos"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-medium rounded-xl text-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
              >
                Ver cursos disponibles
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
