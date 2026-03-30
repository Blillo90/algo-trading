import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AlgoTrader Pro — Formación en Trading Algorítmico',
    template: '%s | AlgoTrader Pro',
  },
  description:
    'Aprende a construir, validar y desplegar sistemas de trading algorítmico con rigor cuantitativo. El programa más completo en español para traders sistemáticos.',
  keywords: [
    'trading algorítmico',
    'trading cuantitativo',
    'backtesting',
    'Python trading',
    'sistemas de trading',
    'automatización trading',
    'gestión de riesgo',
  ],
  authors: [{ name: 'Alejandro Vidal' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://algotraderpro.es',
    siteName: 'AlgoTrader Pro',
    title: 'AlgoTrader Pro — Formación en Trading Algorítmico',
    description:
      'Construye sistemas de trading que operan con disciplina matemática. Formación profesional en trading algorítmico y cuantitativo.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlgoTrader Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoTrader Pro — Formación en Trading Algorítmico',
    description:
      'Construye sistemas de trading con rigor cuantitativo. El programa más completo en español.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030810] text-[#E2E8F0] antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
