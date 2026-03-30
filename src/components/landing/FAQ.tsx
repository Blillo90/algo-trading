'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BRAND } from '@/lib/brand'

const FAQS = [
  {
    q: '¿Necesito saber programar para empezar?',
    a: 'Se recomienda tener nociones básicas de Python: variables, bucles y funciones. No es necesario ser desarrollador ni tener experiencia avanzada. El primer módulo incluye la configuración completa del entorno y repasa los conceptos de Python necesarios para el curso. Si nunca has programado, te recomendamos dedicar una o dos semanas a un curso introductorio de Python antes de empezar.',
  },
  {
    q: '¿El curso sirve si soy principiante en trading?',
    a: 'El curso parte desde los fundamentos del trading cuantitativo y no asume experiencia previa en trading activo. Sin embargo, tener una noción básica de qué son los mercados financieros y cómo funciona una operación de compra/venta facilita el aprendizaje desde el primer módulo. Si eres principiante absoluto, el curso es viable con algo de paciencia adicional en los primeros módulos.',
  },
  {
    q: '¿Se garantizan beneficios o resultados en el trading?',
    a: 'No. El curso no promete rentabilidades, beneficios garantizados ni resultados específicos. El trading con instrumentos financieros implica riesgo real de pérdida de capital. Lo que enseñamos es un proceso riguroso de diseño, validación y gestión de riesgo. Los resultados dependen del trabajo del alumno, de su disciplina en la ejecución y de la gestión responsable del riesgo.',
  },
  {
    q: '¿¿Voy a aprender a validar mis estrategias con backtesting?',
    a: 'Sí, es uno de los pilares del programa. El módulo de backtesting cubre el proceso completo: desde la preparación de datos hasta el walk-forward analysis y el out-of-sample testing. Se explican en detalle los sesgos más comunes —look-ahead bias, overfitting, curva-fitting— y cómo construir un proceso de validación que sea estadísticamente robusto.',
  },
  {
    q: '¿Esto es trading manual o trading automatizado?',
    a: 'Automatizado. El objetivo del curso es construir sistemas que ejecuten operaciones de forma autónoma siguiendo reglas definidas, sin necesidad de intervención manual constante. Aprendes a diseñar la lógica, validarla con datos y desplegarla conectada a la API de un broker real. El curso no enseña análisis técnico subjetivo ni trading discrecional.',
  },
  {
    q: '¿Cómo accedo al contenido después de la compra?',
    a: 'Inmediatamente después de completar el pago recibes las credenciales de acceso a la plataforma. El contenido está organizado por módulos y lecciones, con vídeos, recursos descargables y ejercicios prácticos. Puedes avanzar a tu ritmo y el acceso es de por vida, incluyendo todas las actualizaciones futuras.',
  },
  {
    q: '¿Hay recursos descargables o materiales de práctica?',
    a: 'Sí. Cada lección incluye recursos adicionales según corresponda: notebooks de Python con el código completo, PDFs con resúmenes de los conceptos clave, checklists de validación y ejemplos de código funcional. El objetivo es que puedas replicar y adaptar cada ejercicio a tus propias ideas de estrategia.',
  },
  {
    q: '¿Cuánto tiempo necesito dedicar cada semana?',
    a: 'Recomendamos entre 1 y 2 horas diarias durante 4 a 6 semanas para completar el curso a un ritmo cómodo y sin saltarse conceptos. El contenido no caduca y está disponible de por vida, por lo que puedes adaptarlo completamente a tu disponibilidad.',
  },
  {
    q: '¿Qué herramientas y software necesito?',
    a: 'Python 3.x (gratuito), Jupyter Notebooks (gratuito) y las bibliotecas del ecosistema de análisis cuantitativo que instalamos juntos en el módulo de configuración. Para el módulo de despliegue necesitarás una cuenta en un broker con API: Interactive Brokers para un entorno profesional o Alpaca como alternativa gratuita para empezar en modo paper trading.',
  },
  {
    q: '¿Incluye soporte o comunidad con otros alumnos?',
    a: 'Sí. Al inscribirte obtienes acceso al grupo privado donde podrás hacer preguntas, compartir tus sistemas y recibir feedback de otros alumnos y del equipo. Además organizamos sesiones de preguntas y respuestas en directo de forma periódica.',
  },
  {
    q: '¿Hay garantía de devolución?',
    a: 'Sí, ofrecemos una garantía de satisfacción de 30 días. Si el curso no cumple tus expectativas, te devolvemos el importe íntegro sin necesidad de justificación. Solo tienes que contactarnos dentro de los primeros 30 días desde la compra.',
  },
  {
    q: '¿Obtengo un certificado al finalizar?',
    a: 'Sí. Al completar el 100% del contenido recibes un certificado digital de finalización que acredita las competencias adquiridas y puede añadirse a tu perfil de LinkedIn.',
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
            href={`mailto:${BRAND.email}`}
            className="inline-flex items-center gap-2 text-[#60A5FA] hover:text-white transition-colors text-sm font-medium border-b border-[#2563EB]/40 hover:border-[#60A5FA] pb-0.5"
          >
            Escríbenos a {BRAND.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
