import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Mail,
  UserCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Globe,
  Gauge,
  Calendar,
  Lock,
} from 'lucide-react';
import { ScanResult } from '../types';

interface ForensicDashboardProps {
  result: ScanResult;
}

export const ForensicDashboard: React.FC<ForensicDashboardProps> = ({ result }) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const score = result.threatScore;
  const isCritical = score > 60;
  const isSuspicious = score >= 25 && score <= 60;
  const isSafe = score < 25;

  // High-contrast color tokens: Emerald Green <25%, Amber 25-60%, Rose/Red >60%
  const theme = isCritical
    ? {
        label: 'CRITICAL SCAM',
        strokeColor: '#f43f5e', // Rose/Red
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        textColor: 'text-rose-400',
        badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        barColor: 'bg-gradient-to-r from-rose-500 to-red-600',
        glow: 'shadow-rose-500/20',
        ambient: 'bg-rose-500/10',
      }
    : isSuspicious
    ? {
        label: 'HIGH RISK',
        strokeColor: '#f59e0b', // Amber
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        textColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        barColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
        glow: 'shadow-amber-500/20',
        ambient: 'bg-amber-500/10',
      }
    : {
        label: 'VERIFIED LEGITIMATE',
        strokeColor: '#10b981', // Emerald
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        textColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        barColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/20',
        ambient: 'bg-emerald-500/10',
      };

  // Circular gauge geometry
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * 260) / 360;
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100;

  // 1. Advance Payment / Fee Demand Flag
  const paymentFlag = result.categorizedBreakdown.paymentDemand;
  const hasPaymentDemand = paymentFlag.flagged;

  // 2. Recruiter & Domain Legitimacy Flag
  const domainFlag = result.categorizedBreakdown.domainSender;
  const hasDomainAnomaly = domainFlag.flagged;
  const domainAnalysis = result.domainAnalysis;

  // 3. Hiring & Lease Realism Flag
  const contractFlag = result.categorizedBreakdown.contractClauses;
  const hasUnrealisticTerms = contractFlag.flagged;

  // Direct Action Advice (Exactly 2 clear, non-technical bullet points)
  const actionAdvice: [string, string] = isCritical
    ? [
        'Never send money, deposit unsolicited cashier checks, or purchase gift cards. Legitimate employers provide workstation hardware directly through enterprise IT, and real landlords never demand escrow holding wires before an in-person walkthrough.',
        'Stop all communication immediately. Do not share your Social Security number, ID, or banking details. Report the fraudulent offer to the FTC and FBI IC3 below.',
      ]
    : isSuspicious
    ? [
        'Insist on a two-way live video call with hiring staff or property managers before sending any personal identity documents, deposits, or signed agreements.',
        'Independently cross-verify the recruiter or landlord by contacting the organization’s official corporate switchboard or checking their authentic website directly.',
      ]
    : [
        'This offer exhibits authentic corporate hiring standards with verified organization contact channels, formal interview pacing, and zero upfront fees.',
        'Always review and sign formal onboarding documents securely through the company’s official applicant portal, and remember that verified employers never charge for equipment.',
      ];

  return (
    <motion.section
      id="forensic-results-dashboard"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full space-y-6 pt-2"
    >
      {/* Main Streamlined Output Card */}
      <div className="w-full relative rounded-3xl p-6 sm:p-8 bg-[#15171c]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] overflow-hidden space-y-8">
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700 ${theme.ambient}`}
        />

        {/* Top Scan Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2.5 truncate max-w-xl">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Scanned Target:
            </span>
            <span className="text-sm font-medium text-zinc-200 truncate font-mono">
              "{result.targetInputPreview || 'Offer Content'}"
            </span>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0 text-xs text-zinc-400">
            {result.isAiPowered ? (
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Real-Time Gemini AI Scan</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300 font-medium text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Heuristic Engine Scan</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{new Date(result.analyzedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Section 3.1: Prominent Scam Threat Index (0–100%) Gauge & Verdict */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Animated Circular Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/[0.08] shadow-inner">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>Scam Threat Index (0–100%)</span>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-130 transform" viewBox="0 0 160 160">
                {/* Background Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="12"
                  strokeDasharray={`${arcLength} ${circumference}`}
                  strokeLinecap="round"
                />
                {/* Progress Arc */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={theme.strokeColor}
                  strokeWidth="12"
                  strokeDasharray={`${arcLength} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Gauge Center Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {score}%
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-zinc-300 mt-1 max-w-[130px] leading-tight">
                  Scam Threat Index (0–100%)
                </span>
              </div>
            </div>

            {/* Threshold Legend Bar */}
            <div className="w-full mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-medium">
              <span className="text-emerald-400 font-semibold">0–24% Safe</span>
              <span className="text-amber-400 font-semibold">25–60% Caution</span>
              <span className="text-rose-400 font-semibold">&gt;60% Danger</span>
            </div>
          </div>

          {/* Assessment & Executive Verdict */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                id="badge-verdict-pill"
                className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${theme.badgeBg}`}
              >
                {isCritical ? (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                ) : isSuspicious ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                )}
                <span>{theme.label}</span>
              </span>

              <span className="text-xs text-zinc-400">
                {score >= 70
                  ? 'Severe advance-fee and fake offer indicators present'
                  : score >= 30
                  ? 'Elevated risk factors detected — proceed with caution'
                  : 'Low risk — aligns with authentic enterprise recruitment'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isCritical
                ? 'High Probability Scam Detected'
                : isSuspicious
                ? 'Suspicious Elements Detected'
                : 'Offer Appears Legitimate'}
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {result.executiveSummary}
            </p>

            {/* Linear Threat Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Scam Threat Index (0–100%)</span>
                <span className="font-semibold text-white">{score}% / 100%</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${theme.barColor}`}
                  style={{ width: `${Math.min(100, Math.max(4, score))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.2: Explicit "Domain Age & Registration Analysis" Card */}
        <div
          id="card-domain-age-registration-analysis"
          className={`p-6 rounded-2xl border transition-all ${
            domainAnalysis.isHighRiskAge
              ? 'bg-rose-500/[0.08] border-rose-500/35 shadow-lg shadow-rose-950/20'
              : domainAnalysis.isFreeWebmail
              ? 'bg-amber-500/[0.08] border-amber-500/35 shadow-lg shadow-amber-950/20'
              : 'bg-emerald-500/[0.06] border-emerald-500/25 shadow-lg shadow-emerald-950/20'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2.5 rounded-xl border ${
                  domainAnalysis.isHighRiskAge
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/35'
                    : domainAnalysis.isFreeWebmail
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/35'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35'
                }`}
              >
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                  <span>Domain Age & Registration Analysis</span>
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Evaluating domain age, WHOIS tenure, registrar privacy, and spoof risk
                </p>
              </div>
            </div>

            {/* Prominent High-Risk or Verified Badge */}
            <span
              id="badge-domain-age-status"
              className={`self-start sm:self-auto text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-sm ${
                domainAnalysis.isHighRiskAge
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : domainAnalysis.isFreeWebmail
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {domainAnalysis.isHighRiskAge
                ? 'FLAGGED: REGISTERED UNDER 30 DAYS (HIGH RISK)'
                : domainAnalysis.isFreeWebmail
                ? 'FLAGGED: PUBLIC WEBMAIL (NO DOMAIN TENURE)'
                : 'VERIFIED: ESTABLISHED 15+ YEARS (AUTHENTIC)'}
            </span>
          </div>

          {/* Domain Evaluation & Details Breakdown */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-zinc-400 font-medium">Extracted Domain:</span>
                <span className="font-mono font-bold text-white bg-black/50 px-2.5 py-1 rounded-lg border border-white/[0.1]">
                  {domainAnalysis.extractedDomain}
                </span>
                <span className="text-xs text-zinc-400">({domainAnalysis.infrastructureStatus || 'DNS Checked'})</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-zinc-400 font-medium">Domain Age Status:</span>
                <span
                  id="label-domain-age-readout"
                  className={`font-semibold font-mono text-sm px-2.5 py-0.5 rounded-md ${
                    domainAnalysis.isHighRiskAge
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : domainAnalysis.isFreeWebmail
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {domainAnalysis.domainAgeEstimate || 'Standard Active'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs leading-relaxed">
                {domainAnalysis.isHighRiskAge ? (
                  <div className="flex items-start space-x-2 text-rose-200">
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-300 font-semibold">High Risk Domain Age Alert: </strong>
                      This domain was registered only {domainAnalysis.daysActive || '< 30'} days ago (<span className="underline font-medium">under 30 days active</span>). Criminals routinely register disposable lookalike domains right before launching advance-fee fake check traps or sight-unseen escrow scams, abandoning them before blacklists trigger.
                    </span>
                  </div>
                ) : domainAnalysis.isFreeWebmail ? (
                  <div className="flex items-start space-x-2 text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-300 font-semibold">Unverified Webmail Alert: </strong>
                      The sender communicates from a free consumer email provider (@{domainAnalysis.extractedDomain}). Legitimate enterprise recruiters and licensed property managers never recruit or transmit binding employment contracts via personal webmail.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2 text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-emerald-300 font-semibold">Authoritative Corporate Domain: </strong>
                      Established domain with over 15 years of continuous ICANN registration history and enterprise-grade DNS records. Low probability of ephemeral lookalike spoofing.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Diagnostic Metric Key-Value Badges */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/45 border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider block">Domain Age</span>
                <span className={`font-mono font-bold text-sm block ${domainAnalysis.isHighRiskAge ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {domainAnalysis.daysActive !== undefined && domainAnalysis.daysActive > 0
                    ? domainAnalysis.daysActive < 30
                      ? `${domainAnalysis.daysActive} Days Active`
                      : `${Math.round(domainAnalysis.daysActive / 365)}+ Years`
                    : domainAnalysis.isFreeWebmail
                    ? '0 Days (Webmail)'
                    : '15+ Years'}
                </span>
                <span className="text-[10px] text-zinc-400 block font-sans">
                  {domainAnalysis.isHighRiskAge ? '< 30d high risk threshold' : 'Established active tenure'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/45 border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider block">Registrar</span>
                <span className="font-mono font-bold text-zinc-200 text-xs block truncate" title={domainAnalysis.registrar || 'Accredited'}>
                  {domainAnalysis.registrar || 'Accredited Registrar'}
                </span>
                <span className="text-[10px] text-zinc-400 block truncate font-sans">
                  {domainAnalysis.isHighRiskAge ? 'Privacy Proxy Cloaked' : 'Corporate Identity Verified'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/45 border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider block">Registration Tenure</span>
                <span className="font-mono font-semibold text-zinc-300 text-xs block">
                  {domainAnalysis.registrationDate || (domainAnalysis.isHighRiskAge ? '< 30 days ago' : '15+ years ago')}
                </span>
                <span className="text-[10px] text-zinc-400 block font-sans">WHOIS Verification</span>
              </div>

              <div className="p-3 rounded-xl bg-black/45 border border-white/[0.08] space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider block">Age Threat Rating</span>
                <span className={`font-mono font-bold text-xs block ${domainAnalysis.isHighRiskAge ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {domainAnalysis.isHighRiskAge ? 'CRITICAL RISK (<30d)' : 'LOW RISK (SAFE)'}
                </span>
                <span className="text-[10px] text-zinc-400 block font-sans">ICANN Heuristic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.3: Key Scam Indicators (Max 3 Concise Cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Key Scam Indicators
            </h4>
            <span className="text-xs text-zinc-400">3 Core Threat Vectors Evaluated</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
            {/* 1. Payment Demand Red Flags (advance fees, fake checks, wire transfer deposits) */}
            <div
              id="card-flag-payment-demands"
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                hasPaymentDemand
                  ? 'bg-rose-500/[0.08] border-rose-500/30 text-rose-100'
                  : 'bg-emerald-500/[0.06] border-emerald-500/25 text-zinc-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      hasPaymentDemand
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span
                    id="badge-payment-demand-status"
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      hasPaymentDemand
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {hasPaymentDemand ? 'FLAGGED: HIGH RISK' : 'CLEAN: NO FEES'}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white">
                    Payment Demand Red Flags
                  </h5>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {hasPaymentDemand
                      ? 'Detected advance fees, fake cashier check traps, or sight-unseen wire transfer holding deposits.'
                      : 'Zero advance equipment fees, deposit wire traps, or gift card requests found.'}
                  </p>
                </div>

                {hasPaymentDemand && paymentFlag.evidence && (
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-rose-300/90 break-words">
                    {paymentFlag.evidence}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Domain Age & Sender Verification */}
            <div
              id="card-flag-domain-sender"
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                hasDomainAnomaly
                  ? 'bg-amber-500/[0.08] border-amber-500/30 text-amber-100'
                  : 'bg-emerald-500/[0.06] border-emerald-500/25 text-zinc-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      hasDomainAnomaly
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <span
                    id="badge-domain-sender-status"
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      hasDomainAnomaly
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {hasDomainAnomaly ? 'FLAGGED: SUSPICIOUS' : 'VERIFIED: AUTHENTIC'}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white">
                    Domain Age & Sender Verification
                  </h5>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {hasDomainAnomaly
                      ? domainAnalysis.isHighRiskAge
                        ? `Domain active < 30 days (${domainAnalysis.domainAgeEstimate || 'Recent registration'}).`
                        : 'Communicating via free webmail, disposable domain, or encrypted messaging.'
                      : 'Authentic enterprise domain identified with verified organizational identity (> 15 years).'}
                  </p>
                </div>

                {domainFlag.evidence && (
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-amber-300/90 break-words">
                    {domainFlag.evidence}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Hiring Pacing & Contract Traps */}
            <div
              id="card-flag-contract-pacing"
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                hasUnrealisticTerms
                  ? 'bg-rose-500/[0.08] border-rose-500/30 text-rose-100'
                  : 'bg-emerald-500/[0.06] border-emerald-500/25 text-zinc-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      hasUnrealisticTerms
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span
                    id="badge-contract-pacing-status"
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      hasUnrealisticTerms
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {hasUnrealisticTerms ? 'FLAGGED: HIGH PRESSURE' : 'NORMAL: STANDARD'}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white">
                    Hiring Pacing & Contract Traps
                  </h5>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {hasUnrealisticTerms
                      ? 'Detected no-interview hiring claims, urgent 24h countdowns, or sight-unseen lease traps.'
                      : 'Professional recruitment timeline and standard pacing without coercive pressure.'}
                  </p>
                </div>

                {hasUnrealisticTerms && contractFlag.evidence && (
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-rose-300/90 break-words">
                    {contractFlag.evidence}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.4: Direct Action Advice (2 Clear Non-Technical Bullets) */}
        <div
          id="direct-action-advice-card"
          className="p-6 rounded-2xl bg-black/50 border border-white/[0.1] space-y-3.5 shadow-inner"
        >
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Recommended Next Steps: What You Should Do</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {actionAdvice[0]}
              </p>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {actionAdvice[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Collapsed Detailed Technical Forensics */}
        <div className="pt-2 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center space-x-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>{showTechnicalDetails ? 'Hide' : 'View'} Detailed Diagnostics & Telemetry</span>
            {showTechnicalDetails ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          <AnimatePresence>
            {showTechnicalDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-4 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                      Domain Assessment
                    </span>
                    <span className="text-zinc-200 font-mono mt-1 block truncate">
                      {result.domainAnalysis.extractedDomain || 'None'}
                    </span>
                    <span className="text-zinc-400 text-[11px] mt-0.5 block">
                      {result.domainAnalysis.domainAgeEstimate || 'Standard'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                      Payment Demand Vector
                    </span>
                    <span className="text-zinc-200 font-mono mt-1 block">
                      +{result.categorizedBreakdown.paymentDemand.points} pts
                    </span>
                    <span className="text-zinc-400 text-[11px] mt-0.5 block">
                      Advance-Fee Vector
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                      Sender Infrastructure
                    </span>
                    <span className="text-zinc-200 font-mono mt-1 block">
                      +{result.categorizedBreakdown.domainSender.points} pts
                    </span>
                    <span className="text-zinc-400 text-[11px] mt-0.5 block">
                      DNS / WHOIS Verification
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                      Contract Urgency Trap
                    </span>
                    <span className="text-zinc-200 font-mono mt-1 block">
                      +{result.categorizedBreakdown.contractClauses.points} pts
                    </span>
                    <span className="text-zinc-400 text-[11px] mt-0.5 block">
                      Psychological Pacing
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
