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
    <section className="py-20 md:py-28 bg-scene relative overflow-hidden">
      {/* Subtle top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cobalt-600/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-4">
            El problema real
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-ink-1 mb-5">
            El trading sin proceso{' '}
            <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
              no escala
            </span>
          </h2>
          <p className="text-ink-3 text-lg max-w-2xl mx-auto">
            La mayoría de traders no falla por falta de inteligencia ni de información.
            Falla por ausencia de un proceso sistemático, validado y replicable.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.title}
              className="group bg-surface/80 border border-cobalt-600/12 rounded-2xl p-6 hover:border-cobalt-600/30 hover:bg-surface transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cobalt-600/10 border border-cobalt-600/20 flex items-center justify-center mb-4 group-hover:bg-cobalt-600/15 transition-colors duration-300">
                <point.Icon size={18} className="text-accent-hi" />
              </div>
              <h3 className="font-syne font-semibold text-ink-1 text-base mb-3 leading-tight">
                {point.title}
              </h3>
              <p className="text-ink-4 text-sm leading-relaxed group-hover:text-ink-3 transition-colors duration-300">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        {/* Solution bridge */}
        <div className="mt-14 text-center">
          <div className="inline-block max-w-2xl">
            <div className="h-px bg-gradient-to-r from-transparent via-cobalt-600/25 to-transparent mb-10" />
            <p className="text-ink-2 text-lg font-medium mb-2">
              La respuesta no es otro indicador técnico ni otra señal de entrada.
            </p>
            <p className="text-ink-4 text-base">
              Es un proceso sistemático: hipótesis, validación estadística, gestión de riesgo y
              despliegue controlado. Eso es exactamente lo que enseñamos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
