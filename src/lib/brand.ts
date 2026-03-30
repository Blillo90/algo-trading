/**
 * Configuración centralizada de identidad de marca.
 * Cualquier componente que muestre nombre, logo, claim o datos de contacto
 * debe importar desde aquí. Para cambiar la marca, edita solo este archivo.
 */
export const BRAND = {
  /** Nombre visible de la marca. */
  name: 'RobotEdge',
  /** Abreviatura usada como fallback si el logo SVG no carga. */
  initials: 'RE',
  /** Claim corporativo principal. */
  claim: 'Trading algorítmico basado en datos, estadística y método.',
  /** Tagline corto para hero y cabeceras. */
  tagline: 'Formación en Trading Cuantitativo',
  /** Ruta del logo SVG en /public.
   * Para sustituir el logo: reemplaza el archivo /public/logo-robotedge.svg
   * con el asset definitivo manteniendo el mismo nombre de archivo. */
  logo: '/logo-robotedge.svg',
  /** Email de contacto y soporte. */
  email: 'hola@robotedge.tech',
  /** URLs de redes sociales. */
  social: {
    twitter: '#',   // TODO: añadir @handle real
    linkedin: '#',  // TODO: añadir URL de perfil/empresa real
    youtube: '#',   // TODO: añadir canal real
  },
} as const
