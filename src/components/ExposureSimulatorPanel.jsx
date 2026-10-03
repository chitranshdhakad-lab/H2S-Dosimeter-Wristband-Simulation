import React from 'react';
import { FlaskConical, Play, Pause, RotateCcw, FastForward } from 'lucide-react';

export default function ExposureSimulatorPanel({
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
  simSpeed,
  setSimSpeed
}) {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <FlaskConical size={20} className="panel-icon" />
        <h3 className="panel-title">H₂S Exposure Simulator</h3>
      </div>
      <p className="panel-subtitle">
        Set environmental conditions to simulate exposure and see wristband color change in real time.
      </p>

      {/* Sliders List */}
      <div className="controls-list">
        {/* Control 1: H2S Concentration */}
        <div className="control-item">
          <div className="control-label-row">
            <span className="control-label">H₂S Concentration (ppm)</span>
            <span className="control-value-badge">{concentration}</span>
          </div>
          <div className="slider-container">
            <span className="slider-min-max">0</span>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              className="sim-slider"
              aria-label="H2S Concentration"
            />
            <span className="slider-min-max">10</span>
          </div>
        </div>

        {/* Control 2: Exposure Time */}
        <div className="control-item">
          <div className="control-label-row">
            <span className="control-label">Exposure Time (hours)</span>
            <span className="control-value-badge">{exposureTime}</span>
          </div>
          <div className="slider-container">
            <span className="slider-min-max">0</span>
            <input
              type="range"
              min="0"
              max="8"
              step="0.1"
              value={exposureTime}
              onChange={(e) => setExposureTime(parseFloat(e.target.value))}
              className="sim-slider"
              aria-label="Exposure Time"
            />
            <span className="slider-min-max">8</span>
          </div>
        </div>

        {/* Control 3: Temperature */}
        <div className="control-item">
          <div className="control-label-row">
            <span className="control-label">Temperature (°C)</span>
            <span className="control-value-badge">{temperature}</span>
          </div>
          <div className="slider-container">
            <span className="slider-min-max">0</span>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
              className="sim-slider"
              aria-label="Temperature"
            />
            <span className="slider-min-max">50</span>
          </div>
        </div>

        {/* Control 4: Humidity */}
        <div className="control-item">
          <div className="control-label-row">
            <span className="control-label">Humidity (%)</span>
            <span className="control-value-badge">{humidity}</span>
          </div>
          <div className="slider-container">
            <span className="slider-min-max">0</span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
              className="sim-slider"
              aria-label="Humidity"
            />
            <span className="slider-min-max">100</span>
          </div>
        </div>
      </div>

      {/* Speed Multiplier & Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <FastForward size={14} />
          <span>Sim Speed:</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 10, 60].map((spd) => (
            <button
              key={spd}
              onClick={() => setSimSpeed(spd)}
              style={{
                background: simSpeed === spd ? '#1e60db' : '#f1f5f9',
                color: simSpeed === spd ? '#ffffff' : '#475569',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {spd}x
            </button>
          ))}
          <button
            onClick={onResetSimulation}
            title="Reset to default baseline"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </div>
      </div>

      {/* Prominent Simulation Button */}
      <button
        className={`btn-start-sim ${isSimulating ? 'running' : ''}`}
        onClick={onToggleSimulation}
      >
        {isSimulating ? (
          <>
            <Pause size={18} fill="white" />
            PAUSE EXPOSURE (SIMULATION)
          </>
        ) : (
          <>
            <Play size={18} fill="white" />
            START EXPOSURE (SIMULATION)
          </>
        )}
      </button>
    </div>
  );
}
