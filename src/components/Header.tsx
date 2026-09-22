import React, { useState } from 'react';
import { Shield, RotateCcw, ShieldCheck, Lock, Menu, X } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  hasResults: boolean;
  onOpenThreatMap?: () => void;
  onOpenApiDocs?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  hasResults,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNewScan = () => {
    onReset();
    const inputElement = document.getElementById('scanner-input-section');
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="phishinspect-header"
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0c0d10]/92 backdrop-blur-xl transition-all"
    >
      {/* Consumer Trust & Privacy Banner */}
      <div
        id="consumer-trust-banner"
        className="w-full bg-gradient-to-r from-[#13151b]/95 via-[#181a22] to-[#13151b]/95 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-2 text-xs text-zinc-300 font-sans"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
            </span>
            <span className="font-semibold text-zinc-200">
              PhishInspect — Job Offer & Rental Scam Scanner
            </span>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="text-zinc-400 hidden md:inline">
              100% Free & Confidential Verification
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] self-start sm:self-auto">
            {/* Simple Status Chip: ● Protection Active */}
            <span
              id="chip-protection-active"
              className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Protection Active</span>
            </span>

            <span className="text-zinc-600 hidden sm:inline">•</span>

            <span className="inline-flex items-center space-x-1 text-zinc-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Zero Data Stored</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div id="brand-container" className="flex items-center space-x-3 flex-shrink-0">
          <a
            href="#"
            className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1"
          >
            <div
              id="brand-icon-wrapper"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-emerald-600 p-0.5 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105"
            >
              <div className="w-full h-full bg-[#0c0d10] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span
                  id="brand-title"
                  className="text-lg font-bold tracking-tight text-white font-sans flex items-center"
                >
                  Phish<span className="text-emerald-400">Inspect</span>
                </span>
                <span
                  id="brand-consumer-badge"
                  className="px-2 py-0.5 text-[11px] font-medium tracking-wide bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 rounded-full"
                >
                  Scam Shield
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Job Offer & Rental Scam Scanner
              </p>
            </div>
          </a>
        </div>

        {/* Center Consumer Nav Links */}
        <nav
          id="main-nav-links"
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-1 text-sm font-medium"
        >
          <a
            href="#scanner-input-section"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('scanner-input-section');
            }}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Scan Offer
          </a>

          <a
            href="#candidate-due-diligence-guide-section"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('candidate-due-diligence-guide-section');
            }}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Scam Guide
          </a>

          <a
            href="#official-threat-resource-hub"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('official-threat-resource-hub');
            }}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Report Fraud
          </a>
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div id="nav-actions-group" className="flex items-center space-x-2.5">
          {/* Primary CTA: Reset / New Scan */}
          <button
            id="btn-new-scan"
            type="button"
            onClick={handleNewScan}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:via-teal-500 hover:to-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="Start a fresh scam scan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset / New Scan</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-white/[0.06] bg-[#0c0d10] px-4 pt-3 pb-4 space-y-1 text-sm font-medium"
        >
          <button
            type="button"
            onClick={() => handleNavClick('scanner-input-section')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            Scan Offer
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('candidate-due-diligence-guide-section')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            Scam Guide
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('official-threat-resource-hub')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            Report Fraud
          </button>
        </div>
      )}
    </header>
  );
};
