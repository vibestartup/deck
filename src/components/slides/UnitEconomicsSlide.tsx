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
  SENSITIVITY_PARAMS,
  BASE_EMPLOYEE_PARAMS,
  calculateEmployeeCosts
} from '../../lib'
import { DataTable, MetricCards } from '../charts'

export function UnitEconomicsSlide() {
  // Calculate timeline-aware costs
  const timelineAwareCosts = {
    preLaunch: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, -3, 0, undefined, false), // 3 months pre-launch average
    launch: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, 1, 0, undefined, false), // Month 1 (launch)
    preInvestment: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, 2, 0, undefined, false), // Month 2 (pre-investment)
    postInvestment: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, 3, 0, undefined, true), // Month 3 (post-investment)
    scaling: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, 6, 100000, undefined, true), // Month 6 with $100k MRR
    mature: calculateEmployeeCosts(BASE_EMPLOYEE_PARAMS, 12, 400000, undefined, true), // Month 12 with $400k MRR
  };

  // Calculate CAC breakdown dynamically with timeline context
  const cacBreakdown = [
    {
      item: "Timeline context",
      value: "Launch Month 0",
      detail: `Pre-launch development (Month -6 to 0): $${formatNumber(timelineAwareCosts.preLaunch.totalCost * 6)} total contractor costs. Launch timing optimized for maximum AWS credit utilization.`
    },
    {
      item: "Monthly marketing spend",
      value: formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend),
      detail: `Video creation: ${formatCurrency(BASE_BUSINESS_PARAMS.videoCreationCost)}, promotion: ${formatCurrency(BASE_BUSINESS_PARAMS.promotionCost)}, amplification: ${formatCurrency(BASE_BUSINESS_PARAMS.amplificationCost)} (starts Month 0)`
    },
    {
      item: "Reach multiplier",
      value: `${formatNumber(baseCAC.totalViews)} views`,
      detail: `${formatNumber(BASE_BUSINESS_PARAMS.baseVideoViews)} organic × ${BASE_BUSINESS_PARAMS.organicMultiplier}x viral coefficient = ${formatNumber(baseCAC.totalViews)} total impressions per month`
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
      detail: `${BASE_BUSINESS_PARAMS.viralCoefficient} k-factor: each founder shows 5 people → 8% convert (takes 2-3 months to fully manifest)`
    },
    {
      item: "Total acquisition",
      value: `${formatNumber(baseCAC.totalCompanies)} companies`,
      detail: `Direct: ${formatNumber(baseCAC.directCompanies)} + Viral: ${formatNumber(baseCAC.viralCompanies)} = ${formatNumber(baseCAC.totalCompanies)} total monthly acquisitions (by Month 3)`
    }
  ]

  // Calculate LTV breakdown with timeline context
  const ltvCalculation = [
    {
      stage: "Timeline & Launch Context",
      value: "Month -6 to +12",
      detail: `Development starts 6 months pre-launch. Investment received Month 3. Full team scaling Month 6-12. LTV calculations account for pre-launch development costs amortized across customer base.`
    },
    {
      stage: "Formation (one-time)",
      value: formatCurrency(baseLTV.formationLTV),
      detail: `Gross profit: ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} revenue - ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee - baseLTV.formationLTV)} COGS (state fees: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.stateFilingFee)}, KYC: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.identityVerification)}, processing: ${formatCurrency(BASE_BUSINESS_PARAMS.formationFee * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate)}, infra: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.infrastructurePerFormation)})`
    },
    {
      stage: "Stage 1 Monthly (AWS credits)",
      value: formatCurrency(baseLTV.saasLTVStage1 / 12),
      detail: `94% margin on ${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)}: Payment processing 3% only, all infra covered by credits (Months 1-12)`
    },
    {
      stage: "Stage 2+ Monthly (paid infra)",
      value: formatCurrency(baseLTV.saasLTVStage2 / 12),
      detail: `95% margin on ${formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * 1.5)}: Pricing increase absorbs ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.computeCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.storageCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.databaseCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.cdnCostPerCompany + BASE_INFRASTRUCTURE_PARAMS.communicationCostPerCompany)}/month infrastructure costs (Month 13+)`
    },
    {
      stage: "Blended LTV per company",
      value: formatCurrency(baseLTV.blendedLTV),
      detail: `Weighted average: (Stage 1: ${formatCurrency(baseLTV.saasLTVStage1)} + Stage 2+: ${formatCurrency(baseLTV.saasLTVStage2)}) ÷ 2 stages`
    },
    {
      stage: "Multi-company founder multiplier",
      value: `×${BASE_BUSINESS_PARAMS.averageCompaniesPerFounder}`,
      detail: `Serial entrepreneur factor: successful founders start 2.3 companies on average over 18-month period`
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
    SENSITIVITY_PARAMS.formationRateRange,
    BASE_EMPLOYEE_PARAMS
  )

  const viralSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'viralCoefficient',
    SENSITIVITY_PARAMS.viralCoefficientRange,
    BASE_EMPLOYEE_PARAMS
  )

  const churnSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'monthlyChurnRate',
    SENSITIVITY_PARAMS.churnRateRange,
    BASE_EMPLOYEE_PARAMS
  )

  const proTierSensitivity = runSensitivityAnalysis(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    'proTierAdoptionRate',
    SENSITIVITY_PARAMS.proTierRange,
    BASE_EMPLOYEE_PARAMS
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

  // Create key metrics for cards with timeline context
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
      label: 'Pre-Launch Investment',
      value: formatCurrency(timelineAwareCosts.preLaunch.totalCost * 6 / 1000) + 'k',
      color: 'purple',
      description: '6 months contractor costs'
    },
    {
      label: 'Break-even Timeline',
      value: 'Month 2',
      color: 'red',
      description: 'After $50k investment received'
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
          Unit Economics & Timeline Strategy
        </h1>
        
        {/* Timeline Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 bg-gray-900/50 border border-gray-700 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Strategic Timeline Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-400 mb-2">Pre-Launch Phase (Month -6 to 0)</h3>
              <p className="text-gray-300">Development with ${formatCurrency(timelineAwareCosts.preLaunch.totalCost)}/month contractor. Total pre-launch investment: ${formatCurrency(timelineAwareCosts.preLaunch.totalCost * 6)}. No revenue, building for optimal launch timing.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-400 mb-2">Launch &amp; Prove (Month 0 to 3)</h3>
              <p className="text-gray-300">Launch Month 0. Prove product-market fit and achieve break-even (Month 2) before requesting investment. Revenue-first approach de-risks investor capital.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-400 mb-2">Scale &amp; Optimize (Month 3+)</h3>
              <p className="text-gray-300">$50k investment Month 3 enables founder salary and strategic hires. Revenue-driven hiring ensures sustainable scaling throughout growth phases.</p>
            </div>
          </div>
        </motion.div>
        
        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <MetricCards metrics={unitEconomicsCards} />
        </motion.div>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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

        {/* Timeline Cost Evolution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t-4 border-purple-500 pt-8 mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-purple-400 text-center">Employee Cost Evolution Timeline</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              {
                phase: 'Pre-Launch',
                timeline: 'Month -6 to 0',
                cost: timelineAwareCosts.preLaunch.totalCost,
                team: timelineAwareCosts.preLaunch.activeEmployees.map(e => e.role).join(', '),
                color: 'border-purple-500',
                textColor: 'text-purple-400'
              },
              {
                phase: 'Pre-Investment',
                timeline: 'Month 0 to 3',
                cost: timelineAwareCosts.preInvestment.totalCost,
                team: timelineAwareCosts.preInvestment.activeEmployees.map(e => e.role).join(', '),
                color: 'border-blue-500',
                textColor: 'text-blue-400'
              },
              {
                phase: 'Post-Investment',
                timeline: 'Month 3 to 6',
                cost: timelineAwareCosts.postInvestment.totalCost,
                team: timelineAwareCosts.postInvestment.activeEmployees.map(e => e.role).join(', '),
                color: 'border-green-500',
                textColor: 'text-green-400'
              },
              {
                phase: 'Scaling Phase',
                timeline: 'Month 6 to 12',
                cost: timelineAwareCosts.scaling.totalCost,
                team: timelineAwareCosts.scaling.activeEmployees.map(e => e.role).join(', '),
                color: 'border-yellow-500',
                textColor: 'text-yellow-400'
              },
              {
                phase: 'Mature Operation',
                timeline: 'Month 12+',
                cost: timelineAwareCosts.mature.totalCost,
                team: timelineAwareCosts.mature.activeEmployees.map(e => e.role).join(', '),
                color: 'border-red-500',
                textColor: 'text-red-400'
              }
            ].slice(0, 3).map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className={`border-l-4 ${phase.color} pl-6`}
              >
                <h3 className={`text-xl font-bold mb-2 ${phase.textColor}`}>
                  {phase.phase}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{phase.timeline}</p>
                <p className="text-lg font-semibold text-white mb-2">{formatCurrency(phase.cost)}/month</p>
                <p className="text-xs text-gray-400">{phase.team}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                phase: 'Scaling Phase',
                timeline: 'Month 6 to 12',
                cost: timelineAwareCosts.scaling.totalCost,
                team: timelineAwareCosts.scaling.activeEmployees.map(e => e.role).join(', '),
                color: 'border-yellow-500',
                textColor: 'text-yellow-400'
              },
              {
                phase: 'Mature Operation',
                timeline: 'Month 12+',
                cost: timelineAwareCosts.mature.totalCost,
                team: timelineAwareCosts.mature.activeEmployees.map(e => e.role).join(', '),
                color: 'border-red-500',
                textColor: 'text-red-400'
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className={`border-l-4 ${phase.color} pl-6`}
              >
                <h3 className={`text-xl font-bold mb-2 ${phase.textColor}`}>
                  {phase.phase}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{phase.timeline}</p>
                <p className="text-lg font-semibold text-white mb-2">{formatCurrency(phase.cost)}/month</p>
                <p className="text-xs text-gray-400">{phase.team}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <span className="font-semibold">Timeline-Integrated Unit Economics:</span> Pre-launch development costs (${formatCurrency(timelineAwareCosts.preLaunch.totalCost * 6)}) are strategically invested before revenue generation, creating optimal launch timing with AWS credits. Month 3 investment timing (${formatCurrency(BASE_EMPLOYEE_PARAMS.investmentAmount)}) occurs after break-even proof, de-risking investor capital while enabling founder focus and strategic hires. Employee costs scale predictably: ${formatCurrency(timelineAwareCosts.preLaunch.totalCost)}/month pre-launch → ${formatCurrency(timelineAwareCosts.postInvestment.totalCost)}/month post-investment → ${formatCurrency(timelineAwareCosts.mature.totalCost)}/month at maturity. The {formatMultiplier(keyMetrics.ltvCacRatio)} LTV/CAC ratio accounts for all timeline costs including pre-launch development, demonstrating sustainable unit economics even with comprehensive cost modeling. Most importantly, the viral coefficient (0.4) creates exponential customer acquisition while timeline-driven hiring ensures each employee is revenue-justified, maintaining positive cash flow throughout all growth phases despite conservative assumptions across formation rates, churn, and market adoption.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 