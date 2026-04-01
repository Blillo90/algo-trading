'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle, Clock, CheckCheck } from 'lucide-react'
import type { Course } from '@/types'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
  course: Course
  activeLessonId: string
  onSelectLesson: (lessonId: string) => void
  /** Set de IDs de lecciones completadas — lo gestiona el padre para
   *  garantizar sincronización inmediata con el estado optimista. */
  completedLessonIds: Set<string>
}

export default function CourseSidebar({
  course,
  activeLessonId,
  onSelectLesson,
  completedLessonIds,
}: CourseSidebarProps) {
  const allCourseLessons = course.modules.flatMap((m) => m.lessons)
  const completedCount = allCourseLessons.filter((l) => completedLessonIds.has(l.id)).length
  const percentage =
    allCourseLessons.length > 0 ? Math.round((completedCount / allCourseLessons.length) * 100) : 0

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

  const totalLessons = allCourseLessons.length

  return (
    <aside className="flex flex-col h-full bg-layer border-r border-cobalt-600/15 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-cobalt-600/10 flex-shrink-0">
        <h2 className="font-syne font-semibold text-ink-1 text-base mb-3">
          Contenido del Curso
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-ink-3 text-sm">
            {course.modules.length} módulos · {totalLessons} lecciones
          </span>
          <span className="text-accent-hi text-sm font-bold font-mono">{percentage}%</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-well rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-cobalt-600 to-cobalt-400 rounded-full"
          />
        </div>
      </div>

      {/* Modules list */}
      <div className="flex-1 overflow-y-auto">
        {course.modules.map((module) => {
          const isExpanded = expandedModules.has(module.id)
          const moduleCompletedCount = module.lessons.filter((l) =>
            completedLessonIds.has(l.id)
          ).length
          // Derivado exclusivamente del conteo de lecciones completadas
          const moduleCompleted =
            module.lessons.length > 0 && moduleCompletedCount === module.lessons.length
          const isActiveModule = activeModuleId === module.id

          return (
            <div key={module.id}>
              {/* Module header — 4 estados: completado+activo | completado | activo | normal */}
              <button
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-4 text-left transition-colors duration-150 group',
                  moduleCompleted && isActiveModule
                    ? 'bg-emerald-950/35 hover:bg-emerald-950/50'
                    : moduleCompleted
                      ? 'bg-emerald-950/25 hover:bg-emerald-950/40'
                      : isActiveModule
                        ? 'bg-surface/40 hover:bg-surface/60'
                        : 'hover:bg-surface/50'
                )}
                onClick={() => toggleModule(module.id)}
              >
                {/* Badge: número o checkmark si el módulo está completado */}
                <span
                  className={cn(
                    'w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 transition-colors duration-200',
                    moduleCompleted
                      ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400'
                      : 'bg-gradient-to-br from-cobalt-600/25 to-cobalt-700/15 border border-cobalt-600/25 text-accent-hi'
                  )}
                >
                  {moduleCompleted ? <CheckCheck size={13} /> : module.order}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-ink-2 text-sm font-medium leading-tight truncate">
                    {module.title}
                  </p>
                  <p
                    className={cn(
                      'text-xs mt-0.5 transition-colors duration-200',
                      moduleCompleted ? 'text-emerald-500/70' : 'text-ink-5'
                    )}
                  >
                    {moduleCompletedCount}/{module.lessons.length} completadas
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-250 flex-shrink-0',
                    moduleCompleted ? 'text-emerald-500/60' : 'text-ink-5',
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
                      const completed = completedLessonIds.has(lesson.id)

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={cn(
                            'w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all duration-150',
                            // 4 estados: activa+completada | activa | completada | normal
                            isActive && completed
                              ? 'border-l-2 border-emerald-500/70 bg-emerald-950/50'
                              : isActive
                                ? 'border-l-2 border-cobalt-600 bg-cobalt-700/10'
                                : completed
                                  ? 'border-l-2 border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-950/50'
                                  : 'border-l-2 border-transparent hover:bg-surface/40 hover:border-cobalt-600/30'
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
                                    ? 'border-cobalt-600 bg-cobalt-600/20'
                                    : 'border-ink-5'
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
                                  ? 'text-ink-1 font-medium'
                                  : completed
                                    ? 'text-ink-2'
                                    : 'text-ink-3'
                              )}
                            >
                              <span
                                className={cn(
                                  'font-mono text-xs mr-1.5',
                                  completed ? 'text-emerald-600/70' : 'text-ink-5'
                                )}
                              >
                                {module.order}.{lesson.order}
                              </span>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Clock
                                size={11}
                                className={completed ? 'text-emerald-600/60' : 'text-ink-5'}
                              />
                              <span
                                className={cn(
                                  'text-xs font-mono',
                                  completed ? 'text-emerald-600/60' : 'text-ink-5'
                                )}
                              >
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
              <div className={cn(
                'h-px mx-4 transition-colors duration-200',
                moduleCompleted ? 'bg-emerald-500/10' : 'bg-cobalt-600/10'
              )} />
            </div>
          )
        })}
      </div>
    </aside>
  )
}
