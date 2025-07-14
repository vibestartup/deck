import { motion } from 'framer-motion'
import {
  keyMetrics,
  formatMultiplier,
  formatNumber
} from '../../lib'

export function TitleSlide() {
  return (
    <div className="w-full flex flex-col items-center py-16 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl text-center"
      >
        <h1 className="text-8xl font-bold mb-8 text-white tracking-tight">
          VibeStartup
        </h1>
        <p className="text-3xl text-slate-300 mb-8 font-medium">
          Autonomous AI Company Platform
        </p>
        <p className="text-xl text-slate-400 mb-12 font-light">
          Prompt your entire business like you prompt ChatGPT
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-700 pt-8"
        >
          <div className="grid grid-cols-2 gap-12 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-500 mb-2">{formatMultiplier(keyMetrics.ltvCacRatio)}</p>
              <p className="text-sm text-slate-400 font-medium">LTV/CAC Ratio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-500 mb-2">{formatNumber(keyMetrics.companyCount / 1000)}k</p>
              <p className="text-sm text-slate-400 font-medium">Companies Year 1</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-slate-500 max-w-4xl mx-auto leading-relaxed"
        >
          <p>
            <strong className="text-slate-300">The Problem:</strong> Starting a company requires coding, design, marketing, sales, legal, and operations expertise - an impossible multi-disciplinary requirement for single founders.
            <strong className="text-slate-300 ml-4">The Solution:</strong> AI agents handle everything autonomously. Drop your idea, chat with your AI company, and watch it execute 24/7 while you focus on pure vision, strategy, and vibes!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 