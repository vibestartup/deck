import { motion } from 'framer-motion'
import {
  baseProjections,
  formatNumber,
  BASE_BUSINESS_PARAMS
} from '../../lib'

export function SuperAppSlide() {
  const coreAgents = [
    { 
      name: "VibeCode", 
      desc: "AI agents that code, deploy, and maintain your entire tech stack",
      technical: "Autonomous coding agents with real-time deployment. Full-stack development from prompts. Auto-scaling infrastructure management. Continuous integration/deployment pipelines. Code review and optimization bots.",
      position: { x: -120, y: -80 }
    },
    { 
      name: "VibeBrand", 
      desc: "AI agents for design, content, and brand strategy",
      technical: "Generative design systems. Brand voice AI. Content creation at scale. Social media automation. Video and graphic generation. Brand consistency monitoring across all touchpoints.",
      position: { x: 120, y: -80 }
    },
    { 
      name: "VibeOps", 
      desc: "AI agents for customer service, sales, and operations",
      technical: "Voice AI for customer calls. Intelligent ticket routing. Sales automation and lead qualification. Inventory management. Automated vendor relations. 24/7 operational oversight.",
      position: { x: -120, y: 80 }
    },
    { 
      name: "VibeGrow", 
      desc: "AI agents for marketing, analytics, and business development",
      technical: "Market research automation. Campaign optimization. Growth experiment management. Competitive analysis. Partnership discovery. Revenue optimization algorithms.",
      position: { x: 120, y: 80 }
    }
  ]

  // Calculate growth display metrics
  const month1Companies = baseProjections.cohorts[0].totalCompanies;
  const month12Companies = baseProjections.cohorts[11].totalCompanies;

  const growthMetrics = [
    { 
      metric: "Natural language interface", 
      value: "Chat with your AI company like ChatGPT", 
      detail: "No technical skills required. Simply describe what you want and your AI company executes.",
      technical: "Advanced NLP processing. Context-aware task routing. Multi-agent coordination through natural language. Real-time feedback loops."
    },
    { 
      metric: "Autonomous execution", 
      value: "AI agents work 24/7 while you sleep", 
      detail: "Your company operates continuously, making decisions and executing tasks autonomously.",
      technical: "Multi-agent coordination. Autonomous decision-making frameworks. Real-time adaptation. Continuous learning and optimization."
    },
    { 
      metric: "Instant pivoting", 
      value: "Reshape your entire business with a prompt", 
      detail: "Business model changes, product pivots, market shifts - all executed instantly through AI.",
      technical: "Dynamic system reconfiguration. Real-time strategy adaptation. Automated compliance updates. Seamless operational transitions."
    },
    { 
      metric: "Viral growth multiplier", 
      value: `K-factor: ${BASE_BUSINESS_PARAMS.viralCoefficient} from founder sharing`, 
      detail: "Each autonomous company becomes a showcase, inspiring others to start their own.",
      technical: `Network effects: ${formatNumber(month1Companies)} → ${formatNumber(month12Companies)} companies/month. Social proof amplification. Community-driven growth loops.`
    }
  ]

  const technicalArchitecture = [
    { component: "AI Orchestration Layer", detail: "Multi-agent coordination. Task routing. Natural language processing." },
    { component: "Autonomous Execution Engine", detail: "Self-directed task completion. Real-time decision making. Continuous optimization." },
    { component: "Company State Management", detail: "Dynamic business configuration. Real-time adaptation. Automated compliance." },
    { component: "Learning & Improvement", detail: "Performance analytics. Pattern recognition. Predictive optimization." },
    { component: "Integration Ecosystem", detail: "API connections. Third-party services. Platform integrations." },
    { component: "Security & Governance", detail: "Access control. Audit trails. Regulatory compliance." }
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
          Autonomous AI Company Platform
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          Prompt your company like you prompt ChatGPT
        </p>

        {/* Bubble Chart for Core AI Agents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-96 mb-16 flex items-center justify-center"
        >
          {/* Center bubble - VibeStartup */}
          <div className="absolute z-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
            <span className="text-white font-bold text-lg text-center">VibeStartup</span>
          </div>

          {/* Agent bubbles */}
          {coreAgents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${agent.position.x}px)`,
                top: `calc(50% + ${agent.position.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Connection line */}
              <div 
                className="absolute w-1 bg-gradient-to-r from-gray-500 to-gray-300 opacity-30"
                style={{
                  height: Math.sqrt(agent.position.x ** 2 + agent.position.y ** 2),
                  transformOrigin: 'bottom',
                  transform: `rotate(${Math.atan2(-agent.position.y, -agent.position.x) * 180 / Math.PI + 90}deg)`,
                  bottom: '50%',
                  left: '50%',
                  marginLeft: '-2px'
                }}
              />
              
              {/* Agent bubble */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-semibold text-xs text-center px-2">{agent.name}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 border border-gray-700 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-sm font-semibold text-green-400 mb-1">{agent.desc}</p>
                <p className="text-xs text-gray-400">{agent.technical}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two columns below */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-4 border-purple-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-purple-400">THE AI ADVANTAGE</h2>
            <div className="space-y-6">
              {growthMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-purple-500/30 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-purple-400 mb-1">{metric.metric}</p>
                    <p className="text-sm text-gray-300 mb-2">{metric.value}</p>
                    <p className="text-xs text-gray-400 mb-2">{metric.detail}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{metric.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-l-4 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">TECHNICAL ARCHITECTURE</h2>
            <div className="space-y-4">
              {technicalArchitecture.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="border-l-2 border-blue-500/30 pl-4"
                >
                  <p className="text-sm font-semibold text-blue-400 mb-2">{item.component}</p>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>Revolutionary Vision:</strong> Transform how companies operate. Instead of managing employees and processes, you manage AI agents through natural language. &quot;Code the new homepage,&quot; &quot;Launch a marketing campaign,&quot; &quot;Handle customer support&quot; - your AI company executes everything.</p>
            <p><strong>Autonomous Operations:</strong> Your company runs 24/7 without human intervention. AI agents make decisions, adapt to changes, and optimize performance continuously. You focus on vision and strategy while AI handles execution.</p>
            <p><strong>Viral Growth Engine:</strong> Every successful autonomous company becomes a showcase. Founders naturally share their AI-powered achievements, inspiring others to start their own autonomous companies. Network effects compound exponentially.</p>
            <p><strong>The Future of Work:</strong> This isn&apos;t just a tool - it&apos;s a complete paradigm shift. From human-operated businesses to AI-operated businesses. From managing people to managing AI. From coding software to prompting entire companies.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 