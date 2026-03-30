'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CourseProgress, LessonProgress, Course } from '@/types'
import { INITIAL_PROGRESS, STORAGE_KEY } from '@/data/progress'

function loadProgress(): CourseProgress[] {
  if (typeof window === 'undefined') return INITIAL_PROGRESS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as CourseProgress[]
    }
  } catch {
    // corrupted data
  }
  return INITIAL_PROGRESS
}

function saveProgress(data: CourseProgress[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [allProgress, setAllProgress] = useState<CourseProgress[]>(INITIAL_PROGRESS)

  useEffect(() => {
    setAllProgress(loadProgress())
  }, [])

  const persist = useCallback((updated: CourseProgress[]) => {
    setAllProgress(updated)
    saveProgress(updated)
  }, [])

  const getCourseProgress = useCallback(
    (userId: string, courseId: string): CourseProgress | undefined => {
      return allProgress.find((p) => p.userId === userId && p.courseId === courseId)
    },
    [allProgress]
  )

  const markLessonComplete = useCallback(
    (userId: string, courseId: string, lessonId: string) => {
      const updated = allProgress.map((p) => {
        if (p.userId !== userId || p.courseId !== courseId) return p
        const now = new Date().toISOString()
        const exists = p.lessons.find((l) => l.lessonId === lessonId)
        const lessons: LessonProgress[] = exists
          ? p.lessons.map((l) =>
              l.lessonId === lessonId ? { ...l, completed: true, completedAt: now } : l
            )
          : [...p.lessons, { lessonId, completed: true, completedAt: now }]
        return { ...p, lessons, lastAccessedLessonId: lessonId }
      })
      persist(updated)
    },
    [allProgress, persist]
  )

  const markLessonIncomplete = useCallback(
    (userId: string, courseId: string, lessonId: string) => {
      const updated = allProgress.map((p) => {
        if (p.userId !== userId || p.courseId !== courseId) return p
        const lessons = p.lessons.map((l) =>
          l.lessonId === lessonId ? { lessonId, completed: false, completedAt: undefined } : l
        )
        return { ...p, lessons }
      })
      persist(updated)
    },
    [allProgress, persist]
  )

  const isLessonCompleted = useCallback(
    (userId: string, courseId: string, lessonId: string): boolean => {
      const progress = allProgress.find((p) => p.userId === userId && p.courseId === courseId)
      if (!progress) return false
      return progress.lessons.find((l) => l.lessonId === lessonId)?.completed ?? false
    },
    [allProgress]
  )

  const getCompletionPercentage = useCallback(
    (userId: string, courseId: string, course: Course): number => {
      const progress = allProgress.find((p) => p.userId === userId && p.courseId === courseId)
      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      if (totalLessons === 0) return 0
      if (!progress) return 0
      const completed = progress.lessons.filter((l) => l.completed).length
      return Math.round((completed / totalLessons) * 100)
    },
    [allProgress]
  )

  const setLastAccessedLesson = useCallback(
    (userId: string, courseId: string, lessonId: string) => {
      const exists = allProgress.find((p) => p.userId === userId && p.courseId === courseId)

      // Guard: si ya está registrada esta lección como última visitada, no escribir estado.
      // Sin este guard se produce un bucle infinito:
      //   persist() → setAllProgress() → allProgress cambia → nueva referencia de
      //   setLastAccessedLesson → useEffect en CourseViewerInner se dispara → vuelta al inicio.
      if (exists?.lastAccessedLessonId === lessonId) return

      let updated: CourseProgress[]
      if (exists) {
        updated = allProgress.map((p) =>
          p.userId === userId && p.courseId === courseId
            ? { ...p, lastAccessedLessonId: lessonId }
            : p
        )
      } else {
        updated = [
          ...allProgress,
          {
            courseId,
            userId,
            lessons: [{ lessonId, completed: false }],
            lastAccessedLessonId: lessonId,
            startedAt: new Date().toISOString(),
          },
        ]
      }
      persist(updated)
    },
    [allProgress, persist]
  )

  const getTotalStats = useCallback(
    (
      userId: string,
      courses: Course[]
    ): {
      totalCompleted: number
      totalLessons: number
      estimatedHours: number
      overallPercentage: number
    } => {
      let totalCompleted = 0
      let totalLessons = 0
      let completedMinutes = 0

      for (const course of courses) {
        const progress = allProgress.find((p) => p.userId === userId && p.courseId === course.id)
        const courseLessons = course.modules.flatMap((m) => m.lessons)
        totalLessons += courseLessons.length
        if (progress) {
          const completedIds = new Set(
            progress.lessons.filter((l) => l.completed).map((l) => l.lessonId)
          )
          totalCompleted += completedIds.size
          completedMinutes += courseLessons
            .filter((l) => completedIds.has(l.id))
            .reduce((acc, l) => acc + l.duration, 0)
        }
      }

      const estimatedHours = Math.round((completedMinutes / 60) * 10) / 10
      const overallPercentage =
        totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

      return { totalCompleted, totalLessons, estimatedHours, overallPercentage }
    },
    [allProgress]
  )

  return {
    getCourseProgress,
    markLessonComplete,
    markLessonIncomplete,
    isLessonCompleted,
    getCompletionPercentage,
    setLastAccessedLesson,
    getTotalStats,
  }
}
