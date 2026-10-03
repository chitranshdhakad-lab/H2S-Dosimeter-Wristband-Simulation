import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import TopKpis from './components/TopKpis.jsx';
import ExposureSimulatorPanel from './components/ExposureSimulatorPanel.jsx';
import VirtualWristbandPanel from './components/VirtualWristbandPanel.jsx';
import ScanAnalysisPanel from './components/ScanAnalysisPanel.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
import WhatIfExposureLab from './components/WhatIfExposureLab.jsx';
import DoseResponseModule from './components/DoseResponseModule.jsx';
import SafetyDecisionEngine from './components/SafetyDecisionEngine.jsx';
import EstimatedExposureCard from './components/EstimatedExposureCard.jsx';
import BadgeValidityCard from './components/BadgeValidityCard.jsx';
import EnvironmentalCompCard from './components/EnvironmentalCompCard.jsx';
import WorkerRecordsCard from './components/WorkerRecordsCard.jsx';
import DoseTrendCard from './components/DoseTrendCard.jsx';
import WorkerDetailModal from './components/WorkerDetailModal.jsx';
import ShiftCheckModal from './components/ShiftCheckModal.jsx';

import ExposureSimulatorView from './views/ExposureSimulatorView.jsx';
import ScanWristbandView from './views/ScanWristbandView.jsx';
import WorkerRecordsView from './views/WorkerRecordsView.jsx';
import AnalyticsView from './views/AnalyticsView.jsx';
import ReportsView from './views/ReportsView.jsx';
import ExposureReportView from './views/ExposureReportView.jsx';
import PrototypeValidationView from './views/PrototypeValidationView.jsx';
import SettingsView from './views/SettingsView.jsx';

import { calculateSimulationState } from './utils/simulationModel.js';
import { INITIAL_WORKER_RECORDS, INITIAL_TREND_DATA } from './data/mockData.js';
import './styles/dashboard.css';

export default function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState('dashboard');

  // Environmental and Gas Simulation State
  const [concentration, setConcentration] = useState(2.4); // ppm
  const [exposureTime, setExposureTime] = useState(3.7); // hours
  const [temperature, setTemperature] = useState(31); // °C
  const [humidity, setHumidity] = useState(68); // %

  // Simulation Running State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  // Seconds elapsed: default 3h 42m 15s = 13335s
  const [totalSeconds, setTotalSeconds] = useState(13335);

  // Badge Status
  const [isExpired, setIsExpired] = useState(false);

  // Workers & Trend Data
  const [records, setRecords] = useState(INITIAL_WORKER_RECORDS);
  const [trendData, setTrendData] = useState(INITIAL_TREND_DATA);

  // Modals
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showShiftCheck, setShowShiftCheck] = useState(false);

  // Compute live physics and color model
  const simState = calculateSimulationState(
    concentration,
    exposureTime,
    temperature,
    humidity
  );

  // Format hh:mm:ss string
  const formatDuration = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer effect when simulation is active
  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const nextSecs = prev + simSpeed;
          // Synchronize hours slider smoothly
          const currentHours = Number((nextSecs / 3600).toFixed(1));
          if (currentHours <= 8.0) {
            setExposureTime(currentHours);
          }
          return nextSecs;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, simSpeed]);

  const handleToggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setConcentration(2.4);
    setExposureTime(3.7);
    setTemperature(31);
    setHumidity(68);
    setTotalSeconds(13335);
    setIsExpired(false);
  };

  const handleDownloadReport = (worker) => {
    alert(`Downloading formal OSHA compliance exposure report for ${worker.name} (${worker.id})...`);
  };

  const handleBadgeSelectedFromScanner = (badge) => {
    if (badge.isExpired !== undefined) {
      setIsExpired(badge.isExpired);
    }
  };

  return (
    <div className="app-container">
      {/* Dark Navy Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="app-main">
        {/* Top Header with Simulation Mode Warning */}
        <Header onResetSimulation={handleResetSimulation} />

        {/* Page Workspace */}
        <div className="workspace-content">
          {activeView === 'dashboard' && (
            <>
              {/* Top 4 KPI Cards */}
              <TopKpis
                concentration={concentration}
                durationStr={formatDuration(totalSeconds)}
                temperature={temperature}
                humidity={humidity}
              />

              {/* Main Section: 3 Large Panels */}
              <section className="main-three-panels">
                {/* Panel 1: Exposure Simulator */}
                <ExposureSimulatorPanel
                  concentration={concentration}
                  setConcentration={setConcentration}
                  exposureTime={exposureTime}
                  setExposureTime={setExposureTime}
                  temperature={temperature}
                  setTemperature={setTemperature}
                  humidity={humidity}
                  setHumidity={setHumidity}
                  isSimulating={isSimulating}
                  onToggleSimulation={handleToggleSimulation}
                  onResetSimulation={handleResetSimulation}
                  simSpeed={simSpeed}
                  setSimSpeed={setSimSpeed}
                />

                {/* Panel 2: Virtual Wristband */}
                <VirtualWristbandPanel
                  stripColor={simState.stripColor}
                  estimatedDose={simState.estimatedDose}
                  normalizedDose={simState.normalizedDose}
                  isExpired={isExpired}
                />

                {/* Panel 3: Scan & Analysis */}
                <ScanAnalysisPanel
                  cielab={simState.cielab}
                  stripColor={simState.stripColor}
                  estimatedDose={simState.estimatedDose}
                  onBadgeSelected={handleBadgeSelectedFromScanner}
                />
              </section>

              {/* NEW MODULE: Safety Decision Engine */}
              <SafetyDecisionEngine
                estimatedDose={simState.estimatedDose}
                isExpired={isExpired}
                temperature={temperature}
                humidity={humidity}
                confidence={simState.confidence}
              />

              {/* NEW SECTION: How It Works Flow Pipeline */}
              <HowItWorksSection
                concentration={concentration}
                durationStr={formatDuration(totalSeconds)}
                estimatedDose={simState.estimatedDose}
                rawColorVal={simState.rawColorVal}
                stripColor={simState.stripColor}
                isSimulating={isSimulating}
              />

              {/* NEW MODULE: Scientific Dose Response Analytics */}
              <DoseResponseModule
                concentration={concentration}
                exposureTime={exposureTime}
                estimatedDose={simState.estimatedDose}
                isSimulating={isSimulating}
              />

              {/* NEW MODULE: What-If Exposure Lab */}
              <WhatIfExposureLab />

              {/* Bottom Section: Row 1 (Exposure, Badge Validity, Compensation) */}
              <section className="bottom-three-panels">
                <EstimatedExposureCard
                  estimatedDose={simState.estimatedDose}
                  confidence={simState.confidence}
                  normalizedDose={simState.normalizedDose}
                  alertTitle={simState.alertTitle}
                  alertDesc={simState.alertDesc}
                  alertType={simState.alertType}
                />

                <BadgeValidityCard
                  isExpired={isExpired}
                  onOpenShiftCheck={() => setShowShiftCheck(true)}
                />

                <EnvironmentalCompCard
                  rawColorVal={simState.rawColorVal}
                  correctedColorVal={simState.correctedColorVal}
                />
              </section>

              {/* Bottom Section: Row 2 (Worker Records & Dose Trend Chart) */}
              <section className="bottom-two-panels">
                <WorkerRecordsCard
                  records={records}
                  onSelectWorker={(w) => setSelectedWorker(w)}
                  onViewAllRecords={() => setActiveView('workers')}
                  onDownloadReport={handleDownloadReport}
                />

                <DoseTrendCard trendData={trendData} />
              </section>
            </>
          )}

          {activeView === 'how_it_works' && (
            <HowItWorksSection
              concentration={concentration}
              durationStr={formatDuration(totalSeconds)}
              estimatedDose={simState.estimatedDose}
              rawColorVal={simState.rawColorVal}
              stripColor={simState.stripColor}
              isSimulating={isSimulating}
            />
          )}

          {activeView === 'what_if_lab' && (
            <WhatIfExposureLab />
          )}

          {activeView === 'simulator' && (
            <ExposureSimulatorView
              concentration={concentration}
              setConcentration={setConcentration}
              exposureTime={exposureTime}
              setExposureTime={setExposureTime}
              temperature={temperature}
              setTemperature={setTemperature}
              humidity={humidity}
              setHumidity={setHumidity}
              isSimulating={isSimulating}
              onToggleSimulation={handleToggleSimulation}
              onResetSimulation={handleResetSimulation}
              estimatedDose={simState.estimatedDose}
              stripColor={simState.stripColor}
              cielab={simState.cielab}
            />
          )}

          {activeView === 'scan' && (
            <ScanWristbandView
              cielab={simState.cielab}
              stripColor={simState.stripColor}
              estimatedDose={simState.estimatedDose}
              rawColorVal={simState.rawColorVal}
              correctedColorVal={simState.correctedColorVal}
            />
          )}

          {activeView === 'workers' && (
            <WorkerRecordsView
              records={records}
              onSelectWorker={(w) => setSelectedWorker(w)}
              onDownloadReport={handleDownloadReport}
            />
          )}

          {activeView === 'analytics' && <AnalyticsView />}

          {activeView === 'reports' && <ReportsView records={records} />}

          {activeView === 'exposure_report' && <ExposureReportView records={records} />}

          {activeView === 'validation' && <PrototypeValidationView />}

          {activeView === 'settings' && (
            <SettingsView onResetSimulation={handleResetSimulation} />
          )}
        </div>
      </main>

      {/* Modals */}
      <WorkerDetailModal
        worker={selectedWorker}
        onClose={() => setSelectedWorker(null)}
        onDownload={handleDownloadReport}
      />

      <ShiftCheckModal
        isOpen={showShiftCheck}
        onClose={() => setShowShiftCheck(false)}
        isExpired={isExpired}
        onToggleExpiry={() => setIsExpired(!isExpired)}
      />
    </div>
  );
}
