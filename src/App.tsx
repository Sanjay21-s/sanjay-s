import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ForensicDashboard } from './components/ForensicDashboard';
import { CandidateDiligenceGuide } from './components/CandidateDiligenceGuide';
import { DueDiligenceHub } from './components/DueDiligenceHub';
import { ScamTrendsHub } from './components/ScamTrendsHub';
import { RedFlagQuizSection } from './components/RedFlagQuizSection';
import { ThreatMapModal } from './components/ThreatMapModal';
import { ApiDocsModal } from './components/ApiDocsModal';
import { Footer } from './components/Footer';
import { ScanMode, ScanResult } from './types';
import { executeForensicScan } from './services/scanService';
import { AlertCircle, RefreshCw, Lock, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<ScanMode>('text');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [threatMapOpen, setThreatMapOpen] = useState<boolean>(false);
  const [apiDocsOpen, setApiDocsOpen] = useState<boolean>(false);

  const handleReset = () => {
    setContent('');
    setScanResult(null);
    setErrorMessage(null);
    setMode('text');
  };

  const handleClear = () => {
    setContent('');
    setErrorMessage(null);
  };

  const handleRunScan = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await executeForensicScan(mode, content.trim(), { isPreset: false });
      setScanResult(data);

      // Smooth scroll down to results
      setTimeout(() => {
        const resultsElement = document.getElementById('forensic-results-dashboard');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Scan execution error:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred during forensic scanning. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Immediate 1-click Preset runner
  const handleSelectAndScan = async (selectedMode: ScanMode, selectedContent: string) => {
    setMode(selectedMode);
    setContent(selectedContent);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await executeForensicScan(selectedMode, selectedContent.trim(), { isPreset: true });
      setScanResult(data);

      setTimeout(() => {
        const resultsElement = document.getElementById('forensic-results-dashboard');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Preset scan execution error:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred during forensic scanning. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="phishinspect-app"
      className="min-h-screen bg-[#0c0d10] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300 relative overflow-hidden"
    >
      {/* Ambient background glows - Emerald Aurora & Warm Amber */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[350px] bg-amber-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Navigation & Live Telemetry Bar */}
      <Header
        onReset={handleReset}
        hasResults={Boolean(scanResult)}
        onOpenThreatMap={() => setThreatMapOpen(true)}
        onOpenApiDocs={() => setApiDocsOpen(true)}
      />

      {/* Main Content Workspace */}
      <main id="main-content-workspace" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Consumer Welcome Hero Banner */}
        <section
          id="consumer-hero-banner"
          className="relative bg-gradient-to-b from-[#15171c]/95 to-[#0c0d10]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-xl"
          aria-labelledby="main-app-heading"
        >
          {/* Subtle Ambient Radial Highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/[0.08] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Private In-Browser Check</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Job Offer & Rental Scam Detection</span>
              </span>
            </div>

            <h1
              id="main-app-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Phish<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Inspect</span>: Job Offer & Rental Scam Scanner
            </h1>

            <p
              id="main-app-subheading"
              className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans"
            >
              Protect yourself against fake employment letters, advance-fee equipment scams, and rental deposit traps that slip past email spam filters. Paste any suspicious job offer, recruiter message, or lease to verify its legitimacy instantly.
            </p>
          </div>
        </section>

        {/* Section 1: Multi-Vector Scan Input Interface */}
        <InputSection
          mode={mode}
          setMode={setMode}
          content={content}
          setContent={setContent}
          onScan={handleRunScan}
          onSelectAndScan={handleSelectAndScan}
          isLoading={isLoading}
          onClear={handleClear}
        />

        {/* Error Notification Banner if any */}
        {errorMessage && (
          <div
            id="error-notification-banner"
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs text-rose-300 font-mono shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleRunScan}
              className="px-3.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 rounded-xl border border-rose-500/40 flex items-center space-x-1 cursor-pointer font-medium transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry Scan</span>
            </button>
          </div>
        )}

        {/* Section 2: Interactive Output Dashboard (Renders After Analysis) */}
        {scanResult && <ForensicDashboard result={scanResult} />}

        {/* Section 3: Interactive Checklist & Accordion "Candidate & Renter Due Diligence Guide" */}
        <CandidateDiligenceGuide />

        {/* Section 4: Compact, Clickable Security Due Diligence Hub (FTC, IC3, WHOIS) */}
        <DueDiligenceHub />

        {/* Section 5: Known Scam Directory & Threat Intelligence Hub */}
        <ScamTrendsHub />

        {/* Section 6: Interactive 6-Point Red Flag Checklist & Scam IQ Quiz */}
        <RedFlagQuizSection />
      </main>

      {/* Enterprise SOC Footer */}
      <Footer
        onOpenApiDocs={() => setApiDocsOpen(true)}
        onOpenThreatMap={() => setThreatMapOpen(true)}
      />

      {/* Interactive Tactical Radar Threat Map Modal */}
      <ThreatMapModal
        isOpen={threatMapOpen}
        onClose={() => setThreatMapOpen(false)}
      />

      {/* Interactive REST API Documentation Modal */}
      <ApiDocsModal
        isOpen={apiDocsOpen}
        onClose={() => setApiDocsOpen(false)}
      />
    </div>
  );
}
