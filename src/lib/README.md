# VibeStartup Pitch Deck Calculation Library

This library provides a comprehensive, parametric system for calculating all metrics used in the VibeStartup pitch deck. Instead of hardcoded values, everything is calculated dynamically from base parameters, allowing for easy scenario testing and updates.

## Quick Start

```typescript
import { keyMetrics, formatCurrency, formatMultiplier } from '../lib';

// Get key metrics with default parameters
console.log(`LTV/CAC Ratio: ${formatMultiplier(keyMetrics.ltvCacRatio)}`);
console.log(`CAC: ${formatCurrency(keyMetrics.cac)}`);
console.log(`LTV: ${formatCurrency(keyMetrics.ltv)}`);
```

## Core Concepts

### Parameters
All calculations are driven by two main parameter sets:
- **BusinessParameters**: Viral coefficients, pricing, conversion rates, etc.
- **InfrastructureParameters**: Costs, infrastructure settings, scaling stages

### Calculations
Core calculation functions:
- `calculateCAC()`: Customer acquisition cost breakdown
- `calculateLTV()`: Lifetime value across different growth stages
- `calculateGrowthProjections()`: Monthly growth projections
- `runSensitivityAnalysis()`: Impact of parameter changes

### Utilities
Formatting and helper functions:
- `formatCurrency()`, `formatNumber()`, `formatPercentage()`, etc.
- `generateChartData()`: Prepare data for visualizations
- `createMetricComparison()`: Compare against industry benchmarks

## Usage Examples

### Basic Usage

```typescript
import { 
  baseCAC, 
  baseLTV, 
  keyMetrics,
  formatCurrency,
  formatMultiplier 
} from '../lib';

// Pre-calculated base case results
const metrics = {
  cac: baseCAC.cacPerFounder,
  ltv: baseLTV.ltvPerFounder,
  ratio: keyMetrics.ltvCacRatio,
  arr: keyMetrics.finalARR
};

console.log(`CAC: ${formatCurrency(metrics.cac)}`);
console.log(`LTV: ${formatCurrency(metrics.ltv)}`);
console.log(`Ratio: ${formatMultiplier(metrics.ratio)}`);
```

### Custom Scenarios

```typescript
import { 
  calculateGrowthProjections,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES
} from '../lib';

// Test higher viral coefficient
const optimisticParams = {
  ...BASE_BUSINESS_PARAMS,
  viralCoefficient: 0.6 // vs 0.4 base case
};

const projections = calculateGrowthProjections(
  optimisticParams,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  12 // months
);

console.log(`Optimistic Y1 Revenue: ${formatCurrency(projections.totalRevenue)}`);
```

### Sensitivity Analysis

```typescript
import { 
  runSensitivityAnalysis,
  SENSITIVITY_PARAMS 
} from '../lib';

// Test formation rate sensitivity
const scenarios = runSensitivityAnalysis(
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  GROWTH_STAGES,
  'formationConversionRate',
  SENSITIVITY_PARAMS.formationRateRange
);

scenarios.forEach(scenario => {
  console.log(`${scenario.value * 100}% conversion → ${formatCurrency(scenario.projection.totalRevenue)} Y1 revenue`);
});
```

### Component Integration

```typescript
// In a React component
import { 
  baseCAC, 
  formatCurrency, 
  formatNumber,
  BASE_BUSINESS_PARAMS 
} from '../../lib';

export function MetricsDisplay() {
  const breakdown = [
    {
      label: "Marketing Spend",
      value: formatCurrency(BASE_BUSINESS_PARAMS.monthlyMarketingSpend),
      detail: `${formatNumber(baseCAC.totalViews)} total views`
    },
    {
      label: "Companies Acquired",
      value: formatNumber(baseCAC.totalCompanies),
      detail: `${formatNumber(baseCAC.directCompanies)} direct + ${formatNumber(baseCAC.viralCompanies)} viral`
    }
  ];

  return (
    <div>
      {breakdown.map(item => (
        <div key={item.label}>
          <span>{item.label}: {item.value}</span>
          <small>{item.detail}</small>
        </div>
      ))}
    </div>
  );
}
```

## Key Parameters

### Business Parameters
```typescript
const BASE_BUSINESS_PARAMS = {
  // Growth
  viralCoefficient: 0.4,              // K-factor
  formationConversionRate: 0.30,      // 30% of signups convert
  viewToSignupRate: 0.005,            // 0.5% of views signup
  
  // Pricing
  basicTierPrice: 20,                 // $20/month
  proTierPrice: 100,                  // $100/month
  proTierAdoptionRate: 0.30,          // 30% choose pro
  formationFee: 120,                  // $120 one-time
  
  // Marketing
  monthlyMarketingSpend: 5000,        // $5K/month
  baseVideoViews: 100000,             // 100K base views
  organicMultiplier: 3,               // 3x organic reach
  
  // Retention
  monthlyChurnRate: 0.08,             // 8% monthly churn
  averageCompaniesPerFounder: 2.5,    // Serial entrepreneurs
};
```

### Infrastructure Parameters
```typescript
const BASE_INFRASTRUCTURE_PARAMS = {
  // Formation costs
  stateFilingFee: 80,                 // $80 average
  identityVerification: 1.50,         // $1.50 KYC
  infrastructurePerFormation: 3.51,   // $3.51 infra
  paymentProcessingRate: 0.03,        // 3% processing
  
  // Monthly costs per company
  computeCostPerCompany: 0.0597,      // Lambda/compute
  storageCostPerCompany: 0.118,       // S3 storage
  databaseCostPerCompany: 2.05,       // RDS/DynamoDB
  cdnCostPerCompany: 1.225,           // CloudFront
  communicationCostPerCompany: 8.4,   // Email/SMS/voice
  
  // Scaling
  awsCreditsMonthly: 8333,            // $8,333 credits (year 1)
  selfHostingSavingsRate: 0.875,      // 87.5% cost reduction
  selfHostingSetupCost: 2000000,      // $2M setup cost
};
```

## Growth Stages

The system models three distinct growth stages:

### Stage 1: AWS Credits (Months 1-12)
- Infrastructure costs covered by AWS credits
- 94% SaaS margins (only payment processing)
- High profitability, cash generation

### Stage 2: Paid AWS (Months 13-24)
- Full AWS infrastructure costs
- Pricing increase needed (1.5x multiplier)
- 73% SaaS margins after pricing adjustment

### Stage 3: Self-Hosted (Months 25+)
- 87.5% infrastructure cost reduction
- $2M capex for self-hosting setup
- 95% SaaS margins at scale

## Sensitivity Analysis

Test how changes to key parameters affect outcomes:

```typescript
const SENSITIVITY_PARAMS = {
  formationRateRange: [0.20, 0.30, 0.40],    // Formation conversion
  viralCoefficientRange: [0.2, 0.4, 0.6],    // Viral K-factor
  churnRateRange: [0.12, 0.08, 0.05],        // Monthly churn
  proTierRange: [0.20, 0.30, 0.40],          // Pro tier adoption
  marketingEfficiencyRange: [0.5, 1.0, 1.5], // Marketing multiplier
};
```

## Formatting Utilities

```typescript
formatCurrency(1500000)        // "$1.5M"
formatNumber(75000)            // "75K"
formatPercentage(0.756)        // "75.6%"
formatMultiplier(75.6)         // "75.6x"
formatMonths(0.4)              // "12 days"
```

## Competitive Benchmarks

```typescript
const INDUSTRY_BENCHMARKS = {
  industryLtvCacRatio: 3.5,      // 3-5x typical
  industryPaybackPeriod: 15,     // 12-18 months
  industryGrossMargin: 0.79,     // 79% median
  industryMonthlyChurn: 0.10,    // 8-12%
  industryRevenuePerEmployee: 150000, // $150K
  industryCapitalTo1MARR: 3500000,    // $2-5M
};
```

## Advanced Usage

### Custom Growth Stages
```typescript
const customStages = [
  {
    name: 'Bootstrap',
    startMonth: 1,
    endMonth: 6,
    awsCreditsActive: false,
    selfHostingActive: false,
    pricingMultiplier: 0.8, // 20% discount
  },
  // ... more stages
];

const projections = calculateGrowthProjections(
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  customStages,
  24
);
```

### Investment Scenarios
```typescript
const returns = calculateInvestmentReturns(
  50000,      // $50K investment
  2000000,    // $2M valuation
  baseProjections,
  [6, 8, 10]  // Exit multiples
);

returns.forEach(scenario => {
  console.log(`${scenario.exitMultiple}x exit → ${formatMultiplier(scenario.returnMultiple)} return`);
});
```

## File Structure

```
lib/
├── index.ts          # Main exports
├── types.ts          # TypeScript interfaces
├── parameters.ts     # Base parameters & constants
├── calculations.ts   # Core calculation functions
├── utils.ts          # Formatting & helper functions
└── README.md         # This file
```

## Best Practices

1. **Use base parameters**: Import `BASE_BUSINESS_PARAMS` and `BASE_INFRASTRUCTURE_PARAMS` rather than hardcoding values
2. **Format consistently**: Use formatting functions for all displayed numbers
3. **Test scenarios**: Use sensitivity analysis to validate assumptions
4. **Document changes**: When updating parameters, document the reasoning
5. **Cache expensive calculations**: Pre-calculate common scenarios like `baseCAC`, `baseLTV`

## Updates & Maintenance

To update the pitch deck metrics:

1. **Update parameters** in `parameters.ts`
2. **Re-run calculations** - they'll automatically propagate
3. **Test sensitivity** to ensure robustness
4. **Update slides** that use the calculations
5. **Verify formatting** displays correctly

The parametric system ensures consistency across all slides and makes scenario testing effortless. 