'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

interface StatsWidgetProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  change?: {
    value: string
    positive: boolean
  }
}

export default function StatsWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
}: StatsWidgetProps) {
  const [displayed, setDisplayed] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''))
  const isNumeric = !isNaN(numericValue) && numericValue > 0

  useEffect(() => {
    if (!isNumeric) return
    const target = numericValue
    const duration = 800
    const steps = 40
    const increment = target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, target)
      setDisplayed(Math.round(current))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericValue, isNumeric])

  const displayValue = isNumeric
    ? typeof value === 'string'
      ? String(value).replace(/[0-9.]+/, String(displayed))
      : displayed
    : value

  return (
    <div className="bg-surface border border-cobalt-600/15 rounded-2xl p-6 hover:border-cobalt-600/35 hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-ink-3 text-sm font-medium mb-1">{title}</p>
          <p className="font-bold font-mono text-3xl text-ink-1">{displayValue}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cobalt-600/25 to-cobalt-700/15 border border-cobalt-600/25 flex items-center justify-center group-hover:border-cobalt-600/50 transition-colors duration-300">
          <Icon size={20} className="text-accent-hi" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-ink-3 text-xs">{subtitle}</p>
        {change && (
          <span
            className={`text-xs font-semibold font-mono ${
              change.positive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {change.positive ? '+' : ''}
            {change.value}
          </span>
        )}
      </div>
    </div>
  )
}
