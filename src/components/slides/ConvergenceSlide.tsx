import { motion } from 'framer-motion'

export function ConvergenceSlide() {
  const shifts = [
    { 
      title: "AI commoditizes building", 
      subtitle: "differentiation comes from VIBES",
      technical: "GPT-4 reduces development time by 80%. Technical differentiation window compressed from 2-3 years to 6-12 months. Success depends on network effects, brand, and viral growth rather than technical moats."
    },
    { 
      title: "VC timelines compressing", 
      subtitle: "7-10 years → 2-5 years → rapid iteration wins",
      technical: "Median time to exit down 40% since 2020. Funds targeting 3-5x returns in 24-36 months. Portfolio companies must show traction within 18 months or face down rounds. Iteration velocity becomes primary success metric."
    },
    { 
      title: "Gen Z treats companies like social profiles", 
      subtitle: "disposable, iterative, viral",
      technical: "47% of Gen Z has started a business vs 24% millennials. Average company lifespan expectations: 18 months vs 5+ years historically. Social media native generation expects viral growth mechanics in all platforms."
    }
  ]

  const brokenSystemData = [
    { 
      point: "30M+ new businesses globally per year, $25B+ market growing 20%",
      detail: "US: 5.48M new businesses (2023). EU: 2.8M. APAC: 21.2M. Total addressable market expanding 20%+ annually as more economic activity moves online."
    },
    { 
      point: "Formation takes 2-3 weeks, costs $500+, zero operational integration",
      detail: "Delaware C-Corp: 7-10 business days minimum. EIN: 2-3 weeks. Banking: additional 1-2 weeks. Total cost: $500-2000 (filing fees, legal, accounting). No operational tools included."
    },
    { 
      point: "Stripe Atlas/LegalZoom solving formation in isolation vs building full stack",
      detail: "Stripe Atlas: 27,000 companies formed, $500 fee, formation only. LegalZoom: 2M+ companies, $300+ fees, no viral mechanics. Both lack: task marketplace, founder network, funding integration."
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
          The Convergence Moment
        </h1>
        <p className="text-2xl text-blue-400 mb-16 text-center font-medium">
          Making company formation as viral as TikTok
        </p>

        <div className="grid grid-cols-3 gap-12 mb-16">
          {shifts.map((shift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="border-l-4 border-blue-500 pl-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-white">{shift.title}</h3>
              <p className="text-lg text-gray-300 mb-4 font-medium">{shift.subtitle}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{shift.technical}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-red-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">THE BROKEN SYSTEM</h2>
          
          <div className="space-y-6">
            {brokenSystemData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l-2 border-red-500/50 pl-6"
              >
                <p className="text-lg font-semibold text-gray-200 mb-2">• {item.point}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Technical Context:</strong> Perfect storm convergence. AI democratizes building (GitHub Copilot adoption up 180%), VC funds under pressure for faster returns (median fund life down from 10 to 7 years), and digital natives expect consumer-grade UX in B2B tools.</p>
            <p><strong>Market Dynamics:</strong> Current players optimize for legal compliance, not viral growth. Opportunity exists for platform that combines formation with operational tools and network effects. Winner-take-most market due to network effects and switching costs.</p>
            <p><strong>Timing Advantage:</strong> Regulatory environment stabilizing (Delaware Online Portal launched 2019), fintech infrastructure mature (Stripe, Plaid), and remote-first culture reducing geographic constraints on company formation.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 