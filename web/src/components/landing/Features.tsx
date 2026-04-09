const features = [
  {
    title: 'Systematic Approach',
    description:
      'Every strategy is defined by explicit, testable rules — removing emotional bias from the trading process entirely.',
  },
  {
    title: 'Rigorous Backtesting',
    description:
      'Validate strategies against historical data with proper statistical methods before risking a single dollar.',
  },
  {
    title: 'Risk Management',
    description:
      'Position sizing, drawdown limits, and portfolio construction treated with the same rigor as signal generation.',
  },
  {
    title: 'Live Deployment',
    description:
      'From research to production: brokers, execution infrastructure, and live monitoring explained in detail.',
  },
]

export default function Features() {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-lg mb-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Built on first principles
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Systematic trading is not a black box. We break down each component
            so you understand exactly what you&apos;re building and why it works.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3">
              <div className="w-6 h-px bg-slate-900" />
              <h3 className="font-semibold text-slate-900 text-sm">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
