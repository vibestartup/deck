import { motion } from 'framer-motion'

export function MarketSizeSlide() {
  const marketData = [
    { 
      label: 'Traditional incorporation', 
      value: '$6B TAM', 
      detail: 'Formation fees only. US: $1.2B, EU: $1.8B, APAC: $3.0B. Growing 8% annually.'
    },
    { 
      label: 'Expanded TAM (formation + ops)', 
      value: '$25B globally', 
      detail: 'Formation + accounting + legal + operations. Captures full entrepreneur lifecycle value.'
    },
    { 
      label: 'Serviceable addressable market', 
      value: '$2B (digital-first)', 
      detail: '5M digital formations annually. Tech-savvy entrepreneurs willing to pay premium for speed.'
    },
    { 
      label: 'Serviceable obtainable market', 
      value: '$200M (10% SAM)', 
      detail: 'Viral adoption targeting: SF → LA → NYC → Austin → distributed remote founders.'
    }
  ]

  const competitiveMatrix = [
    { 
      metric: 'Formation time', 
      stripeAtlas: '2-3 weeks', 
      legalZoom: '3-5 days', 
      vibeStartup: '<1 hour',
      advantage: 'API-first Delaware integration + pre-filled templates'
    },
    { 
      metric: 'Viral coefficient', 
      stripeAtlas: '0.0', 
      legalZoom: '0.0', 
      vibeStartup: '0.4',
      advantage: 'Social sharing mechanics + founder network effects'
    },
    { 
      metric: 'LTV/CAC ratio', 
      stripeAtlas: '~3x', 
      legalZoom: '~2x', 
      vibeStartup: '75.6x',
      advantage: 'Viral acquisition + multi-company founder lifecycle'
    },
    { 
      metric: 'Annual formations', 
      stripeAtlas: '27k', 
      legalZoom: '2M+', 
      vibeStartup: '87k (Y1)',
      advantage: 'Exponential growth via viral mechanics'
    },
    { 
      metric: 'Revenue per customer', 
      stripeAtlas: '$500 (one-time)', 
      legalZoom: '$300+ (one-time)', 
      vibeStartup: '$597 (recurring)',
      advantage: 'Subscription model + operational services'
    }
  ]

  const defensibility = [
    { 
      factor: 'Network effects', 
      strength: 'High',
      detail: 'Each founder becomes acquisition channel. 630 founders → 3,150 impressions → 252 signups monthly compound growth.'
    },
    { 
      factor: 'Switching costs', 
      strength: 'Medium-High',
      detail: 'Legal entity migration expensive ($2-5k). Operational integrations create stickiness. Company formation is one-time but operations are ongoing.'
    },
    { 
      factor: 'Regulatory moat', 
      strength: 'Medium',
      detail: 'Multi-state compliance team. Delaware relationship building. 50-state incorporation capability requires legal infrastructure investment.'
    },
    { 
      factor: 'Brand/cultural moat', 
      strength: 'High',
      detail: 'First-mover advantage in "viral company formation" category. Gen Z brand recognition. Community-driven growth vs traditional marketing.'
    }
  ]

  const marketTiming = [
    { 
      trend: 'Remote work normalization', 
      impact: 'Geographic constraints eliminated',
      data: '42% of workforce now remote-capable (2024 vs 5% pre-2020)'
    },
    { 
      trend: 'Fintech infrastructure maturation', 
      impact: 'API-first banking/payments available',
      data: 'Stripe, Plaid, Mercury enable instant business accounts. 99.9% uptime SLAs.'
    },
    { 
      trend: 'Regulatory digitization', 
      impact: 'State incorporation systems modernized',
      data: 'Delaware online portal (2019), 37 states now offer online filing. Average processing time down 60%.'
    },
    { 
      trend: 'AI acceleration', 
      impact: 'Technical building commoditized',
      data: 'GitHub Copilot adoption up 180% YoY. MVP development time reduced 70%. Focus shifts to distribution/network effects.'
    }
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
          Market Size & Competitive Domination
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          Winner-take-most market with network effects
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">Market Opportunity</h2>
            <div className="space-y-6">
              {marketData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-300">{item.label}</p>
                    <p className="text-lg font-bold text-green-400">{item.value}</p>
                  </div>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-4 border-purple-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Defensibility Factors</h2>
            <div className="space-y-6">
              {defensibility.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-300">{item.factor}</p>
                    <p className="text-sm font-bold text-purple-400">{item.strength}</p>
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
          className="border-t-4 border-yellow-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">COMPETITIVE ANALYSIS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-yellow-500/30">
                  <th className="text-left py-3 text-yellow-400 font-semibold">Metric</th>
                  <th className="text-left py-3 text-gray-400">Stripe Atlas</th>
                  <th className="text-left py-3 text-gray-400">LegalZoom</th>
                  <th className="text-left py-3 text-yellow-400 font-semibold">VibeStartup</th>
                  <th className="text-left py-3 text-gray-400">Our Advantage</th>
                </tr>
              </thead>
              <tbody>
                {competitiveMatrix.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                    className="border-b border-yellow-500/10"
                  >
                    <td className="py-3 text-yellow-400 font-medium">{row.metric}</td>
                    <td className="py-3 text-gray-400">{row.stripeAtlas}</td>
                    <td className="py-3 text-gray-400">{row.legalZoom}</td>
                    <td className="py-3 text-yellow-400 font-semibold">{row.vibeStartup}</td>
                    <td className="py-3 text-gray-400 text-xs">{row.advantage}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t-4 border-blue-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">MARKET TIMING</h2>
          <div className="grid grid-cols-2 gap-8">
            {marketTiming.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="border-l-2 border-blue-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-blue-400 mb-1">{item.trend}</p>
                <p className="text-sm text-gray-300 mb-2">{item.impact}</p>
                <p className="text-xs text-gray-500">{item.data}</p>
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
            <p><strong>TAM Calculation:</strong> World Bank data: 30M+ annual global business formations. Average lifecycle value: $833 (formation + accounting + legal + operations). 20% growth rate as digital economy expands.</p>
            <p><strong>Competitive Moats:</strong> Stripe Atlas dominates developer market but lacks viral mechanics. LegalZoom has scale but no network effects. We combine both: technical excellence + viral growth + network effects.</p>
            <p><strong>Winner-Take-Most Dynamics:</strong> Network effects create exponential advantage. Each new founder increases platform value for all users. First to reach critical mass (10k+ active founders) captures majority market share.</p>
            <p><strong>Path to Dominance:</strong> Month 1-12: Prove viral mechanics (630 → 25k companies). Month 13-24: Scale operations (multi-state compliance). Month 25+: International expansion (UK, Canada, EU).</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 