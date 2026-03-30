import Link from 'next/link'
import { ArrowRight, Target, BookOpen, Users, Star, TrendingUp } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { BRAND } from '@/lib/brand'

export default function SobreNosotrosPage() {
  const stats = [
    { value: '847', label: 'Alumnos formados', icon: Users },
    { value: '48h', label: 'Horas de contenido', icon: BookOpen },
    { value: '2', label: 'Cursos publicados', icon: Target },
    { value: '4.9/5', label: 'Valoración media', icon: Star },
  ]

  const values = [
    {
      title: 'Rigor cuantitativo',
      description:
        'Cada concepto se enseña con evidencia estadística y metodología validada. Nada de promesas vacías ni de "estrategias milagrosas".',
    },
    {
      title: 'Aplicabilidad inmediata',
      description:
        'Todo el contenido incluye código ejecutable, notebooks y recursos para aplicar lo aprendido desde el primer día.',
    },
    {
      title: 'Transparencia total',
      description:
        'Mostramos tanto los éxitos como los fracasos. Aprender de los errores es tan valioso como aprender de los aciertos.',
    },
    {
      title: 'Comunidad activa',
      description:
        'El aprendizaje colectivo acelera el progreso individual. Fomentamos el intercambio de código, ideas y resultados reales.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#030810]">
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37, 99, 235, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.07) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-15"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-6">
              Nuestra misión
            </span>
            <h1 className="font-syne font-bold text-4xl md:text-6xl text-white leading-tight mb-6">
              Construimos traders{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
                sistemáticos,
              </span>{' '}
              no apostadores
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-8">
              {BRAND.name} nació de la convicción de que el trading puede enseñarse con rigor
              matemático, sin promesas exageradas y con resultados verificables. Formamos a traders
              que operan con sistemas, no con emociones.
            </p>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver cursos disponibles
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#050D1C] border-y border-[#2563EB]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0A1628] border border-[#2563EB]/15 rounded-2xl p-6 text-center hover:border-[#2563EB]/35 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={18} className="text-[#60A5FA]" />
                </div>
                <p className="font-bold font-mono text-3xl text-white mb-1">{stat.value}</p>
                <p className="text-[#94A3B8] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">
                La historia detrás de{' '}
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
                  {BRAND.name}
                </span>
              </h2>
              <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                <p>
                  Alejandro Vidal pasó más de ocho años operando en los mercados de forma
                  discrecional antes de descubrir el trading cuantitativo. Como él mismo describe:
                  &ldquo;Perdí dinero siendo inteligente. Cuando empecé a usar matemáticas en lugar
                  de intuiciones, las cosas cambiaron.&rdquo;
                </p>
                <p>
                  Tras especializarse en quant finance y construir sus propios sistemas, detectó
                  una brecha clara: la formación disponible en español en trading algorítmico era o
                  demasiado superficial o demasiado académica. Faltaba algo práctico, riguroso y
                  orientado a resultados reales.
                </p>
                <p>
                  {BRAND.name} es la respuesta a esa necesidad. Una plataforma de formación donde
                  el rigor matemático y la aplicabilidad práctica van de la mano, diseñada para
                  traders que quieren operar con seriedad profesional.
                </p>
              </div>
            </div>

            {/* Instructor card */}
            <div className="bg-[#0A1628] border border-[#2563EB]/20 rounded-2xl p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white font-bold text-xl font-syne flex-shrink-0">
                  AV
                </div>
                <div>
                  <h3 className="font-syne font-bold text-xl text-white">Alejandro Vidal</h3>
                  <p className="text-[#60A5FA] text-sm">Fundador y Instructor Principal</p>
                </div>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                Trader cuantitativo con más de 12 años de experiencia en los mercados financieros.
                Especializado en desarrollo de estrategias algorítmicas, backtesting avanzado y
                gestión de riesgo cuantitativa. Ha gestionado sistemas automatizados en acciones,
                futuros y divisas.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Años de experiencia', value: '12+' },
                  { label: 'Sistemas en producción', value: '8' },
                  { label: 'Alumnos formados', value: '847+' },
                  { label: 'Valoración media', value: '4.9/5' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#0E1F3A] rounded-xl p-3 border border-[#2563EB]/10"
                  >
                    <p className="font-bold font-mono text-lg text-white">{item.value}</p>
                    <p className="text-[#94A3B8] text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#050D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
                principios
              </span>
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
              Los valores que guían cada decisión sobre el contenido y la metodología de la
              plataforma.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-[#0A1628] border border-[#2563EB]/15 rounded-2xl p-7 hover:border-[#2563EB]/35 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB]/30 to-[#1B4FD8]/15 border border-[#2563EB]/25 flex items-center justify-center">
                    <TrendingUp size={15} className="text-[#60A5FA]" />
                  </div>
                  <h3 className="font-syne font-semibold text-[#E2E8F0] text-lg">{value.title}</h3>
                </div>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
            Empieza tu formación hoy
          </h2>
          <p className="text-[#94A3B8] text-lg mb-8 max-w-xl mx-auto">
            Únete a los más de 847 traders que ya están construyendo sus sistemas con metodología
            profesional.
          </p>
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5 text-base"
          >
            Ver todos los cursos
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
