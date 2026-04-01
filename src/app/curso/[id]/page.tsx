'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/hooks/useProgress'
import { COURSES } from '@/data/courses'
import CourseSidebar from '@/components/course/CourseSidebar'
import LessonViewer from '@/components/course/LessonViewer'
import type { Lesson } from '@/types'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-scene flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cobalt-600/30 border-t-cobalt-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink-3 text-sm">Cargando curso...</p>
      </div>
    </div>
  )
}

function CourseViewerInner() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading: authLoading } = useAuth()
  const { markLessonComplete, markLessonIncomplete, isLessonCompleted, getCourseProgress, setLastAccessedLesson } =
    useProgress()

  const courseId = params.id as string
  const course = COURSES.find((c) => c.id === courseId)

  // All lessons in order
  const allLessons: Lesson[] = course ? course.modules.flatMap((m) => m.lessons) : []

  // Determine active lesson
  const lessonParam = searchParams.get('lesson')
  const progress = user && course ? getCourseProgress(user.id, course.id) : undefined
  const defaultLessonId =
    progress?.lastAccessedLessonId ?? allLessons[0]?.id ?? null

  const activeLessonId = lessonParam ?? defaultLessonId ?? ''
  const activeLesson = allLessons.find((l) => l.id === activeLessonId) ?? allLessons[0]

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Enrollment guard
  useEffect(() => {
    if (!authLoading && user && course) {
      if (!user.enrolledCourseIds.includes(course.id)) {
        router.push('/cursos')
      }
    }
  }, [user, authLoading, course, router])

  // Track last accessed
  useEffect(() => {
    if (user && course && activeLessonId) {
      setLastAccessedLesson(user.id, course.id, activeLessonId)
    }
  }, [activeLessonId, user, course, setLastAccessedLesson])

  if (authLoading || !user) return <LoadingScreen />
  if (!course) {
    return (
      <div className="min-h-screen bg-scene flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-1 text-xl font-syne mb-3">Curso no encontrado</p>
          <Link href="/cursos" className="text-accent-hi text-sm hover:underline">
            Ver todos los cursos
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === allLessons.length - 1

  const goToLesson = (lessonId: string) => {
    router.push(`/curso/${courseId}?lesson=${lessonId}`)
    setSidebarOpen(false)
  }

  const handlePrev = () => {
    if (!isFirst) goToLesson(allLessons[currentIndex - 1].id)
  }

  const handleNext = () => {
    if (!isLast) goToLesson(allLessons[currentIndex + 1].id)
  }

  const handleComplete = () => {
    if (activeLesson) markLessonComplete(user.id, courseId, activeLesson.id)
  }

  const handleMarkIncomplete = () => {
    if (activeLesson) markLessonIncomplete(user.id, courseId, activeLesson.id)
  }

  const completedNow = activeLesson ? isLessonCompleted(user.id, courseId, activeLesson.id) : false

  // Single source of truth for completed lessons — shared with sidebar via prop
  const completedLessonIds = new Set<string>(
    allLessons.filter((l) => isLessonCompleted(user.id, courseId, l.id)).map((l) => l.id)
  )

  // Progress for header
  const totalLessons = allLessons.length
  const progressPct =
    totalLessons > 0 ? Math.round((completedLessonIds.size / totalLessons) * 100) : 0

  return (
    <div className="h-screen flex flex-col bg-scene overflow-hidden">
      {/* Course header bar */}
      <header className="h-14 flex-shrink-0 bg-layer border-b border-cobalt-600/15 flex items-center px-4 gap-3">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden p-1.5 text-ink-3 hover:text-ink-1 transition-colors"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Back link */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-ink-3 hover:text-ink-1 text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        <div className="w-px h-5 bg-cobalt-600/20 mx-1" />

        {/* Course title */}
        <p className="text-ink-1 text-sm font-medium truncate flex-1">{course.title}</p>

        {/* Progress indicator */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <div className="w-32 h-1.5 bg-well rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-cobalt-600 to-cobalt-400 rounded-full"
            />
          </div>
          <span className="text-accent-hi text-xs font-mono font-bold">{progressPct}%</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed top-14 bottom-0 left-0 z-30 w-72
            lg:relative lg:top-0 lg:bottom-auto lg:h-full lg:w-72 xl:w-80 flex-shrink-0
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <CourseSidebar
            course={course}
            activeLessonId={activeLesson?.id ?? ''}
            onSelectLesson={goToLesson}
            completedLessonIds={completedLessonIds}
          />
        </div>

        {/* Lesson viewer */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeLesson ? (
            <LessonViewer
              lesson={activeLesson}
              course={course}
              userId={user.id}
              isCompleted={completedNow}
              onComplete={handleComplete}
              onMarkIncomplete={handleMarkIncomplete}
              onPrev={handlePrev}
              onNext={handleNext}
              isFirst={isFirst}
              isLast={isLast}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-ink-3">Selecciona una lección para comenzar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CourseViewerPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CourseViewerInner />
    </Suspense>
  )
}
