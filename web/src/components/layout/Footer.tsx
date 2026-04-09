import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold text-slate-900 tracking-tight">
          RobotEdge
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/blog"
            className="text-sm text-slate-400 hover:text-slate-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#about"
            className="text-sm text-slate-400 hover:text-slate-900 transition-colors"
          >
            About
          </Link>
        </nav>
        <p className="text-xs text-slate-400">
          &copy; {year} RobotEdge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
