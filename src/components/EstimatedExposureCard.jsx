import React from 'react';
import { BarChart2, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function EstimatedExposureCard({
  estimatedDose,
  confidence,
  normalizedDose,
  alertTitle,
  alertDesc,
  alertType
}) {
  const fillPercent = Math.min(100, Math.round(normalizedDose * 100));

  return (
    <div className="panel-card">
      <div className="panel-header">
        <BarChart2 size={20} className="panel-icon" />
        <h3 className="panel-title">Estimated Cumulative Exposure</h3>
      </div>

      <div className="exposure-gauge-container">
        {/* Main Dose Display */}
        <div className="exposure-value-display">
          <div className="exposure-main-dose">{estimatedDose} ppm·hr</div>
          <div className="exposure-sub-label">Estimated dose (simulation)</div>
        </div>

        {/* Confidence Percentage */}
        <div className="confidence-row">
          <span>Confidence</span>
          <span className="confidence-val">{confidence}%</span>
        </div>

        {/* Dose Progress Bar */}
        <div className="dose-progress-bar">
          <div
            className="dose-progress-fill"
            style={{ width: `${Math.max(5, fillPercent)}%` }}
          />
        </div>

        {/* Status Alert Banner */}
        <div className={`alert-banner alert-${alertType}`}>
          {alertType === 'safe' && (
            <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0, marginTop: '1px' }} />
          )}
          {alertType === 'warning' && (
            <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '1px' }} />
          )}
          {alertType === 'danger' && (
            <ShieldAlert size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: '1px' }} />
          )}
          <div>
            <div className="alert-title">{alertTitle}</div>
            <div style={{ fontSize: '11px', marginTop: '2px', opacity: 0.9 }}>
              {alertDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
