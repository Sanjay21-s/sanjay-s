import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, DollarSign, Globe, Flame, Info } from 'lucide-react';
import { RiskTier, ScoreBreakdown, MetricBreakdown } from '../types';

interface ThreatMeterProps {
  score: number;
  riskTier: RiskTier;
  executiveSummary: string;
  scoreBreakdown?: ScoreBreakdown;
  metrics?: MetricBreakdown;
}

export const ThreatMeter: React.FC<ThreatMeterProps> = ({
  score,
  riskTier,
  executiveSummary,
  scoreBreakdown,
  metrics,
}) => {
  const isCritical = score >= 70;
  const isSuspicious = score >= 30 && score < 70;
  const isLowRisk = score < 30;

  // Fallback defaults if metrics aren't populated
  const paymentScore = metrics?.paymentDemandScore ?? (isCritical ? 95 : isSuspicious ? 50 : 5);
  const domainScore = metrics?.domainVerificationScore ?? (isCritical ? 90 : isSuspicious ? 75 : 0);
  const urgencyScore = metrics?.urgencyCoercionScore ?? (isCritical ? 88 : isSuspicious ? 60 : 8);

  // Design Tokens & Colors
  const accentGradient = isCritical
    ? 'from-rose-500 to-red-600'
    : isSuspicious
    ? 'from-amber-500 to-orange-500'
    : 'from-emerald-500 to-teal-500';

  const strokeColor = isCritical
    ? '#f43f5e' // Bright coral / rose
    : isSuspicious
    ? '#f59e0b' // Sunset amber
    : '#10b981'; // Emerald

  const textColor = isCritical
    ? 'text-rose-400'
    : isSuspicious
    ? 'text-amber-400'
    : 'text-emerald-400';

  const statusBadgeStyle = isCritical
    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
    : isSuspicious
    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

  const verdictLabel: RiskTier = isCritical
    ? 'CRITICAL SCAM'
    : isSuspicious
    ? 'HIGH RISK'
    : 'LEGITIMATE';

  // SVG Gauge calculations (240-degree arc)
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * 240) / 360;
  const progressOffset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100;

  return (
    <div
      id="panel-scam-threat-index"
      className="relative rounded-3xl p-6 sm:p-7 bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 flex flex-col justify-between overflow-hidden transition-all"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700 ${
          isCritical ? 'bg-rose-500' : isSuspicious ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />

      <div className="space-y-6">
        {/* Panel Header & High-Visibility Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center space-x-2.5">
            <div
              className={`p-2 rounded-xl border ${
                isCritical
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : isSuspicious
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}
            >
              {isCritical ? (
                <ShieldAlert className="w-5 h-5" />
              ) : isSuspicious ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Primary Assessment
              </span>
              <h3
                id="title-threat-index"
                className="text-base font-bold text-white tracking-tight"
              >
                Scam Threat Index Meter
              </h3>
            </div>
          </div>

          {/* High-visibility Threat Status Badge with micro-animations */}
          <div className="flex items-center space-x-2">
            <div
              id="badge-verdict-chip"
              className={`relative inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${statusBadgeStyle}`}
            >
              {isCritical && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
              )}
              {isSuspicious && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              )}
              {isLowRisk && (
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              )}
              <span>{verdictLabel}</span>
            </div>
          </div>
        </div>

        {/* Visual Gauge & Score Readout */}
        <div className="flex flex-col sm:flex-row items-center gap-6 py-1">
          {/* Radial SVG Gauge */}
          <div id="gauge-container" className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 180 180">
              {/* Background Arc */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${arcLength} ${circumference}`}
                transform="rotate(150 90 90)"
              />
              {/* Animated Foreground Meter Arc */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={progressOffset}
                transform="rotate(150 90 90)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Centered Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                id="display-threat-score"
                className={`text-4xl font-extrabold tracking-tight font-sans ${textColor}`}
              >
                {score}%
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Threat Index
              </span>
            </div>
          </div>

          {/* Diagnostic Summary */}
          <div className="flex-1 space-y-2.5 text-center sm:text-left">
            <div>
              <span className="text-xs font-medium text-slate-400">Automated Evaluation:</span>
              <h4 className={`text-base font-bold tracking-tight ${textColor}`}>
                {isCritical
                  ? 'High-Probability Advance-Fee or Equipment Scam'
                  : isSuspicious
                  ? 'Elevated Risk / Suspicious Infrastructure'
                  : 'Enterprise Recruitment Standards Verified'}
              </h4>
            </div>

            <p
              id="executive-summary-text"
              className="text-xs text-slate-300 leading-relaxed bg-black/30 border border-white/[0.08] rounded-2xl p-3.5 shadow-inner"
            >
              {executiveSummary}
            </p>
          </div>
        </div>

        {/* Breakdown of 3 Concrete Metrics */}
        <div id="concrete-metrics-breakdown" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Diagnostic Vector Metrics
            </span>
            <span className="text-xs text-slate-500 font-mono">0–100 Scale</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Metric 1: Advance-Payment Demand Index */}
            <div className="p-3 rounded-xl bg-black/20 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">💸</span>
                  <span className="font-semibold text-slate-200">Advance-Payment Demand Index</span>
                </div>
                <span
                  className={`font-mono font-bold ${
                    paymentScore >= 70 ? 'text-rose-400' : paymentScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {paymentScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    paymentScore >= 70
                      ? 'bg-rose-500'
                      : paymentScore >= 30
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${paymentScore}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Domain & Recruiter Verification */}
            <div className="p-3 rounded-xl bg-black/20 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">🌐</span>
                  <span className="font-semibold text-slate-200">Domain & Recruiter Verification</span>
                </div>
                <span
                  className={`font-mono font-bold ${
                    domainScore >= 70 ? 'text-rose-400' : domainScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {domainScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    domainScore >= 70
                      ? 'bg-rose-500'
                      : domainScore >= 30
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${domainScore}%` }}
                />
              </div>
            </div>

            {/* Metric 3: Contract Urgency & Coercion Level */}
            <div className="p-3 rounded-xl bg-black/20 border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">🚩</span>
                  <span className="font-semibold text-slate-200">Contract Urgency & Coercion Level</span>
                </div>
                <span
                  className={`font-mono font-bold ${
                    urgencyScore >= 70 ? 'text-rose-400' : urgencyScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {urgencyScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    urgencyScore >= 70
                      ? 'bg-rose-500'
                      : urgencyScore >= 30
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${urgencyScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
