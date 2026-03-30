'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { CourseProgress, LessonProgress, Course } from '@/types'
import { supabase } from '@/lib/supabase/client'

export function useProgress() {
  const [allProgress, setAllProgress] = useState<CourseProgress[]>([])

  // Tracks the last-accessed lesson per course to prevent redundant writes.
  // Using a ref avoids triggering re-renders and breaks the infinite loop:
  //   setLastAccessedLesson → setState → new callback ref → useEffect fires again
  const lastAccessedRef = useRef<Record<string, string>>({})

  // Store the current userId so mutation helpers can use it without extra getSession calls
  const userIdRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user || cancelled) return

      const userId = session.user.id
      userIdRef.current = userId

      const [{ data: lessonRows }, { data: courseRows }] = await Promise.all([
        supabase
          .from('lesson_progress')
          .select('course_id, lesson_id, completed, completed_at')
          .eq('user_id', userId),
        supabase
          .from('course_progress')
          .select('course_id, last_accessed_lesson_id, last_accessed_at')
          .eq('user_id', userId),
      ])

      if (cancelled) return

      // Build CourseProgress[] from flat Supabase rows
      const progressMap = new Map<string, CourseProgress>()

      for (const row of lessonRows ?? []) {
        if (!progressMap.has(row.course_id)) {
          progressMap.set(row.course_id, {
            courseId: row.course_id,
            userId,
            lessons: [],
            startedAt: row.completed_at ?? new Date().toISOString(),
          })
        }
        progressMap.get(row.course_id)!.lessons.push({
          lessonId: row.lesson_id,
          completed: row.completed,
          completedAt: row.completed_at ?? undefined,
        })
      }

      for (const row of courseRows ?? []) {
        if (!progressMap.has(row.course_id)) {
          progressMap.set(row.course_id, {
            courseId: row.course_id,
            userId,
            lessons: [],
            startedAt: row.last_accessed_at ?? new Date().toISOString(),
          })
        }
        const prog = progressMap.get(row.course_id)!
        if (row.last_accessed_lesson_id) {
          prog.lastAccessedLessonId = row.last_accessed_lesson_id
          // Seed the ref so the guard works from the very first render
          lastAccessedRef.current[row.course_id] = row.last_accessed_lesson_id
        }
      }

      setAllProgress(Array.from(progressMap.values()))
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const getCourseProgress = useCallback(
    (userId: string, courseId: string): CourseProgress | undefined => {
      return allProgress.find((p) => p.userId === userId && p.courseId === courseId)
    },
    [allProgress]
  )

  const markLessonComplete = useCallback(
    (userId: string, courseId: string, lessonId: string) => {
      const now = new Date().toISOString()

      // Optimistic local update
      setAllProgress((prev) => {
        const exists = prev.find((p) => p.userId === userId && p.courseId === courseId)
        if (exists) {
          return prev.map((p) => {
            if (p.userId !== userId || p.courseId !== courseId) return p
            const lessonEntry = p.lessons.find((l) => l.lessonId === lessonId)
            const lessons: LessonProgress[] = lessonEntry
              ? p.lessons.map((l) =>
                  l.lessonId === lessonId ? { ...l, completed: true, completedAt: now } : l
                )
              : [...p.lessons, { lessonId, completed: true, completedAt: now }]
            return { ...p, lessons, lastAccessedLessonId: lessonId }
          })
        }
        return [
          ...prev,
          {
            courseId,
            userId,
            lessons: [{ lessonId, completed: true, completedAt: now }],
            lastAccessedLessonId: lessonId,
            startedAt: now,
          },
        ]
      })

      // Async write — RLS ensures only the owner can write
      supabase
        .from('lesson_progress')
        .upsert(
          {
            user_id: userId,
            course_id: courseId,
            lesson_id: lessonId,
            completed: true,
            completed_at: now,
            last_accessed_at: now,
          },
          { onConflict: 'user_id,lesson_id' }
        )
        .then(({ error }) => {
          if (error) console.error('[useProgress] markLessonComplete:', error.message)
        })
    },
    []
  )

  const markLessonIncomplete = useCallback(
    (userId: string, courseId: string, lessonId: string) => {
      // Optimistic local update
      setAllProgress((prev) =>
        prev.map((p) => {
          if (p.userId !== userId || p.courseId !== courseId) return p
          const lessons = p.lessons.map((l) =>
            l.lessonId === lessonId ? { lessonId, completed: false, completedAt: undefined } : l
          )
          return { ...p, lessons }
        })
      )

      supabase
        .from('lesson_progress')
        .update({ completed: false, completed_at: null, last_accessed_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .then(({ error }) => {
          if (error) console.error('[useProgress] markLessonIncomplete:', error.message)
        })
    },
    []
  )

  const isLessonCompleted = useCallback(
    (userId: string, courseId: string, lessonId: string): boolean => {
      const progress = allProgress.find((p) => p.userId === userId && p.courseId === courseId)
      return progress?.lessons.find((l) => l.lessonId === lessonId)?.completed ?? false
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
      // Guard: skip if this lesson is already the last accessed (prevents infinite loop)
      if (lastAccessedRef.current[courseId] === lessonId) return
      lastAccessedRef.current[courseId] = lessonId

      const now = new Date().toISOString()

      setAllProgress((prev) => {
        const exists = prev.find((p) => p.userId === userId && p.courseId === courseId)
        if (exists) {
          return prev.map((p) =>
            p.userId === userId && p.courseId === courseId
              ? { ...p, lastAccessedLessonId: lessonId }
              : p
          )
        }
        return [
          ...prev,
          {
            courseId,
            userId,
            lessons: [],
            lastAccessedLessonId: lessonId,
            startedAt: now,
          },
        ]
      })

      supabase
        .from('course_progress')
        .upsert(
          {
            user_id: userId,
            course_id: courseId,
            last_accessed_lesson_id: lessonId,
            last_accessed_at: now,
          },
          { onConflict: 'user_id,course_id' }
        )
        .then(({ error }) => {
          if (error) console.error('[useProgress] setLastAccessedLesson:', error.message)
        })
    },
    []
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
