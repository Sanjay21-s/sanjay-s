import React from 'react';
import { ShieldCheck, ShieldAlert, Search, ArrowUpRight, ExternalLink } from 'lucide-react';

interface DueDiligenceLink {
  id: string;
  title: string;
  agency: string;
  url: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  accentBadge: string;
  accentIcon: string;
}

const DUE_DILIGENCE_LINKS: DueDiligenceLink[] = [
  {
    id: 'ftc-fraud-portal',
    title: 'Report to FTC Fraud Portal',
    agency: 'Federal Trade Commission',
    url: 'https://reportfraud.ftc.gov',
    description:
      'Submit official consumer reports for fake job appointments, cashier check reimbursement traps, and rental scams.',
    badge: 'Federal Consumer Protection',
    icon: ShieldCheck,
    accentBadge: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    accentIcon: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'fbi-ic3',
    title: 'File with FBI IC3',
    agency: 'FBI Internet Crime Complaint Center',
    url: 'https://www.ic3.gov',
    description:
      'File formal complaints for cyber fraud, advance-fee wire extortion, money mule recruitment, and counterfeit checks.',
    badge: 'Federal Law Enforcement',
    icon: ShieldAlert,
    accentBadge: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    accentIcon: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
  {
    id: 'whois-lookup',
    title: 'Check WHOIS Domain Age',
    agency: 'ICANN Official Registry Lookup',
    url: 'https://lookup.icann.org',
    description:
      'Verify when the recruiter domain was registered. Ephemeral domains registered within 30 days are high-risk indicators.',
    badge: 'Official ICANN Registry',
    icon: Search,
    accentBadge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    accentIcon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
];

export const DueDiligenceHub: React.FC = () => {
  return (
    <section
      id="official-threat-resource-hub"
      className="w-full bg-[#15171c]/90 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] space-y-6"
      aria-labelledby="heading-due-diligence"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escalation & Verification</span>
          </div>
          <h2
            id="heading-due-diligence"
            className="text-xl sm:text-2xl font-bold text-white tracking-tight"
          >
            Security & Due Diligence Hub
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300/80 mt-1 max-w-2xl leading-relaxed">
            Take direct action by reporting active fraud to official government portals or verifying domain longevity independently.
          </p>
        </div>

        <span className="text-xs font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          3 Verified Portals
        </span>
      </div>

      {/* Neat 3-Card Grid with Trailing Arrow Animations (↗) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DUE_DILIGENCE_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              id={`card-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2.5 rounded-xl border ${item.accentIcon} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${item.accentBadge}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-zinc-400">
                    {item.agency}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300/80 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Trailing arrow hover animation (↗) */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors">
                <span className="flex items-center space-x-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Official Site</span>
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
