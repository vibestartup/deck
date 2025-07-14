import { motion } from 'framer-motion'

export function TitleSlide() {
  return (
    <div className="w-full flex flex-col items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl text-center"
      >
        <h1 className="text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
          VibeStartup
        </h1>
        <p className="text-3xl text-gray-300 mb-8 font-medium">
          Building an OS for a Vibe-First Economy
        </p>
        <p className="text-xl text-gray-400 mb-12">
          Making company formation as viral as TikTok
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t-4 border-blue-500 pt-8"
        >
          <div className="grid grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">50x</p>
              <p className="text-sm text-gray-400">LTV/CAC Ratio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400 mb-2">0.4 months</p>
              <p className="text-sm text-gray-400">Payback Period</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400 mb-2">87k</p>
              <p className="text-sm text-gray-400">Companies Year 1</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-gray-500 max-w-4xl mx-auto"
        >
          <p>
            <strong>The Problem:</strong> 30M+ businesses formed annually, yet formation takes weeks, costs $500+, and has zero viral mechanics. 
            <strong>The Solution:</strong> Full-stack entrepreneurship platform with viral growth engine that turns every founder into an acquisition channel.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 