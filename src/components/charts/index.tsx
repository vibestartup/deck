import { motion } from 'framer-motion';

// Line Chart Component for Growth Trajectories
export interface LineChartProps {
  data: Array<{
    label: string;
    value: number;
    formatValue?: (value: number) => string;
  }>;
  title?: string;
  color?: string;
  height?: number;
}

export function LineChart({ data, title, color = 'blue', height = 200 }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.polyline
            fill="none"
            stroke={`var(--color-${color}-400)`}
            strokeWidth="0.5"
            points={points}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 80;
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="1"
                fill={`var(--color-${color}-400)`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-end justify-between text-xs text-gray-400">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className={`text-${color}-400 font-semibold`}>
                {item.formatValue ? item.formatValue(item.value) : item.value}
              </span>
              <span className="mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Data Table Component for Metrics and Comparisons
export interface DataTableProps {
  data: Array<Record<string, string | number>>;
  columns: Array<{
    key: string;
    label: string;
    format?: (value: string | number) => string;
    align?: 'left' | 'center' | 'right';
    color?: string;
  }>;
  title?: string;
  zebra?: boolean;
}

export function DataTable({ data, columns, title, zebra = true }: DataTableProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="overflow-hidden border border-gray-700 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-sm font-semibold text-gray-300 ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                className={zebra && rowIndex % 2 === 1 ? 'bg-gray-900/50' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-sm ${
                      column.color ? `text-${column.color}-400` : 'text-gray-300'
                    } ${
                      column.align === 'center' ? 'text-center' : 
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {column.format ? column.format(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Metric Cards Component for Key Statistics
export interface MetricCardProps {
  metrics: Array<{
    label: string;
    value: string;
    change?: string;
    color?: string;
    description?: string;
  }>;
  title?: string;
}

export function MetricCards({ metrics, title }: MetricCardProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-900/50 border border-gray-700 rounded-lg p-4"
          >
            <div className={`text-2xl font-bold ${metric.color ? `text-${metric.color}-400` : 'text-blue-400'} mb-1`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
            {metric.change && (
              <div className="text-xs text-green-400">{metric.change}</div>
            )}
            {metric.description && (
              <div className="text-xs text-gray-500 mt-2">{metric.description}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Bar Chart Component for Comparisons
export interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  title?: string;
  horizontal?: boolean;
  height?: number;
}

export function BarChart({ data, title, horizontal = false, height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="flex" style={{ height: `${height}px` }}>
        {horizontal ? (
          <div className="flex flex-col justify-between w-full space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-400 text-right">{item.label}</div>
                <div className="flex-1 bg-gray-800 rounded-full h-6 relative">
                  <motion.div
                    className={`h-full rounded-full ${item.color ? `bg-${item.color}-400` : 'bg-blue-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-end justify-between w-full space-x-2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`w-8 ${item.color ? `bg-${item.color}-400` : 'bg-blue-400'} rounded-t`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * (height - 60)}px` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
                <div className="text-xs text-gray-400 mt-2 text-center">{item.label}</div>
                <div className={`text-xs font-semibold ${item.color ? `text-${item.color}-400` : 'text-blue-400'}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Progress Timeline Component
export interface TimelineProps {
  stages: Array<{
    title: string;
    period: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    color?: string;
  }>;
  title?: string;
}

export function Timeline({ stages, title }: TimelineProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative flex items-start mb-8"
          >
            <div className={`
              relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2
              ${stage.status === 'completed' ? 'bg-green-500 border-green-500' :
                stage.status === 'current' ? 'bg-blue-500 border-blue-500' :
                'bg-gray-700 border-gray-600'}
            `}>
              {stage.status === 'completed' && <span className="text-white text-xs">✓</span>}
              {stage.status === 'current' && <span className="text-white text-xs">●</span>}
            </div>
            <div className="ml-6">
              <h4 className={`text-lg font-semibold ${
                stage.status === 'completed' ? 'text-green-400' :
                stage.status === 'current' ? 'text-blue-400' :
                'text-gray-400'
              }`}>
                {stage.title}
              </h4>
              <p className="text-sm text-gray-500 mb-2">{stage.period}</p>
              <p className="text-sm text-gray-300">{stage.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Pie Chart Component for Market Segmentation
export interface PieChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
    percentage?: number;
  }>;
  title?: string;
  size?: number;
}

export function PieChart({ data, title, size = 300 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    
    cumulativeAngle += angle;

    // Calculate path for the segment
    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;
    
    const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      ...item,
      percentage,
      pathData,
      color: item.color || `hsl(${index * 60}, 70%, 50%)`,
      startAngle,
      endAngle
    };
  });

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {segments.map((segment, index) => (
                <motion.path
                  key={index}
                  d={segment.pathData}
                  fill={`var(--color-${segment.color}-400)` || segment.color}
                  stroke="rgb(31 41 55)"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="hover:brightness-110 transition-all duration-300"
                />
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col space-y-3">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div 
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: `var(--color-${segment.color}-400)` || segment.color }}
                />
                <div>
                  <span className="text-sm font-medium text-gray-300">{segment.label}</span>
                  <div className="text-xs text-gray-500">
                    ${segment.value}B ({segment.percentage.toFixed(1)}%)
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 