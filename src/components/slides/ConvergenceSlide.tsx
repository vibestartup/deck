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
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight text-white">
          The AI Company Revolution
        </h1>
        <p className="text-2xl text-blue-500 mb-16 text-center font-medium">
          From managing employees to prompting AI agents
        </p>

        <div className="grid grid-cols-3 gap-12 mb-16">
          {shifts.map((shift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="border-l-2 border-blue-500 pl-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-white">{shift.title}</h3>
              <p className="text-lg text-slate-300 mb-4 font-medium">{shift.subtitle}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{shift.technical}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-slate-700 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-slate-300">THE BROKEN CURRENT SYSTEM</h2>
          
          <div className="space-y-6">
            {brokenSystemData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                className="border-l border-slate-600 pl-6"
              >
                <p className="text-lg font-semibold text-slate-200 mb-2">• {item.point}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 