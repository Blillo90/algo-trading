'use client'

import { motion } from 'framer-motion'
import { Clock, Brain, FlaskConical, Link as LinkIcon, BarChart2, Shuffle } from 'lucide-react'

const PAIN_POINTS = [
  {
    Icon: Clock,
    title: 'Demasiado tiempo pegado a la pantalla',
    body: 'Vigilar gráficos durante horas cada día no es una ventaja competitiva. Es un coste de oportunidad que un sistema automatizado elimina por completo, ejecutando con precisión mientras tú no estás.',
  },
  {
    Icon: Brain,
    title: 'Decisiones contaminadas por la emoción',
    body: 'La euforia tras una racha ganadora y el miedo tras una pérdida son los peores asesores de trading. Una operativa basada en reglas matemáticas ejecuta con consistencia al margen del estado emocional.',
  },
  {
    Icon: FlaskConical,
    title: 'Ideas sin validación estadística real',
    body: 'Operar una estrategia sin haberla testado en datos históricos es especulación pura. El backtesting riguroso separa las ideas con edge estadístico real de las que simplemente parecen funcionar.',
  },
  {
    Icon: LinkIcon,
    title: 'Dependencia de señales externas',
    body: 'Seguir alertas de terceros sin entender la lógica del sistema genera dependencia y nula capacidad de adaptación cuando el mercado cambia de régimen. El conocimiento del proceso es lo que da autonomía.',
  },
  {
    Icon: BarChart2,
    title: 'Sin proceso ni métricas de evaluación',
    body: 'Sin un sistema de métricas objetivo —Sharpe, drawdown máximo, expectativa— no es posible distinguir si un buen periodo es fruto del método o de la suerte. El proceso exige medición continua.',
  },
  {
    Icon: Shuffle,
    title: 'Resultados inconsistentes e impredecibles',
    body: 'La consistencia en el trading no proviene del talento puntual sino del edge estadístico de un sistema validado, ejecutado con disciplina durante el tiempo suficiente para que los números converjan.',
  },
]

export default function PainPoints() {
  return (
    <section className="py-20 md:py-28 bg-[#030810] relative overflow-hidden">
      {/* Subtle top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
            El problema real
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-white mb-5">
            El trading sin proceso{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              no escala
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            La mayoría de traders no falla por falta de inteligencia ni de información.
            Falla por ausencia de un proceso sistemático, validado y replicable.
          </p>
        </motion.div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-[#0A1628]/80 border border-[#2563EB]/12 rounded-2xl p-6 hover:border-[#2563EB]/30 hover:bg-[#0A1628] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/15 transition-colors duration-300">
                <point.Icon size={18} className="text-[#60A5FA]" />
              </div>
              <h3 className="font-syne font-semibold text-[#E2E8F0] text-base mb-3 leading-tight">
                {point.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed group-hover:text-[#94A3B8] transition-colors duration-300">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solution bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <div className="inline-block max-w-2xl">
            <div className="h-px bg-gradient-to-r from-transparent via-[#2563EB]/25 to-transparent mb-10" />
            <p className="text-[#CBD5E1] text-lg font-medium mb-2">
              La respuesta no es otro indicador técnico ni otra señal de entrada.
            </p>
            <p className="text-[#64748B] text-base">
              Es un proceso sistemático: hipótesis, validación estadística, gestión de riesgo y
              despliegue controlado. Eso es exactamente lo que enseñamos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
