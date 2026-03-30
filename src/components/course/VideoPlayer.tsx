'use client'

import { useState } from 'react'
import { Play, Volume2, Maximize, Clock } from 'lucide-react'
import type { Lesson } from '@/types'

interface VideoPlayerProps {
  lesson: Lesson
}

function formatDuration(minutes: number): string {
  const m = Math.floor(minutes)
  return `${m}:00`
}

export default function VideoPlayer({ lesson }: VideoPlayerProps) {
  const [hovered, setHovered] = useState(false)

  if (lesson.videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
        <video
          src={lesson.videoUrl}
          controls
          className="w-full h-full"
          poster=""
        />
      </div>
    )
  }

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#030810] border border-[#2563EB]/20 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background circuit/grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Animated chart SVG background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 800 450"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,300 100,260 200,280 300,180 400,220 500,120 600,160 700,80 800,100"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
        />
        <polyline
          points="0,350 100,320 200,340 300,290 400,310 500,250 600,270 700,200 800,220"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        {/* Candlesticks */}
        {[100, 200, 300, 400, 500, 600, 700].map((x, i) => {
          const isGreen = i % 2 === 0
          const bodyTop = 200 + Math.random() * 60
          const bodyH = 20 + Math.random() * 30
          return (
            <g key={x}>
              <line
                x1={x}
                y1={bodyTop - 15}
                x2={x}
                y2={bodyTop + bodyH + 15}
                stroke={isGreen ? '#34D399' : '#F87171'}
                strokeWidth="1"
                opacity="0.4"
              />
              <rect
                x={x - 7}
                y={bodyTop}
                width="14"
                height={bodyH}
                fill={isGreen ? '#34D399' : '#F87171'}
                opacity="0.25"
              />
            </g>
          )
        })}
      </svg>

      {/* Center glow */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Course branding */}
      <div className="absolute top-4 left-5 flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#2563EB]/30 border border-[#2563EB]/40 flex items-center justify-center">
          <span className="text-[#60A5FA] text-[8px] font-bold font-mono">AT</span>
        </div>
        <span className="text-[#60A5FA]/70 text-xs font-medium">AlgoTrader Pro</span>
      </div>

      {/* Duration indicator */}
      <div className="absolute top-4 right-5 flex items-center gap-1.5 bg-[#030810]/80 border border-[#2563EB]/20 rounded-lg px-2.5 py-1">
        <Clock size={11} className="text-[#60A5FA]" />
        <span className="text-[#94A3B8] text-xs font-mono">{lesson.duration} min</span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          className={`w-18 h-18 rounded-full border-2 border-[#2563EB]/50 bg-[#2563EB]/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            hovered
              ? 'scale-110 border-[#60A5FA] bg-[#2563EB]/35 shadow-[0_0_40px_rgba(37,99,235,0.6)]'
              : 'shadow-[0_0_25px_rgba(37,99,235,0.35)]'
          }`}
          style={{ width: 72, height: 72 }}
          aria-label="Reproducir lección"
        >
          <Play
            size={26}
            className="text-white fill-white ml-1 transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          />
        </button>
        <p className="mt-4 text-[#94A3B8] text-sm font-medium opacity-80">
          Video próximamente disponible
        </p>
        <p className="text-[#4A5568] text-xs mt-1">{lesson.title}</p>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#030810] to-transparent flex items-end px-4 pb-2">
        <div className="flex items-center gap-3 w-full">
          {/* Progress bar (static) */}
          <div className="flex-1 h-1 bg-[#1B3A5C] rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full" />
          </div>
          <span className="text-[#94A3B8] text-[10px] font-mono flex-shrink-0">
            0:00 / {formatDuration(lesson.duration)}
          </span>
          <Volume2 size={12} className="text-[#94A3B8] flex-shrink-0" />
          <Maximize size={12} className="text-[#94A3B8] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
