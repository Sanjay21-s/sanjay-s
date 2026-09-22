import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Home,
  MailCheck,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  summary: string;
  operationalMechanics: string[];
  forensicSigns: string[];
  verificationStep: string;
}

const SECTIONS: GuideSection[] = [
  {
    id: 'overpayment-check-scam',
    title: 'How the "Overpayment & Equipment Check" Scam Operates',
    icon: CreditCard,
    badge: 'Employment Fraud Vector',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    summary:
      'Scammers exploit federal banking "funds availability" regulations to make counterfeit checks appear cleared before the physical clearinghouse identifies the check as fraudulent.',
    operationalMechanics: [
      'Phase 1 — The Fake Offer: Candidate receives an unsolicited appointment letter offering an above-market hourly rate ($40–$65/hr) after a brief text/chat questionnaire.',
      'Phase 2 — Counterfeit Check Disbursement: The employer mails a realistic-looking cashier check (often $3,000–$5,000) drawn on a real stolen corporate bank account.',
      'Phase 3 — The Rapid Wire Demanded: The candidate is instructed to deposit the check and wire 80–90% ($2,500–$4,500) via Zelle, CashApp, or crypto to a "certified hardware vendor" for a pre-configured MacBook or workstation.',
      'Phase 4 — The Inevitable Bounce: 3 to 7 business days later, the Federal Reserve clearinghouse detects the check as counterfeit. The bank reverses the full credit, and the victim is held personally liable.',
    ],
    forensicSigns: [
      'Recruiter refuses to provision hardware through standard internal IT logistics.',
      'Urgency insists wire must take place within 24 hours of mobile check deposit.',
      'Check issuer corporate name differs from the recruiting entity letterhead.',
      'Demands payment via irreversible peer-to-peer rails (Zelle, wire, Bitcoin, Apple Gift Cards).',
    ],
    verificationStep:
      'Golden Rule: Legitimate enterprises (Google, Microsoft, Stripe, etc.) NEVER mail checks for prospective employees to buy equipment from third parties. Enterprise equipment is shipped directly by company IT logistics.',
  },
  {
    id: 'sight-unseen-rental-trap',
    title: 'Red Flags of Sight-Unseen Rental Escrow Traps',
    icon: Home,
    badge: 'Real Estate Vector',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    summary:
      'Scammers clone active real estate listings from Zillow or Redfin, re-list them at steep 40-50% discounts, and invent elaborate excuses to collect holding deposits prior to physical access.',
    operationalMechanics: [
      'The Bait: High-end luxury apartment listed significantly below prevailing market rate (e.g., $1,200/mo for a prime downtown 2-bedroom with all utilities paid).',
      'The Absent Landlord Story: The owner claims to be out of state or country on an urgent missionary or military assignment and cannot conduct an in-person walkthrough.',
      'The Escrow Courier Lure: The scammer claims the keys and lease documents are held with a bonded courier (FedEx, private lockbox) awaiting automated dispatch.',
      'The Advance Trap: Prospective tenant must wire a "refundable security deposit" plus a "holding fee" ($1,200–$2,000) before keys will be dispatched.',
    ],
    forensicSigns: [
      'Landlord refuses live video walkthroughs or claims the locks are electronically coded.',
      'Reverse image search reveals the identical listing photos on other real estate portals with a different price and owner name.',
      'Communication strictly via email, WhatsApp, or Google Voice numbers.',
      'Reluctance to provide proof of deed ownership or property tax parcel numbers.',
    ],
    verificationStep:
      'Golden Rule: Never transfer money, wire deposits, or sign leases for real estate without physically entering the property with the verified owner or a licensed real estate broker.',
  },
  {
    id: 'verify-email-headers',
    title: 'How to Independently Verify an HR Recruiter\'s Email Headers',
    icon: MailCheck,
    badge: 'Technical Verification Protocol',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    summary:
      'Email display names are trivially spoofable in modern mail clients. Inspecting raw MIME headers reveals the authentic server IP, SPF authentication, and DKIM cryptographic signature.',
    operationalMechanics: [
      'Display Name vs. Envelope Sender: A message displaying "Google Careers <careers@google.com>" in the inbox may actually originate from an unauthenticated server with a Return-Path of "attacker@scam-mail-gateway.top".',
      'Sender Policy Framework (SPF): Verifies whether the sending server IP address is authorized in the organization DNS TXT records to dispatch mail.',
      'DomainKeys Identified Mail (DKIM): Validates an asymmetric cryptographic signature attached to the message headers by the domain owner private key.',
      'DMARC Alignment: Ensures that the domain visible in the "From" header strictly matches the SPF-verified and DKIM-signed domain.',
    ],
    forensicSigns: [
      'In Gmail: Click the three dots (⋮) on the top right of the message → select "Show original". Check the "SPF", "DKIM", and "DMARC" readouts (must all say "PASS").',
      'In Outlook: Open message → File → Properties → inspect "Internet headers". Look for "Authentication-Results: spf=pass".',
      'Look for lookalike domains with deceptive hyphens (e.g., @google-careers-portal.com instead of @google.com).',
      'Look for free public webmail addresses (@gmail.com, @yahoo.com) claiming to represent Fortune 500 corporations.',
    ],
    verificationStep:
      'Golden Rule: If SPF or DKIM returns "FAIL" or "SOFTFAIL", or if the recruiter uses a lookalike hyphenated domain, treat the communication as an active impersonation attack.',
  },
];

export const CandidateDiligenceGuide: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState<string | null>('overpayment-check-scam');

  const toggleSection = (id: string) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="candidate-due-diligence-guide-section"
      className="w-full bg-[#15171c]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-6"
      aria-labelledby="heading-diligence-guide"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tactical Due Diligence Directives</span>
          </div>
          <h2
            id="heading-diligence-guide"
            className="text-xl sm:text-2xl font-bold text-white tracking-tight"
          >
            Candidate & Renter Due Diligence Guide
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Deep-dive operational breakdowns engineered to help job seekers and tenants avoid advance-fee check fraud, sight-unseen escrow traps, and recruiter impersonation.
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Interactive Guidance</span>
        </span>
      </div>

      {/* Accordion Panels */}
      <div className="space-y-3.5">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isOpen = openSectionId === sec.id;

          return (
            <div
              key={sec.id}
              id={`accordion-item-${sec.id}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-black/40 border-emerald-500/40 shadow-xl shadow-emerald-500/5'
                  : 'bg-black/20 border-white/[0.06] hover:border-white/[0.12] hover:bg-black/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              >
                <div className="flex items-center space-x-3.5 min-w-0 pr-3">
                  <div
                    className={`p-2.5 rounded-xl border flex-shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${sec.badgeColor}`}>
                        {sec.badge}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {sec.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs text-zinc-400 font-medium hidden md:inline">
                    {isOpen ? 'Collapse' : 'Expand'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-white/[0.06] space-y-5 text-xs">
                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/[0.08]">
                    {sec.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Operational Mechanics */}
                    <div className="space-y-2.5 bg-black/30 p-4 rounded-xl border border-white/[0.06]">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Execution Chain:</span>
                      </span>
                      <ul className="space-y-2 pt-1 text-zinc-300">
                        {sec.operationalMechanics.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2 text-xs leading-relaxed">
                            <span className="text-amber-400 font-bold flex-shrink-0 mt-0.5">
                              {sIdx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Forensic Red Flags */}
                    <div className="space-y-2.5 bg-black/30 p-4 rounded-xl border border-white/[0.06]">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Observable Warning Signs:</span>
                      </span>
                      <ul className="space-y-2 pt-1 text-zinc-300">
                        {sec.forensicSigns.map((sign, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 text-xs leading-relaxed">
                            <span className="text-rose-400 font-bold flex-shrink-0 mt-0.5">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Golden Rule Verification Step */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-200 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Defensive Action Protocol:</span>
                    </span>
                    <p className="text-xs font-medium leading-relaxed">
                      {sec.verificationStep}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
