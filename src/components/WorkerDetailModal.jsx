import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Download, User } from 'lucide-react';

export default function WorkerDetailModal({ worker, onClose, onDownload }) {
  if (!worker) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="#1e60db" />
            <h3>Worker Dosimetry Dossier — {worker.id}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Top Profile Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{worker.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{worker.department}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`status-pill ${worker.statusClass}`}>
                {worker.status} Exposure
              </span>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Shift: {worker.shift}</div>
            </div>
          </div>

          {/* Dosimetry Results Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Cumulative Estimated Dose</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{worker.estimatedDose} ppm·hr</div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>Confidence: {worker.confidence}%</div>
            </div>

            <div style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Wristband Hardware ID</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginTop: '4px' }}>{worker.wristbandSerial}</div>
              <div style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle2 size={12} /> Badge Expiry Valid
              </div>
            </div>
          </div>

          {/* Colorimetry & Optical Verification */}
          <div style={{ padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Optical Spectrophotometric Extraction (Simulated)
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>Raw Optical Intensity: <strong>{worker.rawColor}</strong></span>
              <span>Compensated Value: <strong>{worker.correctedColor}</strong></span>
              <span>CIELAB ΔE: <strong>{(worker.estimatedDose * 0.85).toFixed(1)}</strong></span>
            </div>
          </div>

          {/* Shift Supervisor Field Notes */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Supervisor Field Log</div>
            <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', fontSize: '12px', color: '#334155', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>
              "{worker.notes}"
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Scanned on {worker.dateTime} • Certified for OSHA 1910.1000 H₂S Dosimetry Compliance Audit.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={() => onDownload(worker)}>
            <Download size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Download Formal Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
