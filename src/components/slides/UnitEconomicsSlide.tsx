import { motion } from 'framer-motion'
import {
  baseCAC,
  baseLTV,
  keyMetrics,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatMultiplier,
  formatMonths,
  runSensitivityAnalysis,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  SENSITIVITY_PARAMS
} from '../../lib'
import { DataTable, MetricCards } from '../charts'

export function UnitEconomicsSlide() {
  // Calculate CAC breakdown dynamically
  const cacBreakdown = [
    {
      item: "Monthly marketing spend",
      value: formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend),
      detail: `Video creation: ${formatCurrency(BASE_BUSINESS_PARAMS.videoCreationCost)}, promotion: ${formatCurrency(BASE_BUSINESS_PARAMS.promotionCost)}, amplification: ${formatCurrency(BASE_BUSINESS_PARAMS.amplificationCost)}`
    },
    {
      item: "Reach multiplier",
      value: `${formatNumber(baseCAC.totalViews)} views`,
      detail: `${formatNumber(BASE_BUSINESS_PARAMS.baseVideoViews)} organic × ${BASE_BUSINESS_PARAMS.organicMultiplier}x viral coefficient = ${formatNumber(baseCAC.totalViews)} total impressions`
    },
    {
      item: "Conversion funnel",
      value: `${formatNumber(baseCAC.signups)} signups`,
      detail: `${formatPercentage(BASE_BUSINESS_PARAMS.viewToSignupRate)} signup rate (industry benchmark: 0.3-2% for B2B content)`
    },
    {
      item: "Formation conversion",
      value: `${formatNumber(baseCAC.directCompanies)} companies`,
      detail: `${formatPercentage(BASE_BUSINESS_PARAMS.formationConversionRate)} formation rate (Stripe Atlas: 45%, LegalZoom: 25%)`
    },
    {
      item: "Viral amplification",
      value: `+${formatNumber(baseCAC.viralCompanies)} companies`,
      detail: `${BASE_BUSINESS_PARAMS.viralCoefficient} k-factor: each founder shows 5 people → 8% convert`
    },
    {
      item: "Total acquisition",
      value: `${formatNumber(baseCAC.totalCompanies)} companies`,
      detail: `Direct: ${formatNumber(baseCAC.directCompanies)} + Viral: ${formatNumber(baseCAC.viralCompanies)} = ${formatNumber(baseCAC.totalCompanies)} total monthly acquisitions`
    }
  ]

  // Calculate LTV breakdown dynamically
  const ltvCalculation = [
    {
      stage: "Formation (one-time)",
      value: formatCurrency(baseLTV.formationLTV),
      detail: `Gross profit: ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} revenue - ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee - baseLTV.formationLTV)} COGS (state fees: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.stateFilingFee)}, KYC: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.identityVerification)}, processing: ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate)}, infra: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.infrastructurePerFormation)})`
    },
    {
      stage: "Stage 1 Monthly (AWS credits)",
      value: formatCurrency(baseLTV.saasLTVStage1 / 12),
      detail: `94% margin on ${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)}: Payment processing 3% only, all infra covered by credits`
    },
    {
      stage: "Stage 2+ Monthly (paid infra)",
      value: formatCurrency(baseLTV.saasLTVStage2 / 12),
      detail: `95% margin on ${formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * 1.5)}: Pricing increase absorbs ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.computeCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.storageCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.databaseCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.cdnCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.communicationCostPerCompany)}/month infrastructure costs`
    },
    {
      stage: "Blended LTV per company",
      value: formatCurrency(baseLTV.blendedLTV),
      detail: `Weighted average: (Stage 1: ${formatCurrency(baseLTV.saasLTVStage1)} + Stage 2+: ${formatCurrency(baseLTV.saasLTVStage2)}) ÷ 2 stages`
    },
    {
      stage: "Multi-company founder multiplier",
      value: `×${BASE_BUSINESS_PARAMS.averageCompaniesPerFounder}`,
      detail: `Serial entrepreneur factor: successful founders start 2.3 companies on average`
    },
    {
      stage: "Final LTV per founder",
      value: formatCurrency(baseLTV.ltvPerFounder),
      detail: `${formatCurrency(baseLTV.blendedLTV)} × ${BASE_BUSINESS_PARAMS.averageCompaniesPerFounder} companies per founder over lifetime`
    }
  ]

  // Calculate sensitivity analysis dynamically
  const formationRateSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'formationConversionRate',
    SENSITIVITY_PARAMS.formationRateRange
  )

  const viralSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'viralCoefficient',
    SENSITIVITY_PARAMS.viralCoefficientRange
  )

  const churnSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'monthlyChurnRate',
    SENSITIVITY_PARAMS.churnRateRange
  )

  const proTierSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'proTierAdoptionRate',
    SENSITIVITY_PARAMS.proTierRange
  )

  const sensitivities = [
    {
      variable: "Formation rate",
      pessimistic: `${formatPercentage(SENSITIVITY_PARAMS.formationRateRange[0])} (-33%)`,
      base: formatPercentage(SENSITIVITY_PARAMS.formationRateRange[1]),
      optimistic: `${formatPercentage(SENSITIVITY_PARAMS.formationRateRange[2])} (+33%)`,
      impact: `${formatCurrency(formationRateSensitivity[0].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(formationRateSensitivity[1].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(formationRateSensitivity[2].projection.totalRevenue / 1000000, 1)}M Y1 revenue`
    },
    {
      variable: "Viral k-factor",
      pessimistic: `${SENSITIVITY_PARAMS.viralCoefficientRange[0]} (-50%)`,
      base: SENSITIVITY_PARAMS.viralCoefficientRange[1].toString(),
      optimistic: `${SENSITIVITY_PARAMS.viralCoefficientRange[2]} (+50%)`,
      impact: `${formatCurrency(viralSensitivity[0].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(viralSensitivity[1].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(viralSensitivity[2].projection.totalRevenue / 1000000, 1)}M Y1 revenue`
    },
    {
      variable: "Monthly churn",
      pessimistic: `${formatPercentage(SENSITIVITY_PARAMS.churnRateRange[0])} (+50%)`,
      base: formatPercentage(SENSITIVITY_PARAMS.churnRateRange[1]),
      optimistic: `${formatPercentage(SENSITIVITY_PARAMS.churnRateRange[2])} (-38%)`,
      impact: `${formatCurrency(churnSensitivity[0].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(churnSensitivity[1].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(churnSensitivity[2].projection.totalRevenue / 1000000, 1)}M Y1 revenue`
    },
    {
      variable: "Pro tier adoption",
      pessimistic: `${formatPercentage(SENSITIVITY_PARAMS.proTierRange[0])} (-33%)`,
      base: formatPercentage(SENSITIVITY_PARAMS.proTierRange[1]),
      optimistic: `${formatPercentage(SENSITIVITY_PARAMS.proTierRange[2])} (+33%)`,
      impact: `${formatCurrency(proTierSensitivity[0].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(proTierSensitivity[1].projection.totalRevenue / 1000000, 1)}M / ${formatCurrency(proTierSensitivity[2].projection.totalRevenue / 1000000, 1)}M Y1 revenue`
    }
  ]

  // Create key metrics for cards
  const unitEconomicsCards = [
    {
      label: 'LTV/CAC Ratio',
      value: formatMultiplier(keyMetrics.ltvCacRatio),
      color: 'green',
      description: 'vs 3-5x industry standard'
    },
    {
      label: 'CAC Payback',
      value: formatMonths(keyMetrics.paybackPeriod),
      color: 'blue',
      description: 'vs 12-18 month industry avg'
    },
    {
      label: 'Gross Margin',
      value: formatPercentage(keyMetrics.grossMargin),
      color: 'purple',
      description: 'Stage 1 with AWS credits'
    },
    {
      label: 'CAC per Founder',
      value: formatCurrency(keyMetrics.cac),
      color: 'red',
      description: 'Viral coefficient included'
    }
  ];

  // Prepare sensitivity analysis data for table
  const sensitivityColumns = [
    { key: 'variable', label: 'Variable', align: 'left' as const },
    { key: 'pessimistic', label: 'Pessimistic', align: 'center' as const, color: 'red' },
    { key: 'base', label: 'Base Case', align: 'center' as const, color: 'blue' },
    { key: 'optimistic', label: 'Optimistic', align: 'center' as const, color: 'green' },
    { key: 'impact', label: 'Revenue Impact', align: 'right' as const }
  ];

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
        
        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <MetricCards metrics={unitEconomicsCards} />
        </motion.div>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-red-500 pl-8"
          >
            <h2 className="text-4xl font-bold mb-8 text-red-400">CAC: {formatCurrency(keyMetrics.cac)} per founder</h2>
            <div className="space-y-6">
              {cacBreakdown.map((item, index) => (
                <div key={index} className="border-b border-gray-800 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-xl">{item.item}</span>
                    <span className="text-xl text-red-400 font-bold">{item.value}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-4xl font-bold mb-8 text-green-400">LTV: {formatCurrency(keyMetrics.ltv)} per founder</h2>
            <div className="space-y-6">
              {ltvCalculation.map((item, index) => (
                <div key={index} className="border-b border-gray-800 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-xl">{item.stage}</span>
                    <span className="text-xl text-green-400 font-bold">{item.value}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t-4 border-blue-500 pt-8"
        >
          <h2 className="text-4xl font-bold mb-8 text-blue-400 text-center">Sensitivity Analysis</h2>
          
          {/* Sensitivity Analysis Table */}
          <DataTable 
            data={sensitivities}
            columns={sensitivityColumns}
            title="Impact of Key Variables on Year 1 Revenue"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400 max-w-4xl mx-auto leading-relaxed">
                         <span className="font-semibold">smalltext:</span> These numbers are legitimately insane. Typical B2B SaaS struggles to hit 3x LTV/CAC.
             We&apos;re hitting {formatMultiplier(keyMetrics.ltvCacRatio)} because of viral mechanics + multi-company founders.
             Even with heavy usage assumptions (voice agents, SMS, 100x baseline), the math works.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 