// Core parameter exports
export * from './parameters';
export * from './types';

// Real calculation exports - no more placeholders!
export * from './calculations';

// Import formatting utilities from utils.ts to avoid conflicts
export { formatCurrency, formatNumber, formatPercentage, formatMultiplier, formatMonths } from './utils';

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