import React, { useState } from 'react';
import { FlaskConical, Play, Pause, RotateCcw, AlertTriangle, Info, Zap } from 'lucide-react';

export default function ExposureSimulatorView({
  concentration,
  setConcentration,
  exposureTime,
  setExposureTime,
  temperature,
  setTemperature,
  humidity,
  setHumidity,
  isSimulating,
  onToggleSimulation,
  onResetSimulation,
  estimatedDose,
  stripColor,
  cielab
}) {
  const [selectedPreset, setSelectedPreset] = useState('custom');

  const applyPreset = (presetName, c, t, temp, hum) => {
    setSelectedPreset(presetName);
    setConcentration(c);
    setExposureTime(t);
    setTemperature(temp);
    setHumidity(hum);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlaskConical size={22} color="#1e60db" />
            Advanced In-Silico Exposure Simulation Chamber
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Model reaction kinetics between atmospheric Hydrogen Sulfide (H₂S) gas and heavy metal acetate indicator strips.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => applyPreset('twa', 2.4, 3.7, 31, 68)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: selectedPreset === 'twa' ? '#1e60db' : '#ffffff',
              color: selectedPreset === 'twa' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Baseline TWA (2.4 ppm)
          </button>
          <button
            onClick={() => applyPreset('spike', 8.5, 1.2, 34, 75)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: selectedPreset === 'spike' ? '#1e60db' : '#ffffff',
              color: selectedPreset === 'spike' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Valve Leak Spike (8.5 ppm)
          </button>
          <button
            onClick={() => applyPreset('safe', 0.5, 8.0, 24, 45)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: selectedPreset === 'safe' ? '#1e60db' : '#ffffff',
              color: selectedPreset === 'safe' ? '#ffffff' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Full Shift Safe (0.5 ppm)
          </button>
        </div>
      </div>

      {/* Grid of Simulation Tools */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left: Interactive Controls */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Gas Chamber Environmental Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Atmospheric H₂S Concentration</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{concentration} ppm</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={concentration}
                onChange={(e) => setConcentration(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Shift Duration</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{exposureTime} hours</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={exposureTime}
                onChange={(e) => setExposureTime(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Ambient Air Temperature</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{temperature} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Relative Humidity (RH)</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{humidity} %</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={onToggleSimulation}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  background: isSimulating ? '#f59e0b' : '#1e60db',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSimulating ? <Pause size={18} /> : <Play size={18} />}
                {isSimulating ? 'Pause Gas Exposure' : 'Inject Gas & Start Exposure'}
              </button>
              <button
                onClick={onResetSimulation}
                style={{
                  padding: '12px 18px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right: Optical Reaction Visualization */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            Optical Reaction Dynamics & Colorimeter
          </h3>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Active Indicator Film Color</div>
            <div
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: stripColor,
                borderRadius: '6px',
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)',
                margin: '0 auto',
                transition: 'background-color 0.3s ease'
              }}
            />
            <div style={{ marginTop: '8px', fontSize: '11px', color: '#64748b' }}>
              Hex: {stripColor} • L*:{cielab.L} a*:{cielab.a} b*:{cielab.b}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
            <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Estimated Dose</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{estimatedDose} ppm·hr</div>
            </div>
            <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>ΔE Color Shift</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e60db' }}>{cielab.deltaE}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
