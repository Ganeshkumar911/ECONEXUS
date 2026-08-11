import React from 'react';
import { WasteTrackingData } from '../types';

interface Props {
  data: WasteTrackingData[];
}

// Simple SVG bar chart showing total waste per year
const YearlyWasteChart: React.FC<Props> = ({ data }) => {
  // Aggregate totals per year
  const totalsByYear: Record<string, number> = {};
  data.forEach(d => {
    const year = d.date?.split('-')?.[0] || 'Unknown';
    const total = (d.recyclable || 0) + (d.compostable || 0) + (d.hazardous || 0) + (d.landfill || 0);
    totalsByYear[year] = (totalsByYear[year] || 0) + total;
  });

  const years = Object.keys(totalsByYear).sort();
  const values = years.map(y => totalsByYear[y]);
  const max = Math.max(...values, 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Yearly Waste (kg)</h3>
      {years.length === 0 ? (
        <p className="text-gray-600">No data available to render chart.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <svg width={Math.max(300, years.length * 80)} height={220}>
            {/* axis labels */}
            <line x1={40} y1={10} x2={40} y2={180} stroke="#e5e7eb" />
            {years.map((year, i) => {
              const val = totalsByYear[year];
              const barHeight = (val / max) * 140; // scale to 140px
              const x = 60 + i * 80;
              const y = 170 - barHeight;
              return (
                <g key={year}>
                  <rect x={x} y={y} width={40} height={barHeight} fill="#10b981" rx={4} />
                  <text x={x + 20} y={186} fontSize={12} textAnchor="middle" fill="#374151">{year}</text>
                  <text x={x + 20} y={y - 6} fontSize={12} textAnchor="middle" fill="#111827">{val.toFixed(1)}</text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};

export default YearlyWasteChart;
