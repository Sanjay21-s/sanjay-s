import React from 'react';
import {
  FileText,
  Globe,
  Briefcase,
  Home,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2,
  Eraser,
  Play,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { ScanMode, QuickExample } from '../types';
import { QUICK_EXAMPLES } from '../data/examples';

interface InputSectionProps {
  mode: ScanMode;
  setMode: (mode: ScanMode) => void;
  content: string;
  setContent: (content: string) => void;
  onScan: () => void;
  onSelectAndScan: (mode: ScanMode, text: string) => void;
  isLoading: boolean;
  onClear: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  mode,
  setMode,
  content,
  setContent,
  onScan,
  onSelectAndScan,
  isLoading,
  onClear,
}) => {
  const isFormValid = content.trim().length > 0;

  // Dual-tab controller: "Paste Offer / Lease Text" vs "Scan Company URL / Domain"
  const activeTab = mode === 'url' ? 'url' : 'text';

  const handleTabChange = (selectedTab: 'text' | 'url') => {
    setMode(selectedTab);
  };

  const getScenarioIcon = (type: QuickExample['iconType']) => {
    switch (type) {
      case 'briefcase':
        return Briefcase;
      case 'home':
        return Home;
      case 'message':
        return MessageSquare;
      case 'shield':
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  const getPresetCardStyle = (tagColor: QuickExample['tagColor']) => {
    switch (tagColor) {
      case 'coral':
        return {
          card: 'bg-rose-500/[0.07] hover:bg-rose-500/[0.13] border-rose-500/25 hover:border-rose-500/40 text-rose-100 shadow-rose-950/20',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
          cta: 'text-rose-300 group-hover:text-rose-200',
        };
      case 'amber':
        return {
          card: 'bg-amber-500/[0.07] hover:bg-amber-500/[0.13] border-amber-500/25 hover:border-amber-500/40 text-amber-100 shadow-amber-950/20',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          icon: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
          cta: 'text-amber-300 group-hover:text-amber-200',
        };
      case 'violet':
        return {
          card: 'bg-emerald-500/[0.07] hover:bg-emerald-500/[0.13] border-emerald-500/25 hover:border-emerald-500/40 text-emerald-100 shadow-emerald-950/20',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
          cta: 'text-emerald-300 group-hover:text-emerald-200',
        };
      case 'emerald':
      default:
        return {
          card: 'bg-teal-500/[0.07] hover:bg-teal-500/[0.13] border-teal-500/25 hover:border-teal-500/40 text-teal-100 shadow-teal-950/20',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
          icon: 'text-teal-400 bg-teal-500/10 border-teal-500/25',
          cta: 'text-teal-300 group-hover:text-teal-200',
        };
    }
  };

  return (
    <section
      id="scanner-input-section"
      className="w-full relative rounded-3xl p-6 sm:p-8 bg-[#15171c]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] space-y-7 transition-all duration-300"
    >
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header & Segmented Dual-Tab Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Inspect Offer or Domain</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Paste the full text or enter a recruiter link to reveal hidden scam indicators.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {/* Ready for Analysis status chip */}
            <span
              id="chip-analysis-status"
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready for Analysis</span>
            </span>

            {content && (
              <button
                id="btn-clear-input"
                type="button"
                onClick={onClear}
                className="flex items-center space-x-1.5 text-xs font-medium text-zinc-400 hover:text-white px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                title="Clear current text"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* iOS/macOS Style Segmented Tab Controller */}
        <div
          id="mode-segmented-controller"
          className="p-1.5 bg-black/50 border border-white/[0.1] rounded-2xl flex flex-col sm:flex-row gap-1.5 shadow-inner backdrop-blur-md"
          role="tablist"
        >
          {/* Tab 1: Paste Offer / Lease Text */}
          <button
            id="tab-text-mode"
            type="button"
            role="tab"
            aria-selected={activeTab === 'text'}
            onClick={() => handleTabChange('text')}
            className={`flex-1 flex items-center justify-center space-x-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'text' ? 'text-white' : 'text-zinc-400'}`} />
            <span>Paste Offer / Lease Text</span>
          </button>

          {/* Tab 2: Scan Company URL / Domain */}
          <button
            id="tab-url-mode"
            type="button"
            role="tab"
            aria-selected={activeTab === 'url'}
            onClick={() => handleTabChange('url')}
            className={`flex-1 flex items-center justify-center space-x-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'url'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeTab === 'url' ? 'text-white' : 'text-zinc-400'}`} />
            <span>Scan Company URL / Domain</span>
          </button>
        </div>
      </div>

      {/* Input Field Section */}
      <div id="input-field-container" className="space-y-2">
        {activeTab === 'url' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="input-url-content"
                className="text-sm font-medium text-zinc-200 flex items-center space-x-2"
              >
                <span>Company Career Portal or Recruiter Domain:</span>
              </label>
              <span className="text-xs text-zinc-400">
                Typosquatting & Domain Age Evaluator
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                id="input-url-content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g., https://chase-security-verify-account.top or http://starlight-media-careers.top"
                className="w-full bg-black/40 border border-white/[0.1] rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
              />
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Scans for disposable TLDs (.top, .xyz), lookalike domains, newly registered hosts (&lt;30 days), and unauthenticated webmail.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="textarea-offer-content"
                className="text-sm font-medium text-zinc-200 flex items-center space-x-2"
              >
                <span>Suspicious Job Offer, Recruiter Email, or Rental Agreement:</span>
              </label>
              <span className="text-xs text-zinc-400 font-mono">
                {content.length} characters
              </span>
            </div>
            <textarea
              id="textarea-offer-content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste suspicious appointment letter text, equipment check demands, landlord messages, holding deposit clauses, or recruiter onboarding emails..."
              className="w-full bg-black/40 border border-white/[0.1] rounded-2xl p-4 text-white placeholder-zinc-500 text-sm font-sans focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-y leading-relaxed shadow-inner"
            />
            <p className="mt-2 text-xs text-zinc-400">
              Evaluates upfront equipment check scams, counterfeit cashier check reimbursement traps, Zelle/gift card demands, sight-unseen leases, and zero-interview claims.
            </p>
          </div>
        )}
      </div>

      {/* Preset Scenarios: "Try a Sample Scam Scenario:" */}
      <div id="demo-scenarios-strip" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-medium text-sm">Try a Sample Scam Scenario:</span>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Click any scenario for an instant 1-click test
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {QUICK_EXAMPLES.map((scenario) => {
            const Icon = getScenarioIcon(scenario.iconType);
            const style = getPresetCardStyle(scenario.tagColor);

            return (
              <button
                key={scenario.id}
                id={`btn-scenario-${scenario.id}`}
                type="button"
                onClick={() => onSelectAndScan(scenario.mode, scenario.content)}
                disabled={isLoading}
                className={`group relative p-4 rounded-2xl border transition-all duration-200 text-left cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl active:translate-y-0 ${style.card}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2 rounded-xl border ${style.icon} transition-colors`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${style.badge}`}
                    >
                      {scenario.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-zinc-300/80 mt-1 line-clamp-2 leading-relaxed">
                      {scenario.subtitle}
                    </p>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-medium ${style.cta}`}>
                  <span>Analyze Sample</span>
                  <Play className="w-3 h-3 fill-current transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Button Bar */}
      <div
        id="cta-container"
        className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Zero retention: 100% private in-browser analysis. No text or links are stored.
          </span>
        </div>

        {/* Primary CTA Button: "Analyze Offer for Scams →" */}
        <button
          id="btn-run-forensic-scan"
          type="button"
          onClick={onScan}
          disabled={!isFormValid || isLoading}
          className={`relative inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
            isLoading
              ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/[0.08]'
              : !isFormValid
              ? 'bg-white/[0.05] text-zinc-500 border border-white/[0.06] cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:via-teal-500 hover:to-emerald-500 text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_32px_-4px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing for Scams...</span>
            </>
          ) : (
            <>
              <span>Analyze Offer for Scams</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
