import React, { useState } from 'react';
import { LineChart, TrendingUp, AlertTriangle, Info, Clock, Activity, Wind } from 'lucide-react';

export default function DoseResponseModule({
  concentration,
  exposureTime,
  estimatedDose,
  isSimulating
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Generate 17 points from t = 0 to 8 hours (step 0.5h)
  const totalHours = 8.0;
  const numSteps = 17;
  const points = [];

  for (let i = 0; i < numSteps; i++) {
    const t = Number((i * 0.5).toFixed(1));
    // Simulated concentration: baseline concentration with slight realistic variance if beyond active time
    const c = concentration;
    // Cumulative exposure = concentration * t * 1.1578 scaling constant
    const dose = Number((c * t * 2.793).toFixed(1));

    // Optical color interpolation for that dose
    const norm = Math.min(1.0, dose / 50.0);
    const color = getDoseColor(norm);

    points.push({
      time: t,
      concentration: c,
      dose,
      norm,
      color,
      isElapsed: t <= exposureTime
    });
  }

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 160;
  const pad = { top: 20, right: 30, bottom: 25, left: 45 };
  const w = svgWidth - pad.left - pad.right;
  const h = svgHeight - pad.top - pad.bottom;

  // Scales
  const maxConc = 10; // ppm
  const maxDose = 60; // ppm·hr

  // Coordinate mappers
  const getX = (t) => pad.left + (t / totalHours) * w;
  const getYConc = (c) => pad.top + h - (c / maxConc) * h;
  const getYDose = (d) => pad.top + h - (Math.min(maxDose, d) / maxDose) * h;

  // Build SVG path for Concentration vs Time
  const concPathD = points.reduce((acc, p, idx) => {
    const x = getX(p.time);
    const y = getYConc(p.concentration);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Build SVG path for Cumulative Dose vs Time
  const dosePathD = points.reduce((acc, p, idx) => {
    const x = getX(p.time);
    const y = getYDose(p.dose);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Current active simulation cursor X
  const activeX = getX(Math.min(totalHours, exposureTime));

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points.find((p) => Math.abs(p.time - exposureTime) < 0.3) || points[points.length - 1];

  return (
    <div className="panel-card" style={{ padding: '22px' }}>
      {/* Module Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={22} color="#1e60db" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              Dose Response Analytics (Synchronized Kinetic Curves)
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
            Dual synchronized curves tracking instantaneous gas concentration $C(t)$ vs integrated cumulative exposure $D(t)$.
          </p>
        </div>

        {/* Simplified Simulation Model Notice */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', color: '#475569', textAlign: 'right' }}>
          <div>Model: <strong>$D(t) \approx \int C(\tau)d\tau$</strong></div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Simplified Simulation • Not Validated Hardware</div>
        </div>
      </div>

      {/* Two Synchronized Graphs Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '14px' }}>
        {/* Graph 1: H2S Concentration vs Time */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
              1. H₂S Concentration vs Time
            </span>
            <span style={{ fontSize: '11px', color: '#1e60db', fontFamily: 'var(--font-mono)' }}>
              Current: {concentration} ppm
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '170px' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Grid Lines */}
              {[0, 2.5, 5.0, 7.5, 10].map((v) => {
                const y = getYConc(v);
                return (
                  <g key={v}>
                    <line x1={pad.left} y1={y} x2={svgWidth - pad.right} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
                  </g>
                );
              })}

              {/* X-axis labels */}
              {[0, 2, 4, 6, 8].map((t) => (
                <text key={t} x={getX(t)} y={svgHeight - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">{t}h</text>
              ))}

              {/* Concentration Curve */}
              <path d={concPathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

              {/* Active Simulation Marker Line */}
              <line x1={activeX} y1={pad.top} x2={activeX} y2={pad.top + h} stroke="#1e60db" strokeWidth="2" strokeDasharray="4 2" />

              {/* Interactive Points */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={getX(p.time)}
                  cy={getYConc(p.concentration)}
                  r={hoveredIndex === i ? 5 : 3}
                  fill={hoveredIndex === i ? '#1e60db' : '#38bdf8'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Graph 2: Cumulative Exposure Dose vs Time */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
              2. Cumulative Exposure Dose vs Time
            </span>
            <span style={{ fontSize: '11px', color: '#059669', fontFamily: 'var(--font-mono)' }}>
              Current: {estimatedDose} ppm·hr
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '170px' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Threshold Zones Background */}
              {/* High Zone (>30 ppm·hr) */}
              <rect x={pad.left} y={pad.top} width={w} height={getYDose(30) - pad.top} fill="rgba(239, 68, 68, 0.06)" />
              {/* Moderate Zone (10-30 ppm·hr) */}
              <rect x={pad.left} y={getYDose(30)} width={w} height={getYDose(10) - getYDose(30)} fill="rgba(245, 158, 11, 0.08)" />
              {/* Low Zone (<10 ppm·hr) */}
              <rect x={pad.left} y={getYDose(10)} width={w} height={pad.top + h - getYDose(10)} fill="rgba(16, 185, 129, 0.08)" />

              {/* Threshold Line: High (30 ppm·hr) */}
              <line x1={pad.left} y1={getYDose(30)} x2={svgWidth - pad.right} y2={getYDose(30)} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
              <text x={svgWidth - pad.right + 2} y={getYDose(30) + 3} fontSize="8" fill="#dc2626" fontWeight="700">High</text>

              {/* Threshold Line: Moderate (10 ppm·hr) */}
              <line x1={pad.left} y1={getYDose(10)} x2={svgWidth - pad.right} y2={getYDose(10)} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
              <text x={svgWidth - pad.right + 2} y={getYDose(10) + 3} fontSize="8" fill="#d97706" fontWeight="700">Mod</text>

              {/* Grid Lines */}
              {[0, 20, 40, 60].map((v) => {
                const y = getYDose(v);
                return (
                  <g key={v}>
                    <line x1={pad.left} y1={y} x2={svgWidth - pad.right} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
                  </g>
                );
              })}

              {/* X-axis labels */}
              {[0, 2, 4, 6, 8].map((t) => (
                <text key={t} x={getX(t)} y={svgHeight - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">{t}h</text>
              ))}

              {/* Dose Curve */}
              <path d={dosePathD} fill="none" stroke="#1e60db" strokeWidth="2.5" strokeLinecap="round" />

              {/* Active Simulation Marker Line */}
              <line x1={activeX} y1={pad.top} x2={activeX} y2={pad.top + h} stroke="#1e60db" strokeWidth="2" strokeDasharray="4 2" />

              {/* Interactive Points with Color Fill */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={getX(p.time)}
                  cy={getYDose(p.dose)}
                  r={hoveredIndex === i ? 6 : 3.5}
                  fill={p.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Synchronized Hover Telemetry Readout */}
      {activePoint && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Time: <strong>{activePoint.time} hrs</strong></span>
            <span>Simulated Concentration: <strong>{activePoint.concentration} ppm</strong></span>
            <span>Accumulated Dose: <strong style={{ color: '#1e60db' }}>{activePoint.dose} ppm·hr</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#64748b' }}>Sensor Color Value:</span>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '3px',
                backgroundColor: activePoint.color,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600 }}>
              {activePoint.color}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function getDoseColor(t) {
  const clamped = Math.max(0, Math.min(1, t));
  let r, g, b;
  if (clamped <= 0.5) {
    const factor = clamped / 0.5;
    r = Math.round(215 + factor * (122 - 215));
    g = Math.round(195 + factor * (77 - 195));
    b = Math.round(168 + factor * (37 - 168));
  } else {
    const factor = (clamped - 0.5) / 0.5;
    r = Math.round(122 + factor * (26 - 122));
    g = Math.round(77 + factor * (16 - 77));
    b = Math.round(37 + factor * (9 - 37));
  }
  return `rgb(${r}, ${g}, ${b})`;
}
