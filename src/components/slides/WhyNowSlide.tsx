import { motion } from 'framer-motion'

export function WhyNowSlide() {
  const marketTiming = [
    {
      trend: 'AI capabilities now sufficient for autonomous business operation',
      detail: 'Multi-agent coordination possible. GPT-4 handles complex reasoning. Specialized AI agents can manage coding, design, marketing, and operations autonomously.',
      data: 'OpenAI API usage up 300% in 2024. 89% of developers report AI significantly improves productivity. Multi-agent frameworks like AutoGPT demonstrating autonomous task completion.'
    },
    {
      trend: 'ChatGPT proves mass market ready for AI conversation interfaces',
      detail: 'Natural language as primary interface normalized. 180M+ users comfortable chatting with AI. Business management through conversation becomes intuitive.',
      data: 'ChatGPT reached 100M users in 2 months. 73% of knowledge workers use AI tools daily. Natural language interfaces now expected user experience. <a href="https://www.hubspot.com/marketing-statistics" target="_blank" rel="noopener noreferrer" className="text-blue-400">[10]</a>'
    },
    {
      trend: 'Traditional workforce costs becoming prohibitive for startups',
      detail: 'Median engineering salary $180k+. Marketing specialists $120k+. Operations managers $100k+. AI agents provide equivalent capability at fraction of cost.',
      data: 'Tech salaries up 40% since 2020. 87% of startups cite talent costs as primary constraint. Remote work increased global competition for talent.'
    },
    {
      trend: 'Founder burnout from operational complexity epidemic',
      detail: 'Solo founders juggling 10+ business functions. 73% report overwhelm as primary failure factor. AI enables focus on vision while agents handle execution.',
      data: 'Startup Genome Report 2024: Operational complexity cited as #1 failure reason. 68% of founders work 60+ hours/week on non-strategic tasks. <a href="https://www.kauffman.org/entrepreneurship/" target="_blank" rel="noopener noreferrer" className="text-blue-400">[14]</a>'
    }
  ]

  const executionAdvantages = [
    {
      advantage: 'AI agent orchestration and multi-modal integration expertise',
      detail: 'Deep understanding of multi-agent coordination, natural language processing, and autonomous task execution systems.',
      technical: 'GPT-4 API mastery, agent orchestration frameworks, task routing algorithms, real-time decision making, context management.'
    },
    {
      advantage: 'Full-stack platform development for AI-powered systems',
      detail: 'End-to-end capability to build autonomous company management platforms with real-time AI integration.',
      technical: 'React/Node.js, WebSocket real-time systems, AI service integration, scalable microservices, database optimization.'
    },
    {
      advantage: 'Business operations and startup lifecycle understanding',
      detail: 'Comprehensive knowledge of company operations, pain points, and automation opportunities across all business functions.',
      technical: 'Business process modeling, automation workflows, compliance frameworks, financial systems, operational metrics.'
    },
    {
      advantage: 'AI conversation interface and user experience design',
      detail: 'Expertise in creating intuitive natural language interfaces for complex business management tasks.',
      technical: 'Conversational UI/UX, prompt engineering, context preservation, user intent recognition, feedback loop optimization.'
    }
  ]

  const inevitabilityPoints = [
    {
      point: 'Someone will build the autonomous AI company platform',
      reasoning: 'AI capabilities now sufficient. Market demand clear from founder pain points. Technical infrastructure mature.',
      timing: 'First-mover advantage critical. AI conversation interfaces normalized. Multi-agent frameworks proven feasible.'
    },
    {
      point: 'AI-operated businesses will replace human-operated businesses',
      reasoning: '24/7 operation without fatigue. Near-zero marginal costs. Instant scaling without hiring. Superior performance inevitable.',
      timing: 'Transition beginning now. Early adopters gaining massive advantages. Human-dependent businesses becoming uncompetitive.'
    },
    {
      point: 'Platform effects create winner-take-most dynamics',
      reasoning: 'Network effects from successful AI companies. Data advantages improve with scale. Best AI agents attract most founders.',
      timing: 'Critical mass threshold: 1k autonomous companies. Beyond this point, platform effects become self-reinforcing.'
    },
    {
      point: 'We&apos;re positioned to capture this transformation',
      reasoning: 'Team capabilities aligned with AI orchestration needs. Understanding of business operations. Technical execution capability.',
      timing: 'Market timing perfect: AI mature, founders desperate for solutions, competition window 18-24 months before copycats.'
    }
  ]

  const withoutUsScenarios = [
    {
      scenario: 'Founders continue drowning in operational complexity',
      impact: 'Talented visionaries waste 80% of time on execution details. Innovation velocity slowed. Entrepreneurship remains barrier-heavy.',
      quantified: '73% of solo founders report overwhelm. 68% spend 60+ hours/week on non-strategic tasks. Operational burden kills great ideas.'
    },
    {
      scenario: 'AI autonomous business potential remains unrealized',
      impact: 'Revolutionary AI capabilities underutilized. Business operations stuck in human-dependent models. Efficiency gains missed.',
      quantified: 'GPT-4 capabilities demonstrated but not systematically applied to business operations. Multi-agent coordination possible but not commercialized.'
    },
    {
      scenario: 'Traditional business software continues fragmentation',
      impact: 'Founders forced to manage 50+ different tools. No unified AI orchestration. Operational complexity compounds.',
      quantified: 'Average startup uses 87 different software tools. No single platform offers autonomous business management. Integration overhead massive.'
    },
    {
      scenario: 'Next generation of AI-native businesses delayed',
      impact: 'Transition to AI-operated companies slowed by years. Competitive advantage lost to early AI adopters. Economic transformation postponed.',
      quantified: 'AI-native businesses could operate at 10x efficiency. Single founder could manage multiple autonomous companies. <a href="https://www.kauffman.org/entrepreneurship/" target="_blank" rel="noopener noreferrer" className="text-blue-400">[14]</a> Transformation delayed 3-5 years.'
    }
  ]

  return (
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight text-white">
          Why Now, Why Us
        </h1>
        <p className="text-2xl text-blue-500 mb-12 text-center font-medium">
          Perfect storm convergence
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-2 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">MARKET TIMING</h2>
            <div className="space-y-6">
              {marketTiming.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-blue-500/30 pl-4"
                >
                  <p className="text-sm font-semibold text-blue-400 mb-2">{item.trend}</p>
                  <p className="text-xs text-gray-300 mb-2">{item.detail}</p>
                  <p className="text-xs text-gray-500">{item.data}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-2 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">EXECUTION ADVANTAGES</h2>
            <div className="space-y-6">
              {executionAdvantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l border-slate-600 pl-4"
                >
                  <p className="text-sm font-semibold text-slate-300 mb-2">{item.advantage}</p>
                  <p className="text-xs text-slate-400 mb-2">{item.detail}</p>
                  <p className="text-xs text-slate-500">{item.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-slate-700 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-slate-300">WHAT HAPPENS WITHOUT US</h2>
          <div className="grid grid-cols-2 gap-8">
            {withoutUsScenarios.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l border-slate-600 pl-4"
              >
                <p className="text-sm font-semibold text-slate-300 mb-2">{item.scenario}</p>
                <p className="text-xs text-slate-400 mb-2">{item.impact}</p>
                <p className="text-xs text-slate-500">{item.quantified}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t border-slate-700 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">THE INEVITABILITY ARGUMENT</h2>
          <div className="grid grid-cols-2 gap-8">
            {inevitabilityPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="border-l border-slate-600 pl-4"
              >
                <p className="text-sm font-semibold text-slate-300 mb-2">{item.point}</p>
                <p className="text-xs text-slate-400 mb-2">{item.reasoning}</p>
                <p className="text-xs text-slate-500">{item.timing}</p>
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
            <p><strong>AI Capability Convergence:</strong> Multi-agent coordination now possible. Natural language interfaces normalized. GPT-4 sufficient for complex business reasoning. Technical infrastructure for autonomous companies exists.</p>
            <p><strong>Execution Readiness:</strong> Team capabilities perfectly matched to AI orchestration requirements. Deep understanding of business operations. Platform development expertise. AI integration mastery.</p>
            <p><strong>Market Transformation:</strong> Human-operated businesses becoming uncompetitive. AI-operated companies achieve 10x efficiency. Single founders can manage multiple autonomous businesses. Winner-take-most platform dynamics.</p>
            <p><strong>Inevitable Future:</strong> Transition to AI-operated businesses is happening. Early platform captures entire market. We&apos;re positioned to enable this transformation. Competition window: 18-24 months maximum.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 