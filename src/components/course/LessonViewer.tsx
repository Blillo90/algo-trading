'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, Circle, ChevronRight as BreadcrumbChevron } from 'lucide-react'
import type { Lesson, Course } from '@/types'
import VideoPlayer from './VideoPlayer'
import ResourceList from './ResourceList'

interface LessonViewerProps {
  lesson: Lesson
  course: Course
  userId: string
  isCompleted: boolean
  onComplete: () => void
  onMarkIncomplete: () => void
  onPrev: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
}

export default function LessonViewer({
  lesson,
  course,
  isCompleted,
  onComplete,
  onMarkIncomplete,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: LessonViewerProps) {
  // Find the module for the breadcrumb
  const currentModule = course.modules.find((m) => m.id === lesson.moduleId)

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto px-5 md:px-8 py-8"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-ink-3 mb-7 flex-wrap">
            <span className="text-ink-5">{course.title}</span>
            <BreadcrumbChevron size={11} className="text-ink-5" />
            <span className="text-ink-5">{currentModule?.title}</span>
            <BreadcrumbChevron size={11} className="text-ink-5" />
            <span className="text-ink-3">{lesson.title}</span>
          </div>

          {/* Lesson title */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <h1 className="font-syne font-bold text-3xl md:text-4xl text-ink-1 leading-tight">
              {lesson.title}
            </h1>
            {isCompleted && (
              <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-semibold">
                <CheckCircle size={14} />
                Completada
              </div>
            )}
          </div>

          {/* Video player */}
          <div className="mb-8">
            <VideoPlayer lesson={lesson} />
          </div>

          {/* Description */}
          <div className="mb-9">
            <p className="text-ink-2 text-base leading-relaxed">{lesson.description}</p>
          </div>

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-9 border-b border-cobalt-600/10">
            {/* Prev */}
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-cobalt-600/20 text-ink-3 hover:text-ink-1 hover:border-cobalt-600/40 rounded-xl transition-all duration-200 text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>

            {/* Mark complete */}
            <button
              onClick={isCompleted ? onMarkIncomplete : onComplete}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/8 hover:border-emerald-500/20'
                  : 'bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle size={18} />
                  Completada · Marcar como no completada
                </>
              ) : (
                <>
                  <Circle size={18} />
                  Marcar como completada
                </>
              )}
            </button>

            {/* Next */}
            <button
              onClick={onNext}
              disabled={isLast}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-cobalt-600/20 text-ink-3 hover:text-ink-1 hover:border-cobalt-600/40 rounded-xl transition-all duration-200 text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Resources */}
          <ResourceList resources={lesson.resources} />

          {/* Bottom spacing */}
          <div className="h-8" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
