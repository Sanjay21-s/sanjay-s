import React, { useState } from 'react';
import { ACTIVE_SCAM_TRENDS, VERIFIED_RESOURCES } from '../data/threatIntel';
import { ScamTrendItem } from '../types';
import {
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  Radio,
  ArrowUpRight,
  Shield,
  ExternalLink,
} from 'lucide-react';

export const ScamTrendsHub: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState<string | null>(ACTIVE_SCAM_TRENDS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Employment Fraud', 'Logistics Impersonation', 'Real Estate Fraud', 'Web3 & Financial Fraud', 'Government Impersonation'];

  const filteredTrends =
    activeCategory === 'ALL'
      ? ACTIVE_SCAM_TRENDS
      : ACTIVE_SCAM_TRENDS.filter((t) => t.category === activeCategory);

  return (
    <section
      id="active-scam-trends-section"
      className="w-full space-y-6 pt-4"
      aria-labelledby="heading-scam-trends"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Active Threat Intelligence Radar</span>
          </div>
          <h2
            id="heading-scam-trends"
            className="text-xl sm:text-2xl font-bold text-white tracking-tight"
          >
            Known Scam Directory & Cyber Threat Intel
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            High-volume social engineering lures, counterfeit check traps, and lookalike domain attacks actively tracked across cybersecurity feeds.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.06]'
              }`}
            >
              {cat === 'ALL' ? 'All Campaigns' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Scam Trends Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrends.map((trend) => {
          const isSelected = selectedTrend === trend.id;
          const isCritical = trend.riskSeverity === 'CRITICAL';

          return (
            <article
              key={trend.id}
              id={`trend-card-${trend.id}`}
              className={`rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                isSelected
                  ? 'bg-[#111827] border-indigo-500/50 ring-1 ring-indigo-500/30 -translate-y-1 shadow-indigo-500/10'
                  : 'bg-[#111827]/70 backdrop-blur-xl border-white/[0.08] hover:border-white/[0.16] hover:-translate-y-0.5'
              }`}
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.08]">
                    {trend.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{trend.frequencyDelta}</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        isCritical
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}
                    >
                      {trend.riskSeverity}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {trend.title}
                </h3>

                {/* Active Vector */}
                <p className="text-xs text-slate-400 mt-2 bg-black/30 p-2.5 rounded-xl border border-white/[0.06]">
                  <span className="text-slate-400 font-semibold">Vector:</span> {trend.activeVector}
                </p>

                {/* Key Indicators Snippet */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Forensic Indicators:
                  </span>
                  {trend.indicators.slice(0, isSelected ? 3 : 2).map((ind, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-rose-400 font-bold flex-shrink-0 mt-0.5">•</span>
                      <span className="line-clamp-2 leading-relaxed">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action & Mitigation */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
                {isSelected ? (
                  <div className="space-y-2.5">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl text-xs text-indigo-200 leading-relaxed font-sans">
                      <strong className="text-indigo-300 block mb-0.5 font-semibold">Defensive Countermeasure:</strong>
                      {trend.mitigation}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTrend(null)}
                      className="w-full text-center text-xs text-slate-400 hover:text-white py-1 transition-colors cursor-pointer"
                    >
                      Collapse Details ▲
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedTrend(trend.id)}
                    className="w-full flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors py-1 cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>View Threat Anatomy & Defense</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Verified Security Resources Section with Clickable Outbound Links */}
      <div
        id="verified-security-resources-hub"
        className="w-full bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40 mt-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Cybersecurity Authorities & Intake Gateways</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Verified Security Portals & Incident Escalation
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Official intake channels for reporting cybercrime, wire fraud, and abusive phishing infrastructure.
            </p>
          </div>
          <span className="text-xs text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.08] self-start sm:self-auto font-medium">
            Direct Federal Escalation
          </span>
        </div>

        {/* 6 Clickable Outbound Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-5">
          {VERIFIED_RESOURCES.map((res) => (
            <a
              key={res.name}
              id={`resource-link-${res.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-4 rounded-2xl bg-black/30 hover:bg-black/50 border border-white/[0.08] hover:border-indigo-500/40 text-left transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                    {res.badge}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {res.name}
                </h4>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans line-clamp-2">
                  {res.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-indigo-400 group-hover:text-indigo-300">
                <span className="truncate max-w-[180px] text-slate-400 font-mono text-[11px]">{res.url.replace('https://', '')}</span>
                <span className="flex items-center space-x-1 font-medium">
                  <span>Visit Portal</span>
                  <span className="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
