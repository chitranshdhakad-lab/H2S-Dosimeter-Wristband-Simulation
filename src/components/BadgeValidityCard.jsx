import React from 'react';
import { ShieldCheck, Calendar, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function BadgeValidityCard({ isExpired, onOpenShiftCheck }) {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <ShieldCheck size={20} className="panel-icon" />
        <h3 className="panel-title">Badge Validity (Expiry Patch)</h3>
      </div>

      {/* Dates Row */}
      <div className="validity-dates-row">
        <div className="validity-date-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Calendar size={13} color="#64748b" />
            <span>Manufactured On</span>
          </div>
          <div className="date-val">01 Sep 2026</div>
        </div>

        <div className="validity-date-block" style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '2px' }}>Valid Until</div>
          <div className="date-val" style={{ color: isExpired ? '#ef4444' : '#1e293b' }}>
            30 Nov 2026
          </div>
        </div>
      </div>

      {/* Validity Status Pill/Box */}
      <div
        className="badge-status-box"
        style={{
          background: isExpired ? '#fef2f2' : '#ecfdf5',
          borderColor: isExpired ? '#fecaca' : '#a7f3d0'
        }}
      >
        {isExpired ? (
          <AlertOctagon size={26} color="#dc2626" className="badge-status-icon" />
        ) : (
          <CheckCircle2 size={26} color="#059669" className="badge-status-icon" />
        )}
        <div>
          <div
            className="badge-status-title"
            style={{ color: isExpired ? '#991b1b' : '#065f46' }}
          >
            {isExpired ? 'EXPIRED BADGE' : 'VALID BADGE'}
          </div>
          <div
            className="badge-status-desc"
            style={{ color: isExpired ? '#b91c1c' : '#047857' }}
          >
            {isExpired
              ? 'Indicator chemistry expired. Discard badge immediately.'
              : 'Use this wristband for exposure measurement.'}
          </div>
        </div>
      </div>

      {/* Check Before Shift Action Button */}
      <button className="btn-check-shift" onClick={onOpenShiftCheck}>
        <Calendar size={14} />
        Check Before Shift
      </button>
    </div>
  );
}
