'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Palette } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme, THEMES } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/#metodologia', label: 'Metodología' },
  { href: '/#testimonios', label: 'Testimonios' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const themeRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
    setThemeOpen(false)
  }, [pathname])

  // Track which home section is visible — only relevant on the home page
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null)
      return
    }
    const SECTION_IDS = ['metodologia', 'testimonios', 'faq']
    const OFFSET = 80 // navbar height + buffer

    function detect() {
      let current: string | null = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          current = id
        }
      }
      setActiveSection(current)
    }

    detect()
    window.addEventListener('scroll', detect, { passive: true })
    return () => window.removeEventListener('scroll', detect)
  }, [pathname])

  function isActive(href: string): boolean {
    if (href.startsWith('/#')) {
      return pathname === '/' && activeSection === href.slice(2)
    }
    if (href === '/') {
      return pathname === '/' && activeSection === null
    }
    return pathname === href
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-scene/98 border-cobalt-600/20 shadow-[0_1px_20px_rgba(37,99,235,0.15)]'
          : 'bg-scene/90 border-cobalt-600/10'
      )}
      style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={28}
            height={28}
            className="flex-shrink-0 transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
          <span className="font-syne font-bold text-lg bg-gradient-to-r from-cobalt-400 to-cobalt-600 bg-clip-text text-transparent">
            {BRAND.name}
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme selector */}
          <div ref={themeRef} className="relative">
            <button
              onClick={() => setThemeOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-ink-3 hover:text-ink-1 hover:bg-surface transition-colors duration-200"
              aria-label="Cambiar tema"
              title="Cambiar tema"
            >
              <span
                className="w-4 h-4 rounded-full border border-cobalt-600/30 flex-shrink-0"
                style={{
                  background: THEMES.find((t) => t.id === theme)?.swatch ?? '#030810',
                }}
              />
              <Palette size={14} />
            </button>
            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-surface border border-cobalt-600/25 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  <div className="p-1.5">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); setThemeOpen(false) }}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150',
                          theme === t.id
                            ? 'bg-cobalt-600/15 text-accent-hi font-medium'
                            : 'text-ink-2 hover:bg-well hover:text-ink-1'
                        )}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0 border"
                          style={{
                            background: t.swatch,
                            borderColor: t.border ?? 'rgba(37,99,235,0.3)',
                          }}
                        />
                        {t.label}
                        {theme === t.id && (
                          <span className="ml-auto text-accent-hi text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-ink-1 hover:bg-surface transition-colors duration-200 text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cobalt-600 to-cobalt-400 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    'text-ink-3 transition-transform duration-200',
                    userMenuOpen && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface border border-cobalt-600/25 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-ink-1 hover:bg-cobalt-700/15 transition-colors duration-150"
                    >
                      <LayoutDashboard size={15} className="text-accent-hi" />
                      Mi Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-ink-3 hover:bg-cobalt-700/15 hover:text-ink-1 transition-colors duration-150 border-t border-cobalt-600/10"
                    >
                      <LogOut size={15} className="text-ink-3" />
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-ink-3 hover:text-ink-1 transition-colors duration-200"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/cursos"
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Ver Cursos
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ink-3 hover:text-ink-1 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-cobalt-600/10"
          >
            <div className="px-4 py-4 space-y-1 bg-scene/98">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150',
                    isActive(link.href)
                      ? 'text-accent-hi bg-cobalt-600/10'
                      : 'text-ink-3 hover:text-ink-1 hover:bg-surface'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile theme selector */}
              <div className="px-3 py-2">
                <p className="text-xs text-ink-4 mb-2 font-medium uppercase tracking-wide">Tema</p>
                <div className="flex gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      title={t.label}
                      className={cn(
                        'w-7 h-7 rounded-full border-2 transition-all duration-150',
                        theme === t.id ? 'border-cobalt-400 scale-110' : 'border-transparent hover:border-cobalt-600/40'
                      )}
                      style={{ background: t.swatch, borderColor: theme === t.id ? undefined : t.border }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-cobalt-600/10 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink-1 hover:bg-surface rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-accent-hi" />
                      Mi Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-ink-3 hover:bg-surface rounded-lg transition-colors"
                    >
                      <LogOut size={15} />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2.5 text-sm font-medium text-ink-3 hover:text-ink-1 hover:bg-surface rounded-lg transition-colors text-center"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/cursos"
                      className="block px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-cobalt-600 to-cobalt-500 text-white rounded-lg text-center"
                    >
                      Ver Cursos
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string
  children: React.ReactNode
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors duration-200 group',
        active ? 'text-accent-hi' : 'text-ink-3 hover:text-ink-1'
      )}
    >
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cobalt-600 to-cobalt-400 rounded-full transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  )
}
