'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import type { Course } from '@/types'
import { useProgress } from '@/hooks/useProgress'

interface DashboardCourseCardProps {
  course: Course
  userId: string
}

export default function DashboardCourseCard({ course, userId }: DashboardCourseCardProps) {
  const { getCompletionPercentage, getCourseProgress } = useProgress()
  const percentage = getCompletionPercentage(userId, course.id, course)
  const progress = getCourseProgress(userId, course.id)
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = progress?.lessons.filter((l) => l.completed).length ?? 0

  // Find last accessed lesson
  const lastLessonId = progress?.lastAccessedLessonId
  let lastLessonTitle = 'Empezar desde el principio'
  if (lastLessonId) {
    for (const mod of course.modules) {
      const found = mod.lessons.find((l) => l.id === lastLessonId)
      if (found) {
        lastLessonTitle = found.title
        break
      }
    }
  }

  const continueUrl = lastLessonId
    ? `/curso/${course.id}?lesson=${lastLessonId}`
    : `/curso/${course.id}`

  return (
    <div className="bg-surface border border-cobalt-600/15 rounded-2xl p-6 hover:border-cobalt-600/35 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h3 className="font-syne font-semibold text-ink-1 text-base leading-tight mb-1 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="text-ink-3 text-xs line-clamp-2">{course.description}</p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-well to-surface2 border border-cobalt-600/20 flex items-center justify-center">
            <BookOpen size={18} className="text-accent-hi" />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-ink-3 text-xs">Progreso</span>
          <span className="text-accent-hi text-xs font-bold font-mono">{percentage}%</span>
        </div>
        <div className="h-1.5 bg-well rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="h-full bg-gradient-to-r from-cobalt-600 to-cobalt-400 rounded-full"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-cobalt-600/10">
        <div className="flex items-center gap-1.5 text-xs text-ink-3">
          <BookOpen size={11} className="text-accent-hi" />
          {completedCount} / {totalLessons} lecciones
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-3">
          <Clock size={11} className="text-accent-hi" />
          {course.duration}h total
        </div>
      </div>

      {/* Last accessed */}
      {lastLessonId && (
        <div className="mb-4">
          <p className="text-ink-5 text-xs mb-1">Última lección:</p>
          <p className="text-ink-3 text-xs truncate">{lastLessonTitle}</p>
        </div>
      )}

      {/* CTA */}
      <Link
        href={continueUrl}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-sm"
      >
        {percentage === 0 ? 'Empezar curso' : percentage === 100 ? 'Repasar curso' : 'Continuar'}
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}
