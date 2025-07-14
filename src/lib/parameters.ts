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
  Employee
} from './types';

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
  
  // Timeline parameters
  investmentMonth: 0, // Investment received at month 0
  launchDelayMonths: 1, // Launch happens 1 month after investment
};

// Infrastructure cost parameters
export const BASE_INFRASTRUCTURE_PARAMS: InfrastructureParameters = {
  // Formation costs
  stateFilingFee: 80, // $80 average state filing fee
  identityVerification: 1.50, // $1.50 identity verification
  infrastructurePerFormation: 3.51, // $3.51 infrastructure per formation
  paymentProcessingRate: 0.03, // 3% payment processing
  
  // Monthly infrastructure costs per company (heavy usage)
  computeCostPerCompany: 0.0597, // Lambda/compute costs
  storageCostPerCompany: 0.118, // S3 storage costs
  databaseCostPerCompany: 2.05, // RDS/DynamoDB costs
  cdnCostPerCompany: 1.225, // CloudFront costs
  communicationCostPerCompany: 8.4, // Email/SMS/voice costs
  
  // Stage-specific parameters
  awsCreditsMonthly: 8333, // $8,333 monthly AWS credits (year 1)
  selfHostingSavingsRate: 0.875, // 87.5% cost reduction from self-hosting
  selfHostingSetupCost: 2000000, // $2M one-time setup cost
  
  // Fixed costs
  monthlyFixedCosts: 135, // $135 fixed third-party services
};

// Default usage patterns (heavy usage assumptions)
export const BASE_USAGE_PATTERNS: UsagePatterns = {
  dashboardLoginsPerMonth: 2000,
  apiCallsPerMonth: 50000,
  documentOperationsPerMonth: 1000,
  vibeOpsTasksPerMonth: 500,
  emailsPerMonth: 3000,
  smsPerMonth: 200,
  voiceMinutesPerMonth: 600,
  dataGeneratedGB: 5,
};

// Growth stage definitions
export const GROWTH_STAGES: GrowthStage[] = [
  {
    name: 'Stage 1: AWS Credits',
    startMonth: 1,
    endMonth: 12,
    awsCreditsActive: true,
    selfHostingActive: false,
    pricingMultiplier: 1.0,
  },
  {
    name: 'Stage 2: Paid AWS',
    startMonth: 13,
    endMonth: 24,
    awsCreditsActive: false,
    selfHostingActive: false,
    pricingMultiplier: 1.5, // 50% price increase
  },
  {
    name: 'Stage 3: Self-Hosted',
    startMonth: 25,
    endMonth: 36,
    awsCreditsActive: false,
    selfHostingActive: true,
    pricingMultiplier: 1.5, // Maintain higher pricing
  },
];

// Employee cost parameters with timeline awareness
export const BASE_EMPLOYEE_PARAMS: EmployeeParameters = {
  employees: [
    // Pre-launch phase employees
    {
      role: 'Technical Contractor',
      monthlyCost: 2000, // $2k/month
      startMonth: -6, // 6 months before launch
      endMonth: 0, // Until investment
      investmentRequired: false,
    },
    // Post-investment employees (investment at month 0, launch at month 1)
    {
      role: 'Founder Salary',
      monthlyCost: 5000, // $5k/month
      startMonth: 0, // Starts when investment received
      endMonth: undefined,
      investmentRequired: true,
    },
    {
      role: 'Technical Contractor (Continued)',
      monthlyCost: 2000, // $2k/month
      startMonth: 0, // Continues after investment
      endMonth: undefined,
      investmentRequired: false,
    },
    {
      role: 'Legal Counsel',
      monthlyCost: 3000, // $3k/month
      startMonth: 0, // Starts when investment received
      endMonth: undefined,
      investmentRequired: true,
    },
    {
      role: 'Compliance Specialist',
      monthlyCost: 4000, // $4k/month
      startMonth: 0, // Starts when investment received
      endMonth: undefined,
      investmentRequired: true,
    },
    // Marketing spend (not technically an employee but counts as fixed cost)
    {
      role: 'Marketing & Content',
      monthlyCost: 5000, // $5k/month
      startMonth: 1, // Starts at launch
      endMonth: undefined,
      investmentRequired: false,
    },
    // Revenue-driven hires
    {
      role: 'Customer Success Manager',
      monthlyCost: 3500, // $3.5k/month
      startMonth: 6,
      endMonth: undefined,
      investmentRequired: false,
      requiredMRR: 100000, // At $100k MRR
    },
    {
      role: 'Marketing Manager',
      monthlyCost: 4500, // $4.5k/month
      startMonth: 9,
      endMonth: undefined,
      investmentRequired: false,
      requiredMRR: 200000, // At $200k MRR
    },
    {
      role: 'Senior Developer',
      monthlyCost: 8000, // $8k/month
      startMonth: 12,
      endMonth: undefined,
      investmentRequired: false,
      requiredMRR: 400000, // At $400k MRR
    },
    {
      role: 'Sales Manager',
      monthlyCost: 5000, // $5k/month
      startMonth: 18,
      endMonth: undefined,
      investmentRequired: false,
      requiredMRR: 600000, // At $600k MRR
    },
  ],
  launchMonth: 1, // Launch happens at month 1 (after 1 month prep)
  investmentMonth: 0, // Investment received at month 0
  investmentAmount: 50000, // $50k base case investment
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

// Function to calculate monthly employee costs based on realistic timeline
export const calculateEmployeeCosts = (
  employeeParams: EmployeeParameters,
  month: number, // Month relative to launch (negative = pre-launch)  
  currentMRR: number = 0,
  investmentScenario?: EmployeeCostScenario,
  investmentReceived: boolean = true
): {
  totalCost: number;
  phase: 'pre-launch' | 'post-investment';
  breakdown: Record<string, number>;
  activeEmployees: Employee[];
} => {
  const scenario = investmentScenario || EMPLOYEE_COST_SCENARIOS.find(s => s.amount === employeeParams.investmentAmount) || EMPLOYEE_COST_SCENARIOS[1];
  
  // Determine phase (investment comes before launch in our timeline)
  let phase: 'pre-launch' | 'post-investment';
  if (month < employeeParams.investmentMonth || !investmentReceived) {
    phase = 'pre-launch';
  } else {
    phase = 'post-investment';
  }
  
  const activeEmployees: Employee[] = [];
  const breakdown: Record<string, number> = {};
  let totalCost = 0;
  
  employeeParams.employees.forEach(employee => {
    // Check if employee should be active this month
    const isActive = month >= employee.startMonth && 
                    (!employee.endMonth || month <= employee.endMonth) &&
                    (!employee.investmentRequired || (investmentReceived && month >= employeeParams.investmentMonth)) &&
                    (!employee.requiredMRR || currentMRR >= employee.requiredMRR);
    
    if (isActive) {
      let employeeCost = employee.monthlyCost;
      
      // Apply founder salary multiplier if this is founder
      if (employee.role === 'Founder Salary') {
        employeeCost = employee.monthlyCost * scenario.founderSalaryMultiplier;
      }
      
      activeEmployees.push(employee);
      breakdown[employee.role.toLowerCase().replace(/\s+/g, '_')] = employeeCost;
      totalCost += employeeCost;
    }
  });
  
  return {
    totalCost,
    phase,
    breakdown,
    activeEmployees
  };
};

// Function to generate employee cost parameters for different investment scenarios
export const generateEmployeeParamsForInvestment = (
  baseParams: EmployeeParameters,
  investmentAmount: number,
  investmentTimingMonth: number = 3
): EmployeeParameters => {
  return {
    ...baseParams,
    investmentAmount,
    investmentMonth: investmentTimingMonth,
  };
};

// Helper function to get employees by phase
export const getEmployeesByPhase = (
  employeeParams: EmployeeParameters,
  phase: 'pre-launch' | 'post-investment'
): Employee[] => {
  return employeeParams.employees.filter(employee => {
    switch(phase) {
      case 'pre-launch':
        return employee.startMonth < employeeParams.investmentMonth && !employee.investmentRequired;
      case 'post-investment':
        return employee.investmentRequired || employee.startMonth >= employeeParams.investmentMonth;
      default:
        return false;
    }
  });
};

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