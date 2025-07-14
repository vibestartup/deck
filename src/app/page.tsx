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
  // Debug logging removed during date system conversion
  
  const slides = [
    <TitleSlide key="title" />,
    <ConvergenceSlide key="convergence" />,
    <SuperAppSlide key="super-app" />,
    <UnitEconomicsSlide key="unit-economics" />,
    <FinancialProjectionsSlide key="financial-projections" />,
    <MarketSizeSlide key="market-size" />,
    <TheAskSlide key="the-ask" />,
    <WhyNowSlide key="why-now" />,
  ]

  return <Slides slides={slides} />
}
