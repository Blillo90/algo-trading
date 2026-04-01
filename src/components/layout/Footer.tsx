import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import { BRAND } from '@/lib/brand'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-scene border-t border-cobalt-600/15 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Blue top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cobalt-600/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image
                src={BRAND.logo}
                alt={BRAND.name}
                width={26}
                height={26}
                className="flex-shrink-0"
              />
              <span className="font-syne font-bold text-base bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-ink-3 text-sm leading-relaxed mb-6 max-w-xs">
              Formación profesional en trading algorítmico y cuantitativo. Construye sistemas que
              operan con disciplina matemática, no con emociones.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon href="#" icon={<Twitter size={16} />} label="Twitter" />
              <SocialIcon href="#" icon={<Linkedin size={16} />} label="LinkedIn" />
              <SocialIcon href="#" icon={<Youtube size={16} />} label="YouTube" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-ink-1 font-semibold font-syne mb-4 text-sm tracking-wider uppercase">
              Plataforma
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/cursos', label: 'Todos los cursos' },
                { href: '/sobre-nosotros', label: 'Sobre nosotros' },
                { href: '/login', label: 'Acceder' },
                { href: '/#metodologia', label: 'Metodología' },
                { href: '/#testimonios', label: 'Testimonios' },
                { href: '/#faq', label: 'Preguntas frecuentes' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-3 hover:text-accent-hi text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-ink-1 font-semibold font-syne mb-4 text-sm tracking-wider uppercase">
              Contacto
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-ink-3 text-sm">
                <Mail size={14} className="text-accent-hi flex-shrink-0" />
                {BRAND.email}
              </li>
              <li className="flex items-center gap-2 text-ink-3 text-sm">
                <MapPin size={14} className="text-accent-hi flex-shrink-0" />
                Madrid, España
              </li>
            </ul>
            <div>
              <p className="text-ink-1 text-sm font-medium mb-3">
                Recibe contenido gratuito
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 bg-surface border border-cobalt-600/25 rounded-lg px-3 py-2 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-cobalt-600/60 transition-colors"
                />
                <button className="px-3 py-2 bg-gradient-to-r from-cobalt-600 to-cobalt-500 rounded-lg text-white text-sm font-medium hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cobalt-600/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-5 text-xs">
            © {currentYear} {BRAND.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Privacidad', 'Términos', 'Cookies'].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-ink-5 hover:text-ink-3 text-xs transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface border border-cobalt-600/20 text-ink-3 hover:text-accent-hi hover:border-cobalt-600/50 hover:bg-well transition-all duration-200"
    >
      {icon}
    </a>
  )
}
