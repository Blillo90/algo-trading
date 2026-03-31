import type { NextConfig } from 'next'

// ---------------------------------------------------------------------------
// Content-Security-Policy
//
// Concesiones por compatibilidad con Next.js App Router:
//   - script-src: incluye 'unsafe-inline' porque Next.js inyecta scripts inline
//     para la hidratación RSC. Para eliminarlo habría que implementar nonces
//     via middleware (middleware.ts) — pendiente si se quiere hardening adicional.
//   - style-src: incluye 'unsafe-inline' porque Tailwind genera estilos inline
//     y Next.js también los usa internamente.
//
// Para endurecer más en el futuro:
//   - Implementar middleware.ts que inyecte un nonce por request
//   - Pasar el nonce a <Script nonce={...}> y al CSP header dinámicamente
//   - Eso permite reemplazar 'unsafe-inline' por 'nonce-...' en script-src
// ---------------------------------------------------------------------------
const csp = [
  "default-src 'self'",
  // Next.js App Router requiere 'unsafe-inline' sin infraestructura de nonces
  "script-src 'self' 'unsafe-inline'",
  // Tailwind + Next.js usan estilos inline; Google Fonts carga CSS externo
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Archivos de fuente desde Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com",
  // Imágenes locales, data URIs y blob (Next.js Image optimization)
  "img-src 'self' data: blob:",
  // Supabase REST + Auth + Realtime (WebSocket)
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  // Bloquear embedding en iframes de terceros
  "frame-ancestors 'none'",
  // Sin plugins de objeto (Flash, etc.)
  "object-src 'none'",
  // Prevenir injection via base tag
  "base-uri 'self'",
  // Formularios solo apuntan al propio origen
  "form-action 'self'",
  // Forzar HTTPS en recursos mixtos
  "upgrade-insecure-requests",
].join('; ')

// ---------------------------------------------------------------------------
// Headers de seguridad aplicados a todas las rutas
// ---------------------------------------------------------------------------
const securityHeaders = [
  // CSP principal
  { key: 'Content-Security-Policy', value: csp },
  // Anti-clickjacking para navegadores que no soportan frame-ancestors en CSP
  { key: 'X-Frame-Options', value: 'DENY' },
  // Evitar MIME-sniffing del navegador
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // No enviar Referer completo a orígenes externos
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Deshabilitar APIs del navegador que no se usan
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  // Elimina la cabecera X-Powered-By: Next.js
  poweredByHeader: false,

  async headers() {
    return [
      // Headers de seguridad para todas las páginas y rutas de API
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // La página de login no debe cachearse — evita que credenciales
      // o tokens queden en caches de proxies o del navegador
      {
        source: '/login',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

export default nextConfig
