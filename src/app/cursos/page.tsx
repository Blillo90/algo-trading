'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, Clock, BookOpen, ArrowRight, ArrowLeft, Tag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { COURSES } from '@/data/courses'
import type { Course } from '@/types'

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
  intermediate: 'text-amber-400 bg-amber-400/10 border-amber-500/20',
  advanced: 'text-accent-hi bg-cobalt-600/10 border-cobalt-600/25',
}

type Filter = 'all' | 'beginner' | 'intermediate' | 'advanced'

function CourseCard({ course }: { course: Course }) {
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="group bg-surface border border-cobalt-600/15 rounded-2xl overflow-hidden hover:border-cobalt-600/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-well to-surface2 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-cobalt-600/30 to-cobalt-700/20 border border-cobalt-600/30 flex items-center justify-center mb-2">
              <BookOpen size={22} className="text-accent-hi" />
            </div>
            <span className="text-ink-5 text-xs font-mono">{course.id}</span>
          </div>
        </div>
        {/* Level badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${LEVEL_COLORS[course.level]}`}
          >
            {LEVEL_LABELS[course.level]}
          </span>
        </div>
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-scene/90 backdrop-blur-sm border border-cobalt-600/20 rounded-lg px-3 py-1.5">
          <span className="text-ink-1 font-bold font-mono text-sm">{course.price}€</span>
          <span className="text-ink-5 text-xs ml-1.5 line-through">{course.originalPrice}€</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-syne font-bold text-ink-1 text-lg leading-tight mb-2 group-hover:text-white transition-colors">
          {course.title}
        </h3>

        <p className="text-ink-3 text-sm leading-relaxed mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-well border border-cobalt-600/15 text-ink-3 text-xs font-mono"
            >
              <Tag size={8} className="text-accent-hi" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-cobalt-600/10">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-ink-5'}
              />
            ))}
            <span className="text-ink-1 font-mono text-xs ml-1">{course.rating}</span>
          </div>
          <span className="text-ink-5 text-xs">·</span>
          <span className="text-ink-3 text-xs flex items-center gap-1">
            <Users size={10} />
            {course.studentsCount.toLocaleString('es-ES')}
          </span>
          <span className="text-ink-5 text-xs">·</span>
          <span className="text-ink-3 text-xs flex items-center gap-1">
            <Clock size={10} />
            {course.duration}h
          </span>
          <span className="text-ink-5 text-xs">·</span>
          <span className="text-ink-3 text-xs flex items-center gap-1">
            <BookOpen size={10} />
            {totalLessons} lecciones
          </span>
        </div>

        <Link
          href={`/curso/${course.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-sm"
        >
          Ver el curso
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}

export default function CursosPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? COURSES : COURSES.filter((c) => c.level === filter)

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
  ]

  return (
    <main className="min-h-screen bg-scene">
      <Navbar />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-ink-4 hover:text-ink-2 text-sm transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Volver a inicio
        </Link>
      </div>

      {/* Header */}
      <section className="pt-6 pb-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-5">
              Catálogo completo
            </span>
            <h1 className="font-syne font-bold text-4xl md:text-6xl text-ink-1 mb-5">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
                cursos
              </span>
            </h1>
            <p className="text-ink-3 text-lg max-w-2xl mx-auto">
              Programas especializados en trading algorítmico y cuantitativo, diseñados para llevar
              tus sistemas de la idea a la producción.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? 'bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-surface border border-cobalt-600/20 text-ink-3 hover:text-ink-1 hover:border-cobalt-600/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-3">No hay cursos disponibles para este nivel.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
