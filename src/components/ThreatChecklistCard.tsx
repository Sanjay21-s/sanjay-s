import React, { useState } from 'react';
import { DeepThreatChecklist, SeverityLevel } from '../types';
import { ShieldAlert, Globe, Type, Flame, KeyRound, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from 'lucide-react';

interface ThreatChecklistCardProps {
  checklist?: DeepThreatChecklist;
}

export const ThreatChecklistCard: React.FC<ThreatChecklistCardProps> = ({ checklist }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('domainAge');

  if (!checklist) return null;

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const getRiskBadge = (risk: SeverityLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-rose-500/10 text-rose-300 border border-rose-500/20">
            Critical Malicious
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-rose-500/10 text-rose-300 border border-rose-500/20">
            High Threat
          </span>
        );
      case 'MODERATE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Suspicious
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            Verified Safe
          </span>
        );
    }
  };

  const items = [
    {
      id: 'domainAge',
      icon: Globe,
      label: 'Domain Age & WHOIS Verification',
      data: checklist.domainAgeWhois,
    },
    {
      id: 'typosquatting',
      icon: Type,
      label: 'Typosquatting & Unicode Detection',
      data: checklist.typosquattingUnicode,
    },
    {
      id: 'urgency',
      icon: Flame,
      label: 'Urgency & Social Engineering Heuristics',
      data: checklist.urgencySocialEngineering,
    },
    {
      id: 'ssl',
      icon: KeyRound,
      label: 'SSL / Certificate Authenticity',
      data: checklist.sslCertificateAuthenticity,
    },
  ];

  return (
    <article
      id="threat-diagnostics-checklist-card"
      className="w-full bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/40 space-y-5"
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Forensic Evaluation
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Threat Breakdown Checklist & Diagnostics
            </h3>
          </div>
        </div>
        <span className="text-xs text-slate-400 bg-white/[0.04] px-3 py-1 rounded-xl border border-white/[0.08]">
          4-Point Engine
        </span>
      </div>

      {/* Accordion Checklist Items */}
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedSection === item.id;
          const isHazard = item.data.risk === 'CRITICAL' || item.data.risk === 'HIGH';

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isHazard
                  ? 'bg-black/40 border-rose-500/30'
                  : 'bg-black/25 border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(item.id)}
                className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl cursor-pointer"
              >
                <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                      isHazard
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        : 'bg-white/[0.04] border-white/[0.08] text-indigo-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-white block truncate">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400 truncate block mt-0.5">
                      {item.data.headline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 flex-shrink-0">
                  {getRiskBadge(item.data.risk)}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] text-xs text-slate-300 space-y-3">
                  <p className="leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/[0.06] text-slate-300 font-sans">
                    {item.data.details}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Status: <strong className="text-white">{item.data.status}</strong></span>
                    <span>Severity: <strong className={isHazard ? 'text-rose-400' : 'text-emerald-400'}>{item.data.risk}</strong></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
};
