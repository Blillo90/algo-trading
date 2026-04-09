import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block text-xs font-medium tracking-widest text-slate-400 uppercase mb-6">
          Algorithmic Trading Research
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6 max-w-3xl">
          Trade with{' '}
          <span className="text-slate-400">mathematical</span>{' '}
          precision.
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
          Evidence-based strategies, rigorous backtesting, and systematic
          execution. In-depth research to help you build trading systems
          that work.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Read the Blog
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center justify-center text-slate-600 border border-slate-200 px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
