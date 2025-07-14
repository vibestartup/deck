// Core parameter exports
export * from './parameters';
export * from './types';

// Temporary exports for slide compatibility during date conversion
// TODO: Update these once the date-based calculation system is fully implemented

// Placeholder calculations to keep slides working during conversion
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

// Additional formatting helper functions
export const formatNumber = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatMultiplier = (value: number, decimals: number = 1): string => {
  return `${formatNumber(value, decimals)}x`;
};

export const formatMonths = (months: number): string => {
  if (months === 1) return '1 month';
  return `${months} months`;
};

// Key metrics for slides
export const keyMetrics = {
  cac: 19.85,
  ltv: 1493,
  ltvCacRatio: 75.2,
  paybackPeriod: 0.4,
  finalMRR: 3508560,
  finalARR: 42102720,
  breakEvenMonth: 2,
  companiesYear1: 87714,
  revenueYear1: 22053840,
};

// Temporary baseline data using original monthly calculations
export const baseProjections = {
  cohorts: [
    // Sample data for months 1-12 to keep charts working
    { month: 1, totalCompanies: 630, totalRevenue: 100800, monthlyRecurringRevenue: 25200 },
    { month: 2, totalCompanies: 1512, totalRevenue: 272160, monthlyRecurringRevenue: 60480 },
    { month: 3, totalCompanies: 2747, totalRevenue: 530240, monthlyRecurringRevenue: 109880 },
    { month: 4, totalCompanies: 4476, totalRevenue: 916760, monthlyRecurringRevenue: 179040 },
    { month: 5, totalCompanies: 6896, totalRevenue: 1482000, monthlyRecurringRevenue: 275840 },
    { month: 6, totalCompanies: 10284, totalRevenue: 2299920, monthlyRecurringRevenue: 411360 },
    { month: 7, totalCompanies: 15027, totalRevenue: 3470160, monthlyRecurringRevenue: 601080 },
    { month: 8, totalCompanies: 21668, totalRevenue: 5133800, monthlyRecurringRevenue: 866720 },
    { month: 9, totalCompanies: 30965, totalRevenue: 7488040, monthlyRecurringRevenue: 1238600 },
    { month: 10, totalCompanies: 43981, totalRevenue: 10809200, monthlyRecurringRevenue: 1759240 },
    { month: 11, totalCompanies: 62203, totalRevenue: 15483960, monthlyRecurringRevenue: 2488120 },
    { month: 12, totalCompanies: 87714, totalRevenue: 22053840, monthlyRecurringRevenue: 3508560 },
  ],
  totalRevenue: 22053840,
  finalMRR: 3508560,
  finalARR: 42102720,
  companyCount: 87714,
};

export const baseCAC = {
  cacPerCompany: 7.94,
  cacPerFounder: 19.85,
  totalCompanies: 630,
  viralCoefficient: 0.4,
};

export const baseLTV = {
  blendedLTV: 597.19,
  ltvPerFounder: 1493,
};

// Infrastructure cost calculation (daily rate * 30.44 to get monthly equivalent)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateInfrastructureCostPerCompany = (infraParams: any): number => {
  return (
    infraParams.computeCostPerCompany +
    infraParams.storageCostPerCompany +
    infraParams.databaseCostPerCompany +
    infraParams.cdnCostPerCompany +
    infraParams.communicationCostPerCompany
  ) * 30.44; // Convert daily to monthly for compatibility
};

// Temporary employee cost calculation using original month-based logic
export const calculateEmployeeCosts = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  employeeParams: any,
  month: number,
  currentMRR: number = 0
): {
  totalCost: number;
  phase: 'pre-launch' | 'post-investment';
  breakdown: Record<string, number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeEmployees: any[];
} => {
  // Simplified calculation for compatibility
  let totalCost = 0;
  const breakdown: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeEmployees: any[] = [];
  
  // Base costs based on phase
  if (month < 0) {
    // Pre-launch: just contractor
    totalCost = 2000;
    breakdown['Technical Contractor'] = 2000;
    activeEmployees.push({ role: 'Technical Contractor', monthlyCost: 2000 });
  } else if (month === 0) {
    // Investment month: add team
    totalCost = 14000;
    breakdown['Founder Salary'] = 5000;
    breakdown['Technical Contractor'] = 2000;
    breakdown['Legal Counsel'] = 3000;
    breakdown['Compliance Specialist'] = 4000;
  } else {
    // Post-launch: base team + revenue-driven hires
    totalCost = 19000; // Base team + marketing
    breakdown['Founder Salary'] = 5000;
    breakdown['Technical Contractor'] = 2000;
    breakdown['Legal Counsel'] = 3000;
    breakdown['Compliance Specialist'] = 4000;
    breakdown['Marketing & Content'] = 5000;
    
    // Add hires based on MRR milestones
    if (currentMRR >= 100000) {
      totalCost += 3500;
      breakdown['Customer Success Manager'] = 3500;
    }
    if (currentMRR >= 200000) {
      totalCost += 4500;
      breakdown['Marketing Manager'] = 4500;
    }
    if (currentMRR >= 400000) {
      totalCost += 8000;
      breakdown['Senior Developer'] = 8000;
    }
    if (currentMRR >= 600000) {
      totalCost += 5000;
      breakdown['Sales Manager'] = 5000;
    }
  }
  
  return {
    totalCost,
    phase: month < 0 ? 'pre-launch' : 'post-investment',
    breakdown,
    activeEmployees,
  };
}; 