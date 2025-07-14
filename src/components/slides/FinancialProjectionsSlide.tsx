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
  BASE_INFRASTRUCTURE_PARAMS,
  INFRASTRUCTURE_OPTIMIZATION
} from '../../lib'
import { MetricCards } from '../charts'

// Enhanced Line Chart with Break-even and Shaded Areas
interface AdvancedChartProps {
  data: Array<{
    month: number;
    revenue: number;
    costs: number;
    profit: number;
    companies: number;
  }>;
  paretoData: Array<{
    month: number;
    companies: number;
    awsCost: number;
    selfHostedCost: number;
    netSavings: number;
    roi: number;
  }>;
  decisionThresholds: Array<{
    month: number;
    label: string;
    type: 'conservative' | 'optimal' | 'aggressive';
  }>;
  height?: number;
}

function AdvancedFinancialChart({ data, paretoData, decisionThresholds, height = 400 }: AdvancedChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxCosts = Math.max(...data.map(d => d.costs));
  const maxValue = Math.max(maxRevenue, maxCosts) * 1.1; // 10% padding
  
  // Find break-even month
  const breakEvenMonth = data.find(d => d.profit > 0)?.month || 2;
  
  // Scale data points for SVG (0-100 range)
  const scaleY = (value: number) => 90 - (value / maxValue) * 80;
  const scaleX = (month: number) => ((month - 1) / 11) * 90 + 5;

  // Generate path strings
  const revenuePath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.revenue)}`
  ).join(' ');
  
  const costsPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.costs)}`
  ).join(' ');

  // Pareto frontier shaded area (months 12-24)
  const paretoAreaData = paretoData.filter(d => d.month >= 12 && d.month <= 24);
  const paretoUpperPath = paretoAreaData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.awsCost)}`
  ).join(' ');
  const paretoLowerPath = paretoAreaData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.selfHostedCost)}`
  ).join(' ');

  return (
    <div className="w-full">
      <div className="relative bg-gray-900/30 border border-gray-700 rounded-lg p-6" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Pareto frontier shaded area */}
          <motion.path
            d={`${paretoUpperPath} ${paretoLowerPath.split(' ').reverse().join(' ')} Z`}
            fill="rgba(255, 193, 7, 0.15)"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {/* Break-even vertical line */}
          <motion.line
            x1={scaleX(breakEvenMonth)}
            y1="10"
            x2={scaleX(breakEvenMonth)}
            y2="90"
            stroke="rgb(34, 197, 94)"
            strokeWidth="0.3"
            strokeDasharray="2,2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          {/* Revenue line */}
          <motion.path
            d={revenuePath}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Costs line */}
          <motion.path
            d={costsPath}
            fill="none"
            stroke="rgb(239, 68, 68)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
          
          {/* Revenue data points */}
          {data.map((item, index) => (
            <motion.circle
              key={`revenue-${index}`}
              cx={scaleX(item.month)}
              cy={scaleY(item.revenue)}
              r="1"
              fill="rgb(59, 130, 246)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
          
          {/* Strategic decision threshold markers */}
          {decisionThresholds.map((threshold, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={scaleX(threshold.month)}
                cy={scaleY(data.find(d => d.month === threshold.month)?.revenue || 0)}
                r="1.5"
                fill={threshold.type === 'optimal' ? 'rgb(34, 197, 94)' : 
                      threshold.type === 'conservative' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.2 }}
              />
            </motion.g>
          ))}
        </svg>
        
        {/* Chart labels and axis */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Y-axis labels */}
          <div className="absolute left-2 top-4 text-xs text-gray-400">
            {formatCurrency(maxValue / 1000000, 1)}M
          </div>
          <div className="absolute left-2 top-1/2 text-xs text-gray-400">
            {formatCurrency(maxValue / 2000000, 1)}M
          </div>
          <div className="absolute left-2 bottom-4 text-xs text-gray-400">
            $0
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-400 px-8">
            {data.filter((_, i) => i % 2 === 0).map((item, index) => (
              <span key={index}>M{item.month}</span>
            ))}
          </div>
          
          {/* Break-even label */}
          <div className="absolute text-xs text-green-400 font-semibold" 
               style={{ 
                 left: `${scaleX(breakEvenMonth)}%`, 
                 top: '15%',
                 transform: 'translateX(-50%)'
               }}>
            Break-even<br/>Month {breakEvenMonth}
          </div>
          
          {/* Strategic thresholds labels */}
          {decisionThresholds.map((threshold, index) => (
            <div key={index} 
                 className="absolute text-xs font-semibold" 
                 style={{ 
                   left: `${scaleX(threshold.month)}%`, 
                   top: `${30 + index * 15}%`,
                   transform: 'translateX(-50%)',
                   color: threshold.type === 'optimal' ? 'rgb(34, 197, 94)' : 
                          threshold.type === 'conservative' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'
                 }}>
              {threshold.label}
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-gray-800/80 border border-gray-600 rounded p-2 text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-blue-400 mr-2"></div>
              <span className="text-gray-300">Revenue</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-red-400 mr-2"></div>
              <span className="text-gray-300">Costs</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-2 bg-yellow-400/20 border border-yellow-400/40 mr-2"></div>
              <span className="text-gray-300">Pareto Frontier</span>
            </div>
            <div className="flex items-center">
              <div className="w-0.5 h-3 bg-green-400 border-dashed mr-2"></div>
              <span className="text-gray-300">Break-even</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinancialProjectionsSlide() {
  // Calculate monthly financial data including costs
  const monthlyFinancialData = baseProjections.cohorts.map((cohort, index) => {
    const month = index + 1;
    const totalCompanies = cohort.totalCompanies;
    const infrastructureCost = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);
    const fixedCosts = 28135; // Monthly fixed costs from slide
    const variableCosts = totalCompanies * infrastructureCost;
    const totalCosts = fixedCosts + variableCosts;
    
    return {
      month,
      revenue: cohort.totalRevenue,
      costs: totalCosts,
      profit: cohort.totalRevenue - totalCosts,
      companies: totalCompanies
    };
  });

  // Strategic decision thresholds
  const decisionThresholds = [
    { month: 15, label: 'Aggressive\nTransition', type: 'aggressive' as const },
    { month: 18, label: 'Optimal\nTransition', type: 'optimal' as const },
    { month: 24, label: 'Conservative\nTransition', type: 'conservative' as const }
  ];

  // Key metrics for cards
  const keyMetricsCards = [
    {
      label: 'Year 1 Revenue',
      value: formatCurrency(baseProjections.totalRevenue / 1000000, 1) + 'M',
      color: 'blue',
      description: '87,714 companies formed'
    },
    {
      label: 'Break-even Month',
      value: '2',
      color: 'green',
      description: 'At 882 companies'
    },
    {
      label: 'Final MRR',
      value: formatCurrency(monthlyFinancialData[11].revenue / 1000000, 1) + 'M',
      color: 'purple',
      description: formatCurrency(monthlyFinancialData[11].revenue * 12 / 1000000, 1) + 'M ARR run rate'
    },
    {
      label: 'Optimal Transition',
      value: 'Month 18',
      color: 'yellow',
      description: formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[1].netPresentValue / 1000000, 1) + 'M NPV'
    }
  ];

  const infrastructureCostPerCompany = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);

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
          {formatCurrency(monthlyFinancialData[0].revenue / 1000)}k MRR → {formatCurrency(monthlyFinancialData[11].revenue / 1000000, 1)}M MRR in 12 months
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

        {/* Advanced Financial Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t-4 border-blue-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">MONTHLY FINANCIAL TRAJECTORY WITH INFRASTRUCTURE OPTIMIZATION</h2>
          
          <AdvancedFinancialChart 
            data={monthlyFinancialData}
            paretoData={INFRASTRUCTURE_OPTIMIZATION.paretoFrontier}
            decisionThresholds={decisionThresholds}
            height={500}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Break-even Analysis */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Break-even Analysis</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Month 2:</strong> First profitable month at 882 companies</p>
                <p><strong>Revenue:</strong> {formatCurrency(monthlyFinancialData[1].revenue)} total</p>
                <p><strong>Costs:</strong> {formatCurrency(monthlyFinancialData[1].costs)} (fixed + variable)</p>
                <p><strong>Profit:</strong> {formatCurrency(monthlyFinancialData[1].profit)}</p>
                <p className="text-xs text-green-300 mt-2">85% gross margins sustained throughout Stage 1 due to AWS credits covering all infrastructure costs. Break-even achieved despite conservative viral coefficients and churn assumptions.</p>
              </div>
            </div>
            
            {/* Pareto Frontier Explanation */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Pareto Frontier (Shaded Area)</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Shows:</strong> AWS vs Self-hosted cost difference</p>
                <p><strong>Optimal Window:</strong> Months 15-24 for transition</p>
                <p><strong>Risk vs Reward:</strong> Earlier = higher savings, higher risk</p>
                <p><strong>Month 18:</strong> Sweet spot with {formatCurrency(910000 / 1000)}k monthly savings</p>
                <p className="text-xs text-yellow-300 mt-2">Shaded area represents the cost arbitrage opportunity. Upper bound shows AWS costs at scale, lower bound shows self-hosted equivalent. Width indicates optimal transition timing window.</p>
              </div>
            </div>
            
            {/* Strategic Decision Points */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Strategic Decision Thresholds</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-red-400">◆</span> <strong>Aggressive (Month 15):</strong> {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[2].netPresentValue / 1000000, 1)}M NPV</p>
                <p><span className="text-green-400">◆</span> <strong>Optimal (Month 18):</strong> {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[1].netPresentValue / 1000000, 1)}M NPV</p>
                <p><span className="text-blue-400">◆</span> <strong>Conservative (Month 24):</strong> {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[0].netPresentValue / 1000000, 1)}M NPV</p>
                <p className="text-xs text-purple-300 mt-2">Each threshold represents 3-year NPV scenarios. Optimal timing balances execution risk with cost savings. Risk-adjusted returns favor Month 18 transition with {formatPercentage(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[1].riskAdjustedReturn)} expected ROI.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-Stage Infrastructure Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t-4 border-gray-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-300">THREE-STAGE INFRASTRUCTURE EVOLUTION</h2>
          
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              {
                stage: 'Stage 1: AWS Credits Active',
                timeline: 'Months 1-12',
                color: 'border-green-500',
                textColor: 'text-green-400',
                details: [
                  `Infrastructure cost: $0 (AWS credits cover ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.awsCreditsMonthly * 12 / 1000000, 1)}M)`,
                  'SaaS gross margin: 94% (payment processing only)',
                  'Formation gross margin: 26% (state fees + KYC)',
                  'Break-even: Month 2 at 882 companies',
                  'Profit machine: Every $ of revenue = $0.85 profit'
                ]
              },
              {
                stage: 'Stage 2: Paid Infrastructure Crisis',
                timeline: 'Months 13-24',
                color: 'border-yellow-500',
                textColor: 'text-yellow-400',
                details: [
                  `Infrastructure cost: ${formatCurrency(infrastructureCostPerCompany)}/company/month`,
                  `At 100k companies: ${formatCurrency(infrastructureCostPerCompany * 100000 / 1000000, 1)}M/month AWS spend`,
                  'Pricing increase required: $40 → $60 average',
                  'SaaS gross margin: 73% (post-pricing adjustment)',
                  'Transition planning window: Months 15-24'
                ]
              },
              {
                stage: 'Stage 3: Hybrid Self-Hosted',
                timeline: 'Month 25+',
                color: 'border-purple-500',
                textColor: 'text-purple-400',
                details: [
                  `CapEx investment: ${formatCurrency(BASE_INFRASTRUCTURE_PARAMS.selfHostingSetupCost / 1000000)}M infrastructure setup`,
                  `Monthly savings: ${formatCurrency(infrastructureCostPerCompany * BASE_INFRASTRUCTURE_PARAMS.selfHostingSavingsRate * 100000 / 1000000, 1)}M vs AWS at 100k companies`,
                  'SaaS gross margin: 95% (optimized infrastructure)',
                  'Self-hosted capacity: 1M+ companies',
                  'Path to $100M ARR with <1% global market share'
                ]
              }
            ].map((stage, index) => (
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

        {/* Financial Modeling Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="border-t-4 border-red-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">FINANCIAL MODELING & UNIT ECONOMICS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Unit Economics Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Per-Company Unit Economics</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Formation Revenue:</strong> {formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} (one-time)</p>
                  <p><strong>Monthly Subscription:</strong> {formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} blended</p>
                  <p><strong>Formation COGS:</strong> {formatCurrency(88.61)} (state fees + processing)</p>
                  <p><strong>Monthly COGS:</strong> {formatCurrency(infrastructureCostPerCompany)} (Stage 2)</p>
                  <p><strong>CAC per Company:</strong> {formatCurrency(baseCAC.cacPerCompany)}</p>
                  <p><strong>LTV per Company:</strong> {formatCurrency(baseLTV.blendedLTV)}</p>
                  <p><strong>LTV/CAC Ratio:</strong> <span className="text-green-400">{(baseLTV.blendedLTV / baseCAC.cacPerCompany).toFixed(1)}x</span></p>
                </div>
              </div>
            </div>
            
            {/* Viral Growth Economics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Viral Growth Economics</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-300">
                   <p><strong>Marketing Spend:</strong> {formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend)}/month</p>
                   <p><strong>Direct Acquisitions:</strong> {formatNumber(baseCAC.directCompanies)} companies/month</p>
                   <p><strong>Viral Coefficient:</strong> {BASE_BUSINESS_PARAMS.viralCoefficient} (conservative)</p>
                   <p><strong>Viral Additions:</strong> {formatNumber(baseCAC.viralCompanies)} companies/month</p>
                   <p><strong>Total New Companies:</strong> {formatNumber(baseCAC.totalCompanies)}/month</p>
                   <p><strong>Blended CAC:</strong> {formatCurrency(baseCAC.cacPerCompany)} per company</p>
                   <p><strong>Viral Multiplier:</strong> <span className="text-green-400">{(baseCAC.totalCompanies / baseCAC.directCompanies).toFixed(1)}x</span></p>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Infrastructure Cost Evolution */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Infrastructure Cost Evolution Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-green-300 mb-2">Stage 1 Advantage (Months 1-12)</p>
                <p>AWS provides $100k/month in credits for startups, covering our entire infrastructure spend. This creates an artificial profit margin of 94% that won't scale, but provides 12 months of incredible unit economics to prove product-market fit and build war chest.</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300 mb-2">Stage 2 Challenge (Months 13-24)</p>
                <p>AWS credits expire and infrastructure costs hit {formatCurrency(infrastructureCostPerCompany)}/company/month. At 100k companies, that's {formatCurrency(infrastructureCostPerCompany * 100000 / 1000000, 1)}M/month. Pricing increase to $60 average required to maintain 73% margins. Critical transition planning window.</p>
              </div>
              <div>
                <p className="font-semibold text-purple-300 mb-2">Stage 3 Optimization (Month 25+)</p>
                <p>Self-hosted infrastructure reduces per-company costs to ~$2/month while increasing reliability and control. {formatCurrency(BASE_INFRASTRUCTURE_PARAMS.selfHostingSetupCost / 1000000)}M upfront investment pays for itself in 6 months through cost savings alone.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-3">
            <p><strong>Break-even Achievement:</strong> Month 2 break-even demonstrates exceptional unit economics driven by viral growth mechanics and AWS credit subsidy. Even with conservative assumptions (30% formation rate, 8% monthly churn, 0.4 viral coefficient), the business generates positive cash flow within 60 days of launch.</p>
            
            <p><strong>Infrastructure Transition Strategy:</strong> The Pareto frontier analysis (shaded area in chart) shows the optimal window for transitioning from AWS to self-hosted infrastructure. Month 18 represents the sweet spot balancing execution risk with cost savings - early enough to capture {formatCurrency(910000 / 1000)}k monthly savings, late enough to have operational experience and capital reserves.</p>
            
            <p><strong>Strategic Decision Modeling:</strong> Three scenarios modeled with 3-year NPV analysis: Aggressive (Month 15, {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[2].netPresentValue / 1000000, 1)}M NPV), Optimal (Month 18, {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[1].netPresentValue / 1000000, 1)}M NPV), Conservative (Month 24, {formatCurrency(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[0].netPresentValue / 1000000, 1)}M NPV). Risk-adjusted returns favor the optimal scenario with {formatPercentage(INFRASTRUCTURE_OPTIMIZATION.decisionMatrix[1].riskAdjustedReturn)} expected ROI.</p>
            
            <p><strong>Scalability Validation:</strong> Financial model stress-tested with heavy usage assumptions: {formatNumber(50000)} API calls, {formatNumber(3000)} emails, {formatNumber(200)} SMS, and {formatNumber(600)} voice minutes per company monthly. Even with 100x baseline infrastructure usage plus extensive AI services, unit economics remain compelling across all three stages with sustained gross margins above 70%.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 