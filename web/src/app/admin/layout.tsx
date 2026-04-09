import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin — RobotEdge',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="border-b border-slate-200 bg-white px-6 h-12 flex items-center">
        <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
          RobotEdge Admin
        </span>
      </div>
      {children}
    </div>
  )
}
