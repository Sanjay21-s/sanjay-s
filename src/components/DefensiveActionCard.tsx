import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  LifeBuoy,
  AlertTriangle,
  Ban,
  PhoneOff,
  Scale,
  Search,
  CheckSquare,
  Square,
} from 'lucide-react';
import { ScanResult } from '../types';

interface DefensiveActionCardProps {
  result: ScanResult;
}

interface ChecklistItem {
  id: string;
  text: string;
  weight: number;
}

const FIVE_POINT_DILIGENCE_CHECKLIST: ChecklistItem[] = [
  {
    id: 'check-wire-demand',
    text: 'Recruiter or landlord requested payment via Zelle, wire, crypto, or gift cards',
    weight: 35,
  },
  {
    id: 'check-public-webmail',
    text: 'Sender uses commercial webmail (@gmail, @yahoo) or informal chat (@telegram, WhatsApp)',
    weight: 20,
  },
  {
    id: 'check-no-interview',
    text: 'Appointment or hiring letter was extended without a two-way live video or in-person interview',
    weight: 20,
  },
  {
    id: 'check-sight-unseen',
    text: 'Demands upfront deposit or holding fee before allowing physical property walkthrough',
    weight: 25,
  },
  {
    id: 'check-artificial-deadline',
    text: 'Coercive pressure applied with an artificial 12-to-24 hour ultimatum deadline',
    weight: 15,
  },
];

export const DefensiveActionCard: React.FC<DefensiveActionCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  // Interactive 5-point checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'check-wire-demand': result.categorizedBreakdown?.paymentDemand?.flagged ?? true,
    'check-public-webmail': result.domainAnalysis.isFreeWebmail || Boolean(result.domainAnalysis.hasHomoglyph),
    'check-no-interview': false,
    'check-sight-unseen': result.scanMode === 'rental',
    'check-artificial-deadline': result.threatScore >= 70,
  });

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleCopyReport = () => {
    const reportText = `PHISHINSPECT FORENSIC SCAN REPORT
Generated: ${new Date(result.analyzedAt).toUTCString()}
Scan Mode: ${result.scanMode.toUpperCase()}
Scam Threat Index: ${result.threatScore}% (${result.riskTier})

EXECUTIVE SUMMARY:
${result.executiveSummary}

DOMAIN & INFRASTRUCTURE EVALUATION:
- Extracted Domain: ${result.domainAnalysis.extractedDomain}
- Evaluation: ${result.domainAnalysis.domainAssessment}
- Free Webmail Sender: ${result.domainAnalysis.isFreeWebmail ? 'YES (HIGH RISK)' : 'NO'}

DETECTED RED FLAGS (${result.detectedRedFlags.length}):
${result.detectedRedFlags
  .map(
    (rf, i) =>
      `${i + 1}. [${rf.severity}] ${rf.category}\n   Snippet: "${rf.evidenceSnippet}"\n   Details: ${rf.explanation}`
  )
  .join('\n\n')}

OBSERVED RED FLAGS CHECKLIST (${checkedCount}/5):
${FIVE_POINT_DILIGENCE_CHECKLIST.map(
  (item) => `[${checkedItems[item.id] ? 'X' : ' '}] ${item.text}`
).join('\n')}

RECOMMENDED DEFENSIVE ACTIONS:
${result.actionSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---
Report verified by PhishInspect Security Core.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const actionableGuidanceCards = [
    {
      title: 'Do Not Send Wire or Cash',
      desc: 'Never authorize wire transfers, CashApp/Zelle payments, or gift card codes for equipment or sight-unseen lease holds.',
      icon: Ban,
      badge: 'Immediate Priority',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Block Contact & Preserve Proof',
      desc: 'Save email headers, message logs, and phone numbers before ceasing all contact across Telegram, WhatsApp, or email.',
      icon: PhoneOff,
      badge: 'Evidence Collection',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'File Complaint with FTC & IC3',
      desc: 'Submit incident details to ReportFraud.ftc.gov and IC3.gov to initiate federal wire fraud tracing and alert banking partners.',
      icon: Scale,
      badge: 'Federal Escalation',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Cross-Check Official Directory',
      desc: 'Look up the enterprise headquarters switchboard directly online and verify the recruiter\'s employment status.',
      icon: Search,
      badge: 'Verification Step',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div
      id="panel-defensive-actions"
      className="rounded-3xl p-6 sm:p-7 bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 flex flex-col justify-between space-y-6"
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Remediation Protocol
              </span>
              <h3
                id="title-defensive-action"
                className="text-base font-bold text-white tracking-tight"
              >
                What To Do Next: Actionable Guidance
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyReport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Incident Report</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Distinct "What to Do Next" Guidance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {actionableGuidanceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-black/25 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl border ${card.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive 5-Point Due Diligence Checklist */}
        <div id="interactive-5-point-checklist" className="space-y-3 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Interactive 5-Point Due Diligence Checklist</span>
              </h4>
              <p className="text-xs text-slate-400">
                Tick the warning signs you observed in your communication:
              </p>
            </div>
            <div className="text-right">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                checkedCount >= 3
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : checkedCount >= 1
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {checkedCount} of 5 Observed
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {FIVE_POINT_DILIGENCE_CHECKLIST.map((item) => {
              const isChecked = checkedItems[item.id] ?? false;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-rose-500/[0.07] border-rose-500/30 text-rose-100'
                      : 'bg-black/20 border-white/[0.06] text-slate-300 hover:border-white/[0.12] hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <span className="text-xs leading-relaxed font-sans flex-1">
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
