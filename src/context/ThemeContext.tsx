'use client'

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'

export type Theme = 'dark' | 'graphite' | 'acero' | 'fog' | 'light'

export interface ThemeEntry {
  id: Theme
  label: string
  /** Representative swatch color */
  swatch: string
  /** Border for light swatches */
  border?: string
}

export const THEMES: ThemeEntry[] = [
  { id: 'dark',     label: 'Oscuro',  swatch: '#030810' },
  { id: 'graphite', label: 'Grafito', swatch: '#1A2336' },
  { id: 'acero',    label: 'Acero',   swatch: '#ACBACE', border: '#7692B2' },
  { id: 'fog',      label: 'Niebla',  swatch: '#E4EAF3', border: '#CBD5E1' },
  { id: 'light',    label: 'Claro',   swatch: '#FFFFFF', border: '#CBD5E1' },
]

const STORAGE_KEY = 're-theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to 'dark' — anti-flash inline script has already set data-theme
  // from localStorage before this mounts, so there is no flash.
  const [theme, setThemeState] = useState<Theme>('dark')
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved && THEMES.find((t) => t.id === saved)) {
      setThemeState(saved)
      // data-theme was already set by the inline script; setting again is safe
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem(STORAGE_KEY, t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
