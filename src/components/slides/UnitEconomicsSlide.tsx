import { motion } from 'framer-motion'
import {
  baseCAC,
  baseLTV,
  formatCurrency,
  formatPercentage,
  calculateInfrastructureCostPerCompany,
  calculateFormationCosts,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  TIMELINE_MARKER_PARAMS,
  COMPUTED_VALUES
} from '../../lib'
import { MetricCards } from '../charts'
import { Employee } from '../../lib/types'

export function UnitEconomicsSlide() {
  // Helper function to convert days to months (rounding up for display)
  const daysToMonths = (days: number) => Math.ceil(days / 30.44);
  
  // Calculate actual day differences from today for all timeline markers
  const today = new Date();
  const developmentStartDays = Math.abs(TIMELINE_MARKER_PARAMS.developmentStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const investmentDays = Math.abs(TIMELINE_MARKER_PARAMS.investmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const launchDays = Math.abs(TIMELINE_MARKER_PARAMS.launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const customerSuccessDays = Math.abs(TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const seniorDevDays = Math.abs(TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate employee costs at different stages using computed values
  const employeeCosts = {
    preLaunch: COMPUTED_VALUES.getEmployeeCostAtDate(TIMELINE_MARKER_PARAMS.developmentStartDate),
    postInvestment: COMPUTED_VALUES.getEmployeeCostAtDate(new Date(TIMELINE_MARKER_PARAMS.investmentDate.getTime() + 30 * 24 * 60 * 60 * 1000)), // 1 month after investment
    scaling: COMPUTED_VALUES.getEmployeeCostAtDate(TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate, TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold),
    mature: COMPUTED_VALUES.getEmployeeCostAtDate(TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate, TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold),
  };

  // Formation economics from computed values
  const formationEconomics = calculateFormationCosts(BASE_INFRASTRUCTURE_PARAMS, BASE_BUSINESS_PARAMS.formationFee);
  const infrastructureCostPerCompany = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);

  // Key unit economics metrics
  const unitEconomicsCards = [
    {
      label: 'CAC per Company',
      value: formatCurrency(baseCAC.cacPerCompany),
      color: 'blue',
      description: `${formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend / 1000)}k marketing → ${baseCAC.totalCompanies} companies`
    },
    {
      label: 'LTV per Company',
      value: formatCurrency(baseLTV.blendedLtvPerCompany),
      color: 'blue',
      description: `${formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} formation + ${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)}/mo × ${(1/BASE_BUSINESS_PARAMS.monthlyChurnRate).toFixed(0)} months`
    },
    {
      label: 'LTV/CAC Ratio',
      value: (baseLTV.blendedLtvPerCompany / baseCAC.cacPerCompany).toFixed(1) + 'x',
      color: 'blue',
      description: 'Industry benchmark: 3-5x'
    },
    {
      label: 'Payback Period',
      value: (baseCAC.cacPerCompany / (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)).toFixed(1) + ' months',
      color: 'blue',
      description: 'Time to recover customer acquisition cost'
    }
  ];

  // Cost breakdown sections using computed values
  const costBreakdowns = [
    {
      title: 'Formation Unit Economics',
      items: [
        { label: 'Formation Revenue', value: formatCurrency(formationEconomics.revenue), positive: true },
        { label: 'State Filing Fees', value: `-${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.stateFilingFee)}`, positive: false },
        { label: 'Identity Verification', value: `-${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.identityVerification)}`, positive: false },
        { label: 'Infrastructure Costs', value: `-${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.infrastructurePerFormation)}`, positive: false },
        { label: 'Payment Processing', value: `-${formatCurrency(formationEconomics.revenue * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate)}`, positive: false },
        { label: 'Formation Gross Profit', value: formatCurrency(formationEconomics.grossProfit), positive: true, highlight: true },
        { label: 'Gross Margin', value: formatPercentage(formationEconomics.margin), positive: true, highlight: true }
      ]
    },
    {
      title: 'Monthly SaaS Economics',
      items: [
        { label: 'Basic Tier Revenue', value: formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate)), positive: true },
        { label: 'Pro Tier Revenue', value: formatCurrency(BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate), positive: true },
        { label: 'Blended Revenue', value: formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate), positive: true },
        { label: 'Infrastructure Cost', value: `-${formatCurrency(infrastructureCostPerCompany)}`, positive: false },
        { label: 'Payment Processing', value: `-${formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate)}`, positive: false },
        { label: 'Monthly Gross Profit', value: formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) - infrastructureCostPerCompany - (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate), positive: true, highlight: true },
        { label: 'Monthly Gross Margin', value: formatPercentage(((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) - infrastructureCostPerCompany - (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate) / (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)), positive: true, highlight: true }
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight text-white">
          Unit Economics That Break SaaS Norms
        </h1>
        <p className="text-2xl text-blue-500 mb-12 text-center font-medium">
          {(baseLTV.blendedLtvPerCompany / baseCAC.cacPerCompany).toFixed(1)}x LTV/CAC ratio (industry standard: 3-5x)
        </p>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <MetricCards metrics={unitEconomicsCards} />
        </motion.div>

        {/* Cost Breakdown Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-slate-700 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">DETAILED COST BREAKDOWN ANALYSIS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {costBreakdowns.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, x: sectionIndex === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.2 }}
                className="bg-slate-800/30 border border-slate-600 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-6">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + sectionIndex * 0.2 + index * 0.05 }}
                      className={`flex justify-between items-center py-2 px-3 rounded ${
                        item.highlight 
                          ? 'bg-blue-900/30 border border-blue-500/30' 
                          : 'border-b border-slate-700'
                      }`}
                    >
                      <span className={`text-sm ${item.highlight ? 'font-semibold text-blue-300' : 'text-slate-300'}`}>
                        {item.label}
                      </span>
                      <span className={`font-mono text-sm font-bold ${
                        item.highlight 
                          ? 'text-blue-400' 
                          : item.positive 
                            ? 'text-blue-400' 
                            : 'text-slate-400'
                      }`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Employee Cost Evolution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-slate-700 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">EMPLOYEE COST EVOLUTION BY GROWTH STAGE</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              {
                stage: 'Pre-Launch Development',
                timeline: `Month ${daysToMonths(developmentStartDays)} to ${daysToMonths(investmentDays)}`,
                costs: employeeCosts.preLaunch,
                color: 'border-slate-500',
                textColor: 'text-slate-400',
                description: 'Bootstrapped development phase'
              },
              {
                stage: 'Post-Investment Setup',
                timeline: `Month ${daysToMonths(investmentDays)} to ${daysToMonths(launchDays)}`,
                costs: employeeCosts.postInvestment,
                color: 'border-blue-500',
                textColor: 'text-blue-400',
                description: `After ${COMPUTED_VALUES.investmentAmountFormatted} investment received`
              },
              {
                stage: 'Scaling Phase',
                timeline: `Month ${daysToMonths(customerSuccessDays)}+`,
                costs: employeeCosts.scaling,
                color: 'border-blue-500',
                textColor: 'text-blue-400',
                description: `At ${formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold / 1000)}k MRR milestone`
              },
              {
                stage: 'Mature Operations',
                timeline: `Month ${daysToMonths(seniorDevDays)}+`,
                costs: employeeCosts.mature,
                color: 'border-blue-500',
                textColor: 'text-blue-400',
                description: `At ${formatCurrency(TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold / 1000)}k MRR milestone`
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className={`border-l-2 ${stage.color} pl-6 pb-6`}
              >
                <h3 className={`text-lg font-bold mb-2 ${stage.textColor}`}>
                  {stage.stage}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{stage.timeline}</p>
                <p className="text-xs text-slate-500 mb-4">{stage.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Total Monthly:</span>
                    <span className={`text-sm font-bold ${stage.textColor}`}>
                      {formatCurrency(stage.costs.totalCost / 1000)}k
                    </span>
                  </div>
                  <div className="space-y-1">
                    {stage.costs.activeEmployees.map((employee: Employee, empIndex: number) => (
                      <div key={empIndex} className="flex justify-between text-xs">
                        <span className="text-slate-500">{employee.role}:</span>
                        <span className="text-slate-400">{formatCurrency(employee.monthlyCost / 1000)}k</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitive Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="border-t border-slate-700 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">COMPETITIVE UNIT ECONOMICS COMPARISON</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-4 px-6 text-slate-300">Metric</th>
                  <th className="text-center py-4 px-6 text-blue-400">VibeStartup</th>
                  <th className="text-center py-4 px-6 text-slate-400">Industry Avg</th>
                  <th className="text-center py-4 px-6 text-slate-400">Best in Class</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: 'LTV/CAC Ratio',
                    vibestartup: (baseLTV.blendedLtvPerCompany / baseCAC.cacPerCompany).toFixed(1) + 'x',
                    industry: '3-5x',
                    bestInClass: '8-12x'
                  },
                  {
                    metric: 'CAC Payback Period',
                    vibestartup: (baseCAC.cacPerCompany / (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)).toFixed(1) + ' months',
                    industry: '12-18 months',
                    bestInClass: '6-9 months'
                  },
                  {
                    metric: 'Gross Margin',
                    vibestartup: formatPercentage(((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) - infrastructureCostPerCompany - (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) * BASE_INFRASTRUCTURE_PARAMS.paymentProcessingRate) / (BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)),
                    industry: '70-80%',
                    bestInClass: '85-90%'
                  },
                  {
                    metric: 'Monthly Churn',
                    vibestartup: formatPercentage(BASE_BUSINESS_PARAMS.monthlyChurnRate),
                    industry: '8-12%',
                    bestInClass: '3-5%'
                  },
                  {
                    metric: 'Viral Coefficient',
                    vibestartup: BASE_BUSINESS_PARAMS.viralCoefficient.toFixed(1),
                    industry: '0.0-0.2',
                    bestInClass: '0.6-1.2'
                  }
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                    className="border-b border-slate-700 hover:bg-slate-800/30"
                  >
                    <td className="py-4 px-6 text-slate-300 font-medium">{row.metric}</td>
                    <td className="py-4 px-6 text-center text-blue-400 font-bold">{row.vibestartup}</td>
                    <td className="py-4 px-6 text-center text-slate-400">{row.industry}</td>
                    <td className="py-4 px-6 text-center text-slate-400">{row.bestInClass}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mt-8 p-6 bg-slate-800/20 border border-slate-600 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-blue-300 mb-4">Why Our Unit Economics Break SaaS Norms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div>
                <p><strong>Viral Growth Engine:</strong> K-factor of {BASE_BUSINESS_PARAMS.viralCoefficient} means every 10 companies drive 4 additional companies organically. Each founder naturally showcases their new company, creating authentic viral loops that reduce CAC to near-zero over time.</p>
                <p className="mt-3"><strong>Multi-Revenue Model:</strong> Formation fees ({formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} one-time) + monthly subscriptions (${formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} blended) create high LTV with multiple monetization points per customer relationship.</p>
              </div>
              <div>
                <p><strong>Network Effects Compounding:</strong> Each new company strengthens the platform for all users. VibeFund creates investment loops, VibeMatch enables founder collaboration, VibeReach amplifies marketing reach. Platform value increases exponentially with user count.</p>
                <p className="mt-3"><strong>AI-Optimized Operations:</strong> Minimal human overhead compared to traditional service businesses. Automated formation processes, AI-powered support, and self-service platform reduce operational costs while scaling revenue efficiently.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
} 