import React, { useState } from 'react';
import { Camera, CheckCircle2, Scan, Check, Crosshair } from 'lucide-react';
import { PREDEFINED_BADGES } from './InteractiveScanner.jsx';

export default function ScanAnalysisPanel({
  cielab,
  stripColor,
  estimatedDose,
  onScanComplete,
  onBadgeSelected
}) {
  const [selectedBadge, setSelectedBadge] = useState(PREDEFINED_BADGES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [analysisComplete, setAnalysisComplete] = useState(true);

  const SCAN_STAGES = [
    'Detecting wristband →',
    'Detecting sensor strip →',
    'Detecting reference scale →',
    'Checking lighting →',
    'Applying color correction →',
    'Estimating cumulative dose →',
    'Generating confidence band'
  ];

  const handleSelectPreset = (badge) => {
    setSelectedBadge(badge);
    setAnalysisComplete(false);
    if (onBadgeSelected) onBadgeSelected(badge);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    setAnalysisComplete(false);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < SCAN_STAGES.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setAnalysisComplete(true);
        if (onScanComplete) onScanComplete(selectedBadge);
      }
    }, 360); // 7 * 360ms ≈ 2.52s
  };

  return (
    <div className="panel-card">
      <div className="panel-header">
        <Camera size={20} className="panel-icon" />
        <h3 className="panel-title">Scan & Analysis</h3>
      </div>
      <p className="panel-subtitle">
        Optical colorimetry camera capture and dose model extraction.
      </p>

      {/* Selectable Predefined Badge Bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {PREDEFINED_BADGES.slice(0, 4).map((b) => (
          <button
            key={b.id}
            onClick={() => handleSelectPreset(b)}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: selectedBadge.id === b.id ? '1px solid #1e60db' : '1px solid #e2e8f0',
              background: selectedBadge.id === b.id ? '#eff6ff' : '#ffffff',
              color: selectedBadge.id === b.id ? '#1e60db' : '#475569',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {b.short}
          </button>
        ))}
      </div>

      {/* Prominent Scan Action Button */}
      <button
        className="btn-scan-action"
        onClick={handleTriggerScan}
        disabled={isScanning}
      >
        <Camera size={18} />
        {isScanning ? 'ANALYZING WRISTBAND...' : 'SCAN WRISTBAND'}
      </button>

      {/* Camera / Viewfinder Simulation Area */}
      <div className="scanner-viewfinder" style={{ height: '145px' }}>
        <img
          src="/assets/wristband_scanner.jpg"
          alt="Wristband camera scan preview"
          className="scanner-wristband-bg"
        />

        {/* SIMULATED CAMERA Header Notice */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '8px',
            right: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#ffffff',
            fontSize: '8.5px',
            fontFamily: 'var(--font-mono)',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
            pointerEvents: 'none'
          }}
        >
          <span style={{ color: '#ef4444', fontWeight: 800 }}>● SIMULATED CAMERA</span>
          <span>5500K • D65</span>
        </div>

        {/* Alignment Guide Text */}
        <div
          style={{
            position: 'absolute',
            top: '22px',
            background: 'rgba(15, 23, 42, 0.75)',
            color: '#f8fafc',
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '9px',
            fontWeight: 600,
            pointerEvents: 'none',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          Align wristband inside frame
        </div>

        {/* 4 Corner Detection Markers */}
        <div className="viewfinder-reticle">
          <div className="reticle-corner reticle-tl" />
          <div className="reticle-corner reticle-tr" />
          <div className="reticle-corner reticle-bl" />
          <div className="reticle-corner reticle-br" />

          {/* Reference-scale detection bounding box */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '26%',
              width: '48%',
              height: '24%',
              border: '1px dashed #38bdf8',
              borderRadius: '2px',
              pointerEvents: 'none'
            }}
          >
            <span
              style={{
                position: 'absolute',
                bottom: '-12px',
                left: 0,
                background: '#0284c7',
                color: 'white',
                fontSize: '7px',
                fontWeight: 700,
                padding: '0 3px',
                borderRadius: '1px'
              }}
            >
              REF SCALE [OK]
            </span>
          </div>

          {/* Sensor-strip detection bounding box */}
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '30%',
              width: '40%',
              height: '32%',
              border: '1.5px solid #10b981',
              borderRadius: '2px',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-13px',
                left: '2px',
                background: 'rgba(16, 185, 129, 0.9)',
                color: 'white',
                fontSize: '7.5px',
                fontWeight: 700,
                padding: '0 4px',
                borderRadius: '2px'
              }}
            >
              STRIP ROI #01
            </span>
            <div
              style={{
                width: '88%',
                height: '60%',
                backgroundColor: selectedBadge.stripColor,
                borderRadius: '1px'
              }}
            />
          </div>

          {/* Dynamic Laser Line when scanning */}
          {isScanning && <div className="laser-scanning-line" />}
        </div>
      </div>

      {/* Analysis Results / Progression */}
      <div className="scan-checklist">
        {isScanning ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e60db', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scan size={14} style={{ animation: 'spin 1.2s infinite linear' }} />
              <span>{SCAN_STAGES[currentStepIndex]}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>
              Step {currentStepIndex + 1} of 7 in computer vision calibration.
            </div>
          </div>
        ) : analysisComplete ? (
          <>
            <div className="scan-status-header">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Analysis Complete (Simulated)</span>
            </div>

            <div className="checklist-item">
              <span className="checklist-check">✓</span>
              <span>Strip & reference scale detected</span>
            </div>

            <div className="checklist-item">
              <span className="checklist-check">✓</span>
              <span>Illuminant color correction applied</span>
            </div>

            <div className="checklist-item">
              <span className="checklist-check">✓</span>
              <span>Dose model: <strong>{selectedBadge.dose} ppm·hr</strong></span>
            </div>

            <div
              style={{
                marginTop: '6px',
                paddingTop: '6px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#64748b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '2px',
                    backgroundColor: selectedBadge.stripColor,
                    border: '1px solid #cbd5e1'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                  L*:{selectedBadge.cielab.L} a*:{selectedBadge.cielab.a}
                </span>
              </div>
              <span style={{ fontWeight: 700, color: '#1e60db', fontSize: '10.5px' }}>
                Conf: {selectedBadge.confidence}%
              </span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 0', textAlign: 'center' }}>
            Click SCAN WRISTBAND to run optical analysis.
          </div>
        )}
      </div>
    </div>
  );
}
