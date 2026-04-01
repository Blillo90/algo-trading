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
    <section className="py-20 md:py-28 bg-gradient-to-b from-scene to-layer relative overflow-hidden">
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
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-4">
            Lo que aprenderás
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-ink-1 mb-4">
            Todo lo que necesitas para construir{' '}
            <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
              sistemas profesionales
            </span>
          </h2>
          <p className="text-ink-3 text-lg max-w-2xl mx-auto">
            Un programa diseñado para transformar la forma en que operas en los mercados, con
            metodología cuantitativa y enfoque en resultados reales.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative bg-surface/70 border border-cobalt-600/15 rounded-2xl p-7 hover:border-cobalt-600/45 hover:bg-surface hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cobalt-700/30 to-cobalt-600/15 border border-cobalt-600/25 flex items-center justify-center mb-5 group-hover:border-cobalt-600/50 transition-colors duration-300">
                <benefit.Icon size={22} className="text-accent-hi" />
              </div>

              <h3 className="text-ink-1 font-semibold font-syne text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-ink-3 text-sm leading-relaxed">{benefit.description}</p>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cobalt-600/40 group-hover:bg-accent-hi transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
