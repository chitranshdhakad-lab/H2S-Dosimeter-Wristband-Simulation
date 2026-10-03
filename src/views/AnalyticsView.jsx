import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import DoseResponseModule from '../components/DoseResponseModule.jsx';

export default function AnalyticsView({
  concentration = 2.4,
  exposureTime = 3.7,
  estimatedDose = 24.8,
  isSimulating = false
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={22} color="#1e60db" />
          Occupational Health & Dosimetry Analytics
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
          Simulated trend analysis across 4 refinery sectors. OSHA 8-hr TWA compliance monitoring.
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Shift Compliance Rate</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>94.2%</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Within OSHA 10 ppm TWA Limit</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Mean Collective Dose</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>18.4 ppm·hr</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Average per active wristband</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Excursion Incidents</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b', marginTop: '4px' }}>2 Cases</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Investigated in Wastewater Unit</div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Departmental Exposure Distribution (Simulated)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { dept: 'Desulfurization Unit B', avgDose: 24.8, maxDose: 32.1, count: 18, color: '#f59e0b', pct: 62 },
            { dept: 'Wastewater Treatment Pit', avgDose: 38.2, maxDose: 46.8, count: 12, color: '#ef4444', pct: 85 },
            { dept: 'Catalytic Cracker Complex', avgDose: 14.5, maxDose: 19.8, count: 24, color: '#10b981', pct: 36 },
            { dept: 'Control Room & Perimeter', avgDose: 6.8, maxDose: 9.1, count: 30, color: '#10b981', pct: 17 }
          ].map((d) => (
            <div key={d.dept} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ fontWeight: 600 }}>{d.dept}</span>
                <span style={{ color: '#64748b' }}>Avg: <strong>{d.avgDose} ppm·hr</strong> (Peak: {d.maxDose})</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${d.pct}%`, height: '100%', backgroundColor: d.color, borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synchronized Dose Response Curves */}
      <DoseResponseModule
        concentration={concentration}
        exposureTime={exposureTime}
        estimatedDose={estimatedDose}
        isSimulating={isSimulating}
      />
    </div>
  );
}
