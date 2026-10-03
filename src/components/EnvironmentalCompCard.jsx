import React from 'react';
import { Settings2, Check } from 'lucide-react';

export default function EnvironmentalCompCard({
  rawColorVal,
  correctedColorVal
}) {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <Settings2 size={20} className="panel-icon" />
        <h3 className="panel-title">Environmental Compensation</h3>
      </div>

      <div className="comp-grid">
        {/* Left Column: Color Numerical Values */}
        <div className="comp-col">
          <div>
            <div className="comp-metric-label">Raw Color Value</div>
            <div className="comp-metric-val">{rawColorVal}</div>
          </div>

          <div>
            <div className="comp-metric-label">Corrected Value</div>
            <div className="comp-metric-val">{correctedColorVal}</div>
          </div>
        </div>

        {/* Right Column: Correction Flags */}
        <div className="comp-col">
          <div>
            <div className="comp-metric-label">Temperature Correction</div>
            <div className="comp-status-applied">
              <span>Applied</span>
              <Check size={16} strokeWidth={2.8} />
            </div>
          </div>

          <div>
            <div className="comp-metric-label">Humidity Correction</div>
            <div className="comp-status-applied">
              <span>Applied</span>
              <Check size={16} strokeWidth={2.8} />
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory subtitle / physics formula tag */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid #f1f5f9',
          fontSize: '11px',
          color: '#94a3b8'
        }}
      >
        Arrhenius $k(T)$ gas diffusion & RH Langmuir isotherm applied.
      </div>
    </div>
  );
}
