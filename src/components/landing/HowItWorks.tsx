import { LockOpen, Layers, Code2, Rocket } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    Icon: LockOpen,
    title: 'Accede al curso',
    description:
      'Completa el pago y obtén acceso inmediato a todo el contenido del curso. Sin esperas, sin activaciones manuales.',
  },
  {
    number: '02',
    Icon: Layers,
    title: 'Sigue los módulos',
    description:
      'Avanza por los módulos en orden o salta a lo que necesites. El contenido es tuyo para siempre, sin caducidad.',
  },
  {
    number: '03',
    Icon: Code2,
    title: 'Practica y construye',
    description:
      'Implementa las estrategias con los notebooks y recursos incluidos en cada lección. Código listo para ejecutar.',
  },
  {
    number: '04',
    Icon: Rocket,
    title: 'Despliega y automatiza',
    description:
      'Lanza tu sistema en producción y observa cómo opera de forma autónoma mientras tú te dedicas a lo demás.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-layer to-scene relative overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-cobalt-600/30 bg-cobalt-600/10 text-accent-hi text-xs font-semibold uppercase tracking-wider mb-4">
            El proceso
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-ink-1 mb-4">
            Así funciona{' '}
            <span className="bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
              el proceso
            </span>
          </h2>
          <p className="text-ink-3 text-lg max-w-2xl mx-auto">
            Cuatro pasos que te llevan desde el primer video hasta un sistema de trading corriendo
            de forma autónoma en la nube.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px">
            <div className="mx-auto max-w-5xl px-24">
              <div className="h-px bg-gradient-to-r from-transparent via-cobalt-600/40 to-transparent" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative mb-6 z-10">
                  <div className="w-[104px] h-[104px] rounded-2xl bg-surface border border-cobalt-600/30 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.15)] group hover:border-cobalt-600/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300">
                    <step.Icon size={32} className="text-accent-hi" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-cobalt-600 to-cobalt-500 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold font-mono">{i + 1}</span>
                  </div>
                </div>

                <h3 className="font-syne font-semibold text-ink-1 text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-3 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
