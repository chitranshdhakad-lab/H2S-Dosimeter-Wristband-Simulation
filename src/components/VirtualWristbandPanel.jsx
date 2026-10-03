import React from 'react';
import { Eye } from 'lucide-react';

export default function VirtualWristbandPanel({
  stripColor,
  estimatedDose,
  normalizedDose,
  isExpired
}) {
  // 5 Calibrated Reference Scale steps
  const referenceSteps = [
    { label: '0', color: '#d5c2a5', desc: '0 ppm·hr' },
    { label: '10', color: '#ba9266', desc: '10 ppm·hr' },
    { label: '25', color: '#8b5d32', desc: '25 ppm·hr' },
    { label: '50', color: '#5a3618', desc: '50 ppm·hr' },
    { label: '100+', color: '#1f130b', desc: '100+ ppm·hr' }
  ];

  return (
    <div className="panel-card" style={{ position: 'relative' }}>
      <div className="panel-header">
        <Eye size={20} className="panel-icon" />
        <h3 className="panel-title">Virtual Wristband (Simulated)</h3>
      </div>
      <p className="panel-subtitle">
        Physical simulation representation showing calibrated sensor strip response.
      </p>

      {/* Wristband Representation Container */}
      <div className="wristband-display-area">
        <div className="wristband-image-frame">
          {/* Base 3D Wristband Render */}
          <img
            src="/assets/h2s_wristband.jpg"
            alt="Virtual H2S Dosimeter Wristband Simulation"
            className="wristband-img"
          />

          {/* Dynamic Chemical Sensor Strip Overlay */}
          <div
            className="wristband-dynamic-strip"
            style={{
              backgroundColor: stripColor,
              filter: `contrast(${1 + normalizedDose * 0.2}) brightness(${1 - normalizedDose * 0.15})`
            }}
            title={`Active Simulated Sensor Strip: ${estimatedDose} ppm·hr`}
          />
        </div>

        {/* Engineering Prototype Callout Annotations */}
        <div className="wristband-annotations">
          {/* Annotation 1: Sensor Strip */}
          <div className="annotation-item" style={{ maxWidth: '140px' }}>
            <div className="annotation-arrow">↑</div>
            <div className="annotation-label">Sensor Strip</div>
            <div className="annotation-sub">(simulated color change)</div>
            <div
              style={{
                width: '32px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: stripColor,
                border: '1px solid rgba(0,0,0,0.2)',
                marginTop: '4px'
              }}
              title="Current strip color"
            />
          </div>

          {/* Annotation 2: Reference Scale */}
          <div className="annotation-item" style={{ maxWidth: '160px' }}>
            <div className="annotation-arrow">↑</div>
            <div className="annotation-label">Reference Scale</div>
            <div className="annotation-sub">5 Calibrated Steps</div>
            <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
              {referenceSteps.map((step) => (
                <div
                  key={step.label}
                  style={{
                    width: '9px',
                    height: '9px',
                    backgroundColor: step.color,
                    borderRadius: '1px',
                    border: '1px solid rgba(0,0,0,0.15)'
                  }}
                  title={`${step.desc}`}
                />
              ))}
            </div>
          </div>

          {/* Annotation 3: Expiry Patch */}
          <div className="annotation-item" style={{ maxWidth: '140px' }}>
            <div className="annotation-arrow">↑</div>
            <div className="annotation-label">Expiry Patch</div>
            <div className="annotation-sub">(validity indicator)</div>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: isExpired ? '#94a3b8' : '#f497a6',
                border: '1px solid rgba(0,0,0,0.2)',
                marginTop: '4px'
              }}
              title={isExpired ? 'EXPIRED' : 'VALID'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
