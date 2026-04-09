import Link from 'next/link'

export default function BlogCTA() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start reading</h2>
        <p className="text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto">
          Explore our latest articles on strategy development, risk management,
          and the practicalities of running algorithmic trading systems.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center bg-white text-slate-900 px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors"
        >
          View all articles
        </Link>
      </div>
    </section>
  )
}
