import { 
  BusinessParameters, 
  InfrastructureParameters, 
  UsagePatterns, 
  GrowthStage, 
  SensitivityParameters,
  CompetitiveBenchmarks,
  MarketParameters,
  CompetitiveParameters,
  InvestmentParameters,
  BrandingParameters,
  ProductParameters,
  MarketTimingParameters,
  RoadmapParameters,
  RiskParameters,
  InfrastructureOptimization,
  EmployeeParameters,
  EmployeeCostScenario,
  Employee,
  TimelineMarkerParameters,
  BurnRateCalculations,
  ComputedValues
} from './types';

// Helper function to create dates relative to today
const daysFromToday = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Base case business parameters from pitch deck
export const BASE_BUSINESS_PARAMS: BusinessParameters = {
  // Viral growth parameters
  viralCoefficient: 0.4, // Conservative vs social apps at 0.7+
  formationConversionRate: 0.30, // 30% of signups convert to formation
  viewToSignupRate: 0.005, // 0.5% of views become signups
  organicMultiplier: 3, // 3x organic reach multiplier
  
  // Retention parameters
  monthlyChurnRate: 0.08, // 8% monthly churn
  averageCompaniesPerFounder: 2.5, // Serial entrepreneurs
  
  // Pricing parameters
  basicTierPrice: 20, // $20/month basic tier
  proTierPrice: 100, // $100/month pro tier
  proTierAdoptionRate: 0.30, // 30% of companies choose pro
  formationFee: 120, // $120 one-time formation fee
  
  // Marketing parameters
  monthlyMarketingSpend: 5000, // $5,000 monthly marketing budget
  videoCreationCost: 3000, // $3,000 video creation
  promotionCost: 1500, // $1,500 promotion
  amplificationCost: 500, // $500 amplification
  baseVideoViews: 100000, // 100k base video views
  
  // Timeline parameters (relative to today)
  todaysDate: new Date(), // Today's date as reference point
  investmentDate: daysFromToday(30), // Investment received in 30 days (1 month from today)
  launchDate: daysFromToday(60), // Launch in 60 days (2 months from today, 1 month after investment)
};

// Timeline marker parameters - computed from business params
export const TIMELINE_MARKER_PARAMS: TimelineMarkerParameters = {
  developmentStartDate: daysFromToday(-180), // Development started 6 months ago
  investmentDate: BASE_BUSINESS_PARAMS.investmentDate, // In 30 days
  launchDate: BASE_BUSINESS_PARAMS.launchDate, // In 60 days
  
  // Hiring thresholds based on MRR milestones and target dates
  customerSuccessHire: {
    targetDate: daysFromToday(180), // ~6 months from launch
    mrrThreshold: 100000, // $100k MRR
    salary: 3500 // $3.5k/month
  },
  marketingHire: {
    targetDate: daysFromToday(270), // ~9 months from launch
    mrrThreshold: 200000, // $200k MRR
    salary: 4500 // $4.5k/month
  },
  seniorDevHire: {
    targetDate: daysFromToday(360), // ~12 months from launch
    mrrThreshold: 400000, // $400k MRR
    salary: 8000 // $8k/month
  },
  salesHire: {
    targetDate: daysFromToday(540), // ~18 months from launch
    mrrThreshold: 600000, // $600k MRR
    salary: 5000 // $5k/month
  }
};

// Infrastructure cost parameters (converted to daily costs)
export const BASE_INFRASTRUCTURE_PARAMS: InfrastructureParameters = {
  // Formation costs
  stateFilingFee: 80, // $80 average state filing fee
  identityVerification: 1.50, // $1.50 identity verification
  infrastructurePerFormation: 3.51, // $3.51 infrastructure per formation
  paymentProcessingRate: 0.03, // 3% payment processing
  
  // Daily infrastructure costs per company (monthly costs / 30.44 avg days/month)
  computeCostPerCompany: 0.0597 / 30.44, // Daily compute costs
  storageCostPerCompany: 0.118 / 30.44, // Daily storage costs
  databaseCostPerCompany: 2.05 / 30.44, // Daily database costs
  cdnCostPerCompany: 1.225 / 30.44, // Daily CDN costs
  communicationCostPerCompany: 8.4 / 30.44, // Daily email/SMS/voice costs
  
  // Stage-specific parameters
  awsCreditsDaily: 8333 / 30.44, // Daily AWS credits (monthly credits / avg days per month)
  selfHostingSavingsRate: 0.875, // 87.5% infrastructure cost reduction
  selfHostingSetupCost: 2000000, // $2M one-time
  
  // Fixed costs
  dailyFixedCosts: 135 / 30.44, // Daily fixed costs (third-party services)
};

// Default usage patterns (heavy usage assumptions - converted to daily)
export const BASE_USAGE_PATTERNS: UsagePatterns = {
  dashboardLoginsPerDay: 2000 / 30.44, // Daily sessions (monthly / avg days per month)
  apiCallsPerDay: 50000 / 30.44, // Daily requests
  documentOperationsPerDay: 1000 / 30.44, // Daily downloads
  vibeOpsTasksPerDay: 500 / 30.44, // Daily tasks
  emailsPerDay: 3000 / 30.44, // Daily emails
  smsPerDay: 200 / 30.44, // Daily SMS
  voiceMinutesPerDay: 600 / 30.44, // Daily minutes
  dataGeneratedGB: 5 / 30.44, // Daily GB
};

// Growth stage definitions (using dates)
export const GROWTH_STAGES: GrowthStage[] = [
  {
    name: 'Stage 1: AWS Credits',
    startDate: BASE_BUSINESS_PARAMS.launchDate,
    endDate: daysFromToday(365), // 1 year from launch
    awsCreditsActive: true,
    selfHostingActive: false,
    pricingMultiplier: 1.0,
  },
  {
    name: 'Stage 2: Paid AWS',
    startDate: daysFromToday(365), // Start of year 2
    endDate: daysFromToday(730), // End of year 2
    awsCreditsActive: false,
    selfHostingActive: false,
    pricingMultiplier: 1.5, // 50% price increase
  },
  {
    name: 'Stage 3: Self-Hosted',
    startDate: daysFromToday(730), // Start of year 3
    endDate: daysFromToday(1095), // End of year 3
    awsCreditsActive: false,
    selfHostingActive: true,
    pricingMultiplier: 1.5, // Keep higher pricing
  },
];

// Employee cost parameters with timeline awareness
export const BASE_EMPLOYEE_PARAMS: EmployeeParameters = {
  employees: [
    // Pre-launch phase employees
    {
      role: 'Technical Contractor',
      monthlyCost: 2000, // $2k/month
      startDate: TIMELINE_MARKER_PARAMS.developmentStartDate, // Development start
      endDate: TIMELINE_MARKER_PARAMS.investmentDate, // Until investment
      investmentRequired: false,
    },
    // Post-investment employees
    {
      role: 'Founder Salary',
      monthlyCost: 5000, // $5k/month
      startDate: TIMELINE_MARKER_PARAMS.investmentDate, // Starts when investment received
      endDate: undefined,
      investmentRequired: true,
    },
    {
      role: 'Technical Contractor (Continued)',
      monthlyCost: 2000, // $2k/month
      startDate: TIMELINE_MARKER_PARAMS.investmentDate, // Continues after investment
      endDate: undefined,
      investmentRequired: false,
    },
    {
      role: 'Legal Counsel',
      monthlyCost: 3000, // $3k/month
      startDate: TIMELINE_MARKER_PARAMS.investmentDate, // Starts when investment received
      endDate: undefined,
      investmentRequired: true,
    },
    {
      role: 'Compliance Specialist',
      monthlyCost: 4000, // $4k/month
      startDate: TIMELINE_MARKER_PARAMS.investmentDate, // Starts when investment received
      endDate: undefined,
      investmentRequired: true,
    },
    // Marketing spend (not technically an employee but counts as fixed cost)
    {
      role: 'Marketing & Content',
      monthlyCost: BASE_BUSINESS_PARAMS.monthlyMarketingSpend, // $5k/month from business params
      startDate: TIMELINE_MARKER_PARAMS.launchDate, // Starts at launch
      endDate: undefined,
      investmentRequired: false,
    },
    // Revenue-driven hires
    {
      role: 'Customer Success Manager',
      monthlyCost: TIMELINE_MARKER_PARAMS.customerSuccessHire.salary,
      startDate: TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate,
      endDate: undefined,
      investmentRequired: false,
      requiredMRR: TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold,
    },
    {
      role: 'Marketing Manager',
      monthlyCost: TIMELINE_MARKER_PARAMS.marketingHire.salary,
      startDate: TIMELINE_MARKER_PARAMS.marketingHire.targetDate,
      endDate: undefined,
      investmentRequired: false,
      requiredMRR: TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold,
    },
    {
      role: 'Senior Developer',
      monthlyCost: TIMELINE_MARKER_PARAMS.seniorDevHire.salary,
      startDate: TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate,
      endDate: undefined,
      investmentRequired: false,
      requiredMRR: TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold,
    },
    {
      role: 'Sales Manager',
      monthlyCost: TIMELINE_MARKER_PARAMS.salesHire.salary,
      startDate: TIMELINE_MARKER_PARAMS.salesHire.targetDate,
      endDate: undefined,
      investmentRequired: false,
      requiredMRR: TIMELINE_MARKER_PARAMS.salesHire.mrrThreshold,
    },
  ],
  launchDate: TIMELINE_MARKER_PARAMS.launchDate, // Launch date
  investmentDate: TIMELINE_MARKER_PARAMS.investmentDate, // Investment date
  investmentAmount: 50000, // $50k base case investment
};

// Computed burn rate calculations
export const BURN_RATE_CALCULATIONS: BurnRateCalculations = {
  preLaunchMonthlyBurn: 2000, // Technical contractor only
  postInvestmentPreLaunchBurn: 14000, // Founder + legal + compliance + contractor
  postLaunchBaseBurn: 19000, // Post-investment costs + marketing
  
  // Pre-revenue burn calculation (limited to -2 months pre-investment + prep period)
  preRevenueBurnTotal: () => {
    // Limit pre-investment burn to 2 months maximum
    const maxPreLaunchMonths = 2;
    const prepMonths = (TIMELINE_MARKER_PARAMS.launchDate.getTime() - TIMELINE_MARKER_PARAMS.investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44); // Convert days to months
    
    return Math.round((maxPreLaunchMonths * BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn) +
           (prepMonths * BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn));
  },
};

// Investment scenario parameters
export const BASE_INVESTMENT_PARAMS: InvestmentParameters = {
  requestedInvestmentAmount: BASE_EMPLOYEE_PARAMS.investmentAmount, // $50k
  premoneyValuation: 2000000, // $2M
  equityPercentage: 2.5, // 2.5%
  useOfFunds: {
    infrastructure: 15000, // $15k
    marketing: 20000, // $20k
    legal: 10000, // $10k
    vibefundTreasury: 5000, // $5k
  },
  exitMultiples: {
    year1: 10, // 10x revenue
    year2: 8, // 8x revenue
    year3: 6, // 6x revenue
  },
};

// Computed values helper object
export const COMPUTED_VALUES: ComputedValues = {
  // Timeline helpers
  get developmentPhaseDays() {
    return Math.abs(TIMELINE_MARKER_PARAMS.developmentStartDate.getTime() - TIMELINE_MARKER_PARAMS.investmentDate.getTime()) / (1000 * 60 * 60 * 24);
  },
  
  get prepPhaseDays() {
    return (TIMELINE_MARKER_PARAMS.launchDate.getTime() - TIMELINE_MARKER_PARAMS.investmentDate.getTime()) / (1000 * 60 * 60 * 24);
  },
  
  // Investment and cost helpers
  get investmentAmountFormatted() {
    return `$${(BASE_INVESTMENT_PARAMS.requestedInvestmentAmount / 1000)}k`;
  },
  
  get preLaunchBurnTotal() {
    return BURN_RATE_CALCULATIONS.preRevenueBurnTotal();
  },
  
  get preLaunchBurnFormatted() {
    return `$${(this.preLaunchBurnTotal / 1000).toFixed(1)}k`;
  },
  
  // Employee cost helpers - now uses proper date-based calculation
  getEmployeeCostAtDate(date: Date, mrr: number = 0) {
    // Direct implementation to avoid circular imports
    const investmentReceived = date >= BASE_EMPLOYEE_PARAMS.investmentDate;
    const phase: 'pre-launch' | 'post-investment' = investmentReceived ? 'post-investment' : 'pre-launch';
    
    let totalCost = 0;
    const breakdown: Record<string, number> = {};
    const activeEmployees: Employee[] = [];
    
    BASE_EMPLOYEE_PARAMS.employees.forEach(employee => {
      const isActive = date >= employee.startDate && 
                      (!employee.endDate || date <= employee.endDate) &&
                      (!employee.investmentRequired || investmentReceived) &&
                      (!employee.requiredMRR || mrr >= employee.requiredMRR);
      
      if (isActive) {
        activeEmployees.push(employee);
        breakdown[employee.role.toLowerCase().replace(/\s+/g, '_')] = employee.monthlyCost;
        totalCost += employee.monthlyCost;
      }
    });
    
    return {
      totalCost,
      totalDailyCost: totalCost / 30.44,
      phase,
      breakdown,
      activeEmployees
    };
  },
  
  // Timeline marker helpers
  getTimelineMarkers() {
    const today = new Date();
    
    const calculateDaysFromToday = (targetDate: Date): number => {
      return Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };
    
    return [
      {
        date: TIMELINE_MARKER_PARAMS.developmentStartDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.developmentStartDate),
        label: 'Dev Start',
        type: 'milestone' as const,
        description: 'Pre-launch development begins'
      },
      {
        date: TIMELINE_MARKER_PARAMS.investmentDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.investmentDate),
        label: 'Investment',
        type: 'investment' as const,
        description: `${this.investmentAmountFormatted} received, ${Math.round(this.prepPhaseDays)}-day prep begins`
      },
      {
        date: TIMELINE_MARKER_PARAMS.launchDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.launchDate),
        label: 'Launch',
        type: 'launch' as const,
        description: 'Product launch, revenue begins'
      },
      {
        date: TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate),
        label: 'CS Hire',
        type: 'hire' as const,
        description: `Customer Success Manager at $${TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold / 1000}k MRR`
      },
      {
        date: TIMELINE_MARKER_PARAMS.marketingHire.targetDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.marketingHire.targetDate),
        label: 'Marketing Hire',
        type: 'hire' as const,
        description: `Marketing Manager at $${TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold / 1000}k MRR`
      },
      {
        date: TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate,
        daysFromToday: calculateDaysFromToday(TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate),
        label: 'Dev Hire',
        type: 'hire' as const,
        description: `Senior Developer at $${TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold / 1000}k MRR`
      }
    ];
  }
};

// Employee cost scenario definitions
export const EMPLOYEE_COST_SCENARIOS: EmployeeCostScenario[] = [
  {
    amount: 25000,
    founderSalaryMultiplier: 0.6, // $3k/month founder salary
    hiringTimeline: 'conservative',
    burnRateTarget: 0.15, // 15% of investment per month max
  },
  {
    amount: 50000,
    founderSalaryMultiplier: 1.0, // $5k/month founder salary
    hiringTimeline: 'moderate',
    burnRateTarget: 0.20, // 20% of investment per month max
  },
  {
    amount: 100000,
    founderSalaryMultiplier: 1.5, // $7.5k/month founder salary
    hiringTimeline: 'aggressive',
    burnRateTarget: 0.25, // 25% of investment per month max
  },
  {
    amount: 250000,
    founderSalaryMultiplier: 2.0, // $10k/month founder salary
    hiringTimeline: 'aggressive',
    burnRateTarget: 0.30, // 30% of investment per month max
  },
];



// Sensitivity analysis ranges
export const SENSITIVITY_PARAMS: SensitivityParameters = {
  formationRateRange: [0.20, 0.30, 0.40], // [pessimistic, base, optimistic]
  viralCoefficientRange: [0.2, 0.4, 0.6],
  churnRateRange: [0.12, 0.08, 0.05],
  proTierRange: [0.20, 0.30, 0.40],
  marketingEfficiencyRange: [0.5, 1.0, 1.5], // Multiplier on base conversion rates
};

// Industry benchmarks for comparison
export const INDUSTRY_BENCHMARKS: CompetitiveBenchmarks = {
  industryLtvCacRatio: 3.5, // 3-5x typical
  industryPaybackPeriod: 15, // 12-18 months
  industryGrossMargin: 0.79, // 79% median
  industryMonthlyChurn: 0.10, // 8-12%
  industryRevenuePerEmployee: 150000, // $150k
  industryCapitalTo1MARR: 3500000, // $2-5M
};

// Pricing tiers calculation
export const calculateAveragePrice = (
  basicPrice: number,
  proPrice: number,
  proAdoptionRate: number
): number => {
  return basicPrice * (1 - proAdoptionRate) + proPrice * proAdoptionRate;
};

// Total infrastructure cost per company per month
export const calculateInfrastructureCostPerCompany = (
  infraParams: InfrastructureParameters
): number => {
  return (
    infraParams.computeCostPerCompany +
    infraParams.storageCostPerCompany +
    infraParams.databaseCostPerCompany +
    infraParams.cdnCostPerCompany +
    infraParams.communicationCostPerCompany
  );
};

// Formation cost breakdown
export const calculateFormationCosts = (
  infraParams: InfrastructureParameters,
  formationFee: number
): {
  revenue: number;
  cogs: number;
  grossProfit: number;
  margin: number;
} => {
  const cogs = 
    infraParams.stateFilingFee +
    infraParams.identityVerification +
    infraParams.infrastructurePerFormation +
    (formationFee * infraParams.paymentProcessingRate);
  
  const grossProfit = formationFee - cogs;
  const margin = grossProfit / formationFee;
  
  return {
    revenue: formationFee,
    cogs,
    grossProfit,
    margin,
  };
};

// Market size and opportunity parameters
export const MARKET_PARAMS: MarketParameters = {
  traditionalIncorporationTAM: 6_000_000_000, // $6B
  expandedTAM: 25_000_000_000, // $25B
  serviceableAddressableMarket: 2_000_000_000, // $2B
  serviceableObtainableMarket: 200_000_000, // $200M
  globalBusinessFormationsAnnual: 30_000_000, // 30M+
  uSBusinessFormationsAnnual: 5_480_000, // 5.48M (2023)
  marketGrowthRate: 0.20, // 20% annually
  digitalFormationsPercentage: 0.17, // 17% of formations are digital-first
};

// Competitive landscape parameters
export const COMPETITIVE_PARAMS: CompetitiveParameters = {
  stripeAtlasFormationTime: '2-3 weeks',
  stripeAtlasFormationCost: 500,
  stripeAtlasAnnualFormations: 27_000,
  legalZoomFormationTime: '3-5 days',
  legalZoomFormationCost: 199,
  legalZoomAnnualFormations: 2_000_000,
  ourFormationTime: '<1 hour',
  ourFormationAdvantage: 'API-first Delaware integration + pre-filled templates',
};

// Investment and returns parameters
export const INVESTMENT_PARAMS: InvestmentParameters = {
  requestedInvestmentAmount: 50_000, // $50k
  premoneyValuation: 2_000_000, // $2M
  equityPercentage: 0.025, // 2.5%
  useOfFunds: {
    infrastructure: 15_000, // $15k
    marketing: 20_000, // $20k (4-month runway)
    legal: 10_000, // $10k
    vibefundTreasury: 5_000, // $5k
  },
  exitMultiples: {
    year1: 10, // 10x revenue multiple
    year2: 8, // 8x revenue multiple
    year3: 6, // 6x revenue multiple
  },
};

// Company branding and messaging parameters
export const BRANDING_PARAMS: BrandingParameters = {
  companyName: 'VibeStartup',
  tagline: 'Making company formation as viral as TikTok',
  mainHeadline: 'Building an OS for a Vibe-First Economy',
  positioningStatement: 'Full-stack entrepreneurship operating system',
  problemStatement: '30M+ businesses formed annually, yet formation takes weeks, costs $500+, and has zero viral mechanics.',
  solutionStatement: 'Full-stack entrepreneurship platform with viral growth engine that turns every founder into an acquisition channel.',
};

// Product features and technical details
export const PRODUCT_PARAMS: ProductParameters = {
  coreFeatures: {
    vibeco: {
      name: 'VibeCo',
      description: 'one-click incorporation + financial/legal infra (<1 hour vs weeks)',
      technicalDetails: 'API-first Delaware integration. Pre-filled Articles of Incorporation. Automated EIN generation. Banking partner integrations (Mercury, SVB). Real-time state filing status. Compliance monitoring dashboard.',
    },
    vibeops: {
      name: 'VibeOps',
      description: 'instant microtask marketplace for any operational need',
      technicalDetails: 'Decentralized task marketplace. Smart contract escrow. Skill-based matching algorithm. Quality scoring system. Integration with Slack, Discord, Telegram. 24/7 operational support coverage.',
    },
    vibefund: {
      name: 'VibeFund',
      description: 'founders investing in each other (aligned incentive network)',
      technicalDetails: 'Peer-to-peer founder investment platform. Equity modeling tools. Due diligence templates. Pro-rata rights management. Secondary market for founder equity. Network-based deal flow.',
    },
    vibematch: {
      name: 'VibeMatch',
      description: 'hinge for finding co-founders and contractors',
      technicalDetails: 'ML-powered compatibility matching. Skill complementarity analysis. Reference verification system. NDA management. Equity split calculators. Team formation analytics.',
    },
  },
};

// Market timing and industry trends
export const MARKET_TIMING_PARAMS: MarketTimingParameters = {
  traditionalVCTimelineYears: 8.5, // 7-10 years average
  newVCTimelineYears: 3.5, // 2-5 years trend
  aiDevelopmentSpeedMultiplier: 10, // 10x faster development
  remoteWorkAdoptionRate: 0.42, // 42% of workforce remote-capable
  genZCompanyFormationTrends: 'treats companies like social media profiles → disposable, iterative, viral',
};

// Roadmap and growth phases
export const ROADMAP_PARAMS: RoadmapParameters = {
  phase1: {
    name: 'Core MVP',
    duration: 'Months 1-12',
    keyMilestones: [
      'Prove product-market fit with core features',
      'Achieve 87k companies formed',
      'Reach $22M revenue',
      'Establish viral k-factor >0.35',
    ],
    targetCompanies: 87_714,
    targetRevenue: 22_053_840,
  },
  phase2: {
    name: 'Scaling & Moats',
    duration: 'Months 13-36',
    keyMilestones: [
      'Build community and network effects',
      'Expand to multiple growth channels',
      'Develop additional revenue streams',
      'Achieve market leadership position',
    ],
    newFeatures: [
      'VibeReach: crowdsourced growth campaigns',
      'VibeLabs: business experimentation platform',
      'VibeSpaces: reddit-like social platform',
      'VibeCap: internal fund with AI-driven equity modeling',
    ],
  },
  phase3: {
    name: 'Autonomous Future',
    duration: 'Years 3+',
    keyMilestones: [
      'Achieve full platform automation',
      'Expand to government partnerships',
      'Enable autonomous company operations',
      'Execute exit strategy',
    ],
    exitStrategy: [
      'IPO scenario',
      'Strategic acquisition',
      'Merge into governance systems',
    ],
  },
};

// Risk mitigation framework
export const RISK_PARAMS: RiskParameters = {
  keyRisks: {
    regulatory: {
      description: 'State laws change formation requirements',
      mitigation: 'Multi-state compliance team, API-first architecture for rapid adaptation',
    },
    viralDecay: {
      description: 'K-factor drops below 0.3, viral growth stalls',
      mitigation: 'Multiple growth channels, paid acquisition backup, community-driven retention',
    },
    competition: {
      description: 'BigCo (Stripe/Square) enters with unlimited resources',
      mitigation: 'Network effects moat, cultural brand differentiation, speed advantage',
    },
    fraud: {
      description: 'Bad actors use platform for fraudulent formations',
      mitigation: 'KYC/AML from day 1, ML fraud detection systems, compliance monitoring',
    },
  },
};

// Sharing behavior constants (derived from research)
export const SHARING_BEHAVIOR = {
  peopleShownPerCompany: 5, // Nielsen data: positive experiences shared with 5-9 people
  conversionRateFromSharing: 0.08, // 8% of those shown start their own company
  organicAmplificationFactor: 3, // 3x organic reach from social sharing
};

// Technical architecture components
export const TECHNICAL_ARCHITECTURE = [
  { 
    component: 'API Gateway', 
    detail: 'Rate limiting, auth, routing. 99.9% uptime SLA. Auto-scaling.' 
  },
  { 
    component: 'Formation Engine', 
    detail: 'State integration APIs. Document generation. Compliance tracking.' 
  },
  { 
    component: 'Task Marketplace', 
    detail: 'Matching algorithms. Escrow system. Quality scoring.' 
  },
  { 
    component: 'Social Layer', 
    detail: 'Viral sharing. Referral tracking. Network analysis.' 
  },
  { 
    component: 'Payment Infrastructure', 
    detail: 'Stripe Connect. Multi-party transactions. Revenue sharing.' 
  },
  { 
    component: 'Data Pipeline', 
    detail: 'Real-time analytics. Cohort analysis. Predictive modeling.' 
  },
];

// Infrastructure optimization and timing analysis
export const INFRASTRUCTURE_OPTIMIZATION: InfrastructureOptimization = {
  stageTransitions: {
    awsToSelfHosted: {
      breakEvenMonth: 18, // Optimal transition month based on cost analysis
      triggerCompanies: 50000, // Company count that triggers transition
      capexRequired: 2000000, // $2M upfront investment
      monthlySavings: 1400000, // $1.4M monthly savings after transition
      riskFactors: [
        'Technical execution risk',
        'Talent acquisition (DevOps team)',
        'Compliance and security setup',
        'Customer experience disruption'
      ]
    },
    pricingAdjustment: {
      triggerMonth: 13, // When AWS credits expire
      currentPrice: 40, // Current average price
      newPrice: 60, // New average price (50% increase)
      customerChurnRisk: 0.15, // 15% potential churn from price increase
      revenueImpact: 1.35 // 35% revenue increase net of churn
    }
  },
  paretoFrontier: [
    // Early transition scenarios
    { month: 12, companies: 25000, awsCost: 400000, selfHostedCost: 50000, netSavings: 350000, cumulativeCapex: 2000000, roi: -82.5, riskScore: 8.5 },
    { month: 15, companies: 40000, awsCost: 640000, selfHostedCost: 80000, netSavings: 560000, cumulativeCapex: 2000000, roi: -72.0, riskScore: 7.8 },
    { month: 18, companies: 65000, awsCost: 1040000, selfHostedCost: 130000, netSavings: 910000, cumulativeCapex: 2000000, roi: -54.5, riskScore: 6.5 },
    
    // Optimal transition window
    { month: 21, companies: 105000, awsCost: 1680000, selfHostedCost: 210000, netSavings: 1470000, cumulativeCapex: 2000000, roi: -26.5, riskScore: 5.2 },
    { month: 24, companies: 170000, awsCost: 2720000, selfHostedCost: 340000, netSavings: 2380000, cumulativeCapex: 2000000, roi: 19.0, riskScore: 4.1 },
    
    // Late transition scenarios  
    { month: 30, companies: 350000, awsCost: 5600000, selfHostedCost: 700000, netSavings: 4900000, cumulativeCapex: 2000000, roi: 145.0, riskScore: 3.8 },
    { month: 36, companies: 720000, awsCost: 11520000, selfHostedCost: 1440000, netSavings: 10080000, cumulativeCapex: 2000000, roi: 404.0, riskScore: 4.5 }
  ],
  decisionMatrix: [
    {
      scenario: 'Conservative (Month 24)',
      timing: 'Transition after full AWS credit utilization + 12 months',
      pros: [
        'Proven scale and reliability',
        'Team fully experienced with operations',
        'Maximum AWS learning benefits',
        'Reduced technical risk'
      ],
      cons: [
        'Higher cumulative infrastructure costs',
        'Delayed margin expansion',
        'Competitive timing disadvantage'
      ],
      netPresentValue: 8500000, // NPV over 3 years
      riskAdjustedReturn: 0.42 // Risk-adjusted ROI
    },
    {
      scenario: 'Optimal (Month 18)', 
      timing: 'Transition 6 months after AWS credits expire',
      pros: [
        'Balance of risk and reward',
        'Sufficient operational experience',
        'Strong margin expansion timing',
        'Competitive infrastructure advantage'
      ],
      cons: [
        'Moderate technical execution risk',
        'Capital requirements during growth phase'
      ],
      netPresentValue: 12300000,
      riskAdjustedReturn: 0.58
    },
    {
      scenario: 'Aggressive (Month 15)',
      timing: 'Transition 3 months after AWS credits expire', 
      pros: [
        'Maximum long-term savings',
        'Early competitive moat',
        'Rapid margin expansion',
        'Technical innovation advantage'
      ],
      cons: [
        'High technical execution risk',
        'Operational complexity during rapid growth',
        'Significant capital requirements'
      ],
      netPresentValue: 10800000,
      riskAdjustedReturn: 0.48
    }
  ]
}; 