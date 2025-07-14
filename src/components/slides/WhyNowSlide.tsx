import { motion } from 'framer-motion'

export function WhyNowSlide() {
  const marketTiming = [
    {
      trend: 'AI acceleration making product building 10x faster',
      detail: 'GitHub Copilot adoption up 180% YoY. GPT-4 reduces development time by 80%. Technical differentiation window compressed from 2-3 years to 6-12 months.',
      data: 'Stack Overflow Developer Survey 2024: 76% of developers use AI tools. MVP development time reduced 70% since 2022.'
    },
    {
      trend: 'Remote work enabling distributed team formation',
      detail: 'Geographic constraints eliminated. Global talent pool accessible. 42% of workforce now remote-capable vs 5% pre-2020.',
      data: 'Bureau of Labor Statistics: Remote work participation stabilized at 35% post-pandemic. Distributed teams now standard practice.'
    },
    {
      trend: 'VC compression forcing rapid iteration models',
      detail: 'Median fund life down from 10 to 7 years. Portfolio companies must show traction within 18 months or face down rounds.',
      data: 'PitchBook 2024: Time to Series A compressed 40% since 2020. Funds targeting 3-5x returns in 24-36 months.'
    },
    {
      trend: 'Gen Z expecting instant gratification for everything',
      detail: '47% of Gen Z has started a business vs 24% millennials. Social media native generation expects viral growth mechanics.',
      data: 'Shopify Global Entrepreneurship Report 2024: Gen Z 2x more likely to start businesses than previous generations at same age.'
    }
  ]

  const executionAdvantages = [
    {
      advantage: 'Viral growth expertise from social media background',
      detail: 'Understanding of viral mechanics, content strategy, and network effects. Experience with TikTok, Instagram, and Twitter growth.',
      technical: 'K-factor optimization, content virality analysis, social sharing mechanics, influencer partnership strategies.'
    },
    {
      advantage: 'Legal infrastructure knowledge from compliance experience',
      detail: 'Deep understanding of incorporation processes, regulatory requirements, and multi-state compliance frameworks.',
      technical: 'Delaware corporate law, 50-state filing requirements, KYC/AML compliance, regulatory API integrations.'
    },
    {
      advantage: 'Technical capability to build full-stack formation platform',
      detail: 'End-to-end development expertise. API integrations, payment processing, and scalable infrastructure design.',
      technical: 'React/Node.js, PostgreSQL, Stripe Connect, AWS/CDN, microservices architecture, real-time systems.'
    },
    {
      advantage: 'Cultural understanding of next-gen entrepreneurship patterns',
      detail: 'Insight into how Gen Z approaches business formation, social sharing, and community building.',
      technical: 'User behavior analysis, social media integration, gamification mechanics, community platform design.'
    }
  ]

  const inevitabilityPoints = [
    {
      point: 'Someone will build the viral formation platform',
      reasoning: 'Market demand clear. Current solutions lack viral mechanics. Network effects create winner-take-most dynamics.',
      timing: 'First-mover advantage critical. Regulatory environment stabilizing. Technical infrastructure mature.'
    },
    {
      point: 'Network effects create winner-take-most dynamics',
      reasoning: 'Each new founder increases platform value. Viral growth compounds exponentially. Switching costs increase with network size.',
      timing: 'Critical mass threshold: 10k active founders. Beyond this point, network effects become self-reinforcing.'
    },
    {
      point: 'First-mover advantage in viral growth compounds exponentially',
      reasoning: 'Early adopters become evangelists. Network effects accelerate with scale. Brand recognition in target demographic.',
      timing: 'Competition window: 18-24 months before copycats. Technical moats take 2+ years to replicate.'
    },
    {
             point: 'We&apos;re positioned to capture this with optimal timing',
       reasoning: 'Team capabilities aligned with market needs. Technical infrastructure ready. Cultural understanding of target market.',
       timing: 'Market timing perfect: AI mature, remote work normalized, VC timelines compressed, Gen Z entrepreneurship peak.'
    }
  ]

  const withoutUsScenarios = [
    {
      scenario: 'Founders continue struggling with fragmented processes',
      impact: 'Innovation velocity slowed. Entrepreneurship barriers remain high. Economic potential unrealized.',
      quantified: '$25B+ market remains fragmented. 30M+ annual formations inefficient. 2-3 week formation times persist.'
    },
    {
      scenario: 'Opportunity goes to slower, non-viral competitors',
      impact: 'Market captured by traditional players. No viral growth mechanics. Network effects unrealized.',
      quantified: 'Stripe Atlas (27k formations), LegalZoom (2M+ formations) maintain dominance without innovation.'
    },
    {
      scenario: 'Next generation constrained by outdated systems',
      impact: 'Gen Z entrepreneurship potential limited. Social-native generation forced into legacy processes.',
      quantified: '47% of Gen Z interested in entrepreneurship. Current tools designed for previous generation.'
    },
    {
      scenario: 'Coordination potential of rapid formation unrealized',
      impact: 'Economic reorganization slowed. AI-enabled coordination potential missed. Future of work evolution delayed.',
      quantified: 'Potential for 10x increase in formation speed. Network effects could reduce CAC by 50x.'
    }
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
          Why Now, Why Us
        </h1>
        <p className="text-2xl text-blue-400 mb-12 text-center font-medium">
          Perfect storm convergence
        </p>

        <div className="grid grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-4 border-blue-500 pl-8"
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
            className="border-l-4 border-green-500 pl-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-green-400">EXECUTION ADVANTAGES</h2>
            <div className="space-y-6">
              {executionAdvantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <p className="text-sm font-semibold text-green-400 mb-2">{item.advantage}</p>
                  <p className="text-xs text-gray-300 mb-2">{item.detail}</p>
                  <p className="text-xs text-gray-500">{item.technical}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-red-500 pt-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">WHAT HAPPENS WITHOUT US</h2>
          <div className="grid grid-cols-2 gap-8">
            {withoutUsScenarios.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l-2 border-red-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-red-400 mb-2">{item.scenario}</p>
                <p className="text-xs text-gray-300 mb-2">{item.impact}</p>
                <p className="text-xs text-gray-500">{item.quantified}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t-4 border-purple-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-400">THE INEVITABILITY ARGUMENT</h2>
          <div className="grid grid-cols-2 gap-8">
            {inevitabilityPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="border-l-2 border-purple-500/30 pl-4"
              >
                <p className="text-sm font-semibold text-purple-400 mb-2">{item.point}</p>
                <p className="text-xs text-gray-300 mb-2">{item.reasoning}</p>
                <p className="text-xs text-gray-500">{item.timing}</p>
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
                         <p><strong>Timing Convergence:</strong> All macro trends aligned. AI democratizes building, remote work enables distributed teams, VC compression rewards speed, Gen Z expects viral mechanics. This window won&apos;t last.</p>
            <p><strong>Execution Readiness:</strong> Team capabilities perfectly matched to market opportunity. Technical infrastructure mature. Cultural understanding of target demographic. Legal framework knowledge complete.</p>
                         <p><strong>Competitive Landscape:</strong> Current players (Stripe Atlas, LegalZoom) lack viral mechanics. 18-24 month window before copycat attempts. Technical moats take 2+ years to replicate.</p>
             <p><strong>Market Inevitability:</strong> Someone will build this. Network effects create winner-take-most dynamics. First-mover advantage compounds exponentially. We&apos;re positioned to capture this with optimal timing.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 