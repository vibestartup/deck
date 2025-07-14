import { motion } from 'framer-motion'
import {
  baseProjections,
  baseCAC,
  baseLTV,
  keyMetrics,
  formatCurrency,
  formatNumber,
  formatPercentage,
  calculateInfrastructureCostPerCompany,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS
} from '../../lib'
import { LineChart, Timeline, MetricCards } from '../charts'

export function FinancialProjectionsSlide() {
  // Get specific month data from projections
  const month1 = baseProjections.cohorts[0];
  const month6 = baseProjections.cohorts[5];
  const month12 = baseProjections.cohorts[11];

  // Prepare growth chart data
  const growthChartData = [
    { label: 'M1', value: month1.totalRevenue, formatValue: (v: number) => formatCurrency(v / 1000) + 'k' },
    { label: 'M3', value: baseProjections.cohorts[2].totalRevenue, formatValue: (v: number) => formatCurrency(v / 1000) + 'k' },
    { label: 'M6', value: month6.totalRevenue, formatValue: (v: number) => formatCurrency(v / 1000) + 'k' },
    { label: 'M9', value: baseProjections.cohorts[8].totalRevenue, formatValue: (v: number) => formatCurrency(v / 1000000, 1) + 'M' },
    { label: 'M12', value: month12.totalRevenue, formatValue: (v: number) => formatCurrency(v / 1000000, 1) + 'M' },
  ];

  // Key metrics for cards
  const keyMetricsCards = [
    {
      label: 'Total Revenue (Year 1)',
      value: formatCurrency(baseProjections.totalRevenue / 1000000, 1) + 'M',
      color: 'green',
      description: '87,714 companies formed'
    },
    {
      label: 'Final MRR',
      value: formatCurrency(month12.monthlyRecurringRevenue / 1000000, 1) + 'M',
      color: 'blue',
      description: formatCurrency(month12.monthlyRecurringRevenue * 12 / 1000000, 1) + 'M ARR run rate'
    },
    {
      label: 'Gross Margin',
      value: formatPercentage(keyMetrics.grossMargin),
      color: 'purple',
      description: 'Stage 1 with AWS credits'
    },
    {
      label: 'Break-even Month',
      value: '2',
      color: 'yellow',
      description: 'at 882 companies'
    }
  ];

  // Infrastructure timeline
  const infrastructureTimeline = [
    {
      title: 'Stage 1: AWS Credits Active',
      period: 'Months 1-12',
      description: '$0 infrastructure cost. 94% SaaS margins. Formation: 26% margin. Break-even Month 2.',
      status: 'current' as const,
    },
    {
      title: 'Stage 2: Paid Infrastructure',
      period: 'Months 13-24',
      description: 'Pricing increase required: $40→$60 average. 73% SaaS margins. Risk mitigation needed.',
      status: 'upcoming' as const,
    },
    {
      title: 'Stage 3: Self-Hosted Optimization',
      period: 'Month 25+',
      description: '$2M capex investment. 95% SaaS margins. Massive cost reduction and margin expansion.',
      status: 'upcoming' as const,
    },
  ];

  const growthTrajectory = [
    { 
      period: 'Month 1', 
      companies: month1.totalCompanies, 
      revenue: formatCurrency(month1.totalRevenue / 1000) + 'k', 
      details: `Direct: ${formatNumber(month1.directAcquisition)} + Viral: ${formatNumber(month1.viralContribution)} = ${formatNumber(month1.newCompanies)} companies. Formation: ${formatCurrency(month1.formationRevenue / 1000)}k + Subscription: ${formatCurrency(month1.monthlyRecurringRevenue / 1000)}k = ${formatCurrency(month1.totalRevenue / 1000)}k total`,
      metrics: `CAC: ${formatCurrency(baseCAC.cacPerCompany)} | LTV: ${formatCurrency(baseLTV.blendedLTV)} | Payback: ${(keyMetrics.paybackPeriod * 30).toFixed(0)} days`
    },
    { 
      period: 'Month 6', 
      companies: month6.totalCompanies, 
      revenue: `${formatCurrency(month6.monthlyRecurringRevenue / 1000)}k MRR`, 
      details: `Viral coefficient accelerating. 70% growth from referrals. Cohort retention: ${formatPercentage(1 - BASE_BUSINESS_PARAMS.monthlyChurnRate)} monthly`,
      metrics: 'Unit economics stable. AWS credits covering all infrastructure costs'
    },
    { 
      period: 'Month 12', 
      companies: month12.totalCompanies, 
      revenue: `${formatCurrency(month12.monthlyRecurringRevenue / 1000000, 1)}M MRR`, 
      details: `${formatCurrency(month12.monthlyRecurringRevenue * 12 / 1000000)}M ARR run rate. ${formatNumber(baseProjections.companyCount / 1000)}k total companies formed. ${formatPercentage(keyMetrics.grossMargin)} gross margin maintained`,
      metrics: 'Market validation complete. Series A fundraising initiation'
    },
    { 
      period: 'Year 1 Total', 
      companies: baseProjections.companyCount, 
      revenue: `${formatCurrency(baseProjections.totalRevenue / 1000000)}M ARR`, 
      details: 'Exponential growth proven. Network effects accelerating acquisition efficiency',
      metrics: 'Break-even achieved. Preparing for infrastructure transition'
    }
  ]

  const infrastructureCostPerCompany = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);

  const infrastructureStages = [
    {
      stage: 'Stage 1: AWS Credits Active',
      timeline: 'Months 1-12',
      details: [
        `Infrastructure cost: $0 (AWS credits cover ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.awsCreditsMonthly * 12 / 1000000, 1)}M)`,
        'SaaS gross margin: 94% (payment processing only)',
        'Formation gross margin: 26% (state fees + KYC)',
        `Monthly burn: ${formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend)} marketing + ${formatCurrency(15000)} operations = ${formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend + 15000)}`,
        'Break-even: Month 2 at 882 companies'
      ],
      color: 'border-green-500',
      textColor: 'text-green-400'
    },
    {
      stage: 'Stage 2: Paid Infrastructure',
      timeline: 'Months 13-24',
      details: [
        `Infrastructure cost: ${formatCurrency(infrastructureCostPerCompany)}/company/month`,
        `Pricing increase required: ${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} → ${formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * 1.5)} average`,
        'SaaS gross margin: 73% (post-pricing adjustment)',
        `Monthly infrastructure spend: ${formatCurrency(infrastructureCostPerCompany * 100000 / 1000000, 1)}M at 100k companies`,
        'Risk mitigation: Pricing grandfathering for early adopters'
      ],
      color: 'border-yellow-500',
      textColor: 'text-yellow-400'
    },
    {
      stage: 'Stage 3: Hybrid Self-Hosted',
      timeline: 'Month 25+',
      details: [
        `CapEx investment: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.selfHostingSetupCost / 1000000)}M infrastructure setup`,
        `Monthly savings: ${formatCurrency(infrastructureCostPerCompany * BASE_INFRASTRUCTURE_PARAMS.selfHostingSavingsRate * 100000 / 1000000, 1)}M vs AWS (${formatPercentage(BASE_INFRASTRUCTURE_PARAMS.selfHostingSavingsRate)} cost reduction)`,
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
      calculation: `${formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend)} marketing ÷ ${formatNumber(baseCAC.totalCompanies)} companies = ${formatCurrency(baseCAC.cacPerCompany)} per company`,
      assumptions: `Viral coefficient ${BASE_BUSINESS_PARAMS.viralCoefficient} includes organic acquisition. Scales with content quality, not spend.`
    },
    { 
      metric: 'Monthly Recurring Revenue', 
      calculation: `Companies × (${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice)} basic + ${formatCurrency(BASE_BUSINESS_PARAMS.proTierPrice)} pro) weighted avg = ${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} blended`,
      assumptions: `${formatPercentage(BASE_BUSINESS_PARAMS.proTierAdoptionRate)} pro tier adoption. Price elasticity testing shows 40% can bear ${formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * 1.5)} average.`
    },
    { 
      metric: 'Churn Rate', 
      calculation: `${formatPercentage(BASE_BUSINESS_PARAMS.monthlyChurnRate)} monthly (company failures + competitive switches)`,
      assumptions: 'Higher than typical SaaS due to startup mortality. Improves with operational integrations.'
    },
    { 
      metric: 'Infrastructure Scaling', 
      calculation: `Per-company monthly cost: ${formatCurrency(infrastructureCostPerCompany)} (Lambda + RDS + S3 + CDN)`,
      assumptions: `Heavy usage model: ${formatNumber(50000)} API calls, ${formatNumber(3000)} emails, ${formatNumber(200)} SMS, ${formatNumber(600)} voice minutes per company.`
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
          {formatCurrency(month1.monthlyRecurringRevenue / 1000)}k MRR → {formatCurrency(month12.monthlyRecurringRevenue / 1000000, 1)}M MRR in 12 months
        </p>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <MetricCards metrics={keyMetricsCards} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t-4 border-blue-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">GROWTH TRAJECTORY</h2>
          
          {/* Growth Chart */}
          <div className="mb-8">
            <LineChart 
              data={growthChartData} 
              title="Revenue Growth (12 Months)"
              color="blue"
              height={250}
            />
          </div>

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
                <p className="text-sm text-gray-300 mb-2">{formatNumber(item.companies)} companies</p>
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
          
          <Timeline stages={infrastructureTimeline} />

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
            <p><strong>Revenue Model:</strong> Formation fees ({formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} avg) + monthly subscriptions ({formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} avg) + task marketplace commission (5%) + premium services (legal, accounting). Multiple revenue streams reduce single-point-of-failure risk.</p>
            <p><strong>Cost Structure:</strong> Variable costs scale with usage (infrastructure, payment processing). Fixed costs include marketing, operations, compliance team. Gross margin improves with scale due to infrastructure optimization.</p>
            <p><strong>Working Capital:</strong> Monthly receivables cycle. Stripe/payment processing provides immediate settlement. Minimal inventory or physical assets required. Strong cash generation from month 2.</p>
            <p><strong>Funding Strategy:</strong> $50k seed → $1M Series A (month 12) → $10M Series B (month 24). Each round supports 12-18 months runway. Revenue-based financing options available post-profitability.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 