import React from 'react';
import { ShieldCheck, Terminal, ExternalLink, AlertTriangle, Shield, Database } from 'lucide-react';
import { TELEMETRY_METRICS } from '../data/threatIntel';

interface FooterProps {
  onOpenApiDocs: () => void;
  onOpenThreatMap: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApiDocs, onOpenThreatMap }) => {
  return (
    <footer
      id="enterprise-soc-footer"
      className="w-full border-t border-white/[0.08] bg-[#090a0d] text-zinc-400 text-xs mt-16 pt-12 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top 4-Column Macro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Threat Telemetry Summary */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Phish<span className="text-emerald-400">Inspect</span></span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Automated cyber-defense heuristics protecting job seekers, renters, and consumers against advance-fee scams and deceptive domain infrastructure.
            </p>
            <div className="text-xs text-zinc-400 pt-1 space-y-1 font-mono">
              <div>Engine Signature: <span className="text-emerald-400 font-semibold">HEURISTICS-{TELEMETRY_METRICS.dbVersion}</span></div>
              <div>Active Signatures: <span className="text-zinc-200">{TELEMETRY_METRICS.activeThreatSignatures.toLocaleString()}</span></div>
            </div>
          </div>

          {/* Col 2: Documentation & Developer Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Developer & API</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenApiDocs}
                  className="group flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="relative">
                    API Reference v1
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenThreatMap}
                  className="group flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="relative">
                    Live Threat Radar Map
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </li>
              <li>
                <a
                  href="#candidate-due-diligence-guide-section"
                  className="group flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    Due Diligence Guide
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </li>
              <li>
                <a
                  href="#official-threat-resource-hub"
                  className="group flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    Scam Reporting Hub
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Incident Escalation & Regulatory Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Incident Escalation</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://reportfraud.ftc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    FTC Report Fraud Portal
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cisa.gov/report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    CISA Incident Response
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ic3.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    FBI Crime Complaint (IC3)
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://apwg.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    Anti-Phishing Working Group
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Open-Source Threat Feeds & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Threat Intelligence</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.virustotal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    VirusTotal Intelligence
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://transparencyreport.google.com/safe-browsing/search"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    Google Safe Browsing
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://lookup.icann.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    ICANN Registration Data
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Educational Disclaimer Box */}
        <div
          id="educational-disclaimer-box"
          className="bg-black/30 border border-white/[0.08] rounded-2xl p-4 text-xs text-zinc-400 space-y-1.5"
        >
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Operational & Educational Security Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            PhishInspect is an automated defensive heuristics scanner intended for proactive threat identification, consumer awareness, and educational risk assessment. Threat scores reflect structural indicators such as lookalike TLDs, advance-fee reimbursement language, and anonymous communication channels. Always cross-verify formal employment offers and real estate contracts via official, independent institutional channels.
          </p>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © 2026 PhishInspect Security. Client-side sandboxed. Zero telemetry retained.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-zinc-400 transition-colors">Privacy Shield Compliant</span>
            <span>•</span>
            <span className="hover:text-zinc-400 transition-colors">Client-Side Heuristics</span>
            <span>•</span>
            <span className="hover:text-zinc-400 transition-colors">Zero-Log Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
