import { FinancialProjections } from './types';

// Formatting utilities for pitch deck display
export const formatCurrency = (amount: number, decimals: number = 0): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(decimals)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(decimals)}K`;
  }
  return `$${amount.toFixed(decimals)}`;
};

export const formatNumber = (num: number, decimals: number = 0): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

export const formatPercentage = (decimal: number, decimals: number = 1): string => {
  return `${(decimal * 100).toFixed(decimals)}%`;
};

export const formatMultiplier = (multiplier: number, decimals: number = 1): string => {
  return `${multiplier.toFixed(decimals)}x`;
};

export const formatMonths = (months: number): string => {
  if (months < 1) {
    return `${(months * 30).toFixed(0)} days`;
  }
  return `${months.toFixed(1)} months`;
};

// Color utilities for metrics display
export const getMetricColor = (
  value: number,
  benchmark: number,
  higherIsBetter: boolean = true
): string => {
  const ratio = value / benchmark;
  
  if (higherIsBetter) {
    if (ratio >= 1.5) return 'text-green-600';
    if (ratio >= 1.0) return 'text-yellow-600';
    return 'text-red-600';
  } else {
    if (ratio <= 0.5) return 'text-green-600';
    if (ratio <= 1.0) return 'text-yellow-600';
    return 'text-red-600';
  }
};

// Generate chart data for growth visualization
export const generateChartData = (
  cohorts: Array<{ month: number; monthlyRecurringRevenue: number; totalCompanies: number }>
) => {
  return cohorts.map(cohort => ({
    month: `M${cohort.month}`,
    mrr: cohort.monthlyRecurringRevenue,
    companies: cohort.totalCompanies,
    arr: cohort.monthlyRecurringRevenue * 12,
  }));
};

// Generate sensitivity analysis data
export const generateSensitivityData = (
  scenarios: Array<{ value: number; projection: FinancialProjections }>
) => {
  return scenarios.map(scenario => ({
    parameter: scenario.value,
    revenue: scenario.projection.totalRevenue,
    companies: scenario.projection.companyCount,
    ltvCac: scenario.projection.ltvCacRatio,
  }));
};

// Calculate growth rates
export const calculateGrowthRate = (
  initial: number,
  final: number,
  periods: number
): number => {
  return Math.pow(final / initial, 1 / periods) - 1;
};

// Calculate compound annual growth rate (CAGR)
export const calculateCAGR = (
  initialValue: number,
  finalValue: number,
  years: number
): number => {
  return Math.pow(finalValue / initialValue, 1 / years) - 1;
};

// Generate investment scenario data
export const generateInvestmentScenarios = (
  baseProjection: FinancialProjections,
  investmentAmount: number,
  valuations: number[]
) => {
  return valuations.map(valuation => {
    const equityPercent = investmentAmount / valuation;
    const exitValuation = baseProjection.finalARR * 6; // 6x ARR multiple
    const returnValue = exitValuation * equityPercent;
    const returnMultiple = returnValue / investmentAmount;
    
    return {
      valuation,
      equity: equityPercent,
      exitValue: exitValuation,
      returnValue,
      returnMultiple,
    };
  });
};

// Utility for creating metric comparison objects
export const createMetricComparison = (
  label: string,
  value: number,
  benchmark: number,
  unit: string,
  higherIsBetter: boolean = true
) => ({
  label,
  value,
  benchmark,
  unit,
  ratio: value / benchmark,
  color: getMetricColor(value, benchmark, higherIsBetter),
  formatted: {
    value: unit === '$' ? formatCurrency(value) : 
           unit === '%' ? formatPercentage(value) :
           unit === 'x' ? formatMultiplier(value) :
           formatNumber(value),
    benchmark: unit === '$' ? formatCurrency(benchmark) :
               unit === '%' ? formatPercentage(benchmark) :
               unit === 'x' ? formatMultiplier(benchmark) :
               formatNumber(benchmark),
  },
});

// Utility for creating bullet point summaries
export const createBulletSummary = (
  data: Record<string, number | string>,
  template: string
): string => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = data[key];
    if (typeof value === 'number') {
      if (key.includes('revenue') || key.includes('cost') || key.includes('profit')) {
        return formatCurrency(value);
      }
      if (key.includes('rate') || key.includes('margin') || key.includes('percent')) {
        return formatPercentage(value);
      }
      if (key.includes('ratio') || key.includes('multiple')) {
        return formatMultiplier(value);
      }
      return formatNumber(value);
    }
    return String(value);
  });
};

// Utility for creating stage comparison data
export const createStageComparison = (
  stages: Record<string, number | string>[],
  metrics: string[]
) => {
  return stages.map(stage => ({
    stage: stage.name,
    ...metrics.reduce((acc, metric) => ({
      ...acc,
      [metric]: stage[metric],
    }), {}),
  }));
};

// Utility for generating timeline data
export const generateTimelineData = (
  cohorts: Array<{ month: number; totalRevenue: number; totalCompanies: number }>,
  milestones: Array<{ month: number; label: string; value: number }>
) => {
  return cohorts.map(cohort => {
    const milestone = milestones.find(m => m.month === cohort.month);
    return {
      month: cohort.month,
      label: `M${cohort.month}`,
      revenue: cohort.totalRevenue,
      companies: cohort.totalCompanies,
      milestone: milestone?.label || null,
      milestoneValue: milestone?.value || null,
    };
  });
}; 