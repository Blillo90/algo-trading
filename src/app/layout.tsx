import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

const antiFlashScript = `(function(){try{var t=localStorage.getItem('re-theme');if(t&&['dark','graphite','acero','fog','light'].includes(t)){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`

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
  metadataBase: new URL('https://robotedge.tech'),
  title: {
    default: 'RobotEdge — Formación en Trading Algorítmico',
    template: '%s | RobotEdge',
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
    'RobotEdge',
  ],
  authors: [{ name: 'RobotEdge' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://robotedge.tech',
    siteName: 'RobotEdge',
    title: 'RobotEdge — Formación en Trading Algorítmico',
    description:
      'Construye sistemas de trading que operan con disciplina matemática. Formación profesional en trading algorítmico y cuantitativo.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RobotEdge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RobotEdge — Formación en Trading Algorítmico',
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
        {/* Anti-flash: reads localStorage before first paint to avoid theme flicker */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
