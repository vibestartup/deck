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
      position: { x: -120, y: -80 },
      tooltipPosition: { x: -320, y: -40 } // Left side of bubble
    },
    { 
      name: "VibeBrand", 
      desc: "AI agents for design, content, and brand strategy",
      technical: "Generative design systems. Brand voice AI. Content creation at scale. Social media automation. Video and graphic generation. Brand consistency monitoring across all touchpoints.",
      position: { x: 120, y: -80 },
      tooltipPosition: { x: 180, y: -40 } // Right side of bubble
    },
    { 
      name: "VibeOps", 
      desc: "AI agents for customer service, sales, and operations",
      technical: "Voice AI for customer calls. Intelligent ticket routing. Sales automation and lead qualification. Inventory management. Automated vendor relations. 24/7 operational oversight.",
      position: { x: -120, y: 80 },
      tooltipPosition: { x: -320, y: 40 } // Left side of bubble
    },
    { 
      name: "VibeGrow", 
      desc: "AI agents for marketing, analytics, and business development",
      technical: "Market research automation. Campaign optimization. Growth experiment management. Competitive analysis. Partnership discovery. Revenue optimization algorithms.",
      position: { x: 120, y: 80 },
      tooltipPosition: { x: 180, y: 40 } // Right side of bubble
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
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight text-white">
          Autonomous AI Company Platform
        </h1>
        <p className="text-2xl text-blue-500 mb-12 text-center font-medium">
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
          <div className="absolute z-10 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl border-2 border-slate-600">
            <span className="text-white font-bold text-lg text-center">VibeStartup</span>
          </div>

          {/* Agent bubbles with static tooltips */}
          {coreAgents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="absolute"
              style={{
                left: `calc(50% + ${agent.position.x}px)`,
                top: `calc(50% + ${agent.position.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Connection line */}
              <div 
                className="absolute w-1 bg-gradient-to-r from-slate-500 to-slate-600 opacity-40"
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
              <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center shadow-xl border border-slate-500">
                <span className="text-white font-semibold text-xs text-center px-2">{agent.name}</span>
              </div>
              
              {/* Static tooltip */}
              <motion.div 
                initial={{ opacity: 0, x: agent.tooltipPosition.x > 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="absolute w-64 bg-slate-800 border border-slate-600 rounded-lg p-3 z-20"
                style={{
                  left: `${agent.tooltipPosition.x}px`,
                  top: `${agent.tooltipPosition.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <p className="text-sm font-semibold text-blue-400 mb-1">{agent.desc}</p>
                <p className="text-xs text-slate-400">{agent.technical}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two columns below */}
        <div className="grid grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-2 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">THE AI ADVANTAGE</h2>
            <div className="space-y-6">
              {growthMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l border-slate-600 pl-4"
                >
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-blue-400 mb-1">{metric.metric}</p>
                    <p className="text-sm text-slate-300 mb-2">{metric.value}</p>
                    <p className="text-xs text-slate-400 mb-2">{metric.detail}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{metric.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-l-2 border-blue-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-400">TECHNICAL ARCHITECTURE</h2>
            <div className="space-y-4">
              {technicalArchitecture.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="border-l border-slate-600 pl-4"
                >
                  <p className="text-sm font-semibold text-blue-400 mb-2">{item.component}</p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 