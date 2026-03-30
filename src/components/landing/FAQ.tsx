'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: '¿Necesito experiencia previa en trading?',
    a: 'No es necesaria experiencia en trading profesional, aunque tener nociones básicas de cómo funcionan los mercados ayuda a avanzar más rápido. Lo que sí recomendamos es tener conocimientos básicos de Python (variables, bucles, funciones), ya que el curso trabaja directamente con código desde el principio.',
  },
  {
    q: '¿Cuánto tiempo necesito dedicar?',
    a: 'Recomendamos dedicar entre 1 y 2 horas diarias durante 4 a 6 semanas para completar el curso a buen ritmo. No hay plazos ni caducidad: el contenido está disponible de por vida y puedes avanzar según tu disponibilidad.',
  },
  {
    q: '¿Qué herramientas y software necesito?',
    a: 'Python 3.x (completamente gratuito), Jupyter Notebooks (gratis) y las bibliotecas que instalamos paso a paso en el módulo de configuración. Para el módulo de despliegue necesitarás una cuenta en un broker con API (Interactive Brokers o Alpaca como alternativa gratuita para empezar).',
  },
  {
    q: '¿Incluye soporte o comunidad?',
    a: 'Sí. Al inscribirte obtienes acceso al grupo privado de Discord de AlgoTrader Pro, donde podrás hacer preguntas, compartir tus sistemas y recibir feedback. Además organizamos sesiones de Q&A en directo mensuales donde Alejandro responde preguntas en tiempo real.',
  },
  {
    q: '¿Hay alguna garantía de devolución?',
    a: 'Sí, ofrecemos una garantía de satisfacción de 30 días. Si por cualquier razón el curso no cumple tus expectativas, te devolvemos el importe íntegro sin necesidad de justificación. Solo tienes que enviarnos un email dentro de los primeros 30 días tras la compra.',
  },
  {
    q: '¿Cuándo se actualiza el contenido?',
    a: 'El curso se actualiza periódicamente para reflejar cambios en herramientas, APIs de brokers y mejores prácticas del sector. Todas las actualizaciones futuras están incluidas sin coste adicional para los alumnos inscritos.',
  },
  {
    q: '¿Obtengo un certificado al completar el curso?',
    a: 'Sí. Al completar el 100% del contenido recibirás un certificado digital verificable de AlgoTrader Pro. Es un certificado de finalización que acredita las competencias adquiridas y puede añadirse a tu perfil de LinkedIn.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#050D1C] relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-white mb-4">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Todo lo que necesitas saber antes de empezar.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`bg-[#0A1628] border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#2563EB]/40' : 'border-[#2563EB]/15 hover:border-[#2563EB]/30'
                }`}
              >
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2563EB]/25 to-[#1B4FD8]/15 border border-[#2563EB]/25 flex items-center justify-center text-[#60A5FA] text-xs font-bold font-mono flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 font-medium text-sm ${isOpen ? 'text-[#E2E8F0]' : 'text-[#CBD5E1]'}`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#60A5FA] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[#2563EB]/10">
                        <p className="pt-4 text-[#94A3B8] text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-[#94A3B8] text-sm mb-4">¿Tienes más preguntas?</p>
          <a
            href="mailto:hola@algotraderpro.es"
            className="inline-flex items-center gap-2 text-[#60A5FA] hover:text-white transition-colors text-sm font-medium border-b border-[#2563EB]/40 hover:border-[#60A5FA] pb-0.5"
          >
            Escríbenos a hola@algotraderpro.es
          </a>
        </motion.div>
      </div>
    </section>
  )
}
