'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, Clock, BookOpen, ArrowRight, Tag } from 'lucide-react'
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
  advanced: 'text-[#60A5FA] bg-[#2563EB]/10 border-[#2563EB]/25',
}

type Filter = 'all' | 'beginner' | 'intermediate' | 'advanced'

function CourseCard({ course }: { course: Course }) {
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="group bg-[#0A1628] border border-[#2563EB]/15 rounded-2xl overflow-hidden hover:border-[#2563EB]/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-[#0E1F3A] to-[#071426] overflow-hidden">
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#2563EB]/30 to-[#1B4FD8]/20 border border-[#2563EB]/30 flex items-center justify-center mb-3">
              <BookOpen size={28} className="text-[#60A5FA]" />
            </div>
            <span className="text-[#4A5568] text-xs font-mono">{course.id}</span>
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
        <div className="absolute top-4 right-4 bg-[#030810]/90 backdrop-blur-sm border border-[#2563EB]/20 rounded-lg px-3 py-1.5">
          <span className="text-white font-bold font-mono text-sm">{course.price}€</span>
          <span className="text-[#4A5568] text-xs ml-1.5 line-through">{course.originalPrice}€</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-syne font-bold text-[#E2E8F0] text-lg leading-tight mb-3 group-hover:text-white transition-colors">
          {course.title}
        </h3>

        <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0E1F3A] border border-[#2563EB]/15 text-[#94A3B8] text-xs font-mono"
            >
              <Tag size={8} className="text-[#60A5FA]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#2563EB]/10">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#4A5568]'}
              />
            ))}
            <span className="text-white font-mono text-xs ml-1">{course.rating}</span>
          </div>
          <span className="text-[#4A5568] text-xs">·</span>
          <span className="text-[#94A3B8] text-xs flex items-center gap-1">
            <Users size={10} />
            {course.studentsCount.toLocaleString('es-ES')}
          </span>
          <span className="text-[#4A5568] text-xs">·</span>
          <span className="text-[#94A3B8] text-xs flex items-center gap-1">
            <Clock size={10} />
            {course.duration}h
          </span>
          <span className="text-[#4A5568] text-xs">·</span>
          <span className="text-[#94A3B8] text-xs flex items-center gap-1">
            <BookOpen size={10} />
            {totalLessons} lecciones
          </span>
        </div>

        <Link
          href={`/curso/${course.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-sm"
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
    <main className="min-h-screen bg-[#030810]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
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
            <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-5">
              Catálogo completo
            </span>
            <h1 className="font-syne font-bold text-4xl md:text-6xl text-white mb-5">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
                cursos
              </span>
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Programas especializados en trading algorítmico y cuantitativo, diseñados para llevar
              tus sistemas de la idea a la producción.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-[#0A1628] border border-[#2563EB]/20 text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#2563EB]/40'
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
            <p className="text-[#94A3B8]">No hay cursos disponibles para este nivel.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
