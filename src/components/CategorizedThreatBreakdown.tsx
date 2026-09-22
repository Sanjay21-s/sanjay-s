import React from 'react';
import { CategorizedBreakdown } from '../types';
import { CreditCard, Globe, FileWarning, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface CategorizedThreatBreakdownProps {
  breakdown: CategorizedBreakdown;
}

export const CategorizedThreatBreakdown: React.FC<CategorizedThreatBreakdownProps> = ({ breakdown }) => {
  const { paymentDemand, domainSender, contractClauses } = breakdown;

  const cards = [
    {
      id: 'card-payment-demand',
      icon: CreditCard,
      data: paymentDemand,
      badgeText: paymentDemand.flagged ? `+${paymentDemand.points} Pts • Flagged` : 'Clear (0 Pts)',
      flagColor: paymentDemand.flagged ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      badgeColor: paymentDemand.flagged ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
    {
      id: 'card-domain-sender',
      icon: Globe,
      data: domainSender,
      extraInfo: domainSender.domainAge ? `Domain Age: ${domainSender.domainAge}` : undefined,
      badgeText: domainSender.flagged ? `+${domainSender.points} Pts • Flagged` : 'Clear (0 Pts)',
      flagColor: domainSender.flagged ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      badgeColor: domainSender.flagged ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
    {
      id: 'card-contract-clauses',
      icon: FileWarning,
      data: contractClauses,
      badgeText: contractClauses.flagged ? `+${contractClauses.points} Pts • Flagged` : 'Clear (0 Pts)',
      flagColor: contractClauses.flagged ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      badgeColor: contractClauses.flagged ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
  ];

  return (
    <div id="categorized-threat-breakdown-panel" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
            Threat Breakdown
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Categorized Vector Analysis
          </h3>
        </div>
        <span className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-xl">
          Multi-Vector Scoring
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isFlagged = card.data.flagged;

          return (
            <div
              key={card.id}
              id={card.id}
              className={`rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl ${
                isFlagged
                  ? 'bg-black/40 border-white/[0.1] hover:border-indigo-500/40 shadow-black/50'
                  : 'bg-black/25 border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl border ${card.flagColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {card.data.title}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border flex-shrink-0 ${card.badgeColor}`}>
                    {card.badgeText}
                  </span>
                </div>

                {/* Evidence Callout */}
                <div className="bg-black/40 p-3 rounded-xl border border-white/[0.06] text-xs">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Discovered Clue:</span>
                  <p className={`line-clamp-2 text-xs leading-relaxed ${isFlagged ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                    {card.data.evidence}
                  </p>
                  {card.extraInfo && (
                    <span className="text-[11px] text-amber-300/90 block mt-1.5 pt-1.5 border-t border-white/[0.06] font-mono">
                      {card.extraInfo}
                    </span>
                  )}
                </div>

                {/* Analysis Breakdown */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {card.data.analysis}
                </p>
              </div>

              {/* Status Footer */}
              <div className="pt-3.5 mt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Status Verdict:</span>
                <span
                  className={`font-semibold flex items-center space-x-1 ${
                    isFlagged ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {isFlagged ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                      <span>Action Required</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      <span>Low Risk Verified</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
