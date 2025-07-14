import { motion } from 'framer-motion'
import {
  baseProjections,
  keyMetrics,
  formatCurrency,
  formatMultiplier,
  formatPercentage,
  calculateInvestmentReturns,
  BASE_BUSINESS_PARAMS,
  INDUSTRY_BENCHMARKS
} from '../../lib'

export function TheAskSlide() {
  const useOfFunds = [
    { 
      category: 'AI agent development & orchestration', 
      amount: '$20k', 
      details: 'Multi-agent coordination, natural language processing, autonomous task execution systems',
      technical: 'GPT-4 integration, agent orchestration layer, task routing algorithms, real-time decision making, multi-modal AI'
    },
    { 
      category: '4-month autonomous showcase runway', 
      amount: '$15k', 
      details: `Demonstrate AI companies in action, showcase autonomous operations, viral growth content`,
      technical: 'Live autonomous company demos, real-time AI decision showcases, founder testimonials, success story amplification'
    },
    { 
      category: 'Core platform infrastructure', 
      amount: '$10k', 
      details: 'Company state management, AI integration APIs, autonomous execution engine',
      technical: 'Next.js frontend, Node.js backend, PostgreSQL, AI service integrations, real-time WebSocket connections'
    },
    { 
      category: 'Initial autonomous company fund', 
      amount: '$5k', 
      details: 'Seed autonomous companies to demonstrate platform capabilities',
      technical: 'Proof of concept autonomous businesses, AI agent performance testing, platform capability validation'
    }
  ]

  // Calculate investment returns dynamically
  const investmentReturns = calculateInvestmentReturns(
    50000, // $50k investment
    2000000, // $2M valuation
    baseProjections,
    [10, 8, 6] // Exit multiples
  );

  // Project future years revenue (simplified calculation)
  const year2Revenue = baseProjections.totalRevenue * 3.5; // Approximate growth
  const year3Revenue = baseProjections.totalRevenue * 7; // Approximate growth

  const returnScenarios = [
    { 
      timeline: 'Year 1 exit', 
      multiple: '10x revenue', 
      valuation: formatCurrency(investmentReturns[0].exitValuation / 1000000) + 'M', 
      return: formatMultiplier(investmentReturns[0].returnMultiple),
      assumptions: `Enterprise acquisition. ${formatCurrency(baseProjections.totalRevenue / 1000000)}M revenue × 10x multiple. Strategic premium for viral growth engine.`
    },
    { 
      timeline: 'Year 2 exit', 
      multiple: '8x revenue', 
      valuation: formatCurrency(year2Revenue * 8 / 1000000) + 'M', 
      return: formatMultiplier((year2Revenue * 8 * 0.025) / 50000),
      assumptions: `Public market comparable. ${formatCurrency(year2Revenue / 1000000)}M revenue × 8x multiple. SaaS public market median multiple.`
    },
    { 
      timeline: 'Year 3 exit', 
      multiple: '6x revenue', 
      valuation: formatCurrency(year3Revenue * 6 / 1000000) + 'M', 
      return: formatMultiplier((year3Revenue * 6 * 0.025) / 50000),
      assumptions: `IPO scenario. ${formatCurrency(year3Revenue / 1000000)}M revenue × 6x multiple. Mature SaaS company valuation with network effects premium.`
    }
  ]

  const whyThisWorks = [
    { 
      reason: `${formatMultiplier(keyMetrics.ltvCacRatio)} LTV/CAC ratio`, 
      benchmark: `vs ${INDUSTRY_BENCHMARKS.industryLtvCacRatio}x industry standard`,
      detail: 'Autonomous AI companies operate with near-zero marginal costs. Each successful showcase inspires exponential adoption.'
    },
    { 
      reason: 'Break-even month 2', 
      benchmark: `with ${formatPercentage(keyMetrics.grossMargin)} gross margins`,
      detail: 'AI agents eliminate human operational costs. Scalable autonomous execution with minimal infrastructure overhead.'
    },
    { 
      reason: `${formatCurrency(keyMetrics.finalARR / 1000000, 1)}M ARR by month 12`, 
      benchmark: 'Series A ready',
      detail: 'Proven autonomous company model. AI agents demonstrating 24/7 operation. Multiple successful showcases deployed.'
    },
    { 
      reason: 'First-mover in autonomous companies', 
      benchmark: 'category-defining platform',
      detail: 'No competitor offers true autonomous AI business operations. Platform effects create winner-take-most dynamics.'
    }
  ]

  const investmentTerms = [
    { term: 'Investment amount', value: '$50k SAFE', detail: 'Simple Agreement for Future Equity. Standard YC terms.' },
    { term: 'Valuation cap', value: '$2M', detail: 'Conservative pre-money valuation. 2.5% equity at cap.' },
    { term: 'Discount rate', value: '20%', detail: 'Discount to next round pricing. Standard seed investor protection.' },
    { term: 'Use of funds', value: '4-6 months runway', detail: `Prove product-market fit. Achieve viral coefficient >${BASE_BUSINESS_PARAMS.viralCoefficient}.` },
    { term: 'Next milestone', value: '$1M Series A', detail: `At ${formatCurrency(keyMetrics.finalMRR / 1000)}k+ MRR with proven viral growth (month 12).` }
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
          The Ask & Return Potential
        </h1>
        <p className="text-2xl text-green-400 mb-12 text-center font-medium">
          $50k SAFE → $100M+ valuation (conservative)
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">USE OF FUNDS</h2>
            <div className="space-y-6">
              {useOfFunds.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-blue-500/30 pl-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-300">{item.category}</p>
                    <p className="text-lg font-bold text-blue-400">{item.amount}</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.details}</p>
                  <p className="text-xs text-gray-500">{item.technical}</p>
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
            <h2 className="text-3xl font-bold mb-8 text-green-400">WHY THIS WORKS</h2>
            <div className="space-y-6">
              {whyThisWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-green-400 mb-1">{item.reason}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.benchmark}</p>
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-purple-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-400">RETURN SCENARIOS (at typical SaaS multiples)</h2>
          <div className="grid grid-cols-3 gap-8">
            {returnScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l-2 border-purple-500/30 pl-4"
              >
                <p className="text-lg font-bold text-purple-400 mb-2">{scenario.timeline}</p>
                <p className="text-sm text-gray-300 mb-2">{scenario.multiple}</p>
                <p className="text-2xl font-bold text-purple-300 mb-1">{scenario.valuation}</p>
                <p className="text-sm text-gray-400 mb-3">valuation</p>
                <p className="text-3xl font-bold text-green-400 mb-2">{scenario.return}</p>
                <p className="text-sm text-gray-400 mb-3">return</p>
                <p className="text-xs text-gray-500">{scenario.assumptions}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t-4 border-yellow-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">INVESTMENT TERMS</h2>
          <div className="grid grid-cols-5 gap-6">
            {investmentTerms.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="border-l-2 border-yellow-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-yellow-400 mb-1">{item.term}</p>
                <p className="text-sm text-gray-300 mb-2">{item.value}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Risk Mitigation:</strong> AI-powered operations reduce human dependencies. Autonomous execution scales without proportional cost increases. Multiple successful AI companies demonstrate model viability.</p>
            <p><strong>Competitive Advantage:</strong> First-mover in autonomous AI business operations. No existing platform offers true AI-powered company management. Technical moats via multi-agent coordination take years to replicate.</p>
            <p><strong>Market Timing:</strong> AI capabilities now sufficient for autonomous business operations. ChatGPT demonstrates mass market AI adoption. Founders ready for AI-powered business management.</p>
            <p><strong>Investment Thesis:</strong> Autonomous AI companies represent the future of business. {formatMultiplier(keyMetrics.ltvCacRatio)} LTV/CAC ratio from eliminated operational overhead. Revolutionary 100x+ return potential as entire markets transition to AI operation.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 