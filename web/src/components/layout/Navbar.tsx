import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-900 font-semibold text-base tracking-tight"
        >
          RobotEdge
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#about"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Read Articles
          </Link>
        </nav>
      </div>
    </header>
  )
}
