'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react'

const METRIC_CARDS = [
  {
    label: 'Win Rate',
    value: '67.3%',
    change: '+2.1%',
    positive: true,
    Icon: Activity,
    color: 'text-emerald-400',
    sparkline: [40, 55, 48, 62, 58, 70, 67],
  },
  {
    label: 'Sharpe Ratio',
    value: '2.41',
    change: '+0.18',
    positive: true,
    Icon: TrendingUp,
    color: 'text-[#60A5FA]',
    sparkline: [1.8, 2.0, 1.9, 2.2, 2.1, 2.3, 2.41],
  },
  {
    label: 'Max Drawdown',
    value: '-8.2%',
    change: '-1.3%',
    positive: false,
    Icon: TrendingDown,
    color: 'text-amber-400',
    sparkline: [12, 10, 11, 9.5, 8.8, 8.5, 8.2],
  },
  {
    label: 'Operaciones',
    value: '1,247',
    change: '+43 mes',
    positive: true,
    Icon: BarChart2,
    color: 'text-[#60A5FA]',
    sparkline: [900, 980, 1050, 1110, 1170, 1210, 1247],
  },
]

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80
  const h = 28
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-70">
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? '#34D399' : '#FBBF24'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030810] pt-16">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.07) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient overlay to fade grid at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030810]/60 via-transparent to-[#030810]/80" />

      {/* Blue orb — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Electric orb — top right */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15 animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '1.5s',
        }}
      />

      {/* Animated SVG chart line */}
      <div className="absolute bottom-20 left-0 right-0 overflow-hidden opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24">
          <defs>
            <filter id="glow-chart">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.polyline
            points="0,80 120,65 240,72 360,40 480,55 600,30 720,45 840,20 960,35 1080,15 1200,28 1320,10 1440,20"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            filter="url(#glow-chart)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/35 bg-[#2563EB]/10 text-[#60A5FA] text-sm font-medium mb-7"
          >
            <span className="text-sm font-mono font-bold">⬡</span>
            Formación en Trading Cuantitativo
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-syne text-white leading-[1.1] mb-6"
          >
            Opera con reglas y sistemas que{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              aguantan los datos
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl"
          >
            Aprende a diseñar, validar y automatizar estrategias de trading con rigor estadístico.
            Sin improvisación, sin emociones. Con proceso, métricas y metodología cuantitativa
            aplicada desde el primer módulo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
              Ver el programa completo
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/#metodologia"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border border-[#2563EB]/40 text-[#60A5FA] font-semibold rounded-xl hover:bg-[#2563EB]/10 hover:border-[#2563EB]/70 transition-all duration-300 text-base"
            >
              <Play size={16} className="fill-[#60A5FA]" />
              Explorar el curso
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 text-sm"
          >
            {[
              { value: '847', label: 'alumnos activos' },
              { value: '4.9★', label: 'valoración media' },
              { value: '100%', label: 'metodología cuantitativa' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[#1B3A5C]">|</span>}
                <span className="font-semibold text-[#E2E8F0] font-mono">{item.value}</span>
                <span className="text-[#94A3B8]">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — floating metric cards */}
        <div className="relative hidden lg:flex flex-col gap-4 lg:pl-8">
          {METRIC_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            >
              <motion.div
                animate={{ y: [0, i % 2 === 0 ? -8 : -12, 0] }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.2,
                }}
                className={`bg-[#0A1628]/90 backdrop-blur-sm border border-[#2563EB]/30 rounded-xl p-4 shadow-[0_0_20px_rgba(37,99,235,0.2)] ${
                  i === 1 ? 'ml-10' : i === 3 ? 'ml-6' : ''
                }`}
                style={{ boxShadow: '0 0 20px rgba(37,99,235,0.15), 0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB]/20 flex items-center justify-center">
                      <card.Icon size={14} className={card.color} />
                    </div>
                    <span className="text-[#94A3B8] text-xs font-medium">{card.label}</span>
                  </div>
                  <span
                    className={`text-xs font-mono font-semibold ${card.positive ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {card.change}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-white font-bold font-mono text-2xl">{card.value}</span>
                  <Sparkline data={card.sparkline} positive={card.positive} />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Decorative border glow */}
          <div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
