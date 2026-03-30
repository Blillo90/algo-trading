'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle, Clock } from 'lucide-react'
import type { Course } from '@/types'
import { useProgress } from '@/hooks/useProgress'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
  course: Course
  userId: string
  activeLessonId: string
  onSelectLesson: (lessonId: string) => void
}

export default function CourseSidebar({
  course,
  userId,
  activeLessonId,
  onSelectLesson,
}: CourseSidebarProps) {
  const { isLessonCompleted, getCompletionPercentage } = useProgress()
  const percentage = getCompletionPercentage(userId, course.id, course)

  // Find which module contains the active lesson
  const activeModuleId =
    course.modules.find((m) => m.lessons.some((l) => l.id === activeLessonId))?.id ?? null

  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(activeModuleId ? [activeModuleId] : [course.modules[0]?.id ?? ''])
  )

  useEffect(() => {
    if (activeModuleId) {
      setExpandedModules((prev) => new Set([...prev, activeModuleId]))
    }
  }, [activeModuleId])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <aside className="flex flex-col h-full bg-[#050D1C] border-r border-[#2563EB]/15 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#2563EB]/10 flex-shrink-0">
        <h2 className="font-syne font-semibold text-[#E2E8F0] text-base mb-3">
          Contenido del Curso
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#94A3B8] text-sm">
            {course.modules.length} módulos · {totalLessons} lecciones
          </span>
          <span className="text-[#60A5FA] text-sm font-bold font-mono">{percentage}%</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-[#0E1F3A] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full"
          />
        </div>
      </div>

      {/* Modules list */}
      <div className="flex-1 overflow-y-auto">
        {course.modules.map((module) => {
          const isExpanded = expandedModules.has(module.id)
          const moduleCompletedCount = module.lessons.filter((l) =>
            isLessonCompleted(userId, course.id, l.id)
          ).length

          return (
            <div key={module.id}>
              {/* Module header */}
              <button
                className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-[#0A1628]/50 transition-colors duration-150 group"
                onClick={() => toggleModule(module.id)}
              >
                <span className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2563EB]/25 to-[#1B4FD8]/15 border border-[#2563EB]/25 flex items-center justify-center text-[#60A5FA] text-xs font-bold font-mono flex-shrink-0">
                  {module.order}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#CBD5E1] text-sm font-medium leading-tight truncate">
                    {module.title}
                  </p>
                  <p className="text-[#4A5568] text-xs mt-0.5">
                    {moduleCompletedCount}/{module.lessons.length} completadas
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    'text-[#4A5568] transition-transform duration-250 flex-shrink-0',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>

              {/* Lessons */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    {module.lessons.map((lesson) => {
                      const isActive = lesson.id === activeLessonId
                      const completed = isLessonCompleted(userId, course.id, lesson.id)

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={cn(
                            'w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all duration-150',
                            isActive
                              ? 'border-l-2 border-[#2563EB] bg-[#1B4FD8]/10'
                              : 'border-l-2 border-transparent hover:bg-[#0A1628]/40 hover:border-[#2563EB]/30'
                          )}
                        >
                          {/* Completion icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {completed ? (
                              <CheckCircle size={15} className="text-emerald-400" />
                            ) : (
                              <div
                                className={cn(
                                  'w-4 h-4 rounded-full border',
                                  isActive
                                    ? 'border-[#2563EB] bg-[#2563EB]/20'
                                    : 'border-[#4A5568]'
                                )}
                              />
                            )}
                          </div>

                          {/* Lesson info */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                'text-sm leading-snug',
                                isActive
                                  ? 'text-white font-medium'
                                  : completed
                                    ? 'text-[#94A3B8]'
                                    : 'text-[#94A3B8]'
                              )}
                            >
                              <span className="text-[#4A5568] font-mono text-xs mr-1.5">
                                {module.order}.{lesson.order}
                              </span>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Clock size={11} className="text-[#4A5568]" />
                              <span className="text-[#4A5568] text-xs font-mono">
                                {lesson.duration}m
                              </span>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Separador inset: no llega al borde donde aparece la scrollbar */}
              <div className="h-px mx-4 bg-[#2563EB]/10" />
            </div>
          )
        })}
      </div>
    </aside>
  )
}
