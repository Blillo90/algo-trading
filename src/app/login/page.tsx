'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft, TrendingUp, Shield, Hexagon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, introduce tu email y contraseña.')
      return
    }
    setIsLoading(true)
    setError('')
    // Simulate slight delay for UX
    await new Promise((res) => setTimeout(res, 600))
    const result = login(email, password)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error ?? 'Error al iniciar sesión')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-[#030810]">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#050D1C] border-r border-[#2563EB]/15 flex-col justify-between p-12">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Orb */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="relative">
              <Hexagon size={28} className="text-[#2563EB] fill-[#2563EB]/20" strokeWidth={1.5} />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#60A5FA] font-mono">
                AT
              </span>
            </div>
            <span className="font-syne font-bold text-lg bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              AlgoTrader Pro
            </span>
          </Link>

          <h2 className="font-syne font-bold text-4xl text-white mb-4 leading-tight">
            Bienvenido a tu{' '}
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              centro de formación
            </span>
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-12">
            Accede a tu contenido, continúa donde lo dejaste y sigue construyendo sistemas de
            trading que funcionan.
          </p>

          {/* Animated metrics */}
          <div className="space-y-4">
            {[
              { label: 'Win Rate promedio alumnos', value: '64.8%', color: 'text-emerald-400' },
              { label: 'Sharpe medio tras el curso', value: '2.1', color: 'text-[#60A5FA]' },
              { label: 'Sistemas en producción', value: '340+', color: 'text-[#60A5FA]' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-center justify-between bg-[#0A1628]/60 border border-[#2563EB]/15 rounded-xl px-5 py-3"
              >
                <span className="text-[#94A3B8] text-sm">{metric.label}</span>
                <span className={`font-bold font-mono ${metric.color}`}>{metric.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-[#4A5568] text-xs">
          <Shield size={12} />
          Plataforma segura y cifrada · AlgoTrader Pro © 2025
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#E2E8F0] text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-[#60A5FA]" />
                <span className="text-[#60A5FA] text-sm font-medium">Acceso a la plataforma</span>
              </div>
              <h1 className="font-syne font-bold text-3xl text-white">Bienvenido de nuevo</h1>
              <p className="text-[#94A3B8] mt-2 text-sm">
                Inicia sesión para continuar con tu formación.
              </p>
            </div>

            {/* Demo hint */}
            <div className="bg-[#2563EB]/10 border border-[#2563EB]/25 rounded-xl p-4 mb-8">
              <p className="text-[#60A5FA] text-xs font-semibold mb-1">Credenciales de demo:</p>
              <p className="text-[#94A3B8] text-xs font-mono">
                usuario1@demo.com / password123
              </p>
              <p className="text-[#94A3B8] text-xs font-mono">
                usuario2@demo.com / password123
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[#0A1628] border border-[#2563EB]/25 rounded-xl px-4 py-3 text-[#E2E8F0] placeholder:text-[#4A5568] focus:outline-none focus:border-[#2563EB]/70 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)] transition-all duration-200 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0A1628] border border-[#2563EB]/25 rounded-xl px-4 py-3 pr-11 text-[#E2E8F0] placeholder:text-[#4A5568] focus:outline-none focus:border-[#2563EB]/70 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)] transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#94A3B8] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-[#2563EB] rounded"
                />
                <label htmlFor="remember" className="text-[#94A3B8] text-sm cursor-pointer">
                  Recordar sesión
                </label>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-sm"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
