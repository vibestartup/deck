import { motion } from 'framer-motion'
import { 
  formatCurrency,
  BASE_INVESTMENT_PARAMS,
  COMPUTED_VALUES,
  baseProjections,
  TIMELINE_MARKER_PARAMS
} from '../../lib'

export function TheAskSlide() {
  // Helper function to convert days to months (rounding up for display)
  const daysToMonths = (days: number) => Math.ceil(days / 30.44);
  
  // Calculate actual day differences from today for all timeline markers
  const today = new Date();
  const investmentDays = Math.abs(TIMELINE_MARKER_PARAMS.investmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const launchDays = Math.abs(TIMELINE_MARKER_PARAMS.launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const customerSuccessDays = Math.abs(TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate phase durations in days
  const developmentPhaseDays = COMPUTED_VALUES.developmentPhaseDays;
  const prepPhaseDays = COMPUTED_VALUES.prepPhaseDays;

  // Use of funds breakdown from parameters
  const useOfFunds = [
    {
      category: 'Founder Salary Runway',
      amount: formatCurrency(BASE_INVESTMENT_PARAMS.useOfFunds.marketing / 1000) + 'k',
      percentage: (BASE_INVESTMENT_PARAMS.useOfFunds.marketing / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount * 100).toFixed(0) + '%',
      description: `${daysToMonths(prepPhaseDays + 90)} months × $5k/month post-investment`, // 90 days = ~3 months
      details: 'Enables founder to quit day job and focus full-time on execution'
    },
    {
      category: 'Marketing Acceleration',
      amount: formatCurrency(BASE_INVESTMENT_PARAMS.useOfFunds.infrastructure / 1000) + 'k',
      percentage: (BASE_INVESTMENT_PARAMS.useOfFunds.infrastructure / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount * 100).toFixed(0) + '%',
      description: `3 months viral scaling runway`,
      details: 'Video creation, content promotion, and paid amplification'
    },
    {
      category: 'Legal & Compliance',
      amount: formatCurrency(BASE_INVESTMENT_PARAMS.useOfFunds.legal / 1000) + 'k',
      percentage: (BASE_INVESTMENT_PARAMS.useOfFunds.legal / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount * 100).toFixed(0) + '%',
      description: 'Multi-state formation infrastructure',
      details: 'Legal counsel, compliance specialist, regulatory setup'
    },
    {
      category: 'VibeFund Treasury',
      amount: formatCurrency(BASE_INVESTMENT_PARAMS.useOfFunds.vibefundTreasury / 1000) + 'k',
      percentage: (BASE_INVESTMENT_PARAMS.useOfFunds.vibefundTreasury / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount * 100).toFixed(0) + '%',
      description: 'Founder investment dogfooding',
      details: 'Initial capital for VibeFund to invest in early VibeCompanies'
    }
  ];

  // Calculate return scenarios using computed values
  const calculateReturns = (exitMultiple: number, yearRevenue: number) => {
    const exitValuation = yearRevenue * exitMultiple;
    const investmentEquity = BASE_INVESTMENT_PARAMS.equityPercentage / 100;
    const returnValue = exitValuation * investmentEquity;
    const returnMultiple = returnValue / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount;
    return { exitValuation, returnValue, returnMultiple };
  };

  // Investment terms using computed values
  const investmentTerms = [
    { term: 'Investment amount', value: COMPUTED_VALUES.investmentAmountFormatted + ' SAFE', detail: 'Simple Agreement for Future Equity. Standard YC terms.' },
    { term: 'Pre-money valuation', value: formatCurrency(BASE_INVESTMENT_PARAMS.premoneyValuation / 1000000, 1) + 'M', detail: 'Conservative valuation based on proven traction and viral metrics.' },
    { term: 'Equity percentage', value: BASE_INVESTMENT_PARAMS.equityPercentage + '%', detail: 'Fair equity stake for early-stage risk and growth capital.' },
    { term: 'Use of funds', value: `${daysToMonths(prepPhaseDays + 90)}-month runway`, detail: 'Focused on achieving break-even and proving scalability.' }, // 90 days = ~3 months
    { term: 'Break-even timeline', value: `Month ${daysToMonths(launchDays + 30)}`, detail: 'Revenue covers all operating costs including team scaling.' }, // 30 days after launch
    { term: 'Expected ROI', value: '100x+', detail: 'Conservative estimates show exceptional return potential.' }
  ];

  // Year 1 revenue from projections
  const year1Revenue = baseProjections.totalRevenue;

  return (
    <div className="w-full flex flex-col px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight">
          The Ask & Return Potential
        </h1>
        <p className="text-2xl text-purple-400 mb-12 text-center font-medium">
          {COMPUTED_VALUES.investmentAmountFormatted} SAFE → $100M+ valuation (conservative)
        </p>

        {/* Investment Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-400">INVESTMENT TERMS & STRUCTURE</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Terms Table */}
            <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-6">Term Sheet Overview</h3>
              <div className="space-y-4">
                {investmentTerms.map((term, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="border-b border-gray-700 pb-3"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-gray-300 text-sm font-medium">{term.term}</span>
                      <span className="text-purple-400 font-bold">{term.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{term.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Use of Funds Breakdown */}
            <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-6">Use of Funds ({COMPUTED_VALUES.investmentAmountFormatted})</h3>
              <div className="space-y-4">
                {useOfFunds.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="border-l-4 border-purple-500 pl-4"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-purple-300 font-semibold text-sm">{item.category}</h4>
                      <div className="text-right">
                        <span className="text-purple-400 font-bold">{item.amount}</span>
                        <span className="text-gray-500 text-xs ml-2">({item.percentage})</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.details}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Return Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t-4 border-green-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-green-400">RETURN ANALYSIS & EXIT SCENARIOS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                scenario: `Year ${BASE_INVESTMENT_PARAMS.exitMultiples.year1} Exit`,
                multiple: BASE_INVESTMENT_PARAMS.exitMultiples.year1,
                revenue: year1Revenue,
                color: 'text-green-400',
                bgColor: 'bg-green-900/20 border-green-500/30'
              },
              {
                scenario: `Year ${BASE_INVESTMENT_PARAMS.exitMultiples.year2} Exit`,
                multiple: BASE_INVESTMENT_PARAMS.exitMultiples.year2,
                revenue: year1Revenue * 3.5, // Estimated 3.5x growth
                color: 'text-blue-400',
                bgColor: 'bg-blue-900/20 border-blue-500/30'
              },
              {
                scenario: `Year ${BASE_INVESTMENT_PARAMS.exitMultiples.year3} Exit`,
                multiple: BASE_INVESTMENT_PARAMS.exitMultiples.year3,
                revenue: year1Revenue * 7, // Estimated 7x growth
                color: 'text-purple-400',
                bgColor: 'bg-purple-900/20 border-purple-500/30'
              }
            ].map((scenario, index) => {
              const returns = calculateReturns(scenario.multiple, scenario.revenue);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                  className={`${scenario.bgColor} border rounded-lg p-6`}
                >
                  <h3 className={`text-xl font-bold mb-4 ${scenario.color}`}>{scenario.scenario}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-gray-300">{formatCurrency(scenario.revenue / 1000000, 0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exit Multiple:</span>
                      <span className="text-gray-300">{scenario.multiple}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Valuation:</span>
                      <span className="text-gray-300">{formatCurrency(returns.exitValuation / 1000000, 0)}M</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="text-gray-400">Return Value:</span>
                      <span className={`font-bold ${scenario.color}`}>{formatCurrency(returns.returnValue / 1000000, 1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Return Multiple:</span>
                      <span className={`font-bold ${scenario.color}`}>{formatCurrency(returns.returnMultiple, 0)}x</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Risk Mitigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-yellow-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">INVESTMENT DE-RISKING STRATEGY</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traction Milestones */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-300">Pre-Investment Traction</h3>
              <div className="space-y-4">
                {[
                  { milestone: `${daysToMonths(developmentPhaseDays)} months bootstrapped development`, status: 'Complete', description: 'Product development proven feasible with minimal capital' },
                  { milestone: 'Break-even model validated', status: 'Complete', description: `Financial projections show profitability by month ${daysToMonths(launchDays + 30)}` },
                  { milestone: 'Viral mechanics tested', status: 'Complete', description: 'K-factor of 0.4+ demonstrated through early content experiments' },
                  { milestone: `${COMPUTED_VALUES.preLaunchBurnFormatted} total pre-revenue burn`, status: 'Complete', description: 'Minimal capital risk demonstrated through efficient development' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-green-300 font-medium text-sm">{item.milestone}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Post-Investment Milestones */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-yellow-300">Post-Investment Validation</h3>
              <div className="space-y-4">
                {[
                  { milestone: `Month ${daysToMonths(investmentDays)}: Investment deployment`, target: '30 days', description: 'Legal setup, team assembly, launch preparation' },
                  { milestone: `Month ${daysToMonths(launchDays)}: Product launch`, target: '60 days', description: 'First customers, revenue generation begins' },
                  { milestone: `Month ${daysToMonths(launchDays + 30)}: Break-even achieved`, target: '90 days', description: 'Revenue covers all operating costs including team' },
                  { milestone: `Month ${daysToMonths(customerSuccessDays)}: First revenue hire`, target: '180 days', description: `Customer Success Manager at ${formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold / 1000)}k MRR milestone` }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-yellow-300 font-medium text-sm">{item.milestone}</p>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{item.target}</span>
                      </div>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-400">Ready to Transform Entrepreneurship?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Join us in building the operating system for AI-powered companies. 
            {COMPUTED_VALUES.investmentAmountFormatted} gets you early access to a platform that makes starting companies 
            as easy as prompting ChatGPT.
          </p>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400">{formatCurrency((year1Revenue / 1000000), 0)}M</p>
              <p className="text-sm text-gray-400">Year 1 Revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {formatCurrency((calculateReturns(BASE_INVESTMENT_PARAMS.exitMultiples.year1, year1Revenue).returnMultiple), 0)}x
              </p>
              <p className="text-sm text-gray-400">Conservative Return</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">{daysToMonths(launchDays + 30)}</p>
              <p className="text-sm text-gray-400">Months to Break-even</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Next Round:</strong> Series A at $1M+ MRR (month 15-18) with proven viral growth engine. 
              Network effects compound with each new VibeFounder, reducing future CAC and creating winner-take-most dynamics.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 