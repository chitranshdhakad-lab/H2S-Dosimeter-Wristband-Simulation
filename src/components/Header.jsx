import React, { useState } from 'react';
import { ShieldCheck, FlaskConical, Bell, User, ChevronDown, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData.js';

export default function Header({ onResetSimulation }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <header className="app-header">
      {/* Left: Brand and Title */}
      <div className="header-left">
        <div className="header-logo-icon">
          <ShieldCheck size={22} strokeWidth={2.5} />
        </div>
        <div className="header-titles">
          <h2>H₂S Dosimeter Wristband</h2>
          <p>Simulation Prototype (Software Demo)</p>
        </div>
      </div>

      {/* Right: Simulation Mode Pill, Notification, User Profile */}
      <div className="header-right">
        {/* Prominent Simulation Mode Badge */}
        <div className="simulation-mode-badge" title="This system runs on synthetic data & mathematical dosimetry models. No physical sensor hardware is attached.">
          <div className="sim-badge-icon">
            <FlaskConical size={16} strokeWidth={2.2} />
          </div>
          <div className="sim-badge-text">
            <div className="title">
              SIMULATION MODE
            </div>
            <div className="subtitle">
              Virtual environment • No real hardware
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Notification Button */}
          <div style={{ position: 'relative' }}>
            <button
              className="header-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Simulation Alerts & Notifications"
            >
              <Bell size={18} />
              <span className="notification-dot" />
            </button>

            {showNotifications && (
              <div className="notification-popover">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>System Alerts (Simulated)</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={15} />
                  </button>
                </div>
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={`notif-item ${n.urgent ? 'urgent' : ''}`}>
                    {n.urgent ? (
                      <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: n.urgent ? '#991b1b' : '#1e293b' }}>{n.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>{n.desc}</div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="admin-profile-btn"
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              title="Admin User Session"
            >
              <div className="admin-avatar">
                <User size={16} />
              </div>
              <span className="admin-info">Admin</span>
              <ChevronDown size={14} color="#64748b" />
            </button>

            {showAdminMenu && (
              <div className="notification-popover" style={{ width: '220px' }}>
                <div style={{ padding: '6px 4px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Chief Safety Officer</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>admin.h2s@safetydemo.internal</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button 
                    onClick={() => {
                      if (onResetSimulation) onResetSimulation();
                      setShowAdminMenu(false);
                    }}
                    style={{ textAlign: 'left', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#1e60db' }}
                  >
                    ↺ Reset Simulation Parameters
                  </button>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8', padding: '4px' }}>
                    Shift: Night Ops #4 • Refinery Sector 7
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
