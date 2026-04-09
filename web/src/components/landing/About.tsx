export default function About() {
  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Who we are</h2>
          <p className="text-slate-500 mb-4 leading-relaxed">
            RobotEdge is a research publication focused on algorithmic and
            quantitative trading. We believe that transparent, methodical analysis
            leads to better outcomes than intuition-driven decisions.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Our blog covers strategy development, risk frameworks, Python
            implementation, and market microstructure — written by practitioners
            for practitioners.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
                Focus
              </dt>
              <dd className="text-slate-800 font-medium text-sm">
                Systematic &amp; Quantitative Trading
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
                Format
              </dt>
              <dd className="text-slate-800 font-medium text-sm">
                Long-form Research Articles
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
                Language
              </dt>
              <dd className="text-slate-800 font-medium text-sm">
                English &amp; Spanish
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-1">
                Topics
              </dt>
              <dd className="text-slate-800 font-medium text-sm">
                Backtesting, Risk, Python, Live Trading
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
