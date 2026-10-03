import React from 'react';
import { Wind, Clock, Thermometer, Droplets, TrendingUp, Activity } from 'lucide-react';

export default function TopKpis({ concentration, durationStr, temperature, humidity }) {
  return (
    <section className="kpi-grid" aria-label="Top Key Performance Indicators">
      {/* KPI 1: Current H2S Level */}
      <div className="kpi-card">
        <div className="kpi-left">
          <div className="kpi-icon-wrapper kpi-green">
            <Wind size={22} strokeWidth={2.2} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Current H₂S Level</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{concentration} ppm</span>
            </div>
            <span className="kpi-subtext">Simulated environment</span>
          </div>
        </div>
        <div className="kpi-right-graphic" style={{ color: '#10b981' }}>
          <TrendingUp size={20} />
        </div>
      </div>

      {/* KPI 2: Exposure Duration */}
      <div className="kpi-card">
        <div className="kpi-left">
          <div className="kpi-icon-wrapper kpi-orange">
            <Clock size={22} strokeWidth={2.2} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Exposure Duration</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{durationStr}</span>
            </div>
            <span className="kpi-subtext">hh:mm:ss</span>
          </div>
        </div>
        <div className="kpi-right-graphic" style={{ color: '#f59e0b' }}>
          <Activity size={18} />
        </div>
      </div>

      {/* KPI 3: Temperature */}
      <div className="kpi-card">
        <div className="kpi-left">
          <div className="kpi-icon-wrapper kpi-blue">
            <Thermometer size={22} strokeWidth={2.2} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Temperature</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{temperature} °C</span>
            </div>
            <span className="kpi-subtext">Environmental condition</span>
          </div>
        </div>
        <div className="kpi-right-graphic" style={{ color: '#1e60db' }}>
          <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
            <path d="M1 9C6 4 11 14 17 9C23 4 28 14 33 9" stroke="#1e60db" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* KPI 4: Humidity */}
      <div className="kpi-card">
        <div className="kpi-left">
          <div className="kpi-icon-wrapper kpi-purple">
            <Droplets size={22} strokeWidth={2.2} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Humidity</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{humidity} %</span>
            </div>
            <span className="kpi-subtext">Environmental condition</span>
          </div>
        </div>
        <div className="kpi-right-graphic" style={{ color: '#8b5cf6' }}>
          <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
            <path d="M1 9C6 4 11 14 17 9C23 4 28 14 33 9" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
