import React from 'react';
import { Beaker, FlaskConical, Microscope, AlertTriangle, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export default function PrototypeValidationView() {
  const columns = [
    {
      title: 'Published Reference',
      subtitle: 'Peer-Reviewed Literature',
      icon: Beaker,
      color: '#059669',
      border: '#a7f3d0',
      bg: '#ecfdf5',
      entries: [
        { label: 'Basic Lead-Acetate Strip', value: 'Approx. 5 ppm detection threshold (qualitative)' },
        { label: 'Published Passive Dosimeter', value: '0.2 ppm TWA at ±20% accuracy (ISO 17621)' },
        { label: 'Nanofiber Research Direction', value: '0.02 ppm LOD (laboratory prototype, limited RH range)' },
        { label: 'Color-Change Mechanism', value: 'PbS formation: Pb(CH₃COO)₂ + H₂S → PbS + 2 CH₃COOH' },
        { label: 'Arrhenius Temp. Dependence', value: 'Reaction rate doubles per 10 °C (approx.)' },
        { label: 'Humidity Sensitivity', value: 'Optimal 40–80% RH; below 20% reaction rate drops sharply' },
        { label: 'Shelf Life (Sealed)', value: '6–12 months typical (manufacturer dependent)' },
        { label: 'Cross-Sensitivity', value: 'SO₂, mercaptans may cause false positives in field use' },
      ]
    },
    {
      title: 'Our Simulation',
      subtitle: 'In-Silico Model (This Prototype)',
      icon: FlaskConical,
      color: '#1e60db',
      border: '#bfdbfe',
      bg: '#eff6ff',
      entries: [
        { label: 'Detection Model', value: 'Simulated 0–100 ppm range via Langmuir adsorption kinetics' },
        { label: 'Dose Accumulation', value: 'C×T integration with Arrhenius correction (Ea/RT = 0.15 eV)' },
        { label: 'Color Response Curve', value: 'CIE-L*a*b* L channel: L = 95 − 1.4 × dose (linear approx.)' },
        { label: 'Temperature Correction', value: '+1.8% per °C deviation from 25 °C reference' },
        { label: 'Humidity Correction', value: '+0.25% per %RH above 50% baseline' },
        { label: 'Badge Expiry Model', value: 'Binary flag; expired badge adds ±15% uncertainty to dose estimate' },
        { label: 'Confidence Band', value: '±12–25% (Monte Carlo sampling, 95% CI)' },
        { label: 'Camera Color Correction', value: 'White balance + grayscale strip normalization (simulated)' },
      ]
    },
    {
      title: 'Future Lab Validation',
      subtitle: 'Chamber Testing Requirements',
      icon: Microscope,
      color: '#7c3aed',
      border: '#c4b5fd',
      bg: '#f5f3ff',
      entries: [
        { label: 'Controlled Chamber Tests', value: 'H₂S at 1, 5, 10, 25, 50 ppm in certified exposure chamber' },
        { label: 'Temperature Matrix', value: '10 °C, 25 °C, 40 °C, 50 °C with fixed 50% RH' },
        { label: 'Humidity Matrix', value: '20%, 40%, 60%, 80% RH at fixed 25 °C' },
        { label: 'Duration Studies', value: '0.5, 1, 2, 4, 8 hours at each concentration' },
        { label: 'Reference Dosimeter', value: 'NIOSH 6013 or ISO 17621-certified passive sampler' },
        { label: 'Color Measurement', value: 'Spectrophotometer (CIE L*a*b*) with D65 illuminant' },
        { label: 'Inter-Badge Variability', value: 'n=30 badges per condition for statistical power' },
        { label: 'Cross-Sensitivity Tests', value: 'SO₂, NO₂, mercaptans at 1–10 ppm to quantify interference' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Microscope size={22} color="#7c3aed" />
          Prototype Validation Matrix
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Systematic comparison between published literature benchmarks, our computational model, and the laboratory testing plan required for formal validation.
        </p>
      </div>

      {/* Three-Column Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        {columns.map((col) => {
          const Icon = col.icon;
          return (
            <div
              key={col.title}
              style={{
                background: '#ffffff',
                border: `1px solid ${col.border}`,
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              {/* Column Header */}
              <div style={{
                background: col.bg,
                padding: '14px 16px',
                borderBottom: `2px solid ${col.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: col.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={col.color} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{col.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{col.subtitle}</div>
                </div>
              </div>

              {/* Entries */}
              <div style={{ padding: '8px 0' }}>
                {col.entries.map((entry, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 16px',
                      borderBottom: idx < col.entries.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontSize: '11px', color: col.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{entry.label}</div>
                    <div style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>{entry.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Pipeline Roadmap */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Validation Roadmap Pipeline</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'Literature Review', status: 'done' },
            { label: 'Kinetic Model Design', status: 'done' },
            { label: 'Software Simulation', status: 'done' },
            { label: 'UI/UX Prototype', status: 'done' },
            { label: 'Sensitivity Analysis', status: 'done' },
            { label: 'Lab Chamber Testing', status: 'pending' },
            { label: 'Field Pilot Study', status: 'pending' },
            { label: 'ISO/NIOSH Certification', status: 'pending' },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: step.status === 'done' ? '#ecfdf5' : '#f1f5f9',
                color: step.status === 'done' ? '#059669' : '#94a3b8',
                border: `1px solid ${step.status === 'done' ? '#a7f3d0' : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {step.status === 'done' ? <CheckCircle2 size={12} /> : <HelpCircle size={12} />}
                {step.label}
              </div>
              {i < arr.length - 1 && <ArrowRight size={14} color="#cbd5e1" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* NOT LAB-VALIDATED Banner */}
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '10px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <AlertTriangle size={22} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b', marginBottom: '4px' }}>
            NOT LAB-VALIDATED — Simulation Only
          </div>
          <p style={{ fontSize: '12px', color: '#7f1d1d', lineHeight: '1.6', margin: 0 }}>
            All simulation values in the "Our Simulation" column are computed from theoretical models and have not been confirmed against physical sensor measurements. Laboratory validation using controlled H₂S exposure chambers, certified reference dosimeters, and spectrophotometric color measurement is required before any operational or regulatory use.
          </p>
          <p style={{ fontSize: '12px', color: '#7f1d1d', lineHeight: '1.6', margin: '6px 0 0' }}>
            This prototype does not provide medical diagnosis, replace certified exposure monitors, or claim compliance with any occupational safety standard. It is a decision-support simulation for prototype evaluation only.
          </p>
        </div>
      </div>
    </div>
  );
}
