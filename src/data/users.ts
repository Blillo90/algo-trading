import type { User } from '@/types'

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'usuario1@demo.com',
    password: 'password123',
    name: 'Carlos Martínez',
    enrolledCourseIds: ['course-1'],
    joinedAt: '2024-09-15',
  },
  {
    id: 'user-2',
    email: 'usuario2@demo.com',
    password: 'password123',
    name: 'Ana García',
    enrolledCourseIds: ['course-1', 'course-2'],
    joinedAt: '2024-10-03',
  },
]
