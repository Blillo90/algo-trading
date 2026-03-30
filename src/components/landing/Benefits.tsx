'use client'

import { motion } from 'framer-motion'
import { Settings, BarChart2, Shield, Zap, TrendingUp, Users } from 'lucide-react'

const BENEFITS = [
  {
    Icon: Settings,
    title: 'Estrategias sistemáticas',
    description:
      'Diseña reglas de trading objetivas y replicables sin margen para la improvisación ni los sesgos emocionales.',
  },
  {
    Icon: BarChart2,
    title: 'Backtesting riguroso',
    description:
      'Valida tus ideas con datos históricos reales antes de arriesgar un solo euro. Evidencia estadística primero, capital después.',
  },
  {
    Icon: Shield,
    title: 'Gestión de riesgo cuantitativa',
    description:
      'Aplica técnicas de sizing y control de drawdown usadas por fondos profesionales. Protege el capital ante todo.',
  },
  {
    Icon: Zap,
    title: 'Automatización completa',
    description:
      'Despliega tus sistemas en servidores y que operen 24/7 sin intervención manual. Libérate de la pantalla.',
  },
  {
    Icon: TrendingUp,
    title: 'Métricas y análisis',
    description:
      'Evalúa el rendimiento con las métricas correctas: Sharpe, Calmar, expectativa estadística. Lo que realmente importa.',
  },
  {
    Icon: Users,
    title: 'Comunidad de traders',
    description:
      'Accede a un grupo privado con traders sistemáticos que comparten código, ideas y resultados reales cada semana.',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#030810] to-[#050D1C] relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
            Lo que aprenderás
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-white mb-4">
            Todo lo que necesitas para construir{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              sistemas profesionales
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Un programa diseñado para transformar la forma en que operas en los mercados, con
            metodología cuantitativa y enfoque en resultados reales.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#0A1628]/70 border border-[#2563EB]/15 rounded-2xl p-7 hover:border-[#2563EB]/45 hover:bg-[#0A1628] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B4FD8]/30 to-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center mb-5 group-hover:border-[#2563EB]/50 transition-colors duration-300">
                <benefit.Icon size={22} className="text-[#60A5FA]" />
              </div>

              <h3 className="text-[#E2E8F0] font-semibold font-syne text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{benefit.description}</p>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#2563EB]/40 group-hover:bg-[#60A5FA] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
