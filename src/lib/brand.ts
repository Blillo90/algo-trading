/**
 * Configuración centralizada de identidad de marca.
 *
 * TODO: Antes de publicar en producción, sustituir todos los valores por el
 * branding oficial autorizado (nombre definitivo, claim, email, redes sociales).
 * Cualquier componente que muestre el nombre de marca o claim debe importar desde aquí.
 *
 * Para sustituir el logo gráfico, edita el componente BrandLogo en:
 * src/components/layout/BrandLogo.tsx (pendiente de crear con asset oficial).
 */
export const BRAND = {
  /** Nombre visible de la marca. TODO: confirmar nombre definitivo y autorización antes de publicar. */
  name: 'AlgoTrader Pro',
  /** Abreviatura para el icono del logo. TODO: reemplazar con logo SVG oficial. */
  initials: 'AT',
  /** Claim corporativo principal que acompaña al nombre. */
  claim: 'Trading algorítmico basado en datos, estadística y método.',
  /** Tagline corto para hero y cabeceras. */
  tagline: 'Formación en Trading Cuantitativo',
  /** Email de contacto y soporte. TODO: configurar con email real antes de publicar. */
  email: 'hola@algotraderpro.es',
  /** URLs de redes sociales. TODO: añadir handles reales antes de publicar. */
  social: {
    twitter: '#',   // TODO: añadir @handle real
    linkedin: '#',  // TODO: añadir URL de perfil/empresa real
    youtube: '#',   // TODO: añadir canal real
  },
} as const
