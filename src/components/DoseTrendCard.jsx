import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function DoseTrendCard({ trendData }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG Chart Dimensions
  const width = 360;
  const height = 140;
  const padding = { top: 15, right: 20, bottom: 25, left: 35 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxDose = 60; // Max Y-scale

  // Compute Coordinates
  const points = trendData.map((d, index) => {
    const x = padding.left + (index / (trendData.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.dose / maxDose) * chartHeight;
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className="panel-card">
      <div className="panel-header">
        <TrendingUp size={20} className="panel-icon" />
        <h3 className="panel-title">Dose Trend (Simulation)</h3>
      </div>

      <div className="chart-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="dose-svg-chart"
          preserveAspectRatio="none"
        >
          {/* Horizontal Grid lines and Y-axis labels */}
          {[0, 20, 40, 60].map((val) => {
            const y = padding.top + chartHeight - (val / maxDose) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  className="chart-grid-line"
                />
                <text
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="chart-axis-text"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Y-axis label */}
          <text
            x={10}
            y={height / 2}
            transform={`rotate(-90 10 ${height / 2})`}
            textAnchor="middle"
            className="chart-axis-text"
            style={{ fontSize: '8.5px', fill: '#64748b' }}
          >
            Dose (ppm·hr)
          </text>

          {/* X-axis date labels */}
          {points.map((p) => (
            <text
              key={p.date}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              className="chart-axis-text"
            >
              {p.date}
            </text>
          ))}

          {/* Trend Line Curve */}
          <path d={pathD} className="chart-curve" />

          {/* Interactive Data Points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoveredPoint?.date === p.date ? 5.5 : 3.5}
              className="chart-point"
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: `${hoveredPoint.y - 42}px`,
              left: `${hoveredPoint.x - 45}px`,
              background: '#0f172a',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 600,
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap'
            }}
          >
            <div>{hoveredPoint.date}: <strong>{hoveredPoint.dose} ppm·hr</strong></div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>{hoveredPoint.workers} badges analyzed</div>
          </div>
        )}
      </div>
    </div>
  );
}
