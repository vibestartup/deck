import { motion } from 'framer-motion'

export function FinancialProjectionsSlide() {
  const growthTrajectory = [
    { 
      period: 'Month 1', 
      companies: 630, 
      revenue: '$100k', 
      details: 'Direct: 450 + Viral: 180 = 630 companies. Formation: $75.6k + Subscription: $25.2k = $100.8k total',
      metrics: 'CAC: $7.94 | LTV: $597 | Payback: 0.4 months'
    },
    { 
      period: 'Month 6', 
      companies: 3388, 
      revenue: '$411k MRR', 
      details: 'Viral coefficient accelerating. 70% growth from referrals. Cohort retention: 92% monthly',
      metrics: 'Unit economics stable. AWS credits covering all infrastructure costs'
    },
    { 
      period: 'Month 12', 
      companies: 25511, 
      revenue: '$3.5M MRR', 
      details: '$42M ARR run rate. 87k total companies formed. 75% gross margin maintained',
      metrics: 'Market validation complete. Series A fundraising initiation'
    },
    { 
      period: 'Year 1 Total', 
      companies: 87714, 
      revenue: '$22M ARR', 
      details: 'Exponential growth proven. Network effects accelerating acquisition efficiency',
      metrics: 'Break-even achieved. Preparing for infrastructure transition'
    }
  ]

  const infrastructureStages = [
    {
      stage: 'Stage 1: AWS Credits Active',
      timeline: 'Months 1-12',
      details: [
        'Infrastructure cost: $0 (AWS credits cover $1.6M)',
        'SaaS gross margin: 94% (payment processing only)',
        'Formation gross margin: 26% (state fees + KYC)',
        'Monthly burn: $5k marketing + $15k operations = $20k',
        'Break-even: Month 2 at 882 companies'
      ],
      color: 'border-green-500',
      textColor: 'text-green-400'
    },
    {
      stage: 'Stage 2: Paid Infrastructure',
      timeline: 'Months 13-24',
      details: [
        'Infrastructure cost: $16.35/company/month',
        'Pricing increase required: $40 → $60 average',
        'SaaS gross margin: 73% (post-pricing adjustment)',
        'Monthly infrastructure spend: $1.6M at 100k companies',
        'Risk mitigation: Pricing grandfathering for early adopters'
      ],
      color: 'border-yellow-500',
      textColor: 'text-yellow-400'
    },
    {
      stage: 'Stage 3: Hybrid Self-Hosted',
      timeline: 'Month 25+',
      details: [
        'CapEx investment: $2M infrastructure setup',
        'Monthly savings: $1.4M vs AWS (87% cost reduction)',
        'SaaS gross margin: 95% (optimized infrastructure)',
        'Self-hosted capacity: 1M+ companies',
        'Path to $100M ARR with <1% global market share'
      ],
      color: 'border-purple-500',
      textColor: 'text-purple-400'
    }
  ]

  const financialModeling = [
    { 
      metric: 'Customer Acquisition Cost', 
      calculation: '$5k marketing ÷ 630 companies = $7.94 per company',
      assumptions: 'Viral coefficient 0.4 includes organic acquisition. Scales with content quality, not spend.'
    },
    { 
      metric: 'Monthly Recurring Revenue', 
      calculation: 'Companies × ($20 basic + $100 pro) weighted avg = $40 blended',
      assumptions: '30% pro tier adoption. Price elasticity testing shows 40% can bear $60 average.'
    },
    { 
      metric: 'Churn Rate', 
      calculation: '8% monthly (company failures + competitive switches)',
      assumptions: 'Higher than typical SaaS due to startup mortality. Improves with operational integrations.'
    },
    { 
      metric: 'Infrastructure Scaling', 
      calculation: 'Per-company monthly cost: $16.35 (Lambda + RDS + S3 + CDN)',
      assumptions: 'Heavy usage model: 50k API calls, 3k emails, 200 SMS, 600 voice minutes per company.'
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
          Financial Projections & Infrastructure Strategy
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          $25k MRR → $3.5M MRR in 12 months
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t-4 border-blue-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">GROWTH TRAJECTORY</h2>
          <div className="grid grid-cols-4 gap-6">
            {growthTrajectory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="border-l-2 border-blue-500/30 pl-4"
              >
                <p className="text-lg font-bold text-blue-400 mb-1">{item.period}</p>
                <p className="text-sm text-gray-300 mb-2">{item.companies.toLocaleString()} companies</p>
                <p className="text-sm font-semibold text-blue-300 mb-3">{item.revenue}</p>
                <p className="text-xs text-gray-400 mb-2">{item.details}</p>
                <p className="text-xs text-gray-500">{item.metrics}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t-4 border-gray-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-300">THREE-STAGE INFRASTRUCTURE OPTIMIZATION</h2>
          
          <div className="grid grid-cols-3 gap-8">
            {infrastructureStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                className={`border-l-4 ${stage.color} pl-6`}
              >
                <h3 className={`text-xl font-bold mb-2 ${stage.textColor}`}>
                  {stage.stage}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{stage.timeline}</p>
                <div className="space-y-2">
                  {stage.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-xs text-gray-400">
                      • {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t-4 border-red-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">FINANCIAL MODELING ASSUMPTIONS</h2>
          <div className="grid grid-cols-2 gap-8">
            {financialModeling.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                className="border-l-2 border-red-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-red-400 mb-2">{item.metric}</p>
                <p className="text-sm text-gray-300 mb-2">{item.calculation}</p>
                <p className="text-xs text-gray-500">{item.assumptions}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Revenue Model:</strong> Formation fees ($120 avg) + monthly subscriptions ($40 avg) + task marketplace commission (5%) + premium services (legal, accounting). Multiple revenue streams reduce single-point-of-failure risk.</p>
            <p><strong>Cost Structure:</strong> Variable costs scale with usage (infrastructure, payment processing). Fixed costs include marketing, operations, compliance team. Gross margin improves with scale due to infrastructure optimization.</p>
            <p><strong>Working Capital:</strong> Monthly receivables cycle. Stripe/payment processing provides immediate settlement. Minimal inventory or physical assets required. Strong cash generation from month 2.</p>
            <p><strong>Funding Strategy:</strong> $50k seed → $1M Series A (month 12) → $10M Series B (month 24). Each round supports 12-18 months runway. Revenue-based financing options available post-profitability.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 