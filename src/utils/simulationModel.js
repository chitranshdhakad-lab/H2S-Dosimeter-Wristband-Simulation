// Physics and Chemical Dosimetry Calculation Engine (Software Simulation Model)

export function calculateSimulationState(concentration, exposureTime, temperature, humidity) {
  // Base nominal dose
  const nominalProduct = concentration * exposureTime;
  
  // Arrhenius Temperature Compensation (+1.8% per °C above 25°C)
  const tempFactor = 1 + (temperature - 25) * 0.018;
  
  // Humidity Swelling Factor (+0.25% per %RH above 50%RH)
  const humidityFactor = 1 + (humidity - 50) * 0.0025;
  
  // Base scale calibration constant to align 2.4 ppm & 3.7 hrs at 31°C/68%RH to exactly 24.8 ppm·hr
  const baselineProduct = 2.4 * 3.7; // 8.88
  const baselineFactors = (1 + 6 * 0.018) * (1 + 18 * 0.0025); // ~1.1578
  const scaleConstant = 24.8 / (baselineProduct * baselineFactors); // ~2.412
  
  const estimatedDose = Number((nominalProduct * tempFactor * humidityFactor * scaleConstant).toFixed(1));
  
  // Dose ratio (0 to 1 normalized against 50 ppm·hr threshold)
  const normalizedDose = Math.min(1.0, estimatedDose / 50.0);
  
  // Optical Density & Color Value calculations
  // Fresh strip raw value ~ 92, saturated ~ 20. At 24.8 ppm·hr, Raw = 67, Corrected = 61
  const rawColorVal = Math.round(92 - (normalizedDose * 50));
  const correctedColorVal = Math.round(rawColorVal - (temperature - 25) * 0.6 - (humidity - 50) * 0.15);
  
  // CIELAB color computation
  const L = Number((79.2 - normalizedDose * 55).toFixed(1));
  const a = Number((4.8 + Math.sin(normalizedDose * Math.PI) * 14.5).toFixed(1));
  const b = Number((16.5 + Math.sin(normalizedDose * Math.PI * 0.8) * 16.0).toFixed(1));
  const deltaE = Number((normalizedDose * 42.5).toFixed(1));
  
  // Dynamic CSS Hex Color for virtual strip
  const { rgbString, r, g, b: bCol } = getStripRgb(normalizedDose);
  
  // Status categorization
  let status = 'Moderate';
  let statusClass = 'moderate';
  let alertTitle = 'Moderate Exposure';
  let alertDesc = 'Exposure above recommended long-term limit (simulation).';
  let alertType = 'warning';
  
  if (estimatedDose < 10.0) {
    status = 'Low';
    statusClass = 'low';
    alertTitle = 'Low Exposure';
    alertDesc = 'Exposure within standard permissible shift threshold (simulation).';
    alertType = 'safe';
  } else if (estimatedDose > 30.0) {
    status = 'High';
    statusClass = 'high';
    alertTitle = 'High Exposure';
    alertDesc = 'Exposure exceeds critical action limit! Evacuate work area (simulation).';
    alertType = 'danger';
  }
  
  // Confidence calculation (varies slightly based on environmental stability)
  const confidence = Math.min(96, Math.max(78, Math.round(90 - Math.abs(temperature - 25) * 0.3 - Math.abs(humidity - 50) * 0.1)));
  
  return {
    estimatedDose,
    normalizedDose,
    rawColorVal,
    correctedColorVal,
    stripColor: rgbString,
    rawRgb: { r, g, b: bCol },
    rawRgbString: rgbString,
    cielab: { L, a, b, deltaE },
    confidence,
    status,
    statusClass,
    alertTitle,
    alertDesc,
    alertType
  };
}

export function calculateWhatIfScenario({
  concentration = 2.4,
  exposureTime = 3.7,
  temperature = 31,
  humidity = 68,
  lighting = 'standard', // 'standard', 'dim', 'daylight', 'glare'
  badgeAgeDays = 32, // < 90 valid, >= 90 expired
  startingColorOffset = 0 // ppm·hr offset (0=pristine, 3=lightly aged, 12=pre-exposed)
}) {
  // Base kinetics with starting offset
  const nominalProduct = concentration * exposureTime;
  const tempFactor = 1 + (temperature - 25) * 0.018;
  const humidityFactor = 1 + (humidity - 50) * 0.0025;
  const scaleConstant = 2.412;

  let totalDose = (nominalProduct * tempFactor * humidityFactor * scaleConstant) + startingColorOffset;
  totalDose = Number(Math.max(0, totalDose).toFixed(1));

  const normalizedDose = Math.min(1.0, totalDose / 50.0);

  // Raw color before optical correction (affected by lighting)
  let { r, g, b: bCol } = getStripRgb(normalizedDose);

  // Apply lighting effect on RAW values before CV correction
  let rawR = r;
  let rawG = g;
  let rawB = bCol;
  let lightingCorrectionNotes = 'Standard D65 reference white-balance applied.';
  let confidencePenalty = 0;

  if (lighting === 'dim') {
    // Warm, low-lux incandescent shift
    rawR = Math.min(255, Math.round(r * 0.85 + 20));
    rawG = Math.round(g * 0.75);
    rawB = Math.round(bCol * 0.65);
    lightingCorrectionNotes = 'Dim 2700K illumination: reference scale boosted blue gain +18%.';
    confidencePenalty += 8;
  } else if (lighting === 'daylight') {
    // Cool 6500K overcast shift
    rawR = Math.round(r * 0.9);
    rawG = Math.round(g * 0.95);
    rawB = Math.min(255, Math.round(bCol * 1.15));
    lightingCorrectionNotes = 'Overcast 6500K daylight: color temperature normalized to D65.';
    confidencePenalty += 3;
  } else if (lighting === 'glare') {
    // Specular reflection / high lux
    rawR = Math.min(255, Math.round(r * 1.25 + 30));
    rawG = Math.min(255, Math.round(g * 1.25 + 30));
    rawB = Math.min(255, Math.round(bCol * 1.25 + 30));
    lightingCorrectionNotes = 'Specular glare detected: polarizing filter algorithm filtered 42% noise.';
    confidencePenalty += 14;
  }

  // Corrected CIELAB after reference scale calibration
  const L = Number((79.2 - normalizedDose * 55).toFixed(1));
  const a = Number((4.8 + Math.sin(normalizedDose * Math.PI) * 14.5).toFixed(1));
  const b = Number((16.5 + Math.sin(normalizedDose * Math.PI * 0.8) * 16.0).toFixed(1));
  const deltaE = Number((normalizedDose * 42.5).toFixed(1));

  // Badge validity
  const isValidBadge = badgeAgeDays < 90;
  const badgeValidity = isValidBadge ? 'VALID BADGE' : 'EXPIRED';

  if (!isValidBadge) {
    confidencePenalty += 20;
  }

  // Environmental stability penalty
  if (humidity > 85) confidencePenalty += 6;
  if (temperature > 40 || temperature < 5) confidencePenalty += 5;

  let baseConf = 92;
  const confidence = Math.max(52, Math.min(96, baseConf - confidencePenalty));

  // Final exposure status
  let status = 'Moderate';
  let statusClass = 'moderate';
  if (totalDose < 10.0) {
    status = 'Low';
    statusClass = 'low';
  } else if (totalDose > 30.0) {
    status = 'High';
    statusClass = 'high';
  }

  return {
    concentration,
    exposureTime,
    temperature,
    humidity,
    lighting,
    badgeAgeDays,
    badgeValidity,
    isValidBadge,
    sensorStripColor: `rgb(${r}, ${g}, ${bCol})`,
    rawRgb: { r: rawR, g: rawG, b: rawB },
    rawRgbString: `rgb(${rawR}, ${rawG}, ${rawB})`,
    correctedCielab: { L, a, b, deltaE },
    estimatedDose: totalDose,
    confidence,
    status,
    statusClass,
    lightingCorrectionNotes
  };
}

function getStripRgb(t) {
  const clamped = Math.max(0, Math.min(1, t));
  let r, g, b;
  if (clamped <= 0.5) {
    const factor = clamped / 0.5;
    r = Math.round(215 + factor * (122 - 215));
    g = Math.round(195 + factor * (77 - 195));
    b = Math.round(168 + factor * (37 - 168));
  } else {
    const factor = (clamped - 0.5) / 0.5;
    r = Math.round(122 + factor * (26 - 122));
    g = Math.round(77 + factor * (16 - 77));
    b = Math.round(37 + factor * (9 - 37));
  }
  return {
    r,
    g,
    b,
    rgbString: `rgb(${r}, ${g}, ${b})`
  };
}
