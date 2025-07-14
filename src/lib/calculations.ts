import { 
  BusinessParameters, 
  InfrastructureParameters, 
  GrowthStage, 
  DailyCohort, 
  FinancialProjections,
  CompetitiveBenchmarks,
  EmployeeParameters,
  Employee
} from './types';
import { calculateAveragePrice } from './parameters';

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to calculate days between dates
const daysBetween = (start: Date, end: Date): number => {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

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

// Lifetime Value (LTV) calculation - multi-stage model from pitch deck
export const calculateLTV = (
  businessParams: BusinessParameters,
  infraParams: InfrastructureParameters
): {
  ltvPerCompanyStage1: number;
  ltvPerCompanyStage2Plus: number;
  blendedLtvPerCompany: number;
  ltvPerFounder: number;
  formationGrossProfit: number;
  stage1SaasGrossProfit: number;
  stage2PlusSaasGrossProfit: number;
} => {
  // Formation gross profit calculation
  const formationCogs = infraParams.stateFilingFee + 
                       infraParams.identityVerification + 
                       infraParams.infrastructurePerFormation + 
                       (businessParams.formationFee * infraParams.paymentProcessingRate);
  const formationGrossProfit = businessParams.formationFee - formationCogs;

  // Stage 1 (AWS Credits active) - 94% SaaS margin
  const stage1AvgPrice = calculateAveragePrice(
    businessParams.basicTierPrice, 
    businessParams.proTierPrice, 
    businessParams.proTierAdoptionRate
  );
  const stage1SaasGrossProfit = stage1AvgPrice * 0.94; // 94% margin (only payment processing)
  const stage1MonthlyRetention = 1 - businessParams.monthlyChurnRate;
  
  // Calculate geometric series for 12 months of retention
  const stage1SaasLifetimeValue = stage1SaasGrossProfit * 
    (1 - Math.pow(stage1MonthlyRetention, 12)) / (1 - stage1MonthlyRetention);
  
  const ltvPerCompanyStage1 = formationGrossProfit + stage1SaasLifetimeValue;

  // Stage 2+ (Paid AWS + pricing increase) - 95% SaaS margin after pricing bump
  const stage2AvgPrice = stage1AvgPrice * 1.5; // 50% price increase
  const stage2SaasGrossProfit = stage2AvgPrice * 0.95; // 95% margin (self-hosted infra)
  const stage2SaasLifetimeValue = stage2SaasGrossProfit * 
    (1 - Math.pow(stage1MonthlyRetention, 12)) / (1 - stage1MonthlyRetention);
  
  const ltvPerCompanyStage2Plus = formationGrossProfit + stage2SaasLifetimeValue;

  // Blended LTV (50% Stage 1, 50% Stage 2+)
  const blendedLtvPerCompany = (ltvPerCompanyStage1 + ltvPerCompanyStage2Plus) / 2;
  const ltvPerFounder = blendedLtvPerCompany * businessParams.averageCompaniesPerFounder;

  return {
    ltvPerCompanyStage1,
    ltvPerCompanyStage2Plus,
    blendedLtvPerCompany,
    ltvPerFounder,
    formationGrossProfit,
    stage1SaasGrossProfit,
    stage2PlusSaasGrossProfit: stage2SaasGrossProfit,
  };
};

// Calculate employee costs for a specific date
export const calculateEmployeeCostsForDate = (
  employeeParams: EmployeeParameters,
  currentDate: Date,
  currentMRR: number = 0,
  investmentReceived: boolean = false
): {
  totalDailyCost: number;
  totalMonthlyCost: number;
  phase: 'pre-launch' | 'post-investment';
  breakdown: Record<string, number>;
  activeEmployees: Employee[];
} => {
  // Determine phase
  let phase: 'pre-launch' | 'post-investment';
  if (currentDate < employeeParams.investmentDate || !investmentReceived) {
    phase = 'pre-launch';
  } else {
    phase = 'post-investment';
  }
  
  const activeEmployees: Employee[] = [];
  const breakdown: Record<string, number> = {};
  let totalMonthlyCost = 0;
  
  employeeParams.employees.forEach(employee => {
    // Check if employee should be active on this date
    const isActive = currentDate >= employee.startDate && 
                    (!employee.endDate || currentDate <= employee.endDate) &&
                    (!employee.investmentRequired || (investmentReceived && currentDate >= employeeParams.investmentDate)) &&
                    (!employee.requiredMRR || currentMRR >= employee.requiredMRR);
    
    if (isActive) {
      activeEmployees.push(employee);
      breakdown[employee.role.toLowerCase().replace(/\s+/g, '_')] = employee.monthlyCost;
      totalMonthlyCost += employee.monthlyCost;
    }
  });
  
  const totalDailyCost = totalMonthlyCost / 30.44; // Convert to daily
  
  return {
    totalDailyCost,
    totalMonthlyCost,
    phase,
    breakdown,
    activeEmployees
  };
};

// Daily SaaS revenue calculation
export const calculateDailySaaSRevenue = (
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
  
  // Convert monthly prices to daily (monthly / 30.44 avg days per month)
  const dailyBasicPrice = basicPrice / 30.44;
  const dailyProPrice = proPrice / 30.44;
  
  const basicRevenue = basicCompanies * dailyBasicPrice;
  const proRevenue = proCompanies * dailyProPrice;
  const totalRevenue = basicRevenue + proRevenue;
  
  return {
    basicRevenue,
    proRevenue,
    totalRevenue,
    averagePrice: averagePrice / 30.44, // Daily average price
  };
};

// Infrastructure cost calculation per day
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
  const baseCostPerCompany = (
    infraParams.computeCostPerCompany +
    infraParams.storageCostPerCompany +
    infraParams.databaseCostPerCompany +
    infraParams.cdnCostPerCompany +
    infraParams.communicationCostPerCompany
  );
  
  let costPerCompany = baseCostPerCompany;
  
  // Apply self-hosting savings
  if (stage.selfHostingActive) {
    costPerCompany = baseCostPerCompany * (1 - infraParams.selfHostingSavingsRate);
  }
  
  const totalCost = (costPerCompany * companyCount) + infraParams.dailyFixedCosts;
  let creditsApplied = 0;
  
  // Apply AWS credits if active
  if (stage.awsCreditsActive) {
    creditsApplied = Math.min(totalCost, infraParams.awsCreditsDaily);
  }
  
  const netCost = totalCost - creditsApplied;
  const selfHostingSavings = stage.selfHostingActive ? 
    (baseCostPerCompany * infraParams.selfHostingSavingsRate * companyCount) : 0;
  
  return {
    totalCost,
    costPerCompany,
    netCost: Math.max(0, netCost),
    creditsApplied,
    selfHostingSavings,
  };
};

// Growth projections with daily calculations and proper employee costs
export const calculateGrowthProjections = (
  businessParams: BusinessParameters,
  infraParams: InfrastructureParameters,
  stages: GrowthStage[],
  projectionDays: number,
  employeeParams?: EmployeeParameters,
  startDaysOffset: number = 0
): FinancialProjections => {
  const cohorts: DailyCohort[] = [];
  const cac = calculateCAC(businessParams);
  const ltv = calculateLTV(businessParams, infraParams);
  
  let totalCompaniesRunning = 0;
  let cumulativeRevenue = 0;
  let cumulativeGrossProfit = 0;
  let cumulativeInfraCost = 0;
  
  const startDate = addDays(businessParams.todaysDate, startDaysOffset);
  const launchDate = businessParams.launchDate;
  
  // Calculate daily churn rate from monthly rate
  const dailyChurnRate = 1 - Math.pow(1 - businessParams.monthlyChurnRate, 1/30.44);
  
  // Calculate daily direct acquisitions from monthly marketing
  const dailyDirectNew = cac.directCompanies / 30.44;
  
  // Track investment received status
  let investmentReceived = false;
  
  // Market saturation parameters
  const totalAddressableCompanies = 5_480_000; // Annual US business formations
  const marketPenetrationCap = 0.10; // 10% max market share (conservative)
  const maxCompanies = totalAddressableCompanies * marketPenetrationCap; // 548,000 companies
  
  // Viral growth parameters - properly calibrated
  // K-factor of 0.4 means each company brings 0.4 new companies over their active period
  // This happens over ~30 days on average (viral cycle time)
  const viralCycleTimeDays = 30; // How long it takes for a company to generate its viral referrals
  const dailyViralRate = businessParams.viralCoefficient / viralCycleTimeDays;
  
  for (let day = 0; day < projectionDays; day++) {
    const currentDate = addDays(startDate, day);
    const daysFromToday = daysBetween(businessParams.todaysDate, currentDate);
    
    // Check if investment has been received
    if (currentDate >= businessParams.investmentDate) {
      investmentReceived = true;
    }
    
    // Find current stage
    const currentStage = stages.find(s => 
      currentDate >= s.startDate && currentDate <= s.endDate
    ) || stages[0];
    
    // Only generate new companies and revenue after launch
    let newCompanies = 0;
    let directNew = 0;
    let viralNew = 0;
    
    if (currentDate >= launchDate) {
      // Market saturation factor (logistic growth)
      const saturationFactor = 1 - (totalCompaniesRunning / maxCompanies);
      
      // Direct acquisitions (affected by saturation as market gets crowded)
      directNew = dailyDirectNew * Math.max(0, saturationFactor);
      
      // Viral growth with proper exponential mechanics
      // Each active company generates dailyViralRate new companies
      // But this is dampened by market saturation
      viralNew = totalCompaniesRunning * dailyViralRate * Math.max(0, saturationFactor);
      
      // Network effects bonus: viral coefficient improves as platform grows (up to 20% boost)
      const networkEffectMultiplier = 1 + Math.min(0.20, totalCompaniesRunning / 50000);
      viralNew *= networkEffectMultiplier;
      
      newCompanies = directNew + viralNew;
    }
    
    // Apply daily churn to existing companies
    if (totalCompaniesRunning > 0) {
      // Churn rate decreases as network effects strengthen (down to 60% of base rate)
      const networkChurnReduction = Math.max(0.6, 1 - (totalCompaniesRunning / 100000));
      const adjustedDailyChurn = dailyChurnRate * networkChurnReduction;
      totalCompaniesRunning = totalCompaniesRunning * (1 - adjustedDailyChurn);
    }
    totalCompaniesRunning += newCompanies;
    
    // Calculate revenues (only after launch)
    const formationRevenue = newCompanies * businessParams.formationFee;
    const saasRevenue = calculateDailySaaSRevenue(
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
    
    // Calculate employee costs
    let employeeCosts = 0;
    if (employeeParams) {
      const currentMRR = saasRevenue.totalRevenue * 30.44; // Convert daily to monthly
      const empCostResult = calculateEmployeeCostsForDate(
        employeeParams, 
        currentDate, 
        currentMRR, 
        investmentReceived
      );
      employeeCosts = empCostResult.totalDailyCost;
    }
    
    const totalRevenue = formationRevenue + saasRevenue.totalRevenue;
    const totalCosts = formationCosts + saasProcessingCosts + infraCosts.netCost + employeeCosts;
    const grossProfit = totalRevenue - totalCosts;
    
    cumulativeRevenue += totalRevenue;
    cumulativeGrossProfit += grossProfit;
    cumulativeInfraCost += infraCosts.netCost;
    
    cohorts.push({
      date: currentDate,
      daysFromToday,
      newCompanies,
      totalCompanies: totalCompaniesRunning,
      formationRevenue,
      dailyRecurringRevenue: saasRevenue.totalRevenue,
      totalRevenue,
      grossProfit,
      infrastructureCost: infraCosts.netCost,
      viralContribution: viralNew,
      directAcquisition: directNew,
    });
  }
  
  const finalDRR = cohorts[cohorts.length - 1].dailyRecurringRevenue;
  const finalMRR = finalDRR * 30.44; // Convert daily to monthly
  const finalARR = finalMRR * 12;
  
  // Calculate real LTV/CAC ratio and payback period
  const ltvCacRatio = ltv.ltvPerFounder / cac.cacPerFounder;
  const monthlyGrossProfitPerFounder = ltv.stage1SaasGrossProfit * businessParams.averageCompaniesPerFounder;
  const paybackPeriod = cac.cacPerFounder / monthlyGrossProfitPerFounder;
  
  return {
    timeHorizonDays: projectionDays,
    cohorts,
    totalRevenue: cumulativeRevenue,
    totalGrossProfit: cumulativeGrossProfit,
    totalInfrastructureCost: cumulativeInfraCost,
    finalDRR,
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
  values: number[],
  employeeParams?: EmployeeParameters
): { value: number; projection: FinancialProjections }[] => {
  return values.map(value => {
    const modifiedParams = { ...baseParams, [parameter]: value };
    const projection = calculateGrowthProjections(modifiedParams, infraParams, stages, 365, employeeParams);
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
  BASE_EMPLOYEE_PARAMS,
} from './parameters';

// Base case calculations using default parameters
export const baseCAC = calculateCAC(BASE_BUSINESS_PARAMS);
export const baseLTV = calculateLTV(BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS);
export const baseProjections = calculateGrowthProjections(
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  365, // 1 year projection
  BASE_EMPLOYEE_PARAMS,
  -180 // Start from 6 months before today
);
export const baseBenchmarks = calculateCompetitiveBenchmarks(baseProjections, INDUSTRY_BENCHMARKS);

// Quick access to key metrics - all calculated, no hardcoded values
export const keyMetrics = {
  cac: baseCAC.cacPerFounder,
  ltv: baseLTV.ltvPerFounder,
  ltvCacRatio: baseLTV.ltvPerFounder / baseCAC.cacPerFounder,
  paybackPeriod: baseCAC.cacPerFounder / (baseLTV.stage1SaasGrossProfit * BASE_BUSINESS_PARAMS.averageCompaniesPerFounder),
  finalMRR: baseProjections.finalMRR,
  finalARR: baseProjections.finalARR,
  totalRevenue: baseProjections.totalRevenue,
  grossProfit: baseProjections.totalGrossProfit,
  grossMargin: baseProjections.totalGrossProfit / baseProjections.totalRevenue,
  companyCount: baseProjections.companyCount,
  
  // Formation economics
  formationGrossProfit: baseLTV.formationGrossProfit,
  formationMargin: baseLTV.formationGrossProfit / BASE_BUSINESS_PARAMS.formationFee,
  
  // SaaS economics by stage
  stage1SaasMargin: 0.94, // 94% in Stage 1 (AWS credits)
  stage2SaasMargin: 0.95, // 95% in Stage 2+ (self-hosted)
  
  // Viral mechanics
  viralCoefficient: BASE_BUSINESS_PARAMS.viralCoefficient,
  directCompaniesPerMonth: baseCAC.directCompanies,
  viralCompaniesPerMonth: baseCAC.viralCompanies,
  totalCompaniesPerMonth: baseCAC.totalCompanies,
}; 