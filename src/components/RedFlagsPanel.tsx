import React from 'react';
import { ShieldAlert, AlertOctagon, Zap, Server, CheckCircle2, Quote, AlertTriangle } from 'lucide-react';
import { RedFlagItem } from '../types';

interface RedFlagsPanelProps {
  redFlags: RedFlagItem[];
}

export const RedFlagsPanel: React.FC<RedFlagsPanelProps> = ({ redFlags }) => {
  const getCategoryIcon = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('payment') || catLower.includes('check') || catLower.includes('deposit')) {
      return <AlertOctagon className="w-4 h-4 text-rose-400" />;
    }
    if (catLower.includes('domain') || catLower.includes('infrastructure') || catLower.includes('webmail')) {
      return <Server className="w-4 h-4 text-indigo-400" />;
    }
    return <Zap className="w-4 h-4 text-amber-400" />;
  };

  const getSeverityBadge = (severity: string) => {
    const sev = severity.toUpperCase();
    if (sev === 'CRITICAL') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20">
          Critical Severity
        </span>
      );
    }
    if (sev === 'HIGH') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
          High Risk
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/[0.06] text-slate-300 border border-white/[0.08]">
        Moderate Cue
      </span>
    );
  };

  return (
    <div
      id="panel-detected-red-flags"
      className="rounded-3xl p-6 sm:p-7 bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 flex flex-col justify-between"
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Evidence Catalog
              </span>
              <h3
                id="title-red-flags"
                className="text-base font-bold text-white tracking-tight"
              >
                Detected Threat Signatures
              </h3>
            </div>
          </div>
          <span
            id="count-red-flags"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-300"
          >
            {redFlags.length} {redFlags.length === 1 ? 'Indicator' : 'Indicators'}
          </span>
        </div>

        {/* Content Area */}
        {redFlags.length === 0 ? (
          <div
            id="empty-red-flags-state"
            className="flex flex-col items-center justify-center py-10 px-4 text-center bg-black/20 border border-white/[0.06] rounded-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-emerald-300">
              Zero Malicious Signatures Detected
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
              No advance-fee check demands, sight-unseen escrow traps, or disposable webmail patterns were detected.
            </p>
          </div>
        ) : (
          <div id="red-flags-list" className="space-y-3">
            {redFlags.map((flag, idx) => (
              <div
                key={idx}
                id={`card-red-flag-${idx}`}
                className="bg-black/25 border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-4 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(flag.category)}
                    <span className="text-xs font-bold tracking-wide text-white">
                      {flag.category}
                    </span>
                  </div>
                  {getSeverityBadge(flag.severity)}
                </div>

                {/* Snippet Evidence */}
                {flag.evidenceSnippet && (
                  <div className="flex items-start space-x-2 my-2.5 px-3 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-rose-300/90">
                    <Quote className="w-3.5 h-3.5 text-rose-400/60 flex-shrink-0 mt-0.5" />
                    <span className="italic truncate">{flag.evidenceSnippet}</span>
                  </div>
                )}

                {/* Explanation */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                  {flag.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
