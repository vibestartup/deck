import { motion } from 'framer-motion'
import {
  baseProjections,
  baseCAC,
  baseLTV,
  formatCurrency,
  calculateInfrastructureCostPerCompany,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  INFRASTRUCTURE_OPTIMIZATION,
  BASE_EMPLOYEE_PARAMS,
  TIMELINE_MARKER_PARAMS,
  BURN_RATE_CALCULATIONS,
  BASE_INVESTMENT_PARAMS,
  COMPUTED_VALUES,
  calculateEmployeeCosts
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
    employeeCosts: number;
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
  timelineMarkers: Array<{
    month: number;
    label: string;
    type: 'launch' | 'investment' | 'hire' | 'milestone';
    description: string;
  }>;
  breakEvenMonth: number;
  height?: number;
}

function AdvancedFinancialChart({ data, paretoData, decisionThresholds, timelineMarkers, breakEvenMonth, height = 400 }: AdvancedChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxCosts = Math.max(...data.map(d => d.costs));
  const maxValue = Math.max(maxRevenue, maxCosts) * 1.1; // 10% padding
  
  // Get the month range
  const minMonth = Math.min(...data.map(d => d.month));
  const maxMonth = Math.max(...data.map(d => d.month));
  const monthRange = maxMonth - minMonth;
  
  // Scale data points for SVG (0-100 range)
  const scaleY = (value: number) => 90 - (value / maxValue) * 80;
  const scaleX = (month: number) => ((month - minMonth) / monthRange) * 90 + 5;

  // Generate path strings
  const revenuePath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.revenue)}`
  ).join(' ');
  
  const costsPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.costs)}`
  ).join(' ');

  const employeeCostsPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.employeeCosts)}`
  ).join(' ');

  // Profit line (can be negative)
  const profitPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month)} ${scaleY(d.profit)}`
  ).join(' ');

  // Zero line position
  const zeroY = scaleY(0);

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
          {/* Zero line */}
          <motion.line
            x1="5"
            y1={zeroY}
            x2="95"
            y2={zeroY}
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.2"
            strokeDasharray="2,2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Pareto frontier shaded area */}
          {paretoUpperPath && paretoLowerPath && (
            <motion.path
              d={`${paretoUpperPath} ${paretoLowerPath.split(' ').reverse().join(' ')} Z`}
              fill="rgba(255, 193, 7, 0.15)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          )}
          
          {/* Timeline markers - vertical lines */}
          {timelineMarkers.map((marker, index) => (
            <motion.line
              key={`marker-${index}`}
              x1={scaleX(marker.month)}
              y1="10"
              x2={scaleX(marker.month)}
              y2="90"
              stroke={
                marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                'rgb(156, 163, 175)'
              }
              strokeWidth="0.3"
              strokeDasharray={marker.type === 'launch' ? '1,1' : '2,2'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
            />
          ))}
          
          {/* Break-even vertical line */}
          {breakEvenMonth >= minMonth && breakEvenMonth <= maxMonth && (
            <motion.line
              x1={scaleX(breakEvenMonth)}
              y1="10"
              x2={scaleX(breakEvenMonth)}
              y2="90"
              stroke="rgb(34, 197, 94)"
              strokeWidth="0.4"
              strokeDasharray="3,3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          )}
          
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
          
          {/* Total costs line */}
          <motion.path
            d={costsPath}
            fill="none"
            stroke="rgb(239, 68, 68)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Employee costs line */}
          <motion.path
            d={employeeCostsPath}
            fill="none"
            stroke="rgb(168, 85, 247)"
            strokeWidth="0.6"
            strokeDasharray="4,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          
          {/* Profit line */}
          <motion.path
            d={profitPath}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
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

          {/* Timeline marker points */}
          {timelineMarkers.map((marker, index) => (
            <motion.circle
              key={`marker-point-${index}`}
              cx={scaleX(marker.month)}
              cy={scaleY(data.find(d => d.month === marker.month)?.revenue || data.find(d => d.month === marker.month)?.costs || 0)}
              r="1.2"
              fill={
                marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                'rgb(156, 163, 175)'
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.15 }}
            />
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
            {[-6, -3, 0, 3, 6, 9, 12].map((month) => (
              <span key={month} style={{ position: 'absolute', left: `${scaleX(month)}%`, transform: 'translateX(-50%)' }}>
                M{month}
              </span>
            ))}
          </div>
          
          {/* Break-even label */}
          {breakEvenMonth >= minMonth && breakEvenMonth <= maxMonth && (
            <div className="absolute text-xs text-green-400 font-semibold" 
                 style={{ 
                   left: `${scaleX(breakEvenMonth)}%`, 
                   top: '15%',
                   transform: 'translateX(-50%)'
                 }}>
              Break-even<br/>Month {breakEvenMonth}
            </div>
          )}
          
          {/* Timeline marker labels */}
          {timelineMarkers.map((marker, index) => (
            <div key={index} 
                 className="absolute text-xs font-semibold" 
                 style={{ 
                   left: `${scaleX(marker.month)}%`, 
                   top: `${20 + index * 8}%`,
                   transform: 'translateX(-50%)',
                   color: marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                          marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                          marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                          'rgb(156, 163, 175)'
                 }}>
              {marker.label}
            </div>
          ))}
          
          {/* Strategic thresholds labels */}
          {decisionThresholds.map((threshold, index) => (
            <div key={index} 
                 className="absolute text-xs font-semibold" 
                 style={{ 
                   left: `${scaleX(threshold.month)}%`, 
                   top: `${60 + index * 15}%`,
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
              <span className="text-gray-300">Total Costs</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-purple-400 mr-2 border-dashed border border-purple-400"></div>
              <span className="text-gray-300">Employee Costs</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-0.5 bg-green-400 mr-2"></div>
              <span className="text-gray-300">Profit/Loss</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-2 bg-yellow-400/20 border border-yellow-400/40 mr-2"></div>
              <span className="text-gray-300">Pareto Frontier</span>
            </div>
            <div className="flex items-center">
              <div className="w-0.5 h-3 bg-green-400 border-dashed mr-2"></div>
              <span className="text-gray-300">Milestones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinancialProjectionsSlide() {
  // Calculate monthly financial data including costs and employee costs
  const monthlyFinancialData = baseProjections.cohorts.map((cohort) => {
    const month = cohort.month;
    const totalCompanies = cohort.totalCompanies;
    const infrastructureCost = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);
    const employeeCostsResult = calculateEmployeeCosts(
      BASE_EMPLOYEE_PARAMS, 
      month, 
      cohort.monthlyRecurringRevenue, 
      undefined, 
      month >= BASE_BUSINESS_PARAMS.investmentMonth
    );
    const employeeCosts = employeeCostsResult.totalCost;
    
    // For pre-launch months, costs are just employee costs
    // For post-launch, include infrastructure costs
    const variableCosts = month >= TIMELINE_MARKER_PARAMS.launchMonth ? totalCompanies * infrastructureCost : 0;
    const totalCosts = employeeCosts + variableCosts;
    
    return {
      month,
      revenue: cohort.totalRevenue,
      costs: totalCosts,
      profit: cohort.totalRevenue - totalCosts,
      companies: totalCompanies,
      employeeCosts: employeeCosts
    };
  });

  // Find break-even month
  const breakEvenMonth = monthlyFinancialData.find(d => d.profit > 0)?.month || TIMELINE_MARKER_PARAMS.launchMonth + 1;

  // Use computed timeline markers
  const timelineMarkers = COMPUTED_VALUES.getTimelineMarkers();

  // Strategic decision thresholds
  const decisionThresholds = [
    { month: 15, label: 'Aggressive\nTransition', type: 'aggressive' as const },
    { month: 18, label: 'Optimal\nTransition', type: 'optimal' as const },
    { month: 24, label: 'Conservative\nTransition', type: 'conservative' as const }
  ];

  // Key metrics for cards using computed values
  const keyMetricsCards = [
    {
      label: 'Pre-Launch Burn',
      value: COMPUTED_VALUES.preLaunchBurnFormatted,
      color: 'red',
      description: `${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * COMPUTED_VALUES.developmentPhaseMonths / 1000)}k dev + ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn * COMPUTED_VALUES.prepPhaseMonths / 1000)}k prep`
    },
    {
      label: 'Break-even Month',
      value: String(breakEvenMonth),
      color: 'green',
      description: `Month ${breakEvenMonth} after investment`
    },
    {
      label: 'Month 12 MRR',
      value: formatCurrency((monthlyFinancialData.find(d => d.month === 12)?.revenue || 0) / 1000000, 1) + 'M',
      color: 'purple',
      description: formatCurrency((monthlyFinancialData.find(d => d.month === 12)?.revenue || 0) * 12 / 1000000, 1) + 'M ARR run rate'
    },
    {
      label: 'First Year ROI',
      value: formatCurrency((baseProjections.totalRevenue - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount, 0) + 'x',
      color: 'yellow',
      description: `Return on ${COMPUTED_VALUES.investmentAmountFormatted} investment`
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
          Financial Projections & Milestone Timeline
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          {COMPUTED_VALUES.preLaunchBurnFormatted} pre-launch burn → $0 revenue at launch → {formatCurrency((monthlyFinancialData.find(d => d.month === 12)?.revenue || 0) / 1000000, 1)}M MRR by month 12
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

        {/* Advanced Financial Chart with Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t-4 border-blue-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">REVENUE TRAJECTORY WITH INVESTMENT & HIRING MILESTONES</h2>
          
          <AdvancedFinancialChart 
            data={monthlyFinancialData}
            paretoData={INFRASTRUCTURE_OPTIMIZATION.paretoFrontier}
            decisionThresholds={decisionThresholds}
            timelineMarkers={timelineMarkers}
            breakEvenMonth={breakEvenMonth}
            height={500}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investment Timeline */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Investment & Funding Timeline</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pre-Investment (Month {TIMELINE_MARKER_PARAMS.developmentStartMonth} to {TIMELINE_MARKER_PARAMS.investmentMonth - 1}):</strong> ${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 1000)}k/month contractor, bootstrapped development</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.investmentMonth}:</strong> {COMPUTED_VALUES.investmentAmountFormatted} investment received</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.investmentMonth + 1}:</strong> Full preparation period - infrastructure setup, legal compliance, marketing materials</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.launchMonth}:</strong> Product launch with revenue generation beginning</p>
                <p><strong>Post-Investment:</strong> Founder salary ${formatCurrency(BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Founder Salary')?.monthlyCost || 0 / 1000)}k/month + legal ${formatCurrency(BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Legal Counsel')?.monthlyCost || 0 / 1000)}k/month + compliance ${formatCurrency(BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Compliance Specialist')?.monthlyCost || 0 / 1000)}k/month</p>
                <p><strong>Employee Burn Rate:</strong> ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 1000)}k/month during prep, ${formatCurrency(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 1000)}k/month after launch (adding marketing)</p>
                <p className="text-xs text-purple-300 mt-2">Investment provides runway for proper launch preparation. The full month between investment and launch ensures infrastructure, legal, and go-to-market strategy are fully ready. {COMPUTED_VALUES.investmentAmountFormatted} provides 6-month runway for core team while revenue scales to support additional hires.</p>
              </div>
            </div>
            
            {/* Hiring Strategy */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Revenue-Driven Hiring Strategy</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Month {TIMELINE_MARKER_PARAMS.customerSuccessHire.month}:</strong> Customer Success at ${formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold / 1000)}k MRR</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.marketingHire.month}:</strong> Marketing Manager at ${formatCurrency(TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold / 1000)}k MRR</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.seniorDevHire.month}:</strong> Senior Developer at ${formatCurrency(TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold / 1000)}k MRR</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.salesHire.month}:</strong> Sales Manager at ${formatCurrency(TIMELINE_MARKER_PARAMS.salesHire.mrrThreshold / 1000)}k MRR</p>
                <p className="text-xs text-blue-300 mt-2">Each hire triggered by MRR milestones ensuring revenue can support increased payroll. Conservative hiring approach maintains cash flow positive operations throughout growth phase.</p>
              </div>
            </div>
            
            {/* Cost Structure Evolution */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Cost Structure Evolution</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Month {TIMELINE_MARKER_PARAMS.developmentStartMonth} to {TIMELINE_MARKER_PARAMS.investmentMonth - 1}:</strong> ${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 1000)}k/month contractor only = ${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * COMPUTED_VALUES.developmentPhaseMonths / 1000)}k total pre-investment burn</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.investmentMonth}:</strong> Investment received, costs jump to ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 1000)}k/month (founder + legal + compliance)</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.investmentMonth + 1}:</strong> Full prep month at ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 1000)}k/month (entire month dedicated to launch preparation)</p>
                <p><strong>Month {TIMELINE_MARKER_PARAMS.launchMonth}:</strong> Launch! Costs increase to ${formatCurrency(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 1000)}k/month (adding ${formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend / 1000)}k marketing), revenue begins</p>
                <p><strong>Month 12:</strong> ${formatCurrency(COMPUTED_VALUES.getEmployeeCostAtMonth(12, (monthlyFinancialData.find(d => d.month === 12)?.revenue || 0)).totalCost / 1000)}k employee costs + {formatCurrency(infrastructureCostPerCompany * (monthlyFinancialData.find(d => d.month === 12)?.companies || 0) / 1000)}k infrastructure</p>
                <p><strong>Break-even maintained:</strong> Revenue growth outpaces cost increases</p>
                <p className="text-xs text-green-300 mt-2">Employee costs scale predictably with revenue milestones. Infrastructure costs managed through three-stage optimization strategy. Overall operating leverage improves throughout timeline.</p>
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
                  `Break-even: Month ${breakEvenMonth} at ${Math.round(monthlyFinancialData.find(d => d.month === breakEvenMonth)?.companies || 0)} companies`,
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
          <h2 className="text-3xl font-bold mb-8 text-red-400">FINANCIAL MODELING & MILESTONE ECONOMICS</h2>
          
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
            
            {/* Investment Timeline Economics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Investment Timeline Economics</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-300">
                   <p><strong>Pre-Investment:</strong> ${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 1000)}k/month burn rate</p>
                   <p><strong>Investment Timing:</strong> Month {TIMELINE_MARKER_PARAMS.investmentMonth} (after {COMPUTED_VALUES.developmentPhaseMonths} months development)</p>
                   <p><strong>Post-Investment:</strong> ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 1000)}k/month base burn + revenue-driven hires</p>
                   <p><strong>Hire Triggers:</strong> MRR milestones ensure affordability</p>
                   <p><strong>Month 12 Burn:</strong> ${formatCurrency(COMPUTED_VALUES.getEmployeeCostAtMonth(12, (monthlyFinancialData.find(d => d.month === 12)?.revenue || 0)).totalCost / 1000)}k/month total employee costs</p>
                   <p><strong>Cash Flow:</strong> Positive throughout (revenue &gt; costs)</p>
                   <p><strong>Investment Efficiency:</strong> <span className="text-green-400">{formatCurrency((monthlyFinancialData[11].revenue * 12 - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount, 0)}x first year return</span></p>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Infrastructure Cost Evolution */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Timeline-Based Strategic Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-green-300 mb-2">Launch Strategy (Month {TIMELINE_MARKER_PARAMS.investmentMonth}-{TIMELINE_MARKER_PARAMS.launchMonth + 1})</p>
                <p>Bootstrapped launch with minimal team (contractor + founder). Focus on proving product-market fit before major investment. Marketing spend drives viral growth. Break-even achieved Month {breakEvenMonth} validates business model before scaling costs.</p>
              </div>
              <div>
                <p className="font-semibold text-purple-300 mb-2">Investment Strategy (Month {TIMELINE_MARKER_PARAMS.launchMonth}-12)</p>
                <p>{COMPUTED_VALUES.investmentAmountFormatted} received after break-even proven reduces investor risk. Founder salary allows full-time focus. Legal/compliance hires ensure scalable operations. Revenue-driven hiring ensures each new employee is affordable based on MRR growth.</p>
              </div>
              <div>
                <p className="font-semibold text-blue-300 mb-2">Scaling Strategy (Month 12+)</p>
                <p>Infrastructure transition planning begins Month 15. Each hire adds specific capabilities tied to revenue milestones. Operating leverage improves as fixed costs are spread across growing revenue base. Path to profitability at scale demonstrated.</p>
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
            <p><strong>Investment-First Strategy:</strong> Month {TIMELINE_MARKER_PARAMS.investmentMonth} investment provides capital after {COMPUTED_VALUES.developmentPhaseMonths} months of bootstrapped development. Pre-launch burn totals {COMPUTED_VALUES.preLaunchBurnFormatted} (contractor only). Month {TIMELINE_MARKER_PARAMS.investmentMonth + 1} is entirely dedicated to launch preparation, ensuring all systems are ready: formation APIs tested, legal compliance verified, marketing materials prepared, and initial content created. This de-risks the launch while providing founder salary to focus full-time on execution.</p>
            
            <p><strong>Revenue-Driven Hiring Model:</strong> Each hire triggered by specific MRR milestones ensuring affordability: Customer Success at ${formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold / 1000)}k MRR (Month {TIMELINE_MARKER_PARAMS.customerSuccessHire.month}), Marketing at ${formatCurrency(TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold / 1000)}k MRR (Month {TIMELINE_MARKER_PARAMS.marketingHire.month}), Senior Developer at ${formatCurrency(TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold / 1000)}k MRR (Month {TIMELINE_MARKER_PARAMS.seniorDevHire.month}). This conservative approach maintains positive cash flow throughout scaling while building capabilities systematically.</p>
            
            <p><strong>Cost Structure Evolution:</strong> Pre-investment costs limited to ${formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 1000)}k/month contractor for {COMPUTED_VALUES.developmentPhaseMonths} months. Post-investment jumps to ${formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 1000)}k/month base (founder + legal + compliance) during month {TIMELINE_MARKER_PARAMS.investmentMonth + 1} prep period, then ${formatCurrency(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 1000)}k at launch (month {TIMELINE_MARKER_PARAMS.launchMonth}) adding marketing. Revenue starts at $0 on launch day (beginning of Month {TIMELINE_MARKER_PARAMS.launchMonth}) and quickly scales to cover costs. Infrastructure costs optimize through three-stage strategy. Break-even achieved by Month {breakEvenMonth} despite initial burn period.</p>
            
            <p><strong>Financial Model Validation:</strong> Timeline demonstrates sustainable path to ${formatCurrency(baseProjections.totalRevenue / 1000000, 0)}M year 1 revenue even with {TIMELINE_MARKER_PARAMS.launchMonth - TIMELINE_MARKER_PARAMS.developmentStartMonth} months of pre-revenue burn. Total pre-revenue investment: {COMPUTED_VALUES.preLaunchBurnFormatted} ({formatCurrency(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * COMPUTED_VALUES.developmentPhaseMonths / 1000)}k pre-investment + {formatCurrency(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn * COMPUTED_VALUES.prepPhaseMonths / 1000)}k prep). Investment ROI exceeds {formatCurrency((baseProjections.totalRevenue - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount, 0)}x in first year. Conservative hiring and infrastructure transition timing ensures execution risk is minimized while growth potential is maximized.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 