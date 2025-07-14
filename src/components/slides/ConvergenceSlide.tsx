import { motion } from 'framer-motion'

export function ConvergenceSlide() {
  const shifts = [
    { 
      title: "AI enables autonomous companies", 
      subtitle: "prompt your entire business like ChatGPT",
      technical: "Multi-agent AI systems can now handle coding, design, marketing, operations, and customer service autonomously. Natural language interfaces enable founders to manage entire companies through conversation."
    },
    { 
      title: "Human workforce becoming optional", 
      subtitle: "AI agents work 24/7 at scale without management overhead",
      technical: "AI agents don't need salaries, benefits, management, or sleep. They can execute tasks continuously, learn from feedback, and coordinate autonomously. Single founder can operate multiple companies simultaneously."
    },
    { 
      title: "Company formation friction disappearing", 
      subtitle: "idea → autonomous business in hours, not months",
      technical: "AI handles all operational complexity: legal setup, compliance, development, marketing, customer service. Founders focus purely on vision and strategy while AI executes everything."
    }
  ]

  const brokenSystemData = [
    { 
      point: "30M+ new businesses globally, but only 10% survive past first year",
      detail: "Founder burnout from operational complexity. 90% of startups fail due to execution challenges, not bad ideas. Most founders spend 80% of time on operations, 20% on vision."
    },
    { 
      point: "Starting a company requires: coding, design, marketing, sales, legal, operations",
      detail: "Multi-disciplinary skill requirement impossible for single founders. Need to hire expensive teams before revenue. Months of setup before first customer."
    },
    { 
      point: "Current tools are fragmented: 50+ different platforms for different functions",
      detail: "Stripe for payments, Shopify for e-commerce, HubSpot for CRM, Slack for communication, Figma for design, GitHub for code. No unified intelligence coordinating across tools."
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
          The AI Company Revolution
        </h1>
        <p className="text-2xl text-blue-400 mb-16 text-center font-medium">
          From managing employees to prompting AI agents
        </p>

        <div className="grid grid-cols-3 gap-12 mb-16">
          {shifts.map((shift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="border-l-4 border-blue-500 pl-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-white">{shift.title}</h3>
              <p className="text-lg text-gray-300 mb-4 font-medium">{shift.subtitle}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{shift.technical}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-red-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">THE BROKEN CURRENT SYSTEM</h2>
          
          <div className="space-y-6">
            {brokenSystemData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l-2 border-red-500/50 pl-6"
              >
                <p className="text-lg font-semibold text-gray-200 mb-2">• {item.point}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-2">
            <p><strong>The Paradigm Shift:</strong> We&apos;re witnessing the transition from human-operated businesses to AI-operated businesses. Instead of hiring teams, founders deploy AI agents. Instead of managing people, they prompt intelligent systems.</p>
            <p><strong>Why Now:</strong> AI capabilities have reached the threshold where autonomous operation is possible. GPT-4 can code, DALL-E can design, and specialized AI can handle customer service, marketing, and operations. The infrastructure exists.</p>
            <p><strong>The Opportunity:</strong> First platform to enable true autonomous companies wins the entire market. Network effects from successful AI companies demonstrating the model. Winner-take-most dynamics.</p>
            <p><strong>VibeStartup&apos;s Role:</strong> We&apos;re not just another business tool. We&apos;re the operating system for AI-powered companies. The ChatGPT interface for your entire business. The platform that makes autonomous companies accessible to any founder.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 