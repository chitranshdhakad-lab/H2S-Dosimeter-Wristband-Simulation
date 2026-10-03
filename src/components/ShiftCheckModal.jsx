import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertOctagon, RotateCcw } from 'lucide-react';

export default function ShiftCheckModal({ isOpen, onClose, isExpired, onToggleExpiry }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={19} color="#10b981" />
            <h3>Pre-Shift Wristband Badge Inspection (Simulated)</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '13px', color: '#475569' }}>
            Before issuing the H₂S dosimeter wristband to a field worker, verify that the chemical indicators are valid and uncompromised.
          </p>

          {/* Checklist of inspection steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>1. Expiry Indicator Patch</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Must appear pink and uniform (unexpired)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: isExpired ? '#ef4444' : '#10b981' }}>
                  {isExpired ? 'EXPIRED' : 'VALID (PINK)'}
                </span>
                <button
                  onClick={onToggleExpiry}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#1e60db'
                  }}
                  title="Toggle between valid and expired states for testing"
                >
                  Test Toggle
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>2. Sensor Strip Baseline Freshness</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Must match step 0 (light beige #d5c2a5)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12px', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> Verified Baseline
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>3. Reference Calibration Scale</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>5 printed grayscale steps intact without scratches</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12px', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> 5/5 Swatches Clear
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              background: isExpired ? '#fef2f2' : '#ecfdf5',
              border: `1px solid ${isExpired ? '#fecaca' : '#a7f3d0'}`,
              fontSize: '12px',
              color: isExpired ? '#991b1b' : '#065f46',
              fontWeight: 600
            }}
          >
            {isExpired
              ? '❌ WARNING: Badge is EXPIRED! Do NOT deploy to worker in hazardous atmosphere.'
              : '✓ BADGE IS READY FOR DEPLOYMENT. Estimated lifespan: 58 days remaining.'}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Done
          </button>
          <button className="btn-primary" onClick={onClose}>
            Confirm Shift Sign-Out
          </button>
        </div>
      </div>
    </div>
  );
}
