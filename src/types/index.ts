export interface User {
  id: string
  email: string
  password: string
  name: string
  avatar?: string
  enrolledCourseIds: string[]
  joinedAt: string
}

export interface Resource {
  id: string
  title: string
  type: 'pdf' | 'notebook' | 'code' | 'checklist'
  url: string
}

export interface Lesson {
  id: string
  moduleId: string
  courseId: string
  title: string
  description: string
  duration: number // minutes
  videoUrl?: string
  order: number
  resources: Resource[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // total hours
  price: number
  originalPrice: number
  rating: number
  studentsCount: number
  thumbnail: string
  modules: Module[]
  tags: string[]
  instructor: string
  updatedAt: string
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
}

export interface CourseProgress {
  courseId: string
  userId: string
  lessons: LessonProgress[]
  lastAccessedLessonId?: string
  startedAt: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  enrolledCourseIds: string[]
}
