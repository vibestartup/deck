import { motion } from 'framer-motion'
import {
  keyMetrics,
  formatMultiplier,
  formatMonths,
  formatNumber
} from '../../lib'

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
          Autonomous AI Company Platform
        </p>
        <p className="text-xl text-gray-400 mb-12">
          Prompt your entire business like you prompt ChatGPT
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t-4 border-blue-500 pt-8"
        >
          <div className="grid grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">{formatMultiplier(keyMetrics.ltvCacRatio)}</p>
              <p className="text-sm text-gray-400">LTV/CAC Ratio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400 mb-2">{formatMonths(keyMetrics.paybackPeriod)}</p>
              <p className="text-sm text-gray-400">Payback Period</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400 mb-2">{formatNumber(keyMetrics.companyCount / 1000)}k</p>
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
            <strong>The Problem:</strong> Starting a company requires coding, design, marketing, sales, legal, and operations expertise - an impossible multi-disciplinary requirement for single founders.
            <strong> The Solution:</strong> AI agents handle everything autonomously. Drop your idea, chat with your AI company, and watch it execute 24/7 while you focus on pure vision, strategy, and vibes!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 