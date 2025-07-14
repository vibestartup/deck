'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface SlideProps {
  children: React.ReactNode
  className?: string
}

interface SlidesProps {
  slides: React.ReactNode[]
  title?: string
}

export function Slide({ children, className = '' }: SlideProps) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {children}
    </div>
  )
}

export function Slides({ slides, title = 'Presentation' }: SlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 10000) // Auto-advance every 10 seconds
    }
    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'Home') {
        setCurrentSlide(0)
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length, nextSlide, prevSlide])

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Floating Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
          <h1 className="text-lg font-light tracking-wide text-white/90">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-2 shadow-2xl">
            <span className="text-sm text-white/70 font-light">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-3 shadow-2xl hover:bg-white/10 transition-all duration-300"
          >
            {isPlaying ? <Pause size={18} className="text-white/80" /> : <Play size={18} className="text-white/80" />}
          </motion.button>
        </div>
      </motion.div>

      {/* Main slide area */}
      <div className="flex-1 pt-24 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full min-h-full px-8 py-8"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-6">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-3 shadow-2xl hover:bg-white/10 transition-all duration-300"
          >
            <ChevronLeft size={20} className="text-white/80" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 shadow-2xl">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg shadow-white/20' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-3 shadow-2xl hover:bg-white/10 transition-all duration-300"
          >
            <ChevronRight size={20} className="text-white/80" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
} 