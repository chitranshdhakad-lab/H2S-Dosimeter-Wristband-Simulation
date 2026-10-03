import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Info
} from 'lucide-react';

export default function SafetyDecisionEngine({
  estimatedDose,
  isExpired,
  temperature,
  humidity,
  confidence
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Decision Engine Logic
  let decisionStatus = 'NORMAL';
  let decisionClass = 'normal';
  let decisionColor = '#059669';
  let decisionBg = '#ecfdf5';
  let decisionBorder = '#a7f3d0';
  let decisionReasons = [];

  // Rule 1: Check Expiry first
  if (isExpired) {
    decisionStatus = 'BADGE INVALID';
    decisionClass = 'invalid';
    decisionColor = '#dc2626';
    decisionBg = '#fef2f2';
    decisionBorder = '#fecaca';
    decisionReasons.push('Badge validity period has expired.');
    decisionReasons.push('Reagent chemistry integrity compromised; replacement required.');
  } else if (estimatedDose > 30.0) {
    // Rule 2: Critical High Exposure
    decisionStatus = 'HIGH EXPOSURE';
    decisionClass = 'high';
    decisionColor = '#dc2626';
    decisionBg = '#fef2f2';
    decisionBorder = '#fecaca';
    decisionReasons.push(`Cumulative exposure (${estimatedDose} ppm·hr) exceeds maximum permissible ceiling.`);
    decisionReasons.push('Mandatory worker rotation and area safety inspection advised.');
  } else if (estimatedDose >= 10.0) {
    // Rule 3: Monitor Caution
    decisionStatus = 'MONITOR';
    decisionClass = 'monitor';
    decisionColor = '#d97706';
    decisionBg = '#fffbeb';
    decisionBorder = '#fde68a';
    decisionReasons.push('Cumulative exposure increased during extended low-level exposure.');
    if (humidity > 65) {
      decisionReasons.push('Environmental correction applied because humidity is high.');
    }
    if (temperature > 30) {
      decisionReasons.push('Temperature kinetic acceleration factor active (>30°C).');
    }
  } else {
    // Rule 4: Normal
    decisionStatus = 'NORMAL';
    decisionClass = 'normal';
    decisionColor = '#059669';
    decisionBg = '#ecfdf5';
    decisionBorder = '#a7f3d0';
    decisionReasons.push('Cumulative exposure is well within normal 8-hour TWA shift limits.');
    decisionReasons.push('Badge baseline indicator valid and active.');
  }

  // Check confidence rule
  if (confidence < 80) {
    decisionReasons.push('Confidence reduced because simulated lighting conditions are poor.');
  }

  return (
    <div className="panel-card" style={{ padding: '22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="#1e60db" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              Safety Decision Engine (Prototype Rule-Based Engine)
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
            Automated hygiene decision logic synthesizing cumulative dose, environmental stress, and badge shelf-life.
          </p>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#1e60db',
            cursor: 'pointer'
          }}
        >
          <HelpCircle size={14} />
          Why this status?
          {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Main Status Callout Banner */}
      <div
        style={{
          background: decisionBg,
          border: `1.5px solid ${decisionBorder}`,
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {decisionStatus === 'NORMAL' && <CheckCircle2 size={32} color="#059669" />}
          {decisionStatus === 'MONITOR' && <AlertTriangle size={32} color="#d97706" />}
          {decisionStatus === 'HIGH EXPOSURE' && <ShieldAlert size={32} color="#dc2626" />}
          {decisionStatus === 'BADGE INVALID' && <AlertOctagon size={32} color="#dc2626" />}

          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: decisionColor, letterSpacing: '0.02em' }}>
              {decisionStatus}
            </div>
            <div style={{ fontSize: '12.5px', color: '#334155', fontWeight: 500, marginTop: '2px' }}>
              {decisionReasons[0]}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Assessed Dose</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {estimatedDose} ppm·hr
          </div>
        </div>
      </div>

      {/* Reasons List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
        {decisionReasons.map((reason, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
            <span style={{ color: decisionColor, fontWeight: 700 }}>•</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>

      {/* "Why this status?" Rule-Based Explanation Panel */}
      {showExplanation && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px 18px',
            marginBottom: '14px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Rule Evaluation Breakdown:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#ffffff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <span>1. Badge Expiry Rule (Age &lt; 90 days)</span>
              <strong style={{ color: isExpired ? '#dc2626' : '#059669' }}>
                {isExpired ? 'FAIL (Flagged BADGE INVALID)' : 'PASS (Valid)'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#ffffff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <span>2. Exposure Boundary Rule (&lt;10 ppm·hr: NORMAL, 10–30: MONITOR, &gt;30: HIGH)</span>
              <strong style={{ color: decisionColor }}>
                Triggered: {decisionStatus} ({estimatedDose} ppm·hr)
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#ffffff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <span>3. Environmental Stress Offset (RH &gt; 65%, T &gt; 30°C)</span>
              <strong>
                {humidity > 65 || temperature > 30 ? `Active (${temperature}°C, ${humidity}% RH)` : 'Nominal'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#ffffff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <span>4. Optical Confidence Floor (Confidence &ge; 80%)</span>
              <strong style={{ color: confidence < 80 ? '#d97706' : '#059669' }}>
                {confidence}% ({confidence < 80 ? 'Below target' : 'Nominal'})
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer Callout */}
      <div
        style={{
          background: '#f8fafc',
          borderLeft: '4px solid #f59e0b',
          padding: '10px 14px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: '#64748b'
        }}
      >
        <Info size={15} color="#d97706" style={{ flexShrink: 0 }} />
        <span>
          <strong>Prototype Disclaimer:</strong> Do not provide medical diagnosis or claim real-world safety certification; this is a prototype decision-support simulation.
        </span>
      </div>
    </div>
  );
}
