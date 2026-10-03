# H₂S Dosimeter Wristband – Simulation Prototype

> **SIMULATION MODE – Virtual environment • No real hardware**  
> *Notice: This dashboard is a software simulation and prototype engineering model. Simulated values are generated via in-silico chemical reaction kinetics (lead acetate / lead sulfide PbS formation) and environmental compensation equations, not physical sensor hardware.*

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Status: Prototype](https://img.shields.io/badge/Validation-Simulation%20Only-orange.svg)](#)

---

## 🌟 Overview

An industrial safety-tech simulation dashboard built for evaluating the **H₂S Dosimeter Wristband** concept. The platform models chemical indicator strip kinetics under variable ambient conditions ($H_2S$ concentration, shift duration, ambient temperature, and relative humidity) and simulates a computer-vision spectrophotometric mobile scanning pipeline.

---

## 🔬 Core Features & Modules

### 1. **Interactive Camera Scanner (`Scan Wristband`)**
* **Optical Viewfinder**: Viewport targeting brackets, alignment guidance ("Align wristband inside frame"), and real-time laser scanning bar animation.
* **7-Stage CV Analysis Pipeline**:
  1. Detecting wristband boundary
  2. Detecting lead acetate sensor strip
  3. Detecting 5-step reference scale
  4. Ambient lighting & white-balance verification
  5. Applying temperature & humidity color correction (Arrhenius compensation)
  6. Estimating cumulative $H_2S$ dose
  7. Generating confidence interval band
* **Predefined Sample Exposures**: One-click toggles for Low, Moderate, High, and Expired badge presets.
* **Camera Disclaimer**: Prominently marked **SIMULATED CAMERA** with no real hardware dependencies.

### 2. **Dose Response Analytics (`Analytics`)**
* **Dual Synchronized SVG Charts**:
  * **H₂S Concentration vs. Time**: Transient gas concentration profiles with OSHA PEL (10 ppm), STEL (15 ppm), and IDLH (100 ppm) alarm thresholds.
  * **Cumulative Exposure Dose vs. Time**: Progressive accumulation with safe, action, and critical occupational limit lines.
* **Synchronized Hover Crosshairs**: Inspect precise time slices across both metrics concurrently.

### 3. **Safety Decision Engine**
* **Automated Rule Categorization**:
  * 🟢 **NORMAL** (&lt;10 ppm·hr): Shift complete, nominal limits.
  * 🟡 **MONITOR** (10–30 ppm·hr): Increased medical surveillance, check ventilation.
  * 🔴 **HIGH RISK** (&gt;30 ppm·hr): Mandatory respirator check, immediate medical evaluation.
  * ⚠️ **BADGE INVALID**: Expiry exceeded, uncalibrated readings.
* **Actionable Recommendations**: Clear administrative protocols, shift handoff summaries, and detailed rule evaluation breakdowns.

### 4. **How It Works Section**
* **Interactive Chemical Pipeline**:
  $$\text{H}_2\text{S Exposure} \rightarrow \text{Lead Acetate Strip} \rightarrow \text{PbS Formation} \rightarrow \text{Color Change} \rightarrow \text{Camera Scan} \rightarrow \text{Color Correction} \rightarrow \text{Dose Estimation} \rightarrow \text{Worker Record}$$
* **Live Chemical Reaction**: $\text{Pb(CH}_3\text{COO)}_2 + \text{H}_2\text{S} \rightarrow \text{PbS} + 2\text{CH}_3\text{COOH}$
* **Dynamic Darkening Visualization**: Watch the virtual sensor strip shift from light cream to dark brown/black as cumulative dose rises.

### 5. **What-If Exposure Lab**
* **Sensitivity Analysis Sandbox**: Real-time sliders for concentration (0–10 ppm), shift time (0–8 hrs), temperature (0–50 °C), humidity (0–100% RH), and badge shelf age (0–180 days).
* **Preset Scenarios**:
  * High Humidity Tropical Shift (+35 °C, 88% RH)
  * Expired Badge Near Excursion (120 days old, 6.5 ppm)
  * Flash Concentration Spike (9.0 ppm, 2 hrs)
  * Cool Dry Winter Baseline (15 °C, 30% RH)

### 6. **Industrial Safety Exposure Report (`Reports`)**
* **Officer Audit Controls**: Filter by worker, shift, date range, or risk tier.
* **Formal 14-Column Ledger**: Worker ID, Shift, Date, Badge ID, Validity, Simulated Exposure, Duration, Cumulative Dose, Confidence, Temperature, Humidity, Environmental Correction, and Final Status.
* **Data Export**:
  * **EXPORT CSV**: Client-side dynamic CSV generation.
  * **GENERATE PDF**: Printable compliance audit format with digital certification simulation.

### 7. **Prototype Validation Matrix**
* **Three-Column Benchmark Comparison**:
  1. **Published Reference**: Basic strip (~5 ppm), passive benchmark (0.2 ppm TWA ±20%), nanofiber LOD (0.02 ppm).
  2. **Our Simulation**: Langmuir adsorption model, Arrhenius temperature dependence (+1.8%/°C), relative humidity baseline (+0.25%/%RH), CIE-L*a*b* conversion.
  3. **Future Lab Validation**: Gas chamber test requirements (1–50 ppm), environmental matrices, NIOSH 6013/ISO 17621 protocols, spectrophotometer calibration.
* **NOT LAB-VALIDATED Banner**: Explicit legal and technical disclaimers.

---

## 🛠️ Tech Stack

* **Framework**: React 18
* **Build Tool**: Vite 5
* **Styling**: Vanilla CSS (Tailored Industrial Safety Theme, glassmorphism, clean typography)
* **Icons**: `lucide-react`
* **Zero Heavy External Chart Dependencies**: Custom performant SVG rendering for instantaneous responsiveness.

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [npm](https://www.npmjs.com/)

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/chitranshdhakad-lab/H2S-Dosimeter-Wristband-Simulation.git
cd H2S-Dosimeter-Wristband-Simulation

# Install dependencies
npm install

# Start development server
npm run dev
```

Alternatively on Windows, double-click **`start.bat`** to start the dev server directly.

Open your browser at:
`http://localhost:5174/`

---

## ⚠️ Important Disclaimer

This software is an engineering and scientific simulation prototype developed for academic and conceptual evaluation. It is **NOT** a certified medical device, does not provide medical diagnoses, and cannot replace certified occupational safety equipment (such as active gas detectors or certified NIOSH/OSHA passive samplers). Physical deployment requires controlled laboratory gas chamber validation.
