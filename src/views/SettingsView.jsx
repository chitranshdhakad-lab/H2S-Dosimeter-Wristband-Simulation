import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Cpu, RotateCcw } from 'lucide-react';

export default function SettingsView({ onResetSimulation }) {
  const [twaLimit, setTwaLimit] = useState(10);
  const [stelLimit, setStelLimit] = useState(15);
  const [tempCoeff, setTempCoeff] = useState(1.8);
  const [rhCoeff, setRhCoeff] = useState(0.25);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={22} color="#1e60db" />
            Simulation Parameters & Hygiene Thresholds
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Adjust physical chemistry constants, Arrhenius activation energy, and regulatory alert boundaries.
          </p>
        </div>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            background: saved ? '#10b981' : '#1e60db',
            color: 'white',
            border: 'none',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s ease'
          }}
        >
          <Save size={16} />
          {saved ? 'Settings Saved ✓' : 'Save Parameters'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Exposure Thresholds */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} color="#f59e0b" />
            OSHA / NIOSH Regulatory Limits (Simulated)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>8-Hour Time-Weighted Average (TWA) Limit</span>
                <span style={{ color: '#1e60db' }}>{twaLimit} ppm</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={twaLimit}
                onChange={(e) => setTwaLimit(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                OSHA Standard 29 CFR 1910.1000 Table Z-2.
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Short-Term Exposure Limit (STEL, 15-min)</span>
                <span style={{ color: '#1e60db' }}>{stelLimit} ppm</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={stelLimit}
                onChange={(e) => setStelLimit(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Chemical Kinetics & Compensation Constants */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#1e60db" />
            Sensor Strip Physical Reaction Coefficients
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Arrhenius Temp Compensation (% per °C above 25°C)</span>
                <span style={{ color: '#1e60db' }}>+{tempCoeff}%/°C</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.5"
                step="0.1"
                value={tempCoeff}
                onChange={(e) => setTempCoeff(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Humidity Adsorption Coefficient (% per %RH above 50%)</span>
                <span style={{ color: '#1e60db' }}>+{rhCoeff}%/%RH</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.01"
                value={rhCoeff}
                onChange={(e) => setRhCoeff(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={onResetSimulation}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                Restore Factory Calibration Constants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
