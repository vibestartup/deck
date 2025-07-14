import { motion } from 'framer-motion'
import {
  baseProjections,
  baseCAC,
  baseLTV,
  formatCurrency,
  calculateInfrastructureCostPerCompany,
  BASE_BUSINESS_PARAMS,
  BASE_INFRASTRUCTURE_PARAMS,
  INFRASTRUCTURE_OPTIMIZATION,
  BASE_EMPLOYEE_PARAMS,
  TIMELINE_MARKER_PARAMS,
  BURN_RATE_CALCULATIONS,
  BASE_INVESTMENT_PARAMS,
  COMPUTED_VALUES
} from '../../lib'
import { MetricCards } from '../charts'

// Enhanced Line Chart with Break-even and Shaded Areas (Daily Version)
interface AdvancedChartProps {
  data: Array<{
    day: number;
    revenue: number;
    costs: number;
    profit: number;
    companies: number;
    employeeCosts: number;
  }>;
  paretoData: Array<{
    month: number;
    companies: number;
    awsCost: number;
    selfHostedCost: number;
    netSavings: number;
    roi: number;
  }>;
  decisionThresholds: Array<{
    day: number;
    label: string;
    type: 'conservative' | 'optimal' | 'aggressive';
  }>;
  timelineMarkers: Array<{
    day: number;
    label: string;
    type: 'launch' | 'investment' | 'hire' | 'milestone';
    description: string;
  }>;
  breakEvenDay: number;
  height?: number;
}

function AdvancedFinancialChart({ data, paretoData, decisionThresholds, timelineMarkers, breakEvenDay, height = 400 }: AdvancedChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxCosts = Math.max(...data.map(d => d.costs));
  const minProfit = Math.min(...data.map(d => d.profit));
  const maxProfit = Math.max(...data.map(d => d.profit));
  
  // Calculate Y-axis range to include all values (revenue, costs, and profit)
  const maxValue = Math.max(maxRevenue, maxCosts, maxProfit) * 1.1; // 10% padding
  const minValue = Math.min(0, minProfit) * 1.2; // 20% padding for negative values
  const valueRange = maxValue - minValue;
  
  // Get the day range
  const minDay = Math.min(...data.map(d => d.day));
  const maxDay = Math.max(...data.map(d => d.day));
  const dayRange = maxDay - minDay;
  
  // Scale data points for SVG (adjusted for new viewBox with y-axis)
  const scaleY = (value: number) => 55 - ((value - minValue) / valueRange) * 50;
  const scaleX = (day: number) => ((day - minDay) / dayRange) * 87 + 8;

  // Sample data for cleaner paths (every 5 days for smooth lines)
  const sampledData = data.filter((d, i) => i % 5 === 0 || i === data.length - 1);

  // Generate path strings
  const revenuePath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.revenue)}`
  ).join(' ');
  
  const costsPath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.costs)}`
  ).join(' ');

  const employeeCostsPath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.employeeCosts)}`
  ).join(' ');

  // Profit line (can be negative)
  const profitPath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.profit)}`
  ).join(' ');

  // Zero line position
  const zeroY = scaleY(0);

  // Pareto frontier shaded area (convert months to days for display)
  const paretoAreaData = paretoData.filter(d => d.month >= 12 && d.month <= 24);
  const paretoUpperPath = paretoAreaData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month * 30.44)} ${scaleY(d.awsCost)}`
  ).join(' ');
  const paretoLowerPath = paretoAreaData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.month * 30.44)} ${scaleY(d.selfHostedCost)}`
  ).join(' ');

  return (
    <div className="w-full">
      <div className="relative bg-gray-900/30 border border-gray-700 rounded-lg p-6" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          {/* Y-axis line */}
          <line
            x1="8"
            y1="5"
            x2="8"
            y2="55"
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
          />
          
          {/* X-axis line */}
          <line
            x1="8"
            y1="55"
            x2="95"
            y2="55"
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
          />
          
          {/* Zero line */}
          <motion.line
            x1="8"
            y1={zeroY}
            x2="95"
            y2={zeroY}
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Pareto frontier shaded area */}
          {paretoUpperPath && paretoLowerPath && (
            <motion.path
              d={`${paretoUpperPath} ${paretoLowerPath.split(' ').reverse().join(' ')} Z`}
              fill="rgba(255, 193, 7, 0.15)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          )}
          
          {/* Timeline markers - vertical lines */}
          {timelineMarkers.map((marker, index) => (
            <motion.line
              key={`marker-${index}`}
              x1={scaleX(marker.day)}
              y1="5"
              x2={scaleX(marker.day)}
              y2="55"
              stroke={
                marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                'rgb(156, 163, 175)'
              }
              strokeWidth="0.1"
              strokeDasharray={marker.type === 'launch' ? '0.5,0.5' : '1,1'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
            />
          ))}
          
          {/* Break-even vertical line */}
          {breakEvenDay >= minDay && breakEvenDay <= maxDay && (
            <motion.line
              x1={scaleX(breakEvenDay)}
              y1="5"
              x2={scaleX(breakEvenDay)}
              y2="55"
              stroke="rgb(34, 197, 94)"
              strokeWidth="0.15"
              strokeDasharray="1.5,1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          )}
          
          {/* Revenue line */}
          <motion.path
            d={revenuePath}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Total costs line */}
          <motion.path
            d={costsPath}
            fill="none"
            stroke="rgb(239, 68, 68)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Employee costs line */}
          <motion.path
            d={employeeCostsPath}
            fill="none"
            stroke="rgb(168, 85, 247)"
            strokeWidth="0.15"
            strokeDasharray="2,1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          
          {/* Profit line */}
          <motion.path
            d={profitPath}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
          />
          
          {/* Revenue data points (sample every 10 days for visibility) */}
          {data.filter((d, i) => i % 10 === 0 || i === data.length - 1).map((item, index) => (
            <motion.circle
              key={`revenue-${index}`}
              cx={scaleX(item.day)}
              cy={scaleY(item.revenue)}
              r="0.3"
              fill="rgb(59, 130, 246)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            />
          ))}
          
          {/* Strategic decision threshold markers */}
          {decisionThresholds.map((threshold, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={scaleX(threshold.day)}
                cy={scaleY(data.find(d => d.day === threshold.day)?.revenue || 0)}
                r="0.5"
                fill={threshold.type === 'optimal' ? 'rgb(34, 197, 94)' : 
                      threshold.type === 'conservative' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.2 }}
              />
            </motion.g>
          ))}

          {/* Timeline marker points */}
          {timelineMarkers.map((marker, index) => (
            <motion.circle
              key={`marker-point-${index}`}
              cx={scaleX(marker.day)}
              cy={scaleY(data.find(d => d.day === marker.day)?.revenue || data.find(d => d.day === marker.day)?.costs || 0)}
              r="0.4"
              fill={
                marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                'rgb(156, 163, 175)'
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.15 }}
            />
          ))}
          {/* Y-axis grid lines and labels */}
          {(() => {
            // Calculate better Y-axis ticks (limit to 6-8 ticks)
            const range = maxValue - minValue;
            const targetTickCount = 6;
            const roughStep = range / targetTickCount;
            
            // Find nice step size - always use millions for better readability
            const stepSizeInMillions = Math.ceil(roughStep / 1000000);
            
            // Generate tick values starting from a clean number
            const firstTickInMillions = Math.floor(minValue / 1000000);
            const lastTickInMillions = Math.ceil(maxValue / 1000000);
            
            const ticks = [];
            for (let millionValue = firstTickInMillions; millionValue <= lastTickInMillions; millionValue += Math.max(stepSizeInMillions, 1)) {
              const tickValue = millionValue * 1000000;
              if (tickValue >= minValue && tickValue <= maxValue) {
                ticks.push(tickValue);
              }
            }
            
            // Ensure we always have zero line if it's in range
            if (minValue <= 0 && maxValue >= 0 && !ticks.includes(0)) {
              ticks.push(0);
              ticks.sort((a, b) => a - b);
            }
            
            return ticks.slice(0, 8).map((tickValue, index) => { // Limit to max 8 ticks
              const yPos = scaleY(tickValue);
              const millions = tickValue / 1000000;
              const label = millions === 0 ? '$0' : 
                           millions > 0 ? `$${millions.toFixed(millions < 1 ? 1 : 0)}M` :
                           `-$${Math.abs(millions).toFixed(Math.abs(millions) < 1 ? 1 : 0)}M`;
              
              return (
                <g key={index}>
                  {/* Grid line */}
                  <line
                    x1="8"
                    y1={yPos}
                    x2="95"
                    y2={yPos}
                    stroke="rgba(156, 163, 175, 0.1)"
                    strokeWidth="0.1"
                    strokeDasharray="1,1"
                  />
                  {/* Y-axis tick mark */}
                  <line
                    x1="7.5"
                    y1={yPos}
                    x2="8.5"
                    y2={yPos}
                    stroke="rgb(156, 163, 175)"
                    strokeWidth="0.1"
                  />
                  {/* Y-axis label */}
                  <text
                    x="6"
                    y={yPos + 0.5}
                    fontSize="1.5"
                    fill="rgb(156, 163, 175)"
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                </g>
              );
            });
          })()}
          
          {/* X-axis tick marks */}
          {[0, 30, 60, 90, 120, 180, 270, 365].map((day) => (
            <line
              key={`x-tick-${day}`}
              x1={scaleX(day)}
              y1="55"
              x2={scaleX(day)}
              y2="55.5"
              stroke="rgb(156, 163, 175)"
              strokeWidth="0.1"
            />
          ))}
        </svg>
        
        {/* Chart labels and axis */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* X-axis labels (show key day markers) */}
          <div className="absolute bottom-1 left-0 right-0 text-xs text-gray-500">
            {[0, 30, 60, 90, 120, 180, 270, 365].map((day) => (
              <span key={day} style={{ position: 'absolute', left: `${scaleX(day)}%`, transform: 'translateX(-50%)', fontSize: '10px' }}>
                D{day}
              </span>
            ))}
          </div>
          
          {/* Break-even label */}
          {breakEvenDay >= minDay && breakEvenDay <= maxDay && (
            <div className="absolute text-green-400 font-medium" 
                 style={{ 
                   left: `${scaleX(breakEvenDay)}%`, 
                   top: '15%',
                   transform: 'translateX(-50%)',
                   fontSize: '10px'
                 }}>
              Break-even<br/>Day {breakEvenDay}
            </div>
          )}
          
          {/* Timeline marker labels */}
          {timelineMarkers.map((marker, index) => (
            <div key={index} 
                 className="absolute font-medium" 
                 style={{ 
                   left: `${scaleX(marker.day)}%`, 
                   top: `${20 + index * 6}%`,
                   transform: 'translateX(-50%)',
                   fontSize: '9px',
                   color: marker.type === 'launch' ? 'rgb(34, 197, 94)' :
                          marker.type === 'investment' ? 'rgb(147, 51, 234)' :
                          marker.type === 'hire' ? 'rgb(59, 130, 246)' :
                          'rgb(156, 163, 175)'
                 }}>
              {marker.label}
            </div>
          ))}
          
          {/* Strategic thresholds labels */}
          {decisionThresholds.map((threshold, index) => (
            <div key={index} 
                 className="absolute font-medium" 
                 style={{ 
                   left: `${scaleX(threshold.day)}%`, 
                   top: `${60 + index * 12}%`,
                   transform: 'translateX(-50%)',
                   fontSize: '9px',
                   color: threshold.type === 'optimal' ? 'rgb(34, 197, 94)' : 
                          threshold.type === 'conservative' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'
                 }}>
              {threshold.label}
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute top-2 right-2 bg-gray-800/90 border border-gray-600 rounded px-2 py-1" style={{ fontSize: '9px' }}>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-blue-400 mr-1"></div>
              <span className="text-gray-300">Revenue</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-red-400 mr-1"></div>
              <span className="text-gray-300">Total Costs</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-purple-400 mr-1 border-dashed border-t border-purple-400"></div>
              <span className="text-gray-300">Employee Costs</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-green-400 mr-1"></div>
              <span className="text-gray-300">Profit/Loss</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-1 bg-yellow-400/20 border border-yellow-400/40 mr-1"></div>
              <span className="text-gray-300">Pareto Frontier</span>
            </div>
            <div className="flex items-center">
              <div className="w-px h-2 bg-green-400 border-dashed mr-1"></div>
              <span className="text-gray-300">Milestones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5-Year Projections Chart with Market Saturation
interface FiveYearChartProps {
  data: Array<{
    day: number;
    revenue: number;
    costs: number;
    profit: number;
    companies: number;
    employeeCosts: number;
    marketPenetration: number;
    growthRate: number;
  }>;
  height?: number;
}

function FiveYearProjectionsChart({ data, height = 500 }: FiveYearChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxCosts = Math.max(...data.map(d => d.costs));
  const minProfit = Math.min(...data.map(d => d.profit));
  const maxProfit = Math.max(...data.map(d => d.profit));
  const maxPenetration = Math.max(...data.map(d => d.marketPenetration));
  
  // Calculate Y-axis range (left side for financial data)
  const maxValue = Math.max(maxRevenue, maxCosts, maxProfit) * 1.1;
  const minValue = Math.min(0, minProfit) * 1.2;
  const valueRange = maxValue - minValue;
  
  // Calculate Y-axis range (right side for market penetration)
  const maxPenetrationValue = Math.max(maxPenetration, 0.1) * 1.1;
  const penetrationRange = maxPenetrationValue;
  
  // Get the day range (5 years)
  const minDay = Math.min(...data.map(d => d.day));
  const maxDay = Math.max(...data.map(d => d.day));
  const dayRange = maxDay - minDay;
  
  // Scale functions
  const scaleY = (value: number) => 55 - ((value - minValue) / valueRange) * 50;
  const scaleYPenetration = (value: number) => 55 - (value / penetrationRange) * 50;
  const scaleX = (day: number) => ((day - minDay) / dayRange) * 87 + 8;

  // Sample data for cleaner paths (every 5 days for fine-grained detail)
  const sampledData = data.filter((d, i) => i % 5 === 0 || i === data.length - 1);

  // Generate path strings
  const revenuePath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.revenue)}`
  ).join(' ');
  
  const profitPath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleY(d.profit)}`
  ).join(' ');

  const penetrationPath = sampledData.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.day)} ${scaleYPenetration(d.marketPenetration)}`
  ).join(' ');

  const zeroY = scaleY(0);

  return (
    <div className="w-full">
      <div className="relative bg-gray-900/30 border border-gray-700 rounded-lg p-6" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          {/* Y-axis line */}
          <line
            x1="8"
            y1="5"
            x2="8"
            y2="55"
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
          />
          
          {/* X-axis line */}
          <line
            x1="8"
            y1="55"
            x2="95"
            y2="55"
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
          />
          
          {/* Zero line */}
          <motion.line
            x1="8"
            y1={zeroY}
            x2="95"
            y2={zeroY}
            stroke="rgb(156, 163, 175)"
            strokeWidth="0.1"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Revenue line */}
          <motion.path
            d={revenuePath}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          
          {/* Profit line */}
          <motion.path
            d={profitPath}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Market penetration line */}
          <motion.path
            d={penetrationPath}
            fill="none"
            stroke="rgb(147, 51, 234)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Year markers */}
          {[365, 730, 1095, 1460, 1825].map((yearDay, index) => (
            <motion.line
              key={`year-${index}`}
              x1={scaleX(yearDay)}
              y1="5"
              x2={scaleX(yearDay)}
              y2="55"
              stroke="rgb(156, 163, 175)"
              strokeWidth="0.1"
              strokeDasharray="2,2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
            />
          ))}

                    {/* Y-axis grid lines and labels (financial data) */}
          {(() => {
            const range = maxValue - minValue;
            const targetTickCount = 6;
            const roughStep = range / targetTickCount;
            const stepSizeInMillions = Math.ceil(roughStep / 1000000);
            const firstTickInMillions = Math.floor(minValue / 1000000);
            const lastTickInMillions = Math.ceil(maxValue / 1000000);
            
            const ticks = [];
            for (let millionValue = firstTickInMillions; millionValue <= lastTickInMillions; millionValue += Math.max(stepSizeInMillions, 1)) {
              const tickValue = millionValue * 1000000;
              if (tickValue >= minValue && tickValue <= maxValue) {
                ticks.push(tickValue);
              }
            }
            
            if (minValue <= 0 && maxValue >= 0 && !ticks.includes(0)) {
              ticks.push(0);
              ticks.sort((a, b) => a - b);
            }
            
            return ticks.slice(0, 8).map((tickValue, index) => {
              const yPos = scaleY(tickValue);
              const millions = tickValue / 1000000;
              const label = millions === 0 ? '$0' : 
                           millions > 0 ? `$${millions.toFixed(millions < 1 ? 1 : 0)}M` :
                           `-$${Math.abs(millions).toFixed(Math.abs(millions) < 1 ? 1 : 0)}M`;
              
              return (
                <g key={index}>
                  <line
                    x1="8"
                    y1={yPos}
                    x2="95"
                    y2={yPos}
                    stroke="rgba(156, 163, 175, 0.1)"
                    strokeWidth="0.1"
                    strokeDasharray="1,1"
                  />
                  {/* Y-axis tick mark */}
                  <line
                    x1="7.5"
                    y1={yPos}
                    x2="8.5"
                    y2={yPos}
                    stroke="rgb(156, 163, 175)"
                    strokeWidth="0.1"
                  />
                  <text
                    x="6"
                    y={yPos + 0.5}
                    fontSize="1.5"
                    fill="rgb(156, 163, 175)"
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                </g>
              );
            });
          })()}

          {/* Y-axis grid lines and labels (market penetration) */}
          {[0.01, 0.02, 0.03, 0.04, 0.05].map((penetration, index) => {
            const yPos = scaleYPenetration(penetration);
            const label = `${(penetration * 100).toFixed(1)}%`;
            
            return (
              <g key={`penetration-${index}`}>
                {/* Y-axis tick mark (right side) */}
                <line
                  x1="94.5"
                  y1={yPos}
                  x2="95.5"
                  y2={yPos}
                  stroke="rgb(147, 51, 234)"
                  strokeWidth="0.1"
                />
                <text
                  x="97"
                  y={yPos + 0.5}
                  fontSize="1.5"
                  fill="rgb(147, 51, 234)"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}
          
          {/* X-axis tick marks */}
          {[0, 365, 730, 1095, 1460, 1825].map((day) => (
            <line
              key={`x-tick-${day}`}
              x1={scaleX(day)}
              y1="55"
              x2={scaleX(day)}
              y2="55.5"
              stroke="rgb(156, 163, 175)"
              strokeWidth="0.1"
            />
          ))}
        </svg>
        
        {/* Chart labels and axis */}
        <div className="absolute inset-0 pointer-events-none">
          {/* X-axis labels (show yearly markers) */}
          <div className="absolute bottom-1 left-0 right-0 text-xs text-gray-500">
            {[0, 365, 730, 1095, 1460, 1825].map((day) => (
              <span key={day} style={{ position: 'absolute', left: `${scaleX(day)}%`, transform: 'translateX(-50%)', fontSize: '10px' }}>
                Y{Math.floor(day / 365)}
              </span>
            ))}
          </div>
          
          {/* Legend */}
          <div className="absolute top-2 right-2 bg-gray-800/90 border border-gray-600 rounded px-2 py-1" style={{ fontSize: '9px' }}>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-blue-400 mr-1"></div>
              <span className="text-gray-300">Revenue</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-green-400 mr-1"></div>
              <span className="text-gray-300">Profit</span>
            </div>
            <div className="flex items-center mb-0.5">
              <div className="w-2 h-px bg-purple-400 mr-1"></div>
              <span className="text-gray-300">Market Penetration</span>
            </div>
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-1 top-2 text-gray-400" style={{ fontSize: '10px' }}>
            Revenue/Profit
          </div>
          <div className="absolute right-1 top-2 text-purple-400" style={{ fontSize: '10px' }}>
            Market %
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinancialProjectionsSlide() {
  // Helper function to convert days to months (ceiling for display)
  const daysToMonths = (days: number) => Math.ceil(days / 30.44);
  
  // Calculate key dates and their day offsets from today
  const today = new Date();
  const developmentStartDays = (TIMELINE_MARKER_PARAMS.developmentStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const investmentDays = (TIMELINE_MARKER_PARAMS.investmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const launchDays = (TIMELINE_MARKER_PARAMS.launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate phase durations
  const prepPhaseDays = COMPUTED_VALUES.prepPhaseDays;
  const prepPhaseMonths = daysToMonths(prepPhaseDays);
  
  // Use daily cohorts directly instead of converting to monthly
  const dailyCohorts = baseProjections.cohorts;
  
  // Calculate daily financial data including costs and employee costs
  const dailyFinancialData = dailyCohorts.map((cohort) => {
    const day = cohort.daysFromToday; // Use correct property name
    const totalCompanies = cohort.totalCompanies;
    const infrastructureCost = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);
    
    // Calculate the actual date for this day (relative to today)
    const dayDate = new Date(today);
    dayDate.setDate(dayDate.getDate() + day);
    
    // Get employee costs for this date
    const employeeCostsResult = COMPUTED_VALUES.getEmployeeCostAtDate(dayDate, cohort.dailyRecurringRevenue * 30.44); // Convert daily to monthly for the function
    const employeeCosts = employeeCostsResult.totalCost / 30.44; // Convert monthly to daily
    
    // Variable costs only apply after launch (convert to daily)
    const variableCosts = day >= launchDays ? totalCompanies * infrastructureCost / 30.44 : 0;
    const totalCosts = employeeCosts + variableCosts;
    
    return {
      day,
      revenue: cohort.totalRevenue,
      costs: totalCosts,
      profit: cohort.totalRevenue - totalCosts,
      companies: totalCompanies,
      employeeCosts: employeeCosts
    };
  });

  // Filter daily data to start from D0 for the main graph
  const mainGraphData = dailyFinancialData.filter(d => d.day >= 0);

  // Generate 5-year projections data (extend beyond 365 days)
  const fiveYearData = dailyCohorts.filter(cohort => cohort.daysFromToday >= 0 && cohort.daysFromToday <= 365 * 5).map((cohort) => {
    const day = cohort.daysFromToday;
    const totalCompanies = cohort.totalCompanies;
    const infrastructureCost = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);
    
    // Calculate the actual date for this day (relative to today)
    const dayDate = new Date(today);
    dayDate.setDate(dayDate.getDate() + day);
    
    // Get employee costs for this date
    const employeeCostsResult = COMPUTED_VALUES.getEmployeeCostAtDate(dayDate, cohort.dailyRecurringRevenue * 30.44);
    const employeeCosts = employeeCostsResult.totalCost / 30.44;
    
    // Variable costs only apply after launch
    const variableCosts = day >= launchDays ? totalCompanies * infrastructureCost / 30.44 : 0;
    const totalCosts = employeeCosts + variableCosts;
    
    return {
      day,
      revenue: cohort.totalRevenue,
      costs: totalCosts,
      profit: cohort.totalRevenue - totalCosts,
      companies: totalCompanies,
      employeeCosts: employeeCosts,
      // Add market saturation metrics
      marketPenetration: totalCompanies / 1000000, // Assuming 1M total addressable market
      growthRate: day > 0 ? ((cohort.totalRevenue - (dailyCohorts.find(c => c.daysFromToday === day - 30)?.totalRevenue || 0)) / (dailyCohorts.find(c => c.daysFromToday === day - 30)?.totalRevenue || 1)) : 0
    };
  });

  // Find break-even day
  const breakEvenDay = mainGraphData.find(d => d.profit > 0)?.day || Math.round(launchDays + 30);

  // Convert timeline markers to days
  const timelineMarkers = COMPUTED_VALUES.getTimelineMarkers().map(marker => ({
    day: marker.daysFromToday,
    label: marker.label,
    type: marker.type,
    description: marker.description
  }));

  // Convert hire target dates to days for display
  const customerSuccessHireDays = (TIMELINE_MARKER_PARAMS.customerSuccessHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const marketingHireDays = (TIMELINE_MARKER_PARAMS.marketingHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const seniorDevHireDays = (TIMELINE_MARKER_PARAMS.seniorDevHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const salesHireDays = (TIMELINE_MARKER_PARAMS.salesHire.targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  // Strategic decision thresholds (converted to days)
  const decisionThresholds = [
    { day: 15 * 30.44, label: 'Aggressive\nTransition', type: 'aggressive' as const },
    { day: 18 * 30.44, label: 'Optimal\nTransition', type: 'optimal' as const },
    { day: 24 * 30.44, label: 'Conservative\nTransition', type: 'conservative' as const }
  ];

  // Find day 365 data for year 1 metrics
  const day365Data = mainGraphData.find(d => Math.abs(d.day - 365) < 5) || mainGraphData[mainGraphData.length - 1];
  
  // Calculate Day 365 MRR (convert daily revenue to monthly)
  const day365MRR = (day365Data?.revenue || 0) * 30.44;

  // Key metrics for cards using computed values
  const keyMetricsCards = [
    {
      label: 'Pre-Launch Burn',
      value: COMPUTED_VALUES.preLaunchBurnFormatted,
      color: 'red',
      description: `${(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * 2 / 1000).toFixed(0)}k dev + ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn * prepPhaseMonths / 1000).toFixed(0)}k prep`
    },
    {
      label: 'Break-even Day',
      value: `Day ${Math.round(breakEvenDay)}`,
      color: 'green',
      description: `${Math.round(breakEvenDay - investmentDays)} days after investment`
    },
    {
      label: 'Day 365 MRR',
      value: `$${(day365MRR / 1000000).toFixed(1)}M`,
      color: 'purple',
      description: `$${(day365MRR * 12 / 1000000).toFixed(1)}M ARR run rate`
    },
    {
      label: 'First Year ROI',
      value: `${((day365MRR * 12 - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount).toFixed(1)}x`,
      color: 'yellow',
      description: `Return on ${COMPUTED_VALUES.investmentAmountFormatted} investment`
    }
  ];

  const infrastructureCostPerCompany = calculateInfrastructureCostPerCompany(BASE_INFRASTRUCTURE_PARAMS);
  
  // Get employee costs for day 365
  const day365Date = new Date(today);
  day365Date.setDate(day365Date.getDate() + 365);
  const day365Revenue = day365Data?.revenue || 0;
  const day365EmployeeCosts = COMPUTED_VALUES.getEmployeeCostAtDate(day365Date, day365Revenue).totalCost;

  return (
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-6 text-center tracking-tight text-white">
          Daily Financial Projections & Milestone Timeline
        </h1>
        <p className="text-2xl text-blue-500 mb-12 text-center font-medium">
          {COMPUTED_VALUES.preLaunchBurnFormatted} pre-launch burn → $0 revenue at launch → ${(day365MRR / 1000000).toFixed(1)}M MRR by day 365
        </p>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <MetricCards metrics={keyMetricsCards} />
        </motion.div>

        {/* Advanced Financial Chart with Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-slate-700 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-400">DAILY REVENUE TRAJECTORY WITH INVESTMENT & HIRING MILESTONES</h2>
          
          <AdvancedFinancialChart 
            data={mainGraphData}
            paretoData={INFRASTRUCTURE_OPTIMIZATION.paretoFrontier}
            decisionThresholds={decisionThresholds}
            timelineMarkers={timelineMarkers}
            breakEvenDay={breakEvenDay}
            height={600}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investment Timeline */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Investment & Funding Timeline</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pre-Investment (Day {Math.round(developmentStartDays)} to {Math.round(investmentDays - 1)}):</strong> ${(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 1000).toFixed(0)}k/month contractor, bootstrapped development</p>
                <p><strong>Day {Math.round(investmentDays)}:</strong> {COMPUTED_VALUES.investmentAmountFormatted} investment received</p>
                <p><strong>Days {Math.round(investmentDays)} to {Math.round(launchDays - 1)}:</strong> Full preparation period - infrastructure setup, legal compliance, marketing materials</p>
                <p><strong>Day {Math.round(launchDays)}:</strong> Product launch with revenue generation beginning</p>
                <p><strong>Post-Investment:</strong> Founder salary ${((BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Founder Salary')?.monthlyCost || 0) / 1000).toFixed(0)}k/month + legal ${((BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Legal Counsel')?.monthlyCost || 0) / 1000).toFixed(0)}k/month + compliance ${((BASE_EMPLOYEE_PARAMS.employees.find(e => e.role === 'Compliance Specialist')?.monthlyCost || 0) / 1000).toFixed(0)}k/month</p>
                <p><strong>Daily Burn Rate:</strong> ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 30.44 / 1000).toFixed(1)}k/day during prep, ${(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 30.44 / 1000).toFixed(1)}k/day after launch</p>
                <p className="text-xs text-purple-300 mt-2">Investment provides runway for proper launch preparation. The {Math.round(prepPhaseDays)} days between investment and launch ensures infrastructure, legal, and go-to-market strategy are fully ready.</p>
              </div>
            </div>
            
            {/* Hiring Strategy */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Revenue-Driven Hiring Strategy</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Day {Math.round(customerSuccessHireDays)}:</strong> Customer Success at {formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold)}</p>
                <p><strong>Day {Math.round(marketingHireDays)}:</strong> Marketing Manager at {formatCurrency(TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold)}</p>
                <p><strong>Day {Math.round(seniorDevHireDays)}:</strong> Senior Developer at {formatCurrency(TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold)}</p>
                <p><strong>Day {Math.round(salesHireDays)}:</strong> Sales Manager at {formatCurrency(TIMELINE_MARKER_PARAMS.salesHire.mrrThreshold)}</p>
                <p className="text-xs text-blue-300 mt-2">Each hire triggered by MRR milestones ensuring revenue can support increased payroll. Conservative hiring approach maintains positive cash flow throughout growth phase.</p>
              </div>
            </div>
            
            {/* Cost Structure Evolution */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Daily Cost Structure Evolution</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Days -60 to -30:</strong> ${(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 30.44 / 1000).toFixed(1)}k/day contractor only = {(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * 2 / 1000).toFixed(0)}k total pre-investment burn</p>
                <p><strong>Day {Math.round(investmentDays)}:</strong> Investment received, costs jump to ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 30.44 / 1000).toFixed(1)}k/day</p>
                <p><strong>Days {Math.round(investmentDays)} to {Math.round(launchDays - 1)}:</strong> Full prep period at ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 30.44 / 1000).toFixed(1)}k/day ({Math.round(prepPhaseDays)} days dedicated to launch preparation)</p>
                <p><strong>Day {Math.round(launchDays)}:</strong> Launch! Costs increase to ${(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 30.44 / 1000).toFixed(1)}k/day, revenue begins</p>
                <p><strong>Day 365:</strong> ${(day365EmployeeCosts / 1000).toFixed(0)}k monthly employee costs + ${(infrastructureCostPerCompany * (day365Data?.companies || 0) / 1000).toFixed(0)}k infrastructure</p>
                <p><strong>Break-even achieved:</strong> Day {Math.round(breakEvenDay)} (Month {Math.round(breakEvenDay / 30.44)})</p>
                <p className="text-xs text-green-300 mt-2">Daily tracking shows precise cash flow dynamics. Employee costs scale predictably with revenue milestones.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5-Year Projections with Market Saturation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t-4 border-purple-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-400">5-YEAR PROJECTIONS & MARKET SATURATION ANALYSIS</h2>
          
          <FiveYearProjectionsChart 
            data={fiveYearData}
            height={500}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Saturation Analysis */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Market Saturation Dynamics</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Total Addressable Market:</strong> 1M+ companies forming annually in US</p>
                <p><strong>Year 1 Penetration:</strong> {((fiveYearData.find(d => d.day === 365)?.marketPenetration || 0) * 100).toFixed(2)}% market share</p>
                <p><strong>Year 5 Penetration:</strong> {((fiveYearData[fiveYearData.length - 1]?.marketPenetration || 0) * 100).toFixed(2)}% market share</p>
                <p><strong>Growth Trajectory:</strong> Exponential growth slowing as market matures</p>
                <p><strong>Market Ceiling:</strong> 5% penetration represents 50,000 companies/year</p>
                <p><strong>Competitive Moat:</strong> Network effects and switching costs increase over time</p>
              </div>
            </div>
            
            {/* 5-Year Financial Metrics */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Long-term Financial Performance</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Year 5 Revenue:</strong> ${(fiveYearData[fiveYearData.length - 1]?.revenue * 365 / 1000000).toFixed(1)}M annual</p>
                <p><strong>Year 5 Profit:</strong> ${(fiveYearData[fiveYearData.length - 1]?.profit * 365 / 1000000).toFixed(1)}M annual</p>
                <p><strong>Year 5 Companies:</strong> {(fiveYearData[fiveYearData.length - 1]?.companies || 0).toLocaleString()} active</p>
                <p><strong>Profit Margin:</strong> {(((fiveYearData[fiveYearData.length - 1]?.profit || 0) / (fiveYearData[fiveYearData.length - 1]?.revenue || 1)) * 100).toFixed(1)}% by year 5</p>
                <p><strong>Revenue Growth:</strong> Compound annual growth rate through infrastructure optimization</p>
                <p><strong>Path to Exit:</strong> Multiple strategic acquisition opportunities at scale</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-Stage Infrastructure Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t-4 border-gray-500 pt-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-300">THREE-STAGE INFRASTRUCTURE EVOLUTION</h2>
          
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              {
                stage: 'Stage 1: AWS Credits Active',
                timeline: 'Days 1-365',
                color: 'border-green-500',
                textColor: 'text-green-400',
                details: [
                  `Infrastructure cost: $0 (AWS credits cover ${(BASE_INFRASTRUCTURE_PARAMS.awsCreditsDaily * 365 / 1000000).toFixed(1)}M annually)`,
                  'SaaS gross margin: 94% (payment processing only)',
                  'Formation gross margin: 26% (state fees + KYC)',
                  `Break-even: Day ${Math.round(breakEvenDay)} at ${Math.round(dailyFinancialData.find(d => d.day === Math.round(breakEvenDay))?.companies || 0)} companies`,
                  'Profit machine: Every $ of revenue = $0.85 profit'
                ]
              },
              {
                stage: 'Stage 2: Paid Infrastructure Crisis',
                timeline: 'Days 366-730',
                color: 'border-yellow-500',
                textColor: 'text-yellow-400',
                details: [
                  `Infrastructure cost: ${formatCurrency(infrastructureCostPerCompany)}/company/month`,
                  `At 100k companies: ${(infrastructureCostPerCompany * 100000 / 1000000).toFixed(1)}M/month AWS spend`,
                  'Pricing increase required: $40 → $60 average',
                  'SaaS gross margin: 73% (post-pricing adjustment)',
                  'Transition planning window: Days 457-730'
                ]
              },
              {
                stage: 'Stage 3: Hybrid Self-Hosted',
                timeline: 'Day 731+',
                color: 'border-purple-500',
                textColor: 'text-purple-400',
                details: [
                  `CapEx investment: ${(BASE_INFRASTRUCTURE_PARAMS.selfHostingSetupCost / 1000000).toFixed(1)}M infrastructure setup`,
                  `Monthly savings: ${(infrastructureCostPerCompany * BASE_INFRASTRUCTURE_PARAMS.selfHostingSavingsRate * 100000 / 1000000).toFixed(1)}M vs AWS at 100k companies`,
                  'SaaS gross margin: 95% (optimized infrastructure)',
                  'Self-hosted capacity: 1M+ companies',
                  'Path to $100M ARR with <1% global market share'
                ]
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                className={`border-l-4 ${stage.color} pl-6`}
              >
                <h3 className={`text-xl font-bold mb-2 ${stage.textColor}`}>
                  {stage.stage}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{stage.timeline}</p>
                <div className="space-y-2">
                  {stage.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-xs text-gray-400">
                      • {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financial Modeling Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t-4 border-red-500 pt-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-400">FINANCIAL MODELING & MILESTONE ECONOMICS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Unit Economics Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Per-Company Daily Economics</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Formation Revenue:</strong> {formatCurrency(BASE_BUSINESS_PARAMS.formationFee)} (one-time)</p>
                  <p><strong>Monthly Subscription:</strong> {formatCurrency(BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate)} blended</p>
                  <p><strong>Daily Subscription:</strong> {formatCurrency((BASE_BUSINESS_PARAMS.basicTierPrice * (1 - BASE_BUSINESS_PARAMS.proTierAdoptionRate) + BASE_BUSINESS_PARAMS.proTierPrice * BASE_BUSINESS_PARAMS.proTierAdoptionRate) / 30.44)} per company</p>
                  <p><strong>Formation COGS:</strong> {formatCurrency(88.61)} (state fees + processing)</p>
                  <p><strong>Daily COGS:</strong> {formatCurrency(infrastructureCostPerCompany / 30.44)} (Stage 2)</p>
                  <p><strong>CAC per Company:</strong> {formatCurrency(baseCAC.cacPerCompany)}</p>
                  <p><strong>LTV per Company:</strong> {formatCurrency(baseLTV.blendedLtvPerCompany)}</p>
                  <p><strong>LTV/CAC Ratio:</strong> <span className="text-green-400">{(baseLTV.blendedLtvPerCompany / baseCAC.cacPerCompany).toFixed(1)}x</span></p>
                </div>
              </div>
            </div>
            
            {/* Investment Timeline Economics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Investment Timeline Economics</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-300">
                   <p><strong>Pre-Investment:</strong> ${(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 30.44 / 1000).toFixed(1)}k/day burn rate</p>
                   <p><strong>Investment Timing:</strong> Day {Math.round(investmentDays)} (after 60 days development)</p>
                   <p><strong>Post-Investment:</strong> ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 30.44 / 1000).toFixed(1)}k/day base burn + revenue-driven hires</p>
                   <p><strong>Hire Triggers:</strong> MRR milestones ensure affordability</p>
                   <p><strong>Day 365 Burn:</strong> ${(day365EmployeeCosts / 1000).toFixed(0)}k/month total employee costs</p>
                   <p><strong>Cash Flow:</strong> Positive from Day {Math.round(breakEvenDay)} onwards</p>
                   <p><strong>Investment Efficiency:</strong> <span className="text-green-400">{(((day365Data?.revenue || 0) * 12 - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount).toFixed(0)}x first year return</span></p>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Infrastructure Cost Evolution */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Timeline-Based Strategic Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-green-300 mb-2">Launch Strategy (Days {Math.round(investmentDays)}-{Math.round(launchDays + 30)})</p>
                <p>Investment received Day {Math.round(investmentDays)} after 60 days bootstrapped development. Focus on proving product-market fit before major investment. Marketing spend drives viral growth. Break-even achieved Day {Math.round(breakEvenDay)} validates business model before scaling costs.</p>
              </div>
              <div>
                <p className="font-semibold text-purple-300 mb-2">Investment Strategy (Days {Math.round(launchDays)}-365)</p>
                <p>{COMPUTED_VALUES.investmentAmountFormatted} received Day {Math.round(investmentDays)} reduces investor risk. Founder salary allows full-time focus. Legal/compliance hires ensure scalable operations. Revenue-driven hiring ensures each new employee is affordable based on MRR growth.</p>
              </div>
              <div>
                <p className="font-semibold text-blue-300 mb-2">Scaling Strategy (Day 365+)</p>
                <p>Infrastructure transition planning begins Day 457. Each hire adds specific capabilities tied to revenue milestones. Operating leverage improves as fixed costs are spread across growing revenue base. Path to profitability at scale demonstrated.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700"
        >
          <div className="text-sm text-gray-400 space-y-3">
            <p><strong>Daily Precision Strategy:</strong> Day {Math.round(investmentDays)} investment provides capital after 60 days of bootstrapped development. Pre-launch burn totals {COMPUTED_VALUES.preLaunchBurnFormatted} (contractor only). Days {Math.round(investmentDays)} to {Math.round(launchDays - 1)} are entirely dedicated to launch preparation ({Math.round(prepPhaseDays)} days), ensuring all systems are ready: formation APIs tested, legal compliance verified, marketing materials prepared, and initial content created.</p>
            
            <p><strong>Revenue-Driven Hiring Model:</strong> Each hire triggered by specific MRR milestones ensuring affordability: Customer Success at {formatCurrency(TIMELINE_MARKER_PARAMS.customerSuccessHire.mrrThreshold)} (Day {Math.round(customerSuccessHireDays)}), Marketing at {formatCurrency(TIMELINE_MARKER_PARAMS.marketingHire.mrrThreshold)} (Day {Math.round(marketingHireDays)}), Senior Developer at {formatCurrency(TIMELINE_MARKER_PARAMS.seniorDevHire.mrrThreshold)} (Day {Math.round(seniorDevHireDays)}). This conservative approach maintains positive cash flow throughout scaling.</p>
            
            <p><strong>Daily Cost Evolution:</strong> Pre-investment costs limited to ${(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn / 30.44 / 1000).toFixed(1)}k/day contractor for 60 days. Post-investment jumps to ${(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn / 30.44 / 1000).toFixed(1)}k/day base (founder + legal + compliance) during days {Math.round(investmentDays)} to {Math.round(launchDays - 1)} prep period, then ${(BURN_RATE_CALCULATIONS.postLaunchBaseBurn / 30.44 / 1000).toFixed(1)}k/day at launch (day {Math.round(launchDays)}) adding marketing. Revenue starts at $0 on launch day and quickly scales to cover costs. Break-even achieved by Day {Math.round(breakEvenDay)} despite initial burn period.</p>
            
            <p><strong>Financial Model Validation:</strong> Daily tracking demonstrates sustainable path to ${(day365MRR * 12 / 1000000).toFixed(1)}M year 1 ARR even with 60 days of pre-revenue burn. Total pre-revenue investment: {COMPUTED_VALUES.preLaunchBurnFormatted} ({(BURN_RATE_CALCULATIONS.preLaunchMonthlyBurn * 2 / 1000).toFixed(0)}k pre-investment + {(BURN_RATE_CALCULATIONS.postInvestmentPreLaunchBurn * prepPhaseMonths / 1000).toFixed(0)}k prep). Investment ROI exceeds {((day365MRR * 12 - BASE_INVESTMENT_PARAMS.requestedInvestmentAmount) / BASE_INVESTMENT_PARAMS.requestedInvestmentAmount).toFixed(1)}x in first year.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 