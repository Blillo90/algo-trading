import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Pablo Fernández',
    role: 'Trader particular',
    initials: 'PF',
    color: 'from-cobalt-600 to-cobalt-400',
    stars: 5,
    text: 'Llevaba años perdiendo dinero con el trading discrecional. Después de este curso monté mi primer sistema con un Sharpe de 1.8 en backtesting y llevo 6 meses en positivo en real. Totalmente recomendable.',
  },
  {
    name: 'Laura Sánchez',
    role: 'Ingeniera de Software',
    initials: 'LS',
    color: 'from-violet-600 to-violet-400',
    stars: 5,
    text: 'El enfoque cuantitativo es exactamente lo que buscaba. La parte de gestión de riesgo y métricas me abrió los ojos. Ahora gestiono tres sistemas automatizados en paralelo sin intervención manual.',
  },
  {
    name: 'Miguel Torres',
    role: 'Analista Financiero',
    initials: 'MT',
    color: 'from-emerald-600 to-emerald-400',
    stars: 5,
    text: 'Formación muy completa y bien estructurada. Alejandro explica conceptos complejos de forma muy clara. El módulo de backtesting solo ya vale el precio del curso. Excelente inversión.',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-20 md:py-28 bg-gradient-to-b from-scene to-layer relative overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-4">
            Resultados reales
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-ink-1 mb-4">
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
              nuestros alumnos
            </span>
          </h2>
          <p className="text-ink-3 text-lg max-w-2xl mx-auto">
            Más de 847 traders han transformado su forma de operar en los mercados con esta
            metodología.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-surface/80 border border-cobalt-600/15 rounded-2xl p-7 hover:border-cobalt-600/35 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-15">
                <Quote size={40} className="text-cobalt-600" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: testimonial.stars }).map((_, si) => (
                  <Star key={si} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-ink-3 text-sm leading-relaxed mb-7 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-ink-1 font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-ink-3 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '847+', label: 'Alumnos activos' },
            { value: '4.9/5', label: 'Valoración media' },
            { value: '96%', label: 'Tasa de satisfacción' },
            { value: '48h', label: 'Contenido disponible' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface/60 border border-cobalt-600/10 rounded-xl p-5 text-center"
            >
              <p className="font-bold font-mono text-2xl text-ink-1 mb-1">{stat.value}</p>
              <p className="text-ink-3 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
