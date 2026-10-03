import React, { useState, useEffect } from 'react';
import {
  Wind,
  Layers,
  Atom,
  Palette,
  Camera,
  Sliders,
  Cpu,
  FileCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function HowItWorksSection({
  concentration,
  durationStr,
  estimatedDose,
  rawColorVal,
  stripColor,
  isSimulating
}) {
  // Active stage progression during simulation animation
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'H₂S Exposure',
      sub: 'Ambient gas diffusion',
      icon: Wind,
      color: '#38bdf8'
    },
    {
      id: 1,
      title: 'Lead Acetate Strip',
      sub: 'Reagent matrix',
      icon: Layers,
      color: '#a78bfa'
    },
    {
      id: 2,
      title: 'PbS Formation',
      sub: 'PbS precipitation',
      icon: Atom,
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Color Change',
      sub: 'Optical darkening',
      icon: Palette,
      color: '#ec4899'
    },
    {
      id: 4,
      title: 'Camera Scan',
      sub: 'Optical acquisition',
      icon: Camera,
      color: '#1e60db'
    },
    {
      id: 5,
      title: 'Color Correction',
      sub: '5-step reference balance',
      icon: Sliders,
      color: '#06b6d4'
    },
    {
      id: 6,
      title: 'Dose Estimation',
      sub: 'Kinetic Arrhenius model',
      icon: Cpu,
      color: '#10b981'
    },
    {
      id: 7,
      title: 'Worker Record',
      sub: 'Certified audit ledger',
      icon: FileCheck,
      color: '#6366f1'
    }
  ];

  // Animate the flow slowly when simulation is running
  useEffect(() => {
    let timer = null;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 1400);
    } else {
      setActiveStep(3); // default highlight on Color Change / PbS
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSimulating]);

  return (
    <div className="panel-card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Atom size={22} color="#1e60db" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              How It Works: Colorimetric Dosimetry Pipeline
            </h3>
            {isSimulating && (
              <span
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1e40af',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={12} />
                Live Simulation Flow Active
              </span>
            )}
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '3px' }}>
            Interactive stage flow representing the chemical reaction, optical capture, and mathematical dose calculation.
          </p>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#475569' }}>
          Reaction: Pb(CH₃COO)₂ + H₂S → PbS↓ + 2CH₃COOH
        </div>
      </div>

      {/* Interactive Visual Flow (8 Nodes) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '8px',
          alignItems: 'stretch',
          marginBottom: '22px',
          position: 'relative'
        }}
      >
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = isSimulating ? activeStep === idx : true;
          const isCurrentHighlight = activeStep === idx;

          return (
            <div
              key={s.id}
              onClick={() => setActiveStep(idx)}
              style={{
                background: isCurrentHighlight ? '#ffffff' : '#f8fafc',
                border: isCurrentHighlight ? `2px solid ${s.color}` : '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: isCurrentHighlight ? `0 4px 14px ${s.color}25` : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              {/* Step Number Tag */}
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  left: '6px',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: isCurrentHighlight ? s.color : '#94a3b8'
                }}
              >
                0{idx + 1}
              </span>

              {/* Icon Container */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: isCurrentHighlight ? `${s.color}15` : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrentHighlight ? s.color : '#64748b',
                  marginBottom: '8px',
                  marginTop: '6px',
                  transition: 'transform 0.2s ease',
                  transform: isCurrentHighlight ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <Icon size={18} strokeWidth={isCurrentHighlight ? 2.5 : 2} />
              </div>

              {/* Title & Subtitle */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: isCurrentHighlight ? 700 : 600,
                  color: isCurrentHighlight ? '#0f172a' : '#334155',
                  lineHeight: 1.25,
                  marginBottom: '2px'
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  color: '#94a3b8',
                  lineHeight: 1.2
                }}
              >
                {s.sub}
              </div>

              {/* Arrow connector to next step (for all except last) */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 5,
                    color: isCurrentHighlight ? s.color : '#cbd5e1',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ArrowRight size={13} strokeWidth={2.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progressive Virtual Sensor Strip Monitor */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            Simulated Sensor Strip Response (Progressive Lead Sulfide Darkening)
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Active Stage: <strong>{steps[activeStep].title}</strong>
          </span>
        </div>

        {/* Dynamic Sensor Strip Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: stripColor,
              border: '1px solid rgba(0,0,0,0.2)',
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
            }}
          >
            Virtual PbS Precipitate Film
          </div>
        </div>

        {/* 5 Metrics Under the Strip as Requested */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            paddingTop: '6px'
          }}
        >
          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>H₂S Concentration</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              {concentration} ppm
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Exposure Duration</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              {durationStr}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Simulated Cumulative Dose</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e60db', fontFamily: 'var(--font-mono)' }}>
              {estimatedDose} ppm·hr
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Current Color Value</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              Raw: {rawColorVal}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Estimated Dose</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#059669', fontFamily: 'var(--font-mono)' }}>
              {estimatedDose} ppm·hr
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Explanation Callout Note */}
      <div
        style={{
          background: '#f8fafc',
          borderLeft: '4px solid #1e60db',
          padding: '12px 16px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px'
        }}
      >
        <Info size={18} color="#1e60db" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>
          <strong>Scientific Principle:</strong> “Lead acetate reacts with H₂S and forms lead sulfide (PbS), producing a permanent color change. In this software prototype, the reaction is simulated; physical validation requires controlled H₂S exposure testing.”
        </div>
      </div>
    </div>
  );
}
