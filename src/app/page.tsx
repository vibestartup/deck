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
import { baseProjections } from '@/lib/calculations'
import type { MonthlyCohort } from '@/lib/types'

export default function Home() {
  // Debug: Log financial projections
  console.log('Financial Projections:', {
    totalCohorts: baseProjections.cohorts.length,
    firstMonth: baseProjections.cohorts[0]?.month,
    lastMonth: baseProjections.cohorts[baseProjections.cohorts.length - 1]?.month,
    prelaunchMonths: baseProjections.cohorts.filter((c: MonthlyCohort) => c.month < 2),
    breakEvenMonth: baseProjections.cohorts.find((c: MonthlyCohort) => c.grossProfit > 0)?.month,
    month12Revenue: baseProjections.cohorts.find((c: MonthlyCohort) => c.month === 12)?.totalRevenue
  });
  
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
