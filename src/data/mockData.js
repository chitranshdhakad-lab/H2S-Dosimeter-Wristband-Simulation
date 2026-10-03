export const INITIAL_WORKER_RECORDS = [
  {
    id: 'WRK-1042',
    name: 'Raj Kumar',
    shift: 'Night',
    dateTime: '03 Oct 2026, 22:43',
    estimatedDose: 24.8,
    confidence: 87,
    status: 'Moderate',
    statusClass: 'moderate',
    department: 'Desulfurization Unit B',
    wristbandSerial: 'H2S-WB-88219',
    badgeStatus: 'Valid',
    rawColor: 67,
    correctedColor: 61,
    notes: 'Routine maintenance near valve seal manifold.'
  },
  {
    id: 'WRK-1031',
    name: 'S. Patel',
    shift: 'Day',
    dateTime: '03 Oct 2026, 14:12',
    estimatedDose: 8.2,
    confidence: 91,
    status: 'Low',
    statusClass: 'low',
    department: 'Control Room / Perimeter',
    wristbandSerial: 'H2S-WB-88214',
    badgeStatus: 'Valid',
    rawColor: 84,
    correctedColor: 81,
    notes: 'Perimeter inspection walkthrough completed safely.'
  },
  {
    id: 'WRK-1018',
    name: 'A. Singh',
    shift: 'Night',
    dateTime: '02 Oct 2026, 23:10',
    estimatedDose: 41.6,
    confidence: 82,
    status: 'High',
    statusClass: 'high',
    department: 'Wastewater Treatment Pit #4',
    wristbandSerial: 'H2S-WB-88190',
    badgeStatus: 'Valid',
    rawColor: 42,
    correctedColor: 38,
    notes: 'Excursion detected during sludge transfer pump servicing.'
  },
  {
    id: 'WRK-1007',
    name: 'M. Chen',
    shift: 'Day',
    dateTime: '02 Oct 2026, 11:45',
    estimatedDose: 14.5,
    confidence: 89,
    status: 'Moderate',
    statusClass: 'moderate',
    department: 'Catalytic Cracker #2',
    wristbandSerial: 'H2S-WB-88155',
    badgeStatus: 'Valid',
    rawColor: 72,
    correctedColor: 68,
    notes: 'Flange tightening in ventilated bay.'
  },
  {
    id: 'WRK-1055',
    name: 'P. Sharma',
    shift: 'Night',
    dateTime: '01 Oct 2026, 20:30',
    estimatedDose: 29.4,
    confidence: 85,
    status: 'Moderate',
    statusClass: 'moderate',
    department: 'Sour Gas Flare Stack #1',
    wristbandSerial: 'H2S-WB-88201',
    badgeStatus: 'Valid',
    rawColor: 62,
    correctedColor: 57,
    notes: 'Burner tip inspection. Required secondary SCBA standby.'
  }
];

export const INITIAL_TREND_DATA = [
  { date: 'Sep 28', dose: 9.2, workers: 14, status: 'Low' },
  { date: 'Sep 29', dose: 23.5, workers: 18, status: 'Moderate' },
  { date: 'Sep 30', dose: 12.1, workers: 16, status: 'Moderate' },
  { date: 'Oct 01', dose: 29.4, workers: 21, status: 'Moderate' },
  { date: 'Oct 02', dose: 46.8, workers: 19, status: 'High' },
  { date: 'Oct 03', dose: 24.8, workers: 22, status: 'Moderate' }
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'High Dose Threshold Alert',
    desc: 'Worker WRK-1018 logged 41.6 ppm·hr in Wastewater Pit #4 (Simulation)',
    time: 'Yesterday',
    urgent: true
  },
  {
    id: 2,
    title: 'Badge Batch Expiry Check',
    desc: 'Batch #WB-2026-Q3 valid through 30 Nov 2026.',
    time: '2 hours ago',
    urgent: false
  },
  {
    id: 3,
    title: 'Camera Calibration Verified',
    desc: 'Optical white balance and CIE CIELAB converter operational.',
    time: '5 hours ago',
    urgent: false
  }
];
