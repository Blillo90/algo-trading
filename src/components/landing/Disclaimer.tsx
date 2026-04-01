import { AlertTriangle } from 'lucide-react'

/**
 * Aviso de riesgo y responsabilidad.
 * Componente de servidor — no necesita interactividad.
 */
export default function Disclaimer() {
  return (
    <section className="py-10 bg-scene">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle size={16} className="text-amber-400" />
            </div>
            <div>
              <h3 className="font-syne font-semibold text-ink-1 text-base mb-3">
                Aviso importante sobre riesgos y rendimientos
              </h3>
              <p className="text-ink-4 text-sm leading-relaxed mb-3">
                Este programa es una formación educativa sobre diseño, validación y automatización de
                estrategias de trading algorítmico. El contenido tiene fines exclusivamente
                formativos y no constituye asesoramiento financiero, de inversión ni de cualquier
                otro tipo.
              </p>
              <p className="text-ink-4 text-sm leading-relaxed mb-3">
                Los resultados pasados —propios o ajenos— no garantizan resultados futuros. El
                trading con instrumentos financieros implica un riesgo significativo de pérdida de
                capital. Los rendimientos obtenidos en entornos de backtest no son una proyección
                fiable del rendimiento en mercado real.
              </p>
              <p className="text-ink-4 text-sm leading-relaxed">
                El progreso y los resultados de cada alumno dependen de su trabajo, dedicación y
                correcta aplicación de los conceptos aprendidos. La formación proporciona las
                herramientas y el proceso; la ejecución y la gestión del riesgo son siempre
                responsabilidad del alumno.{' '}
                <span className="text-ink-3">
                  Nunca arriesgues capital que no puedas permitirte perder.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
