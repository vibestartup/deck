// Core parameter exports
export * from './parameters';
export * from './types';

// Real calculation exports - no more placeholders!
export * from './calculations';

// Formatting helper functions
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

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

import { DailyCohort } from './types';

// Monthly cohort interface for chart compatibility
interface MonthlyCohort {
  month: number;
  totalCompanies: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  formationRevenue: number;
  grossProfit: number;
  infrastructureCost: number;
  newCompanies: number;
}

// Helper function to convert daily cohorts to monthly for chart compatibility
export const convertDailyToMonthlyCohorts = (dailyCohorts: DailyCohort[]): MonthlyCohort[] => {
  // Group daily cohorts by month and aggregate
  const monthlyData: Record<number, MonthlyCohort> = {};
  
  dailyCohorts.forEach(cohort => {
    const cohortDate = new Date(cohort.date);
    const monthKey = cohortDate.getMonth() + 1; // 1-based month
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        totalCompanies: cohort.totalCompanies,
        totalRevenue: 0,
        monthlyRecurringRevenue: cohort.dailyRecurringRevenue * 30.44, // Convert daily to monthly
        formationRevenue: 0,
        grossProfit: 0,
        infrastructureCost: 0,
        newCompanies: 0,
      };
    }
    
    // Use the last day of the month for totals
    monthlyData[monthKey].totalCompanies = cohort.totalCompanies;
    monthlyData[monthKey].monthlyRecurringRevenue = cohort.dailyRecurringRevenue * 30.44;
    
    // Accumulate daily values
    monthlyData[monthKey].totalRevenue += cohort.totalRevenue;
    monthlyData[monthKey].formationRevenue += cohort.formationRevenue;
    monthlyData[monthKey].grossProfit += cohort.grossProfit;
    monthlyData[monthKey].infrastructureCost += cohort.infrastructureCost;
    monthlyData[monthKey].newCompanies += cohort.newCompanies;
  });
  
  // Convert to array and sort by month
  return Object.values(monthlyData).sort((a, b) => a.month - b.month);
}; 