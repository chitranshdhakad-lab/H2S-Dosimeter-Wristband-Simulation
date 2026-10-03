import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Filter,
  Search,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function ExposureReportView({ records }) {
  // Filter controls
  const [selectedWorker, setSelectedWorker] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('2026-10-01');
  const [dateTo, setDateTo] = useState('2026-10-03');
  const [isGenerated, setIsGenerated] = useState(true);

  // Simulated environmental data per record
  const enrichedRecords = records.map((r) => ({
    ...r,
    h2sExposure: r.estimatedDose < 10 ? '1.2 ppm avg' : r.estimatedDose < 30 ? '2.4 ppm avg' : '4.8 ppm avg',
    exposureDuration: r.shift === 'Night' ? '7.5 hours' : '8.0 hours',
    temperature: r.estimatedDose > 30 ? '33 °C' : '29 °C',
    humidity: r.estimatedDose > 30 ? '78%' : '62%',
    envCorrection: 'Arrhenius +1.8%/°C, RH +0.25%/%RH applied'
  }));

  // Filter logic
  const filtered = enrichedRecords.filter((r) => {
    if (selectedWorker !== 'all' && r.id !== selectedWorker) return false;
    if (selectedShift !== 'all' && r.shift !== selectedShift) return false;
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    return true;
  });

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      'Worker ID', 'Name', 'Shift', 'Date', 'Badge ID', 'Badge Validity',
      'H2S Exposure (Sim)', 'Exposure Duration', 'Est. Cumulative Dose (ppm·hr)',
      'Confidence (%)', 'Temperature', 'Humidity', 'Environmental Correction', 'Final Status'
    ];

    const rows = filtered.map((r) => [
      r.id, r.name, r.shift, r.dateTime, r.wristbandSerial, r.badgeStatus,
      r.h2sExposure, r.exposureDuration, r.estimatedDose,
      r.confidence, r.temperature, r.humidity, r.envCorrection, r.status
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `H2S_Exposure_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGeneratePdf = () => {
    alert('PDF export initiated (Simulation). In production, this would generate a signed compliance certificate via server-side rendering.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} color="#1e60db" />
            Exposure Report Generator (Industrial Safety Officer)
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Generate formal occupational hygiene dosimetry records for shift audit and OSHA compliance filing.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.print()}
            style={{ padding: '8px 14px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={14} /> Print Report
          </button>
          <button
            onClick={handleExportCsv}
            style={{ padding: '8px 14px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} /> EXPORT CSV
          </button>
          <button
            onClick={handleGeneratePdf}
            style={{ padding: '8px 14px', borderRadius: '6px', background: '#1e60db', border: 'none', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(30, 96, 219, 0.3)' }}
          >
            <Download size={14} /> GENERATE PDF
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
        <Filter size={16} color="#64748b" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Worker</label>
          <select value={selectedWorker} onChange={(e) => setSelectedWorker(e.target.value)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', minWidth: '140px' }}>
            <option value="all">All Workers</option>
            {records.map((r) => (
              <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Date From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Date To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Shift</label>
          <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
            <option value="all">All Shifts</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Exposure Level</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
            <option value="all">All Levels</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Formal Report Document */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
        {/* Document Title Block */}
        <div style={{ borderBottom: '3px solid #0f172a', paddingBottom: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Industrial Hygiene Division — Occupational Safety</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>H₂S DOSIMETRY EXPOSURE REPORT</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: 500, marginTop: '2px' }}>Shift Compliance Audit • Wristband Badge Colorimetric Analysis</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e60db' }}>
              DOC #{`H2S-RPT-${dateFrom.replace(/-/g, '')}`}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Generated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Prototype Simulation Warning Banner */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '8px 12px', fontSize: '11px', color: '#1e40af', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} />
          <span><strong>SIMULATION MODE:</strong> All dosimetry values generated by in-silico chemical kinetics model. Not measured from physical sensor hardware.</span>
        </div>

        {/* Report Metadata Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px', fontSize: '12px' }}>
          <div>
            <span style={{ color: '#64748b' }}>Facility:</span>
            <div style={{ fontWeight: 600 }}>Refinery Complex Alpha</div>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Report Period:</span>
            <div style={{ fontWeight: 600 }}>{dateFrom} to {dateTo}</div>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Badges Scanned:</span>
            <div style={{ fontWeight: 600 }}>{filtered.length} Wristbands</div>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Prepared By:</span>
            <div style={{ fontWeight: 600 }}>Chief Safety Officer (Admin)</div>
          </div>
        </div>

        {/* Main Report Table — all 14 fields */}
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700, whiteSpace: 'nowrap' }}>Worker ID</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Shift</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Date</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700, whiteSpace: 'nowrap' }}>Badge ID</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Validity</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700, whiteSpace: 'nowrap' }}>H₂S Exposure</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Duration</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700, whiteSpace: 'nowrap' }}>Est. Dose</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Conf.</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Temp</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>RH</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700, whiteSpace: 'nowrap' }}>Env. Corr.</th>
                <th style={{ padding: '8px 6px', color: '#475569', fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 6px', fontWeight: 600, color: '#1e293b' }}>{r.id}</td>
                  <td style={{ padding: '8px 6px' }}>{r.shift}</td>
                  <td style={{ padding: '8px 6px', color: '#64748b', whiteSpace: 'nowrap' }}>{r.dateTime}</td>
                  <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>{r.wristbandSerial}</td>
                  <td style={{ padding: '8px 6px' }}>
                    <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={12} /> {r.badgeStatus}
                    </span>
                  </td>
                  <td style={{ padding: '8px 6px', whiteSpace: 'nowrap' }}>{r.h2sExposure}</td>
                  <td style={{ padding: '8px 6px', whiteSpace: 'nowrap' }}>{r.exposureDuration}</td>
                  <td style={{ padding: '8px 6px', fontWeight: 700, color: '#0f172a' }}>{r.estimatedDose}</td>
                  <td style={{ padding: '8px 6px' }}>{r.confidence}%</td>
                  <td style={{ padding: '8px 6px' }}>{r.temperature}</td>
                  <td style={{ padding: '8px 6px' }}>{r.humidity}</td>
                  <td style={{ padding: '8px 6px', fontSize: '10px', color: '#64748b' }}>Applied</td>
                  <td style={{ padding: '8px 6px' }}>
                    <span className={`status-pill ${r.statusClass}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Auditor Verification */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginBottom: '16px', fontSize: '11px', color: '#64748b' }}>
          <div>
            <div>Electronic Signature Hash: SHA-256 (Simulation)</div>
            <div>Calibration Reference: 5-Step Lead Sulfide Scale v2.4</div>
            <div>Compensation Model: Arrhenius + Langmuir Isotherm</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>Digitally Certified by Safety Board</div>
            <div style={{ color: '#059669', fontWeight: 600 }}>Document Integrity: VERIFIED (Simulation)</div>
          </div>
        </div>

        {/* Mandatory Footer Disclaimer */}
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', padding: '10px 14px', fontSize: '12px', color: '#92400e', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Info size={16} color="#d97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>Prototype simulation data</strong> — laboratory validation required before operational use. This report is generated from a software simulation model and does not constitute a certified occupational exposure measurement.
          </span>
        </div>
      </div>
    </div>
  );
}
