import { motion } from 'framer-motion'

export function TheAskSlide() {
  const useOfFunds = [
    { 
      category: 'Core infrastructure development', 
      amount: '$15k', 
      details: 'API development, payment integration, state filing automation, dashboard UI',
      technical: 'Next.js frontend, Node.js backend, PostgreSQL, Stripe integration, Delaware API, AWS deployment'
    },
    { 
      category: '4-month viral marketing runway', 
      amount: '$20k', 
      details: '$5k/month content creation and promotion budget',
      technical: 'Video production, influencer partnerships, paid social amplification, UTM tracking, conversion optimization'
    },
    { 
      category: 'Multi-state legal compliance', 
      amount: '$10k', 
      details: 'Legal entity setup, compliance frameworks, regulatory research',
      technical: '50-state incorporation capability, automated compliance monitoring, legal document templates, regulatory database'
    },
    { 
      category: 'Initial vibefund treasury', 
      amount: '$5k', 
      details: 'Seed funding for founder-to-founder investment feature',
      technical: 'Dogfooding our own platform, proof of concept for peer investment mechanics, regulatory compliance testing'
    }
  ]

  const returnScenarios = [
    { 
      timeline: 'Year 1 exit', 
      multiple: '10x revenue', 
      valuation: '$220M', 
      return: '110x',
      assumptions: 'Enterprise acquisition. $22M revenue × 10x multiple. Strategic premium for viral growth engine.'
    },
    { 
      timeline: 'Year 2 exit', 
      multiple: '8x revenue', 
      valuation: '$624M', 
      return: '312x',
      assumptions: 'Public market comparable. $78M revenue × 8x multiple. SaaS public market median multiple.'
    },
    { 
      timeline: 'Year 3 exit', 
      multiple: '6x revenue', 
      valuation: '$936M', 
      return: '468x',
      assumptions: 'IPO scenario. $156M revenue × 6x multiple. Mature SaaS company valuation with network effects premium.'
    }
  ]

  const whyThisWorks = [
    { 
      reason: '50x LTV/CAC ratio', 
      benchmark: 'vs 3-5x industry standard',
      detail: 'Viral mechanics create exponential acquisition efficiency. Each customer becomes acquisition channel.'
    },
    { 
      reason: 'Break-even month 2', 
      benchmark: 'with 85% gross margins',
      detail: 'AWS credits eliminate infrastructure costs year 1. Profitable from 882 companies onward.'
    },
    { 
      reason: '$3.6M ARR by month 12', 
      benchmark: 'Series A ready',
      detail: 'Proven viral growth engine. Network effects accelerating. Multi-state compliance proven.'
    },
    { 
      reason: 'Multiple exit paths', 
      benchmark: 'de-risked investment',
      detail: 'Strategic acquirers (Stripe, LegalZoom), financial buyers (PE), public markets (IPO) all viable.'
    }
  ]

  const investmentTerms = [
    { term: 'Investment amount', value: '$50k SAFE', detail: 'Simple Agreement for Future Equity. Standard YC terms.' },
    { term: 'Valuation cap', value: '$2M', detail: 'Conservative pre-money valuation. 2.5% equity at cap.' },
    { term: 'Discount rate', value: '20%', detail: 'Discount to next round pricing. Standard seed investor protection.' },
    { term: 'Use of funds', value: '4-6 months runway', detail: 'Prove product-market fit. Achieve viral coefficient >0.4.' },
    { term: 'Next milestone', value: '$1M Series A', detail: 'At $300k+ MRR with proven viral growth (month 12).' }
  ]

  return (
    <div className="w-full flex flex-col px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight">
          The Ask & Return Potential
        </h1>
        <p className="text-2xl text-green-400 mb-12 text-center font-medium">
          $50k SAFE → $100M+ valuation (conservative)
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">USE OF FUNDS</h2>
            <div className="space-y-6">
              {useOfFunds.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-blue-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-300">{item.category}</p>
                    <p className="text-lg font-bold text-blue-400">{item.amount}</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.details}</p>
                  <p className="text-xs text-gray-500">{item.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">WHY THIS WORKS</h2>
            <div className="space-y-6">
              {whyThisWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-green-400 mb-1">{item.reason}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.benchmark}</p>
                  </div>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-purple-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-400">RETURN SCENARIOS (at typical SaaS multiples)</h2>
          <div className="grid grid-cols-3 gap-8">
            {returnScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l-2 border-purple-500/30 pl-4"
              >
                <p className="text-lg font-bold text-purple-400 mb-2">{scenario.timeline}</p>
                <p className="text-sm text-gray-300 mb-2">{scenario.multiple}</p>
                <p className="text-2xl font-bold text-purple-300 mb-1">{scenario.valuation}</p>
                <p className="text-sm text-gray-400 mb-3">valuation</p>
                <p className="text-3xl font-bold text-green-400 mb-2">{scenario.return}</p>
                <p className="text-sm text-gray-400 mb-3">return</p>
                <p className="text-xs text-gray-500">{scenario.assumptions}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t-4 border-yellow-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">INVESTMENT TERMS</h2>
          <div className="grid grid-cols-5 gap-6">
            {investmentTerms.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="border-l-2 border-yellow-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-yellow-400 mb-1">{item.term}</p>
                <p className="text-sm text-gray-300 mb-2">{item.value}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Risk Mitigation:</strong> Multiple revenue streams, proven viral mechanics, low-touch business model. Break-even in month 2 reduces funding dependency. Exit opportunities at multiple stages.</p>
            <p><strong>Competitive Advantage:</strong> Network effects create winner-take-most dynamics. First-mover advantage in viral company formation. Technical moats via multi-state integration take years to replicate.</p>
            <p><strong>Market Timing:</strong> Perfect convergence of AI acceleration, VC timeline compression, and Gen Z entrepreneurship. Regulatory environment favorable with state digitization complete.</p>
            <p><strong>Investment Thesis:</strong> Viral growth engine + SaaS economics = exceptional returns. 75x LTV/CAC ratio unprecedented in B2B. Conservative 100x+ return potential even at modest exit multiples.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 