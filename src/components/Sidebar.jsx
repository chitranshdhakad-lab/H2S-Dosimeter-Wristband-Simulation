import React from 'react';
import {
  LayoutDashboard,
  Atom,
  FlaskRound as Flask,
  FlaskConical,
  Camera,
  Users,
  BarChart3,
  FileText,
  ClipboardList,
  Microscope,
  Settings,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'how_it_works', label: 'How It Works', icon: Atom },
    { id: 'what_if_lab', label: 'What-If Lab', icon: Flask },
    { id: 'simulator', label: 'Exposure Simulator', icon: FlaskConical },
    { id: 'scan', label: 'Scan Wristband', icon: Camera },
    { id: 'workers', label: 'Worker Records', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'exposure_report', label: 'Exposure Report', icon: ClipboardList },
    { id: 'validation', label: 'Validation', icon: Microscope },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="app-sidebar">
      {/* Sidebar Top Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-icon">
          <ShieldCheck size={20} />
        </div>
        <div className="sidebar-brand-text">
          <h1>H₂S DOSIMETER</h1>
          <p>Safety Prototype</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <div className="nav-item-icon">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Prototype Notice */}
      <div className="sidebar-footer">
        <div className="sidebar-sim-badge">
          <div className="label">
            <Cpu size={13} />
            SIMULATION ENGINE
          </div>
          <div className="desc">
            v2.4.1 • In-Silico Dosimetry Model (Virtual Sensor Data)
          </div>
        </div>
      </div>
    </aside>
  );
}
