import React, { useState } from 'react';
import { Users, Search, Filter, Download, Eye, Plus } from 'lucide-react';

export default function WorkerRecordsView({
  records,
  onSelectWorker,
  onDownloadReport
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = records.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift = shiftFilter === 'All' || w.shift === shiftFilter;
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesShift && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={22} color="#1e60db" />
            Worker Dosimetry Roster & Registry
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Track simulated daily occupational H₂S exposures across all refinery sectors and shifts.
          </p>
        </div>
        <button
          onClick={() => alert('Worker badge registration simulated.')}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            background: '#1e60db',
            color: 'white',
            border: 'none',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={16} />
          Register New Badge
        </button>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by worker name, ID (e.g. WRK-1042)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <span style={{ color: '#64748b' }}>Shift:</span>
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
          >
            <option value="All">All Shifts</option>
            <option value="Day">Day Shift</option>
            <option value="Night">Night Shift</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <span style={{ color: '#64748b' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Low">Low (&lt;10)</option>
            <option value="Moderate">Moderate (10–30)</option>
            <option value="High">High (&gt;30)</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', overflowX: 'auto' }}>
        <table className="records-table">
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Shift</th>
              <th>Date & Time</th>
              <th>Estimated Dose</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((worker) => (
              <tr key={worker.id}>
                <td style={{ fontWeight: 600, color: '#1e293b' }}>{worker.id}</td>
                <td>{worker.name}</td>
                <td style={{ color: '#64748b' }}>{worker.department}</td>
                <td>{worker.shift}</td>
                <td style={{ color: '#64748b' }}>{worker.dateTime}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{worker.estimatedDose} ppm·hr</td>
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
                      title="Inspect Dosimeter Scan"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="record-action-btn"
                      onClick={() => onDownloadReport(worker)}
                      title="Download Certificate"
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
