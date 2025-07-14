import { motion } from 'framer-motion'

export function UnitEconomicsSlide() {
  const cacBreakdown = [
    { item: "Monthly marketing spend", value: "$5,000", detail: "Video creation: $3k, promotion: $1.5k, amplification: $0.5k" },
    { item: "Reach multiplier", value: "300k views", detail: "100k organic × 3x viral coefficient = 300k total impressions" },
    { item: "Conversion funnel", value: "1,500 signups", detail: "0.5% signup rate (industry benchmark: 0.3-2% for B2B content)" },
    { item: "Formation conversion", value: "450 companies", detail: "30% formation rate (Stripe Atlas: 45%, LegalZoom: 25%)" },
    { item: "Viral amplification", value: "+180 companies", detail: "0.4 k-factor: each founder shows 5 people → 8% convert" },
    { item: "Total acquisition", value: "630 companies", detail: "Direct: 450 + Viral: 180 = 630 total monthly acquisitions" }
  ]

  const ltvCalculation = [
    { stage: "Formation (one-time)", value: "$31.39", detail: "Gross profit: $120 revenue - $88.61 COGS (state fees: $80, KYC: $1.50, processing: $3.60, infra: $3.51)" },
    { stage: "Stage 1 Monthly (AWS credits)", value: "$37.60", detail: "94% margin on $40: Payment processing 3% only, all infra covered by credits" },
    { stage: "Stage 2+ Monthly (paid infra)", value: "$56.70", detail: "95% margin on $60: Pricing increase absorbs $16.35/month infrastructure costs" },
    { stage: "Blended LTV per company", value: "$597.19", detail: "Weighted average: (Stage 1: $482.59 + Stage 2+: $711.79) ÷ 2 stages" },
    { stage: "Multi-company founder multiplier", value: "×2.5", detail: "Serial entrepreneur factor: successful founders start 2.3 companies on average" },
    { stage: "Final LTV per founder", value: "$1,493", detail: "$597.19 × 2.5 companies per founder over lifetime" }
  ]

  const sensitivities = [
    { variable: "Formation rate", pessimistic: "20% (-33%)", base: "30%", optimistic: "40% (+33%)", impact: "$14.7M / $22.1M / $29.4M Y1 revenue" },
    { variable: "Viral k-factor", pessimistic: "0.2 (-50%)", base: "0.4", optimistic: "0.6 (+50%)", impact: "$11.0M / $22.1M / $44.2M Y1 revenue" },
    { variable: "Monthly churn", pessimistic: "12% (+50%)", base: "8%", optimistic: "5% (-38%)", impact: "$18.8M / $22.1M / $24.3M Y1 revenue" },
    { variable: "Pro tier adoption", pessimistic: "20% (-33%)", base: "30%", optimistic: "40% (+33%)", impact: "$19.8M / $22.1M / $24.3M Y1 revenue" }
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
          Unit Economics That Break the Internet
        </h1>
        <div className="text-center mb-16">
          <p className="text-4xl font-bold text-green-400 mb-2">50x LTV/CAC</p>
          <p className="text-lg text-gray-400">Industry benchmark: 3-5x | Payback: 0.4 months | Gross margin: 76%</p>
        </div>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-red-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-red-400">CAC: $19.85 per founder</h2>
            <div className="space-y-4">
              {cacBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-red-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-300">{item.item}</p>
                    <p className="text-sm font-bold text-red-400">{item.value}</p>
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
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">LTV: $1,493 per founder</h2>
            <div className="space-y-4">
              {ltvCalculation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-300">{item.stage}</p>
                    <p className="text-sm font-bold text-green-400">{item.value}</p>
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
          transition={{ duration: 0.6, delay: 1.0 }}
          className="border-t-4 border-yellow-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">SENSITIVITY ANALYSIS</h2>
          <div className="space-y-4">
            {sensitivities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="grid grid-cols-5 gap-4 items-center border-l-2 border-yellow-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-yellow-400">{item.variable}</p>
                <p className="text-xs text-gray-400">{item.pessimistic}</p>
                <p className="text-xs text-gray-300 font-medium">{item.base}</p>
                <p className="text-xs text-gray-400">{item.optimistic}</p>
                <p className="text-xs text-gray-300">{item.impact}</p>
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
            <p><strong>Infrastructure Assumptions:</strong> Per-company monthly cost: $16.35 (Lambda: $59.80, S3: $117.90, RDS: $1,950, CDN: $1,225, Communications: $8,400 per 1000 companies). AWS credits cover $1.6M first year.</p>
            <p><strong>Viral Mechanics:</strong> Each founder shows 5 people their company (Nielsen sharing behavior). 8% conversion rate (industry benchmark for B2B referrals: 5-15%). K-factor compounds monthly: 0.4^n growth acceleration.</p>
            <p><strong>Benchmarks:</strong> Stripe Atlas (45% formation rate, no viral), LegalZoom (25% formation rate, no viral), typical B2B SaaS (3-5x LTV/CAC, 12-18 month payback). Our 50x ratio driven by viral mechanics + multi-company founders.</p>
            <p><strong>Risk Factors:</strong> AWS credit expiration (month 13), potential churn spike (month 6-12), regulatory changes, competitive response. Mitigation: pricing flexibility, self-hosting option, regulatory compliance team.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 