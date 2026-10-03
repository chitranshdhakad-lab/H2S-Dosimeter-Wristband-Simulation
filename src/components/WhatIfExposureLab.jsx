import React, { useState } from 'react';
import {
  FlaskRound as Flask,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sun,
  Clock,
  Thermometer,
  Droplets,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Info
} from 'lucide-react';
import { calculateWhatIfScenario } from '../utils/simulationModel.js';

export default function WhatIfExposureLab() {
  // Configurable Scenario Parameters
  const [concentration, setConcentration] = useState(2.4);
  const [exposureTime, setExposureTime] = useState(3.7);
  const [temperature, setTemperature] = useState(31);
  const [humidity, setHumidity] = useState(68);
  const [lighting, setLighting] = useState('standard');
  const [badgeAgeDays, setBadgeAgeDays] = useState(32);
  const [startingColorOffset, setStartingColorOffset] = useState(0);

  // Baseline state (before)
  const baselineState = calculateWhatIfScenario({
    concentration: 2.4,
    exposureTime: 3.7,
    temperature: 31,
    humidity: 68,
    lighting: 'standard',
    badgeAgeDays: 32,
    startingColorOffset: 0
  });

  // Current active scenario output (after)
  const [scenarioResult, setScenarioResult] = useState(baselineState);
  const [activePreset, setActivePreset] = useState('normal');
  const [isRunning, setIsRunning] = useState(false);

  // Preset Scenarios
  const PRESETS = [
    {
      id: 'normal',
      name: 'Normal Environment',
      desc: 'Nominal 2.0 ppm, 4.0h, 25°C, 50% RH, D65 Studio lighting.',
      params: {
        concentration: 2.0,
        exposureTime: 4.0,
        temperature: 25,
        humidity: 50,
        lighting: 'standard',
        badgeAgeDays: 20,
        startingColorOffset: 0
      }
    },
    {
      id: 'high_humidity',
      name: 'High Humidity',
      desc: '3.5 ppm, 5.5h, 34°C, 92% RH. Accelerates moisture swelling.',
      params: {
        concentration: 3.5,
        exposureTime: 5.5,
        temperature: 34,
        humidity: 92,
        lighting: 'standard',
        badgeAgeDays: 28,
        startingColorOffset: 0
      }
    },
    {
      id: 'poor_lighting',
      name: 'Poor Lighting',
      desc: '2.4 ppm, 3.7h, dim 2700K incandescent illumination.',
      params: {
        concentration: 2.4,
        exposureTime: 3.7,
        temperature: 22,
        humidity: 45,
        lighting: 'dim',
        badgeAgeDays: 35,
        startingColorOffset: 0
      }
    },
    {
      id: 'long_exposure',
      name: 'Long Exposure',
      desc: '4.2 ppm over 8.0h continuous shift. Severe exposure.',
      params: {
        concentration: 4.2,
        exposureTime: 8.0,
        temperature: 29,
        humidity: 65,
        lighting: 'standard',
        badgeAgeDays: 25,
        startingColorOffset: 0
      }
    },
    {
      id: 'low_conc_long',
      name: 'Low Concentration / Long Duration',
      desc: '0.6 ppm over 10.5 hours. Chronic low-level exposure test.',
      params: {
        concentration: 0.6,
        exposureTime: 10.5,
        temperature: 24,
        humidity: 55,
        lighting: 'standard',
        badgeAgeDays: 15,
        startingColorOffset: 0
      }
    },
    {
      id: 'expired_badge',
      name: 'Expired Badge',
      desc: '115 days old badge. Reagent expired; testing fail-safe.',
      params: {
        concentration: 2.4,
        exposureTime: 3.7,
        temperature: 30,
        humidity: 68,
        lighting: 'standard',
        badgeAgeDays: 115,
        startingColorOffset: 3
      }
    }
  ];

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setConcentration(preset.params.concentration);
    setExposureTime(preset.params.exposureTime);
    setTemperature(preset.params.temperature);
    setHumidity(preset.params.humidity);
    setLighting(preset.params.lighting);
    setBadgeAgeDays(preset.params.badgeAgeDays);
    setStartingColorOffset(preset.params.startingColorOffset);
  };

  const handleRunScenario = () => {
    setIsRunning(true);
    setTimeout(() => {
      const calculated = calculateWhatIfScenario({
        concentration,
        exposureTime,
        temperature,
        humidity,
        lighting,
        badgeAgeDays,
        startingColorOffset
      });
      setScenarioResult(calculated);
      setIsRunning(false);
    }, 350);
  };

  const handleResetToBaseline = () => {
    applyPreset(PRESETS[0]);
    setScenarioResult(baselineState);
  };

  return (
    <div className="panel-card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flask size={22} color="#1e60db" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              What-If Exposure Lab (Simulation Workbench)
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '3px' }}>
            Simulate hypothetical industrial safety scenarios, microclimates, camera lighting anomalies, and badge degradation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleResetToBaseline}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={13} />
            Reset Baseline
          </button>
        </div>
      </div>

      {/* Preset Scenario Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          Quick Scenario Presets:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PRESETS.map((p) => {
            const isSel = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: isSel ? '1px solid #1e60db' : '1px solid #e2e8f0',
                  background: isSel ? '#eff6ff' : '#ffffff',
                  color: isSel ? '#1e60db' : '#334155',
                  fontSize: '12px',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: isSel ? '0 1px 3px rgba(30, 96, 219, 0.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Parameters on Left, Output & Comparison on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.35fr', gap: '24px' }}>
        {/* Left Column: Parameter Modifiers */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Variable Exposure Inputs (Simulated)
          </div>

          {/* 1. H2S Concentration */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
              <span>H₂S Concentration</span>
              <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{concentration} ppm</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          {/* 2. Exposure Duration */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
              <span>Exposure Duration</span>
              <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{exposureTime} hours</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="12"
              step="0.1"
              value={exposureTime}
              onChange={(e) => setExposureTime(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          {/* 3. Temperature & 4. Humidity in 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                <span>Temperature</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{temperature} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: '4px' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                <span>Humidity</span>
                <span style={{ color: '#1e60db', fontFamily: 'var(--font-mono)' }}>{humidity} %</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: '4px' }}
              />
            </div>
          </div>

          {/* 5. Lighting Condition */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Optical Camera Lighting Condition:
            </div>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: 'white' }}
            >
              <option value="standard">Standard D65 Studio (5500K Normal White Balance)</option>
              <option value="dim">Poor Lighting / Dim Incandescent (2700K Low Lux)</option>
              <option value="daylight">Overcast Daylight (6500K Cool Ambient)</option>
              <option value="glare">Harsh Glare / Flash Specular Reflection</option>
            </select>
          </div>

          {/* 6. Badge Age & 7. Starting Color in 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                <span>Badge Age</span>
                <span style={{ color: badgeAgeDays >= 90 ? '#ef4444' : '#1e60db', fontFamily: 'var(--font-mono)' }}>
                  {badgeAgeDays} days {badgeAgeDays >= 90 ? '(Expired)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="140"
                value={badgeAgeDays}
                onChange={(e) => setBadgeAgeDays(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: '4px' }}
              />
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Starting Strip Color:
              </div>
              <select
                value={startingColorOffset}
                onChange={(e) => setStartingColorOffset(parseFloat(e.target.value))}
                style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11.5px', background: 'white' }}
              >
                <option value={0}>Fresh Pristine (0 ppm·hr)</option>
                <option value={3}>Lightly Aged (+3 ppm·hr)</option>
                <option value={12}>Pre-Exposed (+12 ppm·hr)</option>
              </select>
            </div>
          </div>

          {/* RUN SCENARIO Button */}
          <button
            onClick={handleRunScenario}
            disabled={isRunning}
            style={{
              marginTop: '8px',
              padding: '12px 18px',
              borderRadius: '8px',
              background: '#1e60db',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(30, 96, 219, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            <Play size={16} fill="white" />
            {isRunning ? 'CALCULATING IN-SILICO MODEL...' : 'RUN SCENARIO'}
          </button>
        </div>

        {/* Right Column: Simulated Effects & Before/After Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Top: 7 Required Result Metrics */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                Simulated Output Results
              </div>
              <span style={{ fontSize: '11px', color: '#1e60db', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                SIMULATED MODEL
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
              {/* 1. Sensor-strip color */}
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>1. Sensor Strip</span>
                <div
                  style={{
                    width: '42px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: scenarioResult.sensorStripColor,
                    border: '1px solid rgba(0,0,0,0.2)',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                    marginBottom: '4px'
                  }}
                />
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#334155' }}>
                  {scenarioResult.sensorStripColor}
                </span>
              </div>

              {/* 2. Raw RGB value */}
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>2. Raw RGB Value</span>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  R: {scenarioResult.rawRgb.r}<br/>
                  G: {scenarioResult.rawRgb.g}<br/>
                  B: {scenarioResult.rawRgb.b}
                </div>
              </div>

              {/* 3. Corrected CIELAB value */}
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>3. Corrected CIELAB</span>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e60db', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  L*: {scenarioResult.correctedCielab.L}<br/>
                  a*: {scenarioResult.correctedCielab.a}<br/>
                  b*: {scenarioResult.correctedCielab.b}<br/>
                  ΔE: {scenarioResult.correctedCielab.deltaE}
                </div>
              </div>
            </div>

            {/* Metrics 4, 5, 6, 7 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {/* 4. Estimated cumulative dose */}
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>4. Est. Dose</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  {scenarioResult.estimatedDose} <span style={{ fontSize: '10px' }}>ppm·hr</span>
                </div>
              </div>

              {/* 5. Confidence level */}
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>5. Confidence</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: scenarioResult.confidence < 75 ? '#d97706' : '#10b981', marginTop: '2px' }}>
                  {scenarioResult.confidence}%
                </div>
              </div>

              {/* 6. Badge validity */}
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>6. Badge Validity</span>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: scenarioResult.isValidBadge ? '#059669' : '#dc2626', marginTop: '4px' }}>
                  {scenarioResult.badgeValidity}
                </div>
              </div>

              {/* 7. Final exposure status */}
              <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>7. Final Status</span>
                <div style={{ marginTop: '2px' }}>
                  <span className={`status-pill ${scenarioResult.statusClass}`}>
                    {scenarioResult.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Optical note */}
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', background: '#f1f5f9', padding: '6px 10px', borderRadius: '4px' }}>
              <strong>Optics Correction:</strong> {scenarioResult.lightingCorrectionNotes}
            </div>
          </div>

          {/* Bottom: Before vs After Comparison Card */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Before / After Scenario Comparison
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b' }}>Parameter</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b' }}>Baseline (Before)</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b' }}>Scenario (After)</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b' }}>Variance / Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Strip Color</td>
                  <td style={{ padding: '6px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '2px', backgroundColor: baselineState.sensorStripColor }} />
                      <span>{baselineState.sensorStripColor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '2px', backgroundColor: scenarioResult.sensorStripColor }} />
                      <span>{scenarioResult.sensorStripColor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '6px 8px', color: '#1e60db', fontWeight: 600 }}>
                    ΔE = {Math.abs(scenarioResult.correctedCielab.deltaE - baselineState.correctedCielab.deltaE).toFixed(1)}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Estimated Dose</td>
                  <td style={{ padding: '6px 8px' }}>{baselineState.estimatedDose} ppm·hr</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700 }}>{scenarioResult.estimatedDose} ppm·hr</td>
                  <td style={{ padding: '6px 8px', color: scenarioResult.estimatedDose >= baselineState.estimatedDose ? '#d97706' : '#059669', fontWeight: 600 }}>
                    {scenarioResult.estimatedDose >= baselineState.estimatedDose ? '+' : ''}
                    {(scenarioResult.estimatedDose - baselineState.estimatedDose).toFixed(1)} ppm·hr
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Confidence</td>
                  <td style={{ padding: '6px 8px' }}>{baselineState.confidence}%</td>
                  <td style={{ padding: '6px 8px' }}>{scenarioResult.confidence}%</td>
                  <td style={{ padding: '6px 8px', color: scenarioResult.confidence < baselineState.confidence ? '#dc2626' : '#059669' }}>
                    {scenarioResult.confidence - baselineState.confidence}%
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '6px 8px', fontWeight: 600 }}>Badge Validity</td>
                  <td style={{ padding: '6px 8px', color: '#059669' }}>{baselineState.badgeValidity}</td>
                  <td style={{ padding: '6px 8px', color: scenarioResult.isValidBadge ? '#059669' : '#dc2626', fontWeight: 700 }}>
                    {scenarioResult.badgeValidity}
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    {scenarioResult.isValidBadge ? 'Nominal shelf life' : 'Exceeded 90 days limit'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
