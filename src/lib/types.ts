// Core business parameters
export interface BusinessParameters {
  // Viral growth parameters
  viralCoefficient: number; // K-factor (0.4 base case)
  formationConversionRate: number; // 30% of signups convert
  viewToSignupRate: number; // 0.5% of views become signups
  organicMultiplier: number; // 3x organic reach
  
  // Retention parameters
  monthlyChurnRate: number; // 8% monthly churn
  averageCompaniesPerFounder: number; // 2.5 companies per founder
  
  // Pricing parameters
  basicTierPrice: number; // $20/month
  proTierPrice: number; // $100/month
  proTierAdoptionRate: number; // 30% of companies
  formationFee: number; // $120 one-time
  
  // Marketing parameters
  monthlyMarketingSpend: number; // $5,000
  videoCreationCost: number; // $3,000
  promotionCost: number; // $1,500
  amplificationCost: number; // $500
  baseVideoViews: number; // 100,000 views
  
  // Timeline parameters (now using dates)
  todaysDate: Date; // Today's date as reference point
  investmentDate: Date; // Date when investment is received
  launchDate: Date; // Date when product launches
}

// Infrastructure cost parameters
export interface InfrastructureParameters {
  // Formation costs
  stateFilingFee: number; // $80 average
  identityVerification: number; // $1.50
  infrastructurePerFormation: number; // $3.51
  paymentProcessingRate: number; // 3%
  
  // Daily infrastructure costs per company (converted from monthly)
  computeCostPerCompany: number; // Daily cost
  storageCostPerCompany: number; // Daily cost
  databaseCostPerCompany: number; // Daily cost
  cdnCostPerCompany: number; // Daily cost
  communicationCostPerCompany: number; // Daily cost
  
  // Stage-specific multipliers
  awsCreditsDaily: number; // Daily AWS credits for year 1
  selfHostingSavingsRate: number; // 87.5% infrastructure cost reduction
  selfHostingSetupCost: number; // $2M one-time
  
  // Fixed costs
  dailyFixedCosts: number; // Daily fixed costs (third-party services)
}

// Company usage patterns
export interface UsagePatterns {
  dashboardLoginsPerDay: number; // Daily logins
  apiCallsPerDay: number; // Daily API calls
  documentOperationsPerDay: number; // Daily document operations
  vibeOpsTasksPerDay: number; // Daily tasks
  emailsPerDay: number; // Daily emails
  smsPerDay: number; // Daily SMS
  voiceMinutesPerDay: number; // Daily voice minutes
  dataGeneratedGB: number; // Daily data generated
}

// Growth stage definitions
export interface GrowthStage {
  name: string;
  startDate: Date;
  endDate: Date;
  awsCreditsActive: boolean;
  selfHostingActive: boolean;
  pricingMultiplier: number; // 1.0 = base pricing, 1.5 = 50% increase
}

// Daily cohort data (replacing monthly)
export interface DailyCohort {
  date: Date;
  daysFromToday: number; // Days relative to today (negative = past, positive = future)
  newCompanies: number;
  totalCompanies: number;
  formationRevenue: number;
  dailyRecurringRevenue: number; // Daily portion of MRR
  totalRevenue: number;
  grossProfit: number;
  infrastructureCost: number;
  viralContribution: number;
  directAcquisition: number;
}

// Sensitivity analysis parameters
export interface SensitivityParameters {
  formationRateRange: [number, number, number]; // [pessimistic, base, optimistic]
  viralCoefficientRange: [number, number, number];
  churnRateRange: [number, number, number];
  proTierRange: [number, number, number];
  marketingEfficiencyRange: [number, number, number];
}

// Financial projections (updated for daily calculations)
export interface FinancialProjections {
  timeHorizonDays: number; // days instead of months
  cohorts: DailyCohort[];
  totalRevenue: number;
  totalGrossProfit: number;
  totalInfrastructureCost: number;
  finalDRR: number; // Daily recurring revenue
  finalMRR: number; // Monthly recurring revenue (finalDRR * 30.44)
  finalARR: number; // Annual recurring revenue
  companyCount: number;
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  paybackPeriod: number;
}

// Competitive benchmarks
export interface CompetitiveBenchmarks {
  industryLtvCacRatio: number; // 3-5x typical
  industryPaybackPeriod: number; // 12-18 months
  industryGrossMargin: number; // 79% median
  industryMonthlyChurn: number; // 8-12%
  industryRevenuePerEmployee: number; // $150k
  industryCapitalTo1MARR: number; // $2-5M
}

// Investment scenarios
export interface InvestmentScenario {
  investmentAmount: number;
  valuation: number;
  equityPercent: number;
  exitValuationMultiple: number;
  timeToExit: number;
  expectedReturn: number;
} 

// Market data and TAM parameters
export interface MarketParameters {
  traditionalIncorporationTAM: number; // $6B
  expandedTAM: number; // $25B 
  serviceableAddressableMarket: number; // $2B
  serviceableObtainableMarket: number; // $200M
  globalBusinessFormationsAnnual: number; // 30M+
  uSBusinessFormationsAnnual: number; // 5.48M
  marketGrowthRate: number; // 20%
  digitalFormationsPercentage: number; // percentage of total that are digital-first
}

// Competitive landscape parameters
export interface CompetitiveParameters {
  stripeAtlasFormationTime: string;
  stripeAtlasFormationCost: number;
  stripeAtlasAnnualFormations: number;
  legalZoomFormationTime: string;
  legalZoomFormationCost: number;
  legalZoomAnnualFormations: number;
  ourFormationTime: string;
  ourFormationAdvantage: string;
}

// Investment and returns parameters
export interface InvestmentParameters {
  requestedInvestmentAmount: number; // $50k
  premoneyValuation: number; // $2M
  equityPercentage: number; // 2.5%
  useOfFunds: {
    infrastructure: number; // $15k
    marketing: number; // $20k
    legal: number; // $10k
    vibefundTreasury: number; // $5k
  };
  exitMultiples: {
    year1: number; // 10x revenue
    year2: number; // 8x revenue
    year3: number; // 6x revenue
  };
}

// Company branding and messaging parameters
export interface BrandingParameters {
  companyName: string;
  tagline: string;
  mainHeadline: string;
  positioningStatement: string;
  problemStatement: string;
  solutionStatement: string;
}

// Product feature parameters
export interface ProductParameters {
  coreFeatures: {
    vibeco: {
      name: string;
      description: string;
      technicalDetails: string;
    };
    vibeops: {
      name: string;
      description: string;
      technicalDetails: string;
    };
    vibefund: {
      name: string;
      description: string;
      technicalDetails: string;
    };
    vibematch: {
      name: string;
      description: string;
      technicalDetails: string;
    };
  };
}

// Market timing and trends parameters
export interface MarketTimingParameters {
  traditionalVCTimelineYears: number; // 7-10 years
  newVCTimelineYears: number; // 2-5 years
  aiDevelopmentSpeedMultiplier: number; // 10x faster
  remoteWorkAdoptionRate: number;
  genZCompanyFormationTrends: string;
}

// Growth phase and roadmap parameters
export interface RoadmapParameters {
  phase1: {
    name: string;
    duration: string;
    keyMilestones: string[];
    targetCompanies: number;
    targetRevenue: number;
  };
  phase2: {
    name: string;
    duration: string;
    keyMilestones: string[];
    newFeatures: string[];
  };
  phase3: {
    name: string;
    duration: string;
    keyMilestones: string[];
    exitStrategy: string[];
  };
}

// Risk mitigation parameters
export interface RiskParameters {
  keyRisks: {
    regulatory: {
      description: string;
      mitigation: string;
    };
    viralDecay: {
      description: string;
      mitigation: string;
    };
    competition: {
      description: string;
      mitigation: string;
    };
    fraud: {
      description: string;
      mitigation: string;
    };
  };
}

// Infrastructure optimization and stage timing parameters
export interface InfrastructureOptimization {
  stageTransitions: {
    awsToSelfHosted: {
      breakEvenMonth: number;
      triggerCompanies: number;
      capexRequired: number;
      monthlySavings: number;
      riskFactors: string[];
    };
    pricingAdjustment: {
      triggerMonth: number;
      currentPrice: number;
      newPrice: number;
      customerChurnRisk: number;
      revenueImpact: number;
    };
  };
  paretoFrontier: Array<{
    month: number;
    companies: number;
    awsCost: number;
    selfHostedCost: number;
    netSavings: number;
    cumulativeCapex: number;
    roi: number;
    riskScore: number;
  }>;
  decisionMatrix: Array<{
    scenario: string;
    timing: string;
    pros: string[];
    cons: string[];
    netPresentValue: number;
    riskAdjustedReturn: number;
  }>;
} 

// Generic employee definition
export interface Employee {
  role: string;
  monthlyCost: number;
  startDate: Date; // Date when employee starts
  endDate?: Date; // Optional end date (undefined = ongoing)
  requiredMRR?: number; // Optional MRR threshold to trigger hire
  investmentRequired?: boolean; // Whether this hire requires investment to be received
}

// Employee cost parameters with realistic timeline modeling
export interface EmployeeParameters {
  employees: Employee[]; // Array of all employees across timeline
  
  // Timeline parameters
  launchDate: Date; // Date when product launches
  investmentDate: Date; // Date when investment is received
  investmentAmount: number; // Investment amount (parametrized)
}

// Employee cost scenario parameters
export interface EmployeeCostScenario {
  amount: number; // Investment amount
  founderSalaryMultiplier: number; // Multiplier for founder salary based on investment
  hiringTimeline: 'conservative' | 'moderate' | 'aggressive'; // How quickly to hire
  burnRateTarget: number; // Target monthly burn rate as % of investment
}

// Timeline marker parameters
export interface TimelineMarkerParameters {
  developmentStartDate: Date; // Date when development starts
  investmentDate: Date; // Date when investment is received
  launchDate: Date; // Date when product launches
  
  // Hiring milestone parameters
  customerSuccessHire: {
    targetDate: Date;
    mrrThreshold: number;
    salary: number;
  };
  marketingHire: {
    targetDate: Date;
    mrrThreshold: number;
    salary: number;
  };
  seniorDevHire: {
    targetDate: Date;
    mrrThreshold: number;
    salary: number;
  };
  salesHire: {
    targetDate: Date;
    mrrThreshold: number;
    salary: number;
  };
}

// Burn rate calculation parameters
export interface BurnRateCalculations {
  preLaunchMonthlyBurn: number; // Monthly burn before investment
  postInvestmentPreLaunchBurn: number; // Monthly burn after investment but before launch
  postLaunchBaseBurn: number; // Monthly burn after launch (base costs)
  preRevenueBurnTotal: () => number; // Function to calculate total pre-revenue burn
}

// Computed values interface for helper functions
export interface ComputedValues {
  // Timeline helpers
  readonly developmentPhaseDays: number;
  readonly prepPhaseDays: number;
  
  // Investment and cost helpers
  readonly investmentAmountFormatted: string;
  readonly preLaunchBurnTotal: number;
  readonly preLaunchBurnFormatted: string;
  
  // Function helpers
  getEmployeeCostAtDate(date: Date, mrr?: number): {
    totalCost: number;
    phase: 'pre-launch' | 'post-investment';
    breakdown: Record<string, number>;
    activeEmployees: Employee[];
  };
  
  getTimelineMarkers(): Array<{
    date: Date;
    daysFromToday: number;
    label: string;
    type: 'launch' | 'investment' | 'hire' | 'milestone';
    description: string;
  }>;
} 