import React from 'react';
import InteractiveScanner from '../components/InteractiveScanner.jsx';

export default function ScanWristbandView({
  cielab,
  stripColor,
  estimatedDose,
  rawColorVal,
  correctedColorVal
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <InteractiveScanner
        initialBadgeId="moderate"
      />
    </div>
  );
}
