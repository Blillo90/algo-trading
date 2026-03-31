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
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#050D1C] to-[#030810] relative overflow-hidden">
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
          <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
            El proceso
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-white mb-4">
            Así funciona{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              el proceso
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Cuatro pasos que te llevan desde el primer video hasta un sistema de trading corriendo
            de forma autónoma en la nube.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px">
            <div className="mx-auto max-w-5xl px-24">
              <div className="h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
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
                  <div className="w-[104px] h-[104px] rounded-2xl bg-[#0A1628] border border-[#2563EB]/30 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.15)] group hover:border-[#2563EB]/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300">
                    <step.Icon size={32} className="text-[#60A5FA]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold font-mono">{i + 1}</span>
                  </div>
                </div>

                <h3 className="font-syne font-semibold text-[#E2E8F0] text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
