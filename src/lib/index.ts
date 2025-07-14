// Core business parameters and calculations
export {
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS, 
  BASE_USAGE_PATTERNS,
  GROWTH_STAGES,
  BASE_EMPLOYEE_PARAMS,
  TIMELINE_MARKER_PARAMS,
  BURN_RATE_CALCULATIONS,
  BASE_INVESTMENT_PARAMS,
  COMPUTED_VALUES,
  INFRASTRUCTURE_OPTIMIZATION,
  EMPLOYEE_COST_SCENARIOS,
  generateEmployeeParamsForInvestment,
  getEmployeesByPhase,
  calculateEmployeeCosts,
  calculateAveragePrice,
  calculateInfrastructureCostPerCompany,
  calculateFormationCosts
} from './parameters';

// Calculations
export {
  baseProjections,
  baseCAC,
  baseLTV,
  calculateGrowthProjections
} from './calculations';

// Type exports
export type {
  BusinessParameters,
  InfrastructureParameters,
  UsagePatterns,
  GrowthStage,
  MonthlyCohort,
  SensitivityParameters,
  FinancialProjections,
  CompetitiveBenchmarks,
  InvestmentScenario,
  MarketParameters,
  CompetitiveParameters,
  InvestmentParameters,
  BrandingParameters,
  ProductParameters,
  MarketTimingParameters,
  RoadmapParameters,
  RiskParameters,
  InfrastructureOptimization,
  Employee,
  EmployeeParameters,
  EmployeeCostScenario,
  TimelineMarkerParameters,
  BurnRateCalculations,
  ComputedValues
} from './types';

// Utility functions
export {
  formatCurrency,
  formatPercentage
} from './utils';

// Additional utility functions for slides

// Calculate total addressable market reach
export const calculateMarketReach = (
  marketSize: number,
  marketShare: number
): number => {
  return marketSize * marketShare;
};

// Calculate competitive advantage metrics
export const calculateCompetitiveAdvantage = (
  ourMetric: number,
  competitorMetric: number
): {
  advantage: number;
  multiplier: number;
} => {
  const advantage = ourMetric - competitorMetric;
  const multiplier = ourMetric / competitorMetric;
  return { advantage, multiplier };
};

// Calculate viral growth compound effect
export const calculateViralCompound = (
  initialCompanies: number,
  viralCoefficient: number,
  months: number
): number[] => {
  const growth = [];
  let current = initialCompanies;
  
  for (let i = 0; i < months; i++) {
    growth.push(current);
    current = current * (1 + viralCoefficient);
  }
  
  return growth;
};

// Calculate ROI for different exit scenarios
export const calculateROIScenarios = (
  investment: number,
  revenues: number[],
  multiples: number[],
  equityPercentage: number
): Array<{
  year: number;
  revenue: number;
  multiple: number;
  valuation: number;
  equity: number;
  roi: number;
}> => {
  return revenues.map((revenue, index) => {
    const multiple = multiples[index] || multiples[multiples.length - 1];
    const valuation = revenue * multiple;
    const equity = valuation * equityPercentage;
    const roi = equity / investment;
    
    return {
      year: index + 1,
      revenue,
      multiple,
      valuation,
      equity,
      roi,
    };
  });
};

// Calculate market penetration timeline
export const calculateMarketPenetration = (
  totalMarket: number,
  currentCompanies: number,
  projectedCompanies: number[]
): Array<{
  month: number;
  companies: number;
  marketShare: number;
}> => {
  return projectedCompanies.map((companies, index) => ({
    month: index + 1,
    companies,
    marketShare: companies / totalMarket,
  }));
};

// Calculate infrastructure cost breakdown by stage
export const calculateInfrastructureCostsByStage = (
  companiesPerMonth: number[],
  costPerCompany: number,
  awsCreditsMonthly: number = 0
): Array<{
  month: number;
  companies: number;
  totalCost: number;
  netCost: number;
  credits: number;
}> => {
  return companiesPerMonth.map((companies, index) => {
    const totalCost = companies * costPerCompany;
    const credits = Math.min(totalCost, awsCreditsMonthly);
    const netCost = totalCost - credits;
    
    return {
      month: index + 1,
      companies,
      totalCost,
      netCost,
      credits,
    };
  });
}; 