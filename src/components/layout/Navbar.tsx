'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
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
  const { user, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-[#030810]/98 border-[#2563EB]/20 shadow-[0_1px_20px_rgba(37,99,235,0.15)]'
          : 'bg-[#030810]/90 border-[#2563EB]/10'
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
          <span className="font-syne font-bold text-lg bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
            {BRAND.name}
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#E2E8F0] hover:bg-[#0A1628] transition-colors duration-200 text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    'text-[#94A3B8] transition-transform duration-200',
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
                    className="absolute right-0 top-full mt-2 w-48 bg-[#0A1628] border border-[#2563EB]/25 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-[#E2E8F0] hover:bg-[#1B4FD8]/15 transition-colors duration-150"
                    >
                      <LayoutDashboard size={15} className="text-[#60A5FA]" />
                      Mi Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#94A3B8] hover:bg-[#1B4FD8]/15 hover:text-[#E2E8F0] transition-colors duration-150 border-t border-[#2563EB]/10"
                    >
                      <LogOut size={15} className="text-[#94A3B8]" />
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
                className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-200"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/cursos"
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Ver Cursos
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
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
            className="md:hidden overflow-hidden border-t border-[#2563EB]/10"
          >
            <div className="px-4 py-4 space-y-1 bg-[#030810]/98">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#0A1628] rounded-lg transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#2563EB]/10 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#E2E8F0] hover:bg-[#0A1628] rounded-lg transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-[#60A5FA]" />
                      Mi Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:bg-[#0A1628] rounded-lg transition-colors"
                    >
                      <LogOut size={15} />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#0A1628] rounded-lg transition-colors text-center"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/cursos"
                      className="block px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-lg text-center"
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
        active ? 'text-[#60A5FA]' : 'text-[#94A3B8] hover:text-[#E2E8F0]'
      )}
    >
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  )
}
