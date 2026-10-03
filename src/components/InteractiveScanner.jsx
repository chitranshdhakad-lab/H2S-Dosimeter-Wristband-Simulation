import React, { useState, useEffect } from 'react';
import {
  Camera,
  Scan,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  Check,
  Eye,
  Crosshair
} from 'lucide-react';

export const PREDEFINED_BADGES = [
  {
    id: 'moderate',
    name: 'Moderate Exposure (24.8 ppm·hr)',
    short: 'Moderate',
    stripColor: '#7a4d25',
    dose: 24.8,
    status: 'Moderate',
    statusClass: 'moderate',
    cielab: { L: 46.8, a: 12.2, b: 19.4, deltaE: 21.6 },
    rawColor: 67,
    correctedColor: 61,
    confidence: 87,
    isExpired: false,
    desc: 'Representative field dosimeter after 3.7h shift in Desulfurization Unit B.'
  },
  {
    id: 'fresh',
    name: 'Fresh Unexposed (0.0 ppm·hr)',
    short: 'Fresh',
    stripColor: '#d7c3a8',
    dose: 0.0,
    status: 'Low',
    statusClass: 'low',
    cielab: { L: 79.2, a: 4.8, b: 16.5, deltaE: 0.0 },
    rawColor: 92,
    correctedColor: 92,
    confidence: 96,
    isExpired: false,
    desc: 'Pristine unexposed dosimeter fresh from packaging prior to shift entry.'
  },
  {
    id: 'low',
    name: 'Low Exposure (8.2 ppm·hr)',
    short: 'Low',
    stripColor: '#ba9266',
    dose: 8.2,
    status: 'Low',
    statusClass: 'low',
    cielab: { L: 63.5, a: 9.2, b: 24.1, deltaE: 9.8 },
    rawColor: 84,
    correctedColor: 81,
    confidence: 92,
    isExpired: false,
    desc: 'Perimeter walkthrough inspection with ambient background levels.'
  },
  {
    id: 'high',
    name: 'High Excursion (41.6 ppm·hr)',
    short: 'High',
    stripColor: '#42230d',
    dose: 41.6,
    status: 'High',
    statusClass: 'high',
    cielab: { L: 28.4, a: 13.8, b: 14.2, deltaE: 36.2 },
    rawColor: 42,
    correctedColor: 38,
    confidence: 83,
    isExpired: false,
    desc: 'Sludge pump valve maintenance excursion in Wastewater Pit #4.'
  },
  {
    id: 'severe',
    name: 'Severe Overexposure (65.0 ppm·hr)',
    short: 'Critical',
    stripColor: '#1c1008',
    dose: 65.0,
    status: 'High',
    statusClass: 'high',
    cielab: { L: 14.2, a: 6.5, b: 7.8, deltaE: 48.5 },
    rawColor: 22,
    correctedColor: 18,
    confidence: 76,
    isExpired: false,
    desc: 'Near-saturation lead sulfide film from localized sour gas leak.'
  },
  {
    id: 'expired',
    name: 'Expired Shelf-Life Badge',
    short: 'Expired',
    stripColor: '#9e7950',
    dose: 15.2,
    status: 'BADGE INVALID',
    statusClass: 'high',
    cielab: { L: 52.1, a: 11.0, b: 18.2, deltaE: 18.0 },
    rawColor: 64,
    correctedColor: 58,
    confidence: 62,
    isExpired: true,
    desc: 'Chemical reagent expired (>90 days old); matrix degradation detected.'
  }
];

export default function InteractiveScanner({
  onScanResultSelected,
  initialBadgeId = 'moderate'
}) {
  const [selectedBadge, setSelectedBadge] = useState(
    PREDEFINED_BADGES.find((b) => b.id === initialBadgeId) || PREDEFINED_BADGES[0]
  );
  const [isScanning, setIsScanning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [scanComplete, setScanComplete] = useState(true);

  const SCAN_STAGES = [
    'Detecting wristband →',
    'Detecting sensor strip →',
    'Detecting reference scale →',
    'Checking lighting →',
    'Applying color correction →',
    'Estimating cumulative dose →',
    'Generating confidence band'
  ];

  const handleSelectBadge = (badge) => {
    setSelectedBadge(badge);
    setScanComplete(false);
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setCurrentStepIndex(0);

    // Run short 2-3 second analysis animation through all 7 stages
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < SCAN_STAGES.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanComplete(true);
        if (onScanResultSelected) {
          onScanResultSelected(selectedBadge);
        }
      }
    }, 380); // 7 * 380ms ≈ 2.66s
  };

  return (
    <div className="panel-card" style={{ padding: '22px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={22} color="#1e60db" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              Optical Wristband Camera Scanner (Simulated)
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
            Computer vision pipeline extracts CIELAB coordinates and normalizes lighting against 5-step reference scale.
          </p>
        </div>

        {/* Prominent Simulated Camera Notice Badge */}
        <div
          style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#1e40af',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              animation: 'pulse 1.2s infinite'
            }}
          />
          <span>SIMULATED CAMERA • NO REAL HARDWARE</span>
        </div>
      </div>

      {/* Select Predefined Badge Sample */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          Select Predefined Wristband Sample to Scan:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PREDEFINED_BADGES.map((b) => {
            const isSel = selectedBadge.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBadge(b)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: isSel ? '1.5px solid #1e60db' : '1px solid #e2e8f0',
                  background: isSel ? '#eff6ff' : '#ffffff',
                  color: isSel ? '#1e60db' : '#334155',
                  fontSize: '12px',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSel ? '0 1px 3px rgba(30, 96, 219, 0.2)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: b.stripColor,
                    border: '1px solid rgba(0,0,0,0.2)'
                  }}
                />
                <span>{b.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Scanning Interface */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '20px' }}>
        {/* Left: Camera Viewfinder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '280px',
              backgroundColor: '#0a101d',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
            }}
          >
            {/* Background Studio Shot */}
            <img
              src="/assets/wristband_scanner.jpg"
              alt="Wristband optical camera viewfinder"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85
              }}
            />

            {/* Simulated Camera Telemetry Banner */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                pointerEvents: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#ef4444', fontWeight: 800 }}>● REC</span>
                <span>ISO 400 • F/2.8 • 1/250s</span>
              </div>
              <div>5500K D65 • AUTO-EXPOSURE</div>
            </div>

            {/* Instruction Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '32px',
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#f8fafc',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none'
              }}
            >
              Align wristband inside frame
            </div>

            {/* 4 Corner Detection Markers */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', bottom: '14px', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '22px', height: '22px', borderTop: '3px solid #38bdf8', borderLeft: '3px solid #38bdf8' }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: '22px', height: '22px', borderTop: '3px solid #38bdf8', borderRight: '3px solid #38bdf8' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '22px', height: '22px', borderBottom: '3px solid #38bdf8', borderLeft: '3px solid #38bdf8' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', borderBottom: '3px solid #38bdf8', borderRight: '3px solid #38bdf8' }} />

              {/* Bounding Box 1: Sensor-strip Detection */}
              <div
                style={{
                  position: 'absolute',
                  top: '34%',
                  left: '32%',
                  width: '36%',
                  height: '24%',
                  border: '2px solid #10b981',
                  borderRadius: '3px',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: 0,
                    background: '#10b981',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '2px'
                  }}
                >
                  SENSOR STRIP [DETECTED]
                </div>
                {/* Dynamically darkened simulated strip representation */}
                <div
                  style={{
                    width: '90%',
                    height: '60%',
                    backgroundColor: selectedBadge.stripColor,
                    borderRadius: '2px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
                  }}
                />
              </div>

              {/* Bounding Box 2: Reference-scale Detection */}
              <div
                style={{
                  position: 'absolute',
                  top: '62%',
                  left: '30%',
                  width: '40%',
                  height: '18%',
                  border: '1.5px dashed #38bdf8',
                  borderRadius: '3px',
                  boxShadow: '0 0 8px rgba(56, 189, 248, 0.3)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-16px',
                    left: 0,
                    background: '#0284c7',
                    color: 'white',
                    fontSize: '8.5px',
                    fontWeight: 700,
                    padding: '1px 4px',
                    borderRadius: '2px'
                  }}
                >
                  REFERENCE SCALE [OK]
                </div>
              </div>

              {/* Bounding Box 3: Expiry Patch */}
              <div
                style={{
                  position: 'absolute',
                  top: '40%',
                  right: '18%',
                  width: '12%',
                  height: '24%',
                  border: `1.5px solid ${selectedBadge.isExpired ? '#ef4444' : '#ec4899'}`,
                  borderRadius: '50%'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    right: 0,
                    background: selectedBadge.isExpired ? '#ef4444' : '#ec4899',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 700,
                    padding: '1px 4px',
                    borderRadius: '2px'
                  }}
                >
                  EXPIRY
                </span>
              </div>
            </div>

            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent 0%, #38bdf8 50%, transparent 100%)',
                  boxShadow: '0 0 14px #38bdf8, 0 0 24px #0284c7',
                  animation: 'scanLaser 1.2s infinite alternate ease-in-out'
                }}
              />
            )}
          </div>

          {/* Action Button: SCAN */}
          <button
            onClick={handleStartScan}
            disabled={isScanning}
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              background: '#1e60db',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(30, 96, 219, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            <Scan size={18} />
            {isScanning ? 'RUNNING OPTICAL ANALYSIS...' : 'SCAN WRISTBAND NOW'}
          </button>
        </div>

        {/* Right: Multi-stage Analysis Progression & Result */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Optical Analysis Status
          </div>

          {/* 7 Scan Stages Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {SCAN_STAGES.map((label, idx) => {
              const isDone = scanComplete || currentStepIndex > idx;
              const isCurrent = isScanning && currentStepIndex === idx;

              return (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: isDone ? '#059669' : (isCurrent ? '#1e60db' : '#94a3b8'),
                    fontWeight: isCurrent ? 700 : (isDone ? 600 : 400),
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: isCurrent ? '2px solid #1e60db' : '1.5px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        fontWeight: 700
                      }}
                    >
                      {idx + 1}
                    </div>
                  )}
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Final Scanned Result Box */}
          {scanComplete ? (
            <div
              style={{
                marginTop: 'auto',
                padding: '14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                  ✓ Analysis Complete (Simulated)
                </span>
                <span className={`status-pill ${selectedBadge.statusClass}`}>
                  {selectedBadge.status}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    backgroundColor: selectedBadge.stripColor,
                    border: '1px solid rgba(0,0,0,0.2)'
                  }}
                  title="Extracted strip swatch"
                />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    {selectedBadge.dose} ppm·hr
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Confidence: <strong>{selectedBadge.confidence}%</strong> (Band: ±1.2 ppm·hr)
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>L*:{selectedBadge.cielab.L} a*:{selectedBadge.cielab.a} b*:{selectedBadge.cielab.b}</span>
                <span>ΔE: <strong>{selectedBadge.cielab.deltaE}</strong></span>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 'auto', textAlign: 'center', padding: '14px', color: '#64748b', fontSize: '12px' }}>
              Select a badge and click "SCAN WRISTBAND NOW" to initiate optical analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
