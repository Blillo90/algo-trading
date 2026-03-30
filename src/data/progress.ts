import type { CourseProgress } from '@/types'

export const STORAGE_KEY = 'algo_trading_progress'

// Course 1 lesson IDs in order
const course1LessonIds = [
  'c1-m1-l1', 'c1-m1-l2', 'c1-m1-l3', 'c1-m1-l4',
  'c1-m2-l1', 'c1-m2-l2', 'c1-m2-l3', 'c1-m2-l4', 'c1-m2-l5',
  'c1-m3-l1', 'c1-m3-l2', 'c1-m3-l3', 'c1-m3-l4',
  'c1-m4-l1', 'c1-m4-l2', 'c1-m4-l3', 'c1-m4-l4',
  'c1-m5-l1', 'c1-m5-l2', 'c1-m5-l3',
  'c1-m6-l1', 'c1-m6-l2', 'c1-m6-l3', 'c1-m6-l4',
]

// Course 2 lesson IDs in order
const course2LessonIds = [
  'c2-m1-l1', 'c2-m1-l2', 'c2-m1-l3', 'c2-m1-l4',
  'c2-m2-l1', 'c2-m2-l2', 'c2-m2-l3', 'c2-m2-l4',
  'c2-m3-l1', 'c2-m3-l2', 'c2-m3-l3', 'c2-m3-l4',
]

export const INITIAL_PROGRESS: CourseProgress[] = [
  // User 1: completed first 8 lessons of course-1
  {
    courseId: 'course-1',
    userId: 'user-1',
    lessons: course1LessonIds.map((lessonId, index) => ({
      lessonId,
      completed: index < 8,
      completedAt: index < 8 ? `2024-09-${15 + index}` : undefined,
    })),
    lastAccessedLessonId: 'c1-m2-l5',
    startedAt: '2024-09-15',
  },
  // User 2: completed first 15 lessons of course-1
  {
    courseId: 'course-1',
    userId: 'user-2',
    lessons: course1LessonIds.map((lessonId, index) => ({
      lessonId,
      completed: index < 15,
      completedAt: index < 15 ? `2024-10-${3 + index}` : undefined,
    })),
    lastAccessedLessonId: 'c1-m4-l3',
    startedAt: '2024-10-03',
  },
  // User 2: completed first 6 lessons of course-2
  {
    courseId: 'course-2',
    userId: 'user-2',
    lessons: course2LessonIds.map((lessonId, index) => ({
      lessonId,
      completed: index < 6,
      completedAt: index < 6 ? `2024-11-${1 + index}` : undefined,
    })),
    lastAccessedLessonId: 'c2-m2-l2',
    startedAt: '2024-11-01',
  },
]
