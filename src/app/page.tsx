'use client'

import { Slides } from '@/components/Slides'
import { TitleSlide } from '@/components/slides/TitleSlide'
import { ConvergenceSlide } from '@/components/slides/ConvergenceSlide'
import { SuperAppSlide } from '@/components/slides/SuperAppSlide'
import { UnitEconomicsSlide } from '@/components/slides/UnitEconomicsSlide'
import { FinancialProjectionsSlide } from '@/components/slides/FinancialProjectionsSlide'
import { MarketSizeSlide } from '@/components/slides/MarketSizeSlide'
import { TheAskSlide } from '@/components/slides/TheAskSlide'
import { WhyNowSlide } from '@/components/slides/WhyNowSlide'

export default function Home() {
  const slides = [
    <TitleSlide key="title" />,
    <ConvergenceSlide key="convergence" />,
    <SuperAppSlide key="superapp" />,
    <UnitEconomicsSlide key="economics" />,
    <FinancialProjectionsSlide key="projections" />,
    <MarketSizeSlide key="market" />,
    <TheAskSlide key="ask" />,
    <WhyNowSlide key="whynow" />
  ]

  return (
    <main>
      <Slides slides={slides} title="VibeStartup Pitch Deck" />
    </main>
  )
}
