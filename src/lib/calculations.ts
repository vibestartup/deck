import { 
  BusinessParameters, 
  InfrastructureParameters, 
  GrowthStage, 
  MonthlyCohort, 
  FinancialProjections,
  CompetitiveBenchmarks 
} from './types';
import { calculateAveragePrice, calculateInfrastructureCostPerCompany } from './parameters';

// Customer Acquisition Cost (CAC) calculation
export const calculateCAC = (
  businessParams: BusinessParameters
): {
  totalViews: number;
  signups: number;
  directCompanies: number;
  viralCompanies: number;
  totalCompanies: number;
  cacPerCompany: number;
  cacPerFounder: number;
} => {
  const totalViews = businessParams.baseVideoViews * businessParams.organicMultiplier;
  const signups = totalViews * businessParams.viewToSignupRate;
  const directCompanies = signups * businessParams.formationConversionRate;
  const viralCompanies = directCompanies * businessParams.viralCoefficient;
  const totalCompanies = directCompanies + viralCompanies;
  
  const cacPerCompany = businessParams.monthlyMarketingSpend / totalCompanies;
  const cacPerFounder = cacPerCompany * businessParams.averageCompaniesPerFounder;
  
  return {
    totalViews,
    signups,
    directCompanies,
    viralCompanies,
    totalCompanies,
    cacPerCompany,
    cacPerFounder,
  };
};

// Monthly SaaS revenue calculation
export const calculateMonthlySaaSRevenue = (
  businessParams: BusinessParameters,
  companyCount: number,
  pricingMultiplier: number = 1.0
): {
  basicRevenue: number;
  proRevenue: number;
  totalRevenue: number;
  averagePrice: number;
} => {
  const basicPrice = businessParams.basicTierPrice * pricingMultiplier;
  const proPrice = businessParams.proTierPrice * pricingMultiplier;
  const averagePrice = calculateAveragePrice(basicPrice, proPrice, businessParams.proTierAdoptionRate);
  
  const basicCompanies = companyCount * (1 - businessParams.proTierAdoptionRate);
  const proCompanies = companyCount * businessParams.proTierAdoptionRate;
  
  const basicRevenue = basicCompanies * basicPrice;
  const proRevenue = proCompanies * proPrice;
  const totalRevenue = basicRevenue + proRevenue;
  
  return {
    basicRevenue,
    proRevenue,
    totalRevenue,
    averagePrice,
  };
};

// Infrastructure cost calculation per month
export const calculateInfrastructureCost = (
  companyCount: number,
  infraParams: InfrastructureParameters,
  stage: GrowthStage
): {
  totalCost: number;
  costPerCompany: number;
  netCost: number;
  creditsApplied: number;
  selfHostingSavings: number;
} => {
  const baseCostPerCompany = calculateInfrastructureCostPerCompany(infraParams);
  let costPerCompany = baseCostPerCompany;
  
  // Apply self-hosting savings
  if (stage.selfHostingActive) {
    costPerCompany = baseCostPerCompany * (1 - infraParams.selfHostingSavingsRate);
  }
  
  const totalCost = (costPerCompany * companyCount) + infraParams.monthlyFixedCosts;
  let creditsApplied = 0;
  
  // Apply AWS credits if active
  if (stage.awsCreditsActive) {
    creditsApplied = Math.min(totalCost, infraParams.awsCreditsMonthly);
  }
  
  const netCost = totalCost - creditsApplied;
  const selfHostingSavings = stage.selfHostingActive ? 
    (baseCostPerCompany - costPerCompany) * companyCount : 0;
  
  return {
    totalCost,
    costPerCompany,
    netCost,
    creditsApplied,
    selfHostingSavings,
  };
};

// LTV calculation for different stages
export const calculateLTV = (
  businessParams: BusinessParameters,
  infraParams: InfrastructureParameters,
  stages: GrowthStage[]
): {
  formationLTV: number;
  saasLTVStage1: number;
  saasLTVStage2: number;
  saasLTVStage3: number;
  blendedLTV: number;
  ltvPerFounder: number;
} => {
  const formationCosts = infraParams.stateFilingFee + infraParams.identityVerification + 
                        infraParams.infrastructurePerFormation + 
                        (businessParams.formationFee * infraParams.paymentProcessingRate);
  const formationLTV = businessParams.formationFee - formationCosts;
  
  // Calculate monthly gross profit for each stage
  const calculateStageMonthlyProfit = (stage: GrowthStage): number => {
    const avgPrice = calculateAveragePrice(
      businessParams.basicTierPrice * stage.pricingMultiplier,
      businessParams.proTierPrice * stage.pricingMultiplier,
      businessParams.proTierAdoptionRate
    );
    
    const paymentProcessingCost = avgPrice * infraParams.paymentProcessingRate;
    let infraCost = calculateInfrastructureCostPerCompany(infraParams);
    
    if (stage.selfHostingActive) {
      infraCost = infraCost * (1 - infraParams.selfHostingSavingsRate);
    }
    
    if (stage.awsCreditsActive) {
      infraCost = 0; // Credits cover infrastructure
    }
    
    return avgPrice - paymentProcessingCost - infraCost;
  };
  
  // Calculate LTV for 12 months in each stage
  const monthsPerStage = 12;
  const retentionRate = 1 - businessParams.monthlyChurnRate;
  
  let saasLTVStage1 = 0;
  let saasLTVStage2 = 0;
  let saasLTVStage3 = 0;
  
  for (const stage of stages) {
    const monthlyProfit = calculateStageMonthlyProfit(stage);
    let stageValue = 0;
    
    for (let month = 1; month <= monthsPerStage; month++) {
      stageValue += monthlyProfit * Math.pow(retentionRate, month - 1);
    }
    
    if (stage.name.includes('Stage 1')) saasLTVStage1 = stageValue;
    else if (stage.name.includes('Stage 2')) saasLTVStage2 = stageValue;
    else if (stage.name.includes('Stage 3')) saasLTVStage3 = stageValue;
  }
  
  const blendedLTV = formationLTV + (saasLTVStage1 + saasLTVStage2 + saasLTVStage3) / 3;
  const ltvPerFounder = blendedLTV * businessParams.averageCompaniesPerFounder;
  
  return {
    formationLTV,
    saasLTVStage1,
    saasLTVStage2,
    saasLTVStage3,
    blendedLTV,
    ltvPerFounder,
  };
};

// Growth projection calculation
export const calculateGrowthProjections = (
  businessParams: BusinessParameters,
  infraParams: InfrastructureParameters,
  stages: GrowthStage[],
  months: number
): FinancialProjections => {
  const cohorts: MonthlyCohort[] = [];
  const cac = calculateCAC(businessParams);
  
  let totalCompaniesRunning = 0;
  let cumulativeRevenue = 0;
  let cumulativeGrossProfit = 0;
  let cumulativeInfraCost = 0;
  
  for (let month = 1; month <= months; month++) {
    // Find current stage
    const currentStage = stages.find(s => month >= s.startMonth && month <= s.endMonth) || stages[0];
    
    // Calculate new companies (direct + viral from existing base)
    const directNew = cac.directCompanies;
    const viralNew = totalCompaniesRunning * businessParams.viralCoefficient / 12; // Monthly viral rate
    const newCompanies = directNew + viralNew;
    
    // Apply churn to existing companies
    totalCompaniesRunning = totalCompaniesRunning * (1 - businessParams.monthlyChurnRate) + newCompanies;
    
    // Calculate revenues
    const formationRevenue = newCompanies * businessParams.formationFee;
    const saasRevenue = calculateMonthlySaaSRevenue(
      businessParams, 
      totalCompaniesRunning, 
      currentStage.pricingMultiplier
    );
    
    // Calculate costs
    const formationCosts = newCompanies * (
      infraParams.stateFilingFee + 
      infraParams.identityVerification + 
      infraParams.infrastructurePerFormation + 
      (businessParams.formationFee * infraParams.paymentProcessingRate)
    );
    
    const saasProcessingCosts = saasRevenue.totalRevenue * infraParams.paymentProcessingRate;
    const infraCosts = calculateInfrastructureCost(totalCompaniesRunning, infraParams, currentStage);
    
    const totalRevenue = formationRevenue + saasRevenue.totalRevenue;
    const totalCosts = formationCosts + saasProcessingCosts + infraCosts.netCost;
    const grossProfit = totalRevenue - totalCosts;
    
    cumulativeRevenue += totalRevenue;
    cumulativeGrossProfit += grossProfit;
    cumulativeInfraCost += infraCosts.netCost;
    
    cohorts.push({
      month,
      newCompanies,
      totalCompanies: totalCompaniesRunning,
      formationRevenue,
      monthlyRecurringRevenue: saasRevenue.totalRevenue,
      totalRevenue,
      grossProfit,
      infrastructureCost: infraCosts.netCost,
      viralContribution: viralNew,
      directAcquisition: directNew,
    });
  }
  
  const ltv = calculateLTV(businessParams, infraParams, stages);
  const finalMRR = cohorts[cohorts.length - 1].monthlyRecurringRevenue;
  const finalARR = finalMRR * 12;
  const ltvCacRatio = ltv.ltvPerFounder / cac.cacPerFounder;
  const paybackPeriod = cac.cacPerFounder / (finalMRR / totalCompaniesRunning * businessParams.averageCompaniesPerFounder);
  
  return {
    timeHorizon: months,
    cohorts,
    totalRevenue: cumulativeRevenue,
    totalGrossProfit: cumulativeGrossProfit,
    totalInfrastructureCost: cumulativeInfraCost,
    finalMRR,
    finalARR,
    companyCount: totalCompaniesRunning,
    ltv: ltv.ltvPerFounder,
    cac: cac.cacPerFounder,
    ltvCacRatio,
    paybackPeriod,
  };
};

// Sensitivity analysis
export const runSensitivityAnalysis = (
  baseParams: BusinessParameters,
  infraParams: InfrastructureParameters,
  stages: GrowthStage[],
  parameter: keyof BusinessParameters,
  values: number[]
): { value: number; projection: FinancialProjections }[] => {
  return values.map(value => {
    const modifiedParams = { ...baseParams, [parameter]: value };
    const projection = calculateGrowthProjections(modifiedParams, infraParams, stages, 12);
    return { value, projection };
  });
};

// Investment return calculation
export const calculateInvestmentReturns = (
  investmentAmount: number,
  valuation: number,
  projections: FinancialProjections,
  exitMultiples: number[]
): { exitMultiple: number; exitValuation: number; returnMultiple: number }[] => {
  const equityPercent = investmentAmount / valuation;
  
  return exitMultiples.map(multiple => {
    const exitValuation = projections.finalARR * multiple;
    const returnValue = exitValuation * equityPercent;
    const returnMultiple = returnValue / investmentAmount;
    
    return {
      exitMultiple: multiple,
      exitValuation,
      returnMultiple,
    };
  });
};

// Competitive benchmark comparison
export const calculateCompetitiveBenchmarks = (
  projections: FinancialProjections,
  industryBenchmarks: CompetitiveBenchmarks
): {
  metric: string;
  vibestartup: number;
  industry: number;
  multiple: number;
  unit: string;
}[] => {
  const grossMargin = projections.totalGrossProfit / projections.totalRevenue;
  
  return [
    {
      metric: 'LTV/CAC Ratio',
      vibestartup: projections.ltvCacRatio,
      industry: industryBenchmarks.industryLtvCacRatio,
      multiple: projections.ltvCacRatio / industryBenchmarks.industryLtvCacRatio,
      unit: 'x',
    },
    {
      metric: 'Payback Period',
      vibestartup: projections.paybackPeriod,
      industry: industryBenchmarks.industryPaybackPeriod,
      multiple: industryBenchmarks.industryPaybackPeriod / projections.paybackPeriod,
      unit: 'months',
    },
    {
      metric: 'Gross Margin',
      vibestartup: grossMargin,
      industry: industryBenchmarks.industryGrossMargin,
      multiple: grossMargin / industryBenchmarks.industryGrossMargin,
      unit: '%',
    },
  ];
};

// Import base parameters for pre-configured calculations
import {
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  INDUSTRY_BENCHMARKS,
} from './parameters';

// Base case calculations using default parameters
export const baseCAC = calculateCAC(BASE_BUSINESS_PARAMS);
export const baseLTV = calculateLTV(BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS, GROWTH_STAGES);
export const baseProjections = calculateGrowthProjections(
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  12
);
export const baseBenchmarks = calculateCompetitiveBenchmarks(baseProjections, INDUSTRY_BENCHMARKS);

// Quick access to key metrics
export const keyMetrics = {
  cac: baseCAC.cacPerFounder,
  ltv: baseLTV.ltvPerFounder,
  ltvCacRatio: baseLTV.ltvPerFounder / baseCAC.cacPerFounder,
  paybackPeriod: baseCAC.cacPerFounder / (baseProjections.finalMRR / baseProjections.companyCount * BASE_BUSINESS_PARAMS.averageCompaniesPerFounder),
  finalMRR: baseProjections.finalMRR,
  finalARR: baseProjections.finalARR,
  totalRevenue: baseProjections.totalRevenue,
  grossProfit: baseProjections.totalGrossProfit,
  grossMargin: baseProjections.totalGrossProfit / baseProjections.totalRevenue,
  companyCount: baseProjections.companyCount,
}; 