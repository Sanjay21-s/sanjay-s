import React from 'react';
import { Globe, Server, Mail, ShieldAlert, ShieldCheck, AlertCircle } from 'lucide-react';
import { DomainAnalysis } from '../types';

interface DomainBreakdownProps {
  analysis: DomainAnalysis;
}

export const DomainBreakdown: React.FC<DomainBreakdownProps> = ({ analysis }) => {
  const isFreeWebmail = Boolean(analysis.isFreeWebmail);
  const domainText = analysis.extractedDomain || 'None Extracted / Plain Text Input';

  return (
    <div
      id="panel-domain-infrastructure"
      className="rounded-3xl p-6 sm:p-7 bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 flex flex-col justify-between"
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Network Forensics
              </span>
              <h3
                id="title-domain-breakdown"
                className="text-base font-bold text-white tracking-tight"
              >
                Domain & Infrastructure Analysis
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300">
            WHOIS & DNS
          </span>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3.5">
          {/* Extracted Domain Card */}
          <div
            id="card-extracted-domain"
            className="bg-black/30 border border-white/[0.06] rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-400 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Extracted Host / Target Identity</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Evaluated Target
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span
                id="text-extracted-domain"
                className="text-sm font-mono font-bold text-white break-all"
              >
                {domainText}
              </span>
              {domainText !== 'None Extracted / Plain Text Input' && (
                <span className="ml-2 px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Target Host
                </span>
              )}
            </div>
          </div>

          {/* Domain Age & Infrastructure Health */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              id="card-domain-age"
              className="bg-black/25 border border-white/[0.06] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400">
                  Domain Age Estimate
                </span>
              </div>
              <p
                id="text-domain-age-estimate"
                className="text-xs font-bold text-white font-mono mt-0.5"
              >
                {analysis.domainAgeEstimate || 'Standard Corporate Age (> 2 Years)'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Fraud rings frequently rotate disposable domains (&lt;30 days old) to evade spam blocklists.
              </p>
            </div>

            <div
              id="card-infrastructure-status"
              className="bg-black/25 border border-white/[0.06] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400">
                  Sender Communication Channel
                </span>
                {isFreeWebmail ? (
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <p className="text-xs font-bold text-white mt-0.5">
                {isFreeWebmail
                  ? 'Commercial Webmail / Non-Corporate (@gmail, @yahoo)'
                  : analysis.infrastructureStatus || 'Authenticated Mail Gateway'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Legitimate Fortune 500 corporate recruiters send messages exclusively from enterprise MX gateways.
              </p>
            </div>
          </div>

          {/* Technical Assessment */}
          <div
            id="card-domain-assessment"
            className="bg-black/20 border border-white/[0.06] rounded-2xl p-4 text-xs"
          >
            <span className="text-slate-400 block mb-1 font-medium">Heuristic DNS Verdict:</span>
            <p className="text-slate-200 leading-relaxed font-sans">
              {analysis.domainAssessment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
