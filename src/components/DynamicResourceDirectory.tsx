import React from 'react';
import { ShieldCheck, ShieldAlert, Database, Search, ArrowUpRight, ExternalLink } from 'lucide-react';

interface ResourceLink {
  id: string;
  title: string;
  organization: string;
  url: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
}

const OFFICIAL_RESOURCES: ResourceLink[] = [
  {
    id: 'res-ftc',
    title: 'FTC Fraud & Job Scam Reporting',
    organization: 'Federal Trade Commission',
    url: 'https://reportfraud.ftc.gov',
    description:
      'Official federal portal to submit deceptive employment letters, counterfeit cashier check reimbursement traps, and rental deposit schemes.',
    badge: 'Federal Regulatory Agency',
    icon: ShieldCheck,
    accentColor: 'text-indigo-400 group-hover:text-indigo-300',
  },
  {
    id: 'res-ic3',
    title: 'FBI Internet Crime Complaint Center (IC3)',
    organization: 'Federal Bureau of Investigation',
    url: 'https://www.ic3.gov',
    description:
      'Direct intake portal for federal cybercrime, wire fraud, advance-fee payment extortion, and unauthorized money mule operations.',
    badge: 'Federal Law Enforcement',
    icon: ShieldAlert,
    accentColor: 'text-rose-400 group-hover:text-rose-300',
  },
  {
    id: 'res-bbb',
    title: 'BBB Scam Tracker',
    organization: 'Better Business Bureau',
    url: 'https://www.bbb.org/scamtracker',
    description:
      'Verified consumer database tracking active fake recruiter aliases, impersonated corporate identities, and predatory rental listings.',
    badge: 'Consumer Protection Bureau',
    icon: Database,
    accentColor: 'text-amber-400 group-hover:text-amber-300',
  },
  {
    id: 'res-whois',
    title: 'ICANN Domain Age & WHOIS Lookup',
    organization: 'ICANN Official Registry',
    url: 'https://lookup.icann.org',
    description:
      'Official global registrar lookup to inspect domain creation dates, authoritative DNS servers, and registration longevity.',
    badge: 'Authoritative DNS & Registry',
    icon: Search,
    accentColor: 'text-emerald-400 group-hover:text-emerald-300',
  },
];

export const DynamicResourceDirectory: React.FC = () => {
  return (
    <section
      id="official-threat-resource-hub"
      className="w-full bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40 space-y-6"
      aria-labelledby="heading-resource-hub"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Escalation Gateways & Reporting Hub</span>
          </div>
          <h2
            id="heading-resource-hub"
            className="text-xl sm:text-2xl font-bold text-white tracking-tight"
          >
            Authoritative Scam Reporting & Verification Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Report fake job offers or wire traps directly to federal regulators, or independently verify suspicious recruiter domains using official ICANN registries.
          </p>
        </div>

        <span className="text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          4 Official Portals
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OFFICIAL_RESOURCES.map((res) => {
          const Icon = res.icon;
          return (
            <a
              key={res.id}
              id={`resource-link-${res.id}`}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/30 hover:bg-black/50 border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                        {res.organization}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-1.5">
                        <span className="relative">
                          {res.title}
                          {/* Animated underline */}
                          <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Trailing arrow transition icon */}
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{res.badge}</span>
                <span className="text-indigo-400 font-semibold flex items-center space-x-1 group-hover:text-indigo-300">
                  <span>Visit Secure Portal</span>
                  <span className="text-xs transition-transform group-hover:translate-x-0.5">↗</span>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
