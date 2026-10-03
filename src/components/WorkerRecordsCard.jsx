import React from 'react';
import { Users, Eye, Download } from 'lucide-react';

export default function WorkerRecordsCard({
  records,
  onSelectWorker,
  onViewAllRecords,
  onDownloadReport
}) {
  return (
    <div className="panel-card">
      <div className="worker-records-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={19} className="panel-icon" />
          <h3 className="panel-title">Recent Worker Records</h3>
        </div>
        <button className="btn-view-all" onClick={onViewAllRecords}>
          View All Records →
        </button>
      </div>

      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Name</th>
              <th>Shift</th>
              <th>Date & Time</th>
              <th>Estimated Dose (ppm·hr)</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.slice(0, 3).map((worker) => (
              <tr key={worker.id}>
                <td style={{ fontWeight: 600, color: '#1e293b' }}>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.shift}</td>
                <td style={{ color: '#64748b' }}>{worker.dateTime}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{worker.estimatedDose}</td>
                <td>{worker.confidence}%</td>
                <td>
                  <span className={`status-pill ${worker.statusClass}`}>
                    {worker.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns-row">
                    <button
                      className="record-action-btn"
                      onClick={() => onSelectWorker(worker)}
                      title="Inspect Dosimeter Scan & Spectral Profile"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="record-action-btn"
                      onClick={() => onDownloadReport(worker)}
                      title="Download Shift Exposure Certificate"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
