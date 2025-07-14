import { calculateGrowthProjections, BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS, GROWTH_STAGES, BASE_EMPLOYEE_PARAMS } from './index';

// Test projections for different years
const testYears = [1, 2, 3, 5, 6, 8, 10];

console.log('Testing Exponential Growth Projections:');
console.log('=====================================');

testYears.forEach(years => {
  const projections = calculateGrowthProjections(
    BASE_BUSINESS_PARAMS,
    BASE_INFRASTRUCTURE_PARAMS,
    GROWTH_STAGES,
    365 * years,
    BASE_EMPLOYEE_PARAMS,
    -180
  );
  
  const finalARR = projections.finalMRR * 12;
  const finalCompanies = projections.companyCount;
  
  console.log(`Year ${years}:`);
  console.log(`  Companies: ${finalCompanies.toLocaleString()}`);
  console.log(`  ARR: $${(finalARR / 1000000).toFixed(1)}M`);
  console.log(`  MRR: $${(projections.finalMRR / 1000000).toFixed(2)}M`);
  console.log('');
});

// Calculate growth rates
const year1 = calculateGrowthProjections(BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS, GROWTH_STAGES, 365, BASE_EMPLOYEE_PARAMS, -180);
const year2 = calculateGrowthProjections(BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS, GROWTH_STAGES, 365 * 2, BASE_EMPLOYEE_PARAMS, -180);
const year3 = calculateGrowthProjections(BASE_BUSINESS_PARAMS, BASE_INFRASTRUCTURE_PARAMS, GROWTH_STAGES, 365 * 3, BASE_EMPLOYEE_PARAMS, -180);

const growthRate1to2 = (year2.finalMRR / year1.finalMRR - 1) * 100;
const growthRate2to3 = (year3.finalMRR / year2.finalMRR - 1) * 100;

console.log('Growth Rates:');
console.log(`Year 1 to 2: ${growthRate1to2.toFixed(1)}%`);
console.log(`Year 2 to 3: ${growthRate2to3.toFixed(1)}%`); 