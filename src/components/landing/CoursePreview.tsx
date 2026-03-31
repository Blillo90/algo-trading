'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
  Shield,
  BookOpen,
  Tag,
  Zap,
  Award,
  Infinity as InfinityIcon,
  BarChart2,
} from 'lucide-react'
import { COURSES } from '@/data/courses'

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

function MetricItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 bg-[#030810]/60 border border-[#2563EB]/15 rounded-xl px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center text-[#60A5FA] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[#4A5568] text-xs leading-none mb-1">{label}</p>
        <p className="text-[#E2E8F0] text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default function CoursePreview() {
  const course = COURSES[0]
  const [expandedModule, setExpandedModule] = useState<string | null>('c1-m1')

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const discountPct = Math.round((1 - course.price / course.originalPrice) * 100)

  return (
    <section
      id="metodologia"
      className="py-20 md:py-28 bg-[#030810] relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-center text-[#4A5568] text-xs font-semibold uppercase tracking-widest mb-10">
          Curso principal
        </p>

        {/* ── HERO BLOCK ─────────────────────────────────────────── */}
        <div className="relative bg-[#0A1628] border border-[#2563EB]/20 rounded-2xl overflow-hidden mb-12 shadow-[0_0_80px_rgba(37,99,235,0.08)]">
          {/* Inner grid bg */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Right-side glow */}
          <div
            className="absolute right-0 top-0 bottom-0 w-2/3 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.1) 0%, transparent 65%)' }}
          />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent" />

          <div className="relative flex flex-col lg:flex-row">
            {/* ── LEFT: course info ── */}
            <div className="flex-1 p-8 md:p-12 lg:border-r border-[#2563EB]/10">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4FD8]/20 border border-[#2563EB]/35 text-[#60A5FA] text-xs font-bold uppercase tracking-wide">
                  <Award size={11} />
                  {LEVEL_LABELS[course.level]}
                </span>
                <span className="text-[#4A5568] font-mono text-xs">
                  {course.duration}h · {totalLessons} lecciones · {course.modules.length} módulos
                </span>
              </div>

              {/* Title */}
              <h2 className="font-syne font-bold text-3xl md:text-4xl xl:text-5xl text-white leading-tight mb-4">
                {course.title}
              </h2>

              {/* Tagline */}
              <p className="text-[#60A5FA] text-lg font-medium mb-4">
                De la hipótesis al sistema completamente automatizado.
              </p>

              {/* Description */}
              <p className="text-[#94A3B8] leading-relaxed mb-7 max-w-xl">
                {course.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0E1F3A] border border-[#2563EB]/20 text-[#94A3B8] text-xs font-mono"
                  >
                    <Tag size={9} className="text-[#60A5FA]" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/cursos"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                Acceder al Curso
                <ArrowRight size={18} />
              </Link>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
                <span className="flex items-center gap-1.5 text-[#4A5568] text-xs">
                  <Shield size={12} className="text-emerald-400" />
                  30 días de garantía
                </span>
                <span className="flex items-center gap-1.5 text-[#4A5568] text-xs">
                  <Zap size={12} className="text-[#60A5FA]" />
                  Acceso inmediato
                </span>
                <span className="flex items-center gap-1.5 text-[#4A5568] text-xs">
                  <InfinityIcon size={12} className="text-[#60A5FA]" />
                  Acceso vitalicio
                </span>
              </div>
            </div>

            {/* ── RIGHT: price + metrics ── */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0 p-8 md:p-10 bg-[#071426]/70 flex flex-col">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#4A5568]'}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold font-mono text-sm">{course.rating}</span>
                <span className="text-[#4A5568] text-xs">·</span>
                <span className="text-[#94A3B8] text-xs flex items-center gap-1">
                  <Users size={11} />
                  {course.studentsCount.toLocaleString('es-ES')}
                </span>
              </div>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-syne font-bold text-5xl text-white leading-none">
                    {course.price}€
                  </span>
                  <span className="text-[#4A5568] text-xl line-through">{course.originalPrice}€</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/25">
                  Ahorra un {discountPct}%
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-2.5 mb-6">
                <MetricItem icon={<Award size={14} />} label="Nivel" value={LEVEL_LABELS[course.level]} />
                <MetricItem icon={<Clock size={14} />} label="Duración" value={`${course.duration} horas`} />
                <MetricItem icon={<BookOpen size={14} />} label="Lecciones" value={`${totalLessons} en ${course.modules.length} módulos`} />
                <MetricItem icon={<Users size={14} />} label="Alumnos" value={course.studentsCount.toLocaleString('es-ES')} />
              </div>

              {/* Guarantee */}
              <div className="mt-auto pt-5 border-t border-[#2563EB]/10">
                <div className="flex items-center gap-2 text-[#94A3B8] text-xs">
                  <Shield size={13} className="text-emerald-400 flex-shrink-0" />
                  Garantía de devolución 30 días · Sin preguntas
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROGRAM SECTION ────────────────────────────────────── */}
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <h3 className="font-syne font-bold text-2xl md:text-3xl text-white mb-1">
                Programa del curso
              </h3>
              <p className="text-[#94A3B8] text-sm">
                <span className="font-mono text-[#60A5FA]">{course.modules.length}</span> módulos ·{' '}
                <span className="font-mono text-[#60A5FA]">{totalLessons}</span> lecciones ·{' '}
                <span className="font-mono text-[#60A5FA]">{course.duration}h</span> de contenido
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[#4A5568] text-xs">
              <BarChart2 size={13} className="text-[#60A5FA]" />
              Actualizado en 2025
            </div>
          </div>

          {/* Module accordion — single column */}
          <div className="space-y-3">
            {course.modules.map((module) => {
              const isOpen = expandedModule === module.id
              const totalDuration = module.lessons.reduce((acc, l) => acc + l.duration, 0)
              return (
                <div
                  key={module.id}
                  className="bg-[#0A1628] border border-[#2563EB]/15 rounded-xl overflow-hidden hover:border-[#2563EB]/30 transition-colors duration-200"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setExpandedModule(isOpen ? null : module.id)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB]/25 to-[#1B4FD8]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA] text-sm font-bold font-mono flex-shrink-0">
                        {module.order}
                      </span>
                      <div>
                        <p className="text-[#E2E8F0] font-semibold text-base leading-tight">
                          {module.title}
                        </p>
                        <p className="text-[#4A5568] text-xs mt-1 font-mono">
                          {module.lessons.length} lecciones · {Math.round(totalDuration / 60 * 10) / 10}h
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-[#4A5568] transition-transform duration-250 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-[#2563EB]/10">
                          <ul className="mt-4 space-y-0 divide-y divide-[#2563EB]/8">
                            {module.lessons.map((lesson, idx) => (
                              <li
                                key={lesson.id}
                                className="flex items-center gap-3 py-2.5 text-sm text-[#94A3B8]"
                              >
                                <span className="text-[#4A5568] font-mono text-xs w-6 flex-shrink-0 text-right">
                                  {module.order}.{idx + 1}
                                </span>
                                <span className="flex-1">{lesson.title}</span>
                                <span className="font-mono text-[#4A5568] text-xs flex-shrink-0">
                                  {lesson.duration}m
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
