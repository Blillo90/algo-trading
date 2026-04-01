'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, BookOpen, Mail } from 'lucide-react'
import { BRAND } from '@/lib/brand'

const GUIDE_STEPS = [
  'Cómo formular una hipótesis de mercado con edge estadístico',
  'Las métricas clave para evaluar una estrategia antes de arriesgar capital',
  'El proceso de backtesting riguroso sin sesgos ni overfitting',
  'Cómo calcular el position sizing correcto para cada operación',
  'Los errores que anulan la validez de un backtest (y cómo evitarlos)',
  'Qué necesitas para pasar de la validación al despliegue real',
  'Preguntas clave para decidir si un sistema es operativo',
]

function GuideCover() {
  return (
    <div className="relative">
      {/* Glow behind cover */}
      <div
        className="absolute inset-0 -m-4 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
      />
      <div className="relative bg-surface2 border border-cobalt-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.15)]">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-cobalt-600 to-cobalt-400" />
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative p-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt-600/20 border border-cobalt-600/40 text-accent-hi text-xs font-bold uppercase tracking-wider mb-5">
            <BookOpen size={10} />
            Guía gratuita
          </span>
          {/* Title */}
          <h4 className="font-syne font-bold text-ink-1 text-xl leading-tight mb-2">
            Roadmap del Trading Algorítmico
          </h4>
          <p className="text-accent-hi text-sm font-medium mb-6">
            De la idea al sistema validado en 7 pasos
          </p>
          {/* Step list preview */}
          <ul className="space-y-3">
            {GUIDE_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-cobalt-600/20 border border-cobalt-600/30 flex items-center justify-center text-accent-hi text-[10px] font-bold font-mono flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-ink-3 text-xs leading-snug">{step}</span>
              </li>
            ))}
          </ul>
          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-cobalt-600/15 flex items-center justify-between">
            <span className="text-ink-5 text-xs font-mono">{BRAND.name}</span>
            <span className="text-ink-5 text-xs font-mono">PDF · Gratuito</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // TODO: conectar con backend real o servicio de email marketing (Resend, ConvertKit, Mailchimp, etc.)
  // cuando esté disponible. Por ahora simula el envío con un timeout.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="guia-gratuita"
      className="py-20 md:py-28 bg-layer relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — guide cover */}
          <div>
            <GuideCover />
          </div>

          {/* Right — description + form */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-5">
              Recurso gratuito
            </span>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-ink-1 leading-tight mb-4">
              Empieza con una base{' '}
              <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
                sólida y gratuita
              </span>
            </h2>
            <p className="text-ink-3 leading-relaxed mb-7">
              Antes de invertir en formación, recibe nuestra guía práctica de introducción al trading
              algorítmico. 7 pasos explicados con claridad: desde cómo formular una hipótesis de
              mercado hasta qué necesitas para validar un sistema antes de operarlo en real.
            </p>

            {/* What's inside */}
            <ul className="space-y-3 mb-8">
              {[
                'Proceso completo de diseño y validación de estrategias',
                'Métricas que distinguen un sistema con edge real del azar',
                'Los errores más comunes en el backtesting y cómo evitarlos',
                'Checklist para decidir si un sistema está listo para producción',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-2">
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Form */}
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-5 flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-ink-1 font-medium text-sm">¡Perfecto, la guía está en camino!</p>
                  <p className="text-ink-3 text-xs mt-0.5">
                    Revisa tu bandeja de entrada en los próximos minutos.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-5"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-cobalt-600/25 text-ink-1 placeholder:text-ink-5 rounded-xl text-sm focus:outline-none focus:border-cobalt-600/60 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.15)] transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Quiero la guía
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-ink-5 text-xs">
                  Sin spam. Solo contenido relevante sobre trading cuantitativo y algorítmico.
                  {/* TODO: añadir enlace a política de privacidad cuando esté redactada */}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
