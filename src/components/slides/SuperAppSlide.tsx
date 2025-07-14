import { motion } from 'framer-motion'

export function SuperAppSlide() {
  const coreFeatures = [
    { 
      name: "vibeco", 
      desc: "one-click incorporation + financial/legal infra (<1 hour vs weeks)",
      technical: "API-first Delaware integration. Pre-filled Articles of Incorporation. Automated EIN generation. Banking partner integrations (Mercury, SVB). Real-time state filing status. Compliance monitoring dashboard."
    },
    { 
      name: "vibeops", 
      desc: "instant microtask marketplace for any operational need",
      technical: "Decentralized task marketplace. Smart contract escrow. Skill-based matching algorithm. Quality scoring system. Integration with Slack, Discord, Telegram. 24/7 operational support coverage."
    },
    { 
      name: "vibefund", 
      desc: "founders investing in each other (aligned incentive network)",
      technical: "Peer-to-peer founder investment platform. Equity modeling tools. Due diligence templates. Pro-rata rights management. Secondary market for founder equity. Network-based deal flow."
    },
    { 
      name: "vibematch", 
      desc: "hinge for finding co-founders and contractors",
      technical: "ML-powered compatibility matching. Skill complementarity analysis. Reference verification system. NDA management. Equity split calculators. Team formation analytics."
    }
  ]

  const growthMetrics = [
    { 
      metric: "Founder sharing behavior", 
      value: "5 people shown per company", 
      detail: "Nielsen sharing data: positive business experiences shared with 5-9 people. Conservative estimate: 5 per founder.",
      technical: "Viral coefficient: 5 × 8% conversion = 0.4 k-factor. Exponential growth: companies(n) = initial × (1.4)^n"
    },
    { 
      metric: "Conversion rate", 
      value: "8% start their own company", 
      detail: "Industry benchmark for B2B referrals: 5-15%. Our estimate: 8% based on founder peer influence.",
      technical: "Conversion tracking: UTM parameters, referral codes, attribution modeling. A/B testing on sharing mechanisms."
    },
    { 
      metric: "Viral amplification", 
      value: "K-factor: 0.4 (conservative)", 
      detail: "Social apps achieve 0.7+ k-factor. Conservative estimate for B2B context.",
      technical: "Monthly compound: 630 → 882 → 1,235 → 1,729 companies. 70%+ growth becomes viral by month 12."
    },
    { 
      metric: "Growth trajectory", 
      value: "630 → 25,511 companies/month", 
      detail: "Month 1 to month 12 exponential growth via viral mechanics.",
      technical: "Monthly growth rate: 40% blended (direct + viral). Cohort retention: 92% monthly. Network effects strengthen with scale."
    }
  ]

  const technicalArchitecture = [
    { component: "API Gateway", detail: "Rate limiting, auth, routing. 99.9% uptime SLA. Auto-scaling." },
    { component: "Formation Engine", detail: "State integration APIs. Document generation. Compliance tracking." },
    { component: "Task Marketplace", detail: "Matching algorithms. Escrow system. Quality scoring." },
    { component: "Social Layer", detail: "Viral sharing. Referral tracking. Network analysis." },
    { component: "Payment Infrastructure", detail: "Stripe Connect. Multi-party transactions. Revenue sharing." },
    { component: "Data Pipeline", detail: "Real-time analytics. Cohort analysis. Predictive modeling." }
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
          The Super-App Solution
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          Full-stack entrepreneurship operating system
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">CORE PLATFORM</h2>
            <div className="space-y-6">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-lg font-bold text-green-400 mb-1">{feature.name}</p>
                    <p className="text-sm text-gray-300 mb-2">{feature.desc}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.technical}</p>
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
            <h2 className="text-3xl font-bold mb-8 text-purple-400">VIRAL GROWTH ENGINE</h2>
            <div className="space-y-6">
              {growthMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-purple-400 mb-1">{metric.metric}</p>
                    <p className="text-sm text-gray-300 mb-2">{metric.value}</p>
                    <p className="text-xs text-gray-400 mb-2">{metric.detail}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{metric.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="border-t-4 border-blue-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">TECHNICAL ARCHITECTURE</h2>
          <div className="grid grid-cols-3 gap-8">
            {technicalArchitecture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="border-l-2 border-blue-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-blue-400 mb-2">{item.component}</p>
                <p className="text-xs text-gray-400">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Platform Strategy:</strong> Build formation as hook, expand to full operational suite. Each module increases stickiness and LTV. Network effects compound as founder community grows.</p>
            <p><strong>Viral Mechanics:</strong> Social sharing built into core UX. Company formation triggers celebration → social media sharing → organic discovery. Referral program with equity incentives for early adopters.</p>
            <p><strong>Technical Moats:</strong> Multi-state legal integration (2+ years to replicate). Real-time compliance monitoring. ML-powered task matching. Network data advantages improve with scale.</p>
            <p><strong>Scalability:</strong> Microservices architecture. Auto-scaling infrastructure. API-first design enables rapid feature development. Global deployment via CDN and edge computing.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 