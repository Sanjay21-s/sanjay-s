import React, { useState } from 'react';
import { X, Globe2, Radio } from 'lucide-react';

interface ThreatMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThreatNode {
  id: string;
  region: string;
  attackType: string;
  tld: string;
  blockedCount: number;
  status: string;
}

const SAMPLE_NODES: ThreatNode[] = [
  { id: '1', region: 'US-East (Virginia)', attackType: 'Fake Recruiter Advance-Fee', tld: '.top', blockedCount: 1420, status: 'BLOCKED' },
  { id: '2', region: 'EU-Central (Frankfurt)', attackType: 'Sight-Unseen Rental Escrow', tld: '.xyz', blockedCount: 890, status: 'BLOCKED' },
  { id: '3', region: 'AP-South (Mumbai)', attackType: 'WhatsApp Job Task Scams', tld: '.work', blockedCount: 2310, status: 'DEFLECTED' },
  { id: '4', region: 'SA-East (São Paulo)', attackType: 'Cashier Check Overpayment', tld: '.buzz', blockedCount: 640, status: 'BLOCKED' },
  { id: '5', region: 'NA-West (Oregon)', attackType: 'Payroll Onboarding Phish', tld: '.live', blockedCount: 1120, status: 'BLOCKED' },
  { id: '6', region: 'AP-East (Tokyo)', attackType: 'Telegram Crypto Investment', tld: '.online', blockedCount: 780, status: 'MITIGATED' },
];

export const ThreatMapModal: React.FC<ThreatMapModalProps> = ({ isOpen, onClose }) => {
  const [selectedNode, setSelectedNode] = useState<ThreatNode>(SAMPLE_NODES[0]);

  if (!isOpen) return null;

  return (
    <div
      id="threat-map-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="threat-map-modal-title"
    >
      <div
        id="threat-map-modal-panel"
        className="w-full max-w-4xl bg-[#0c0d10] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#15171c]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="threat-map-modal-title" className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <span>SOC Global Phishing Threat Radar</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              </h3>
              <p className="text-xs text-zinc-400">
                Live geolocation mapping of newly minted fake-check and smishing infrastructure.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Visual Tactical Map Canvas */}
          <div className="relative w-full h-64 sm:h-80 bg-zinc-950 border border-white/[0.08] rounded-xl overflow-hidden p-4 flex flex-col justify-between">
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Radar Sweep Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-emerald-500/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-emerald-500/30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-emerald-500/40 pointer-events-none" />

            {/* Map Status Bar */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/[0.08] backdrop-blur-sm">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>6 Active Threat Corridors Under Automated Mitigation</span>
              </span>
              <span>Updated: Real-time telemetry feed</span>
            </div>

            {/* Active Nodes Display on Tactical Radar */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
              {SAMPLE_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNode(node)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer backdrop-blur-sm ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500/80 text-white shadow-lg shadow-emerald-950/40 scale-[1.02]'
                        : 'bg-zinc-900/70 border-white/[0.08] text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-emerald-400">{node.tld}</span>
                      <span className="text-zinc-500">{node.status}</span>
                    </div>
                    <div className="text-xs font-semibold truncate">{node.attackType}</div>
                    <div className="text-[10px] text-zinc-400 truncate mt-0.5">{node.region}</div>
                  </button>
                );
              })}
            </div>

            {/* Tactical Footer Readout */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Projection: Mercator / Threat Vector Coordinates</span>
              <span>Defense Status: Automatic Blocking Active</span>
            </div>
          </div>

          {/* Selected Threat Node Detail Panel */}
          <div className="bg-[#15171c] border border-white/[0.08] rounded-xl p-4 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                Corridor Threat Profile:
              </span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px]">
                {selectedNode.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-zinc-300">
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-white/[0.08]">
                <span className="text-zinc-500 text-[10px] block">Region / ASN:</span>
                <span className="font-semibold text-zinc-200">{selectedNode.region}</span>
              </div>
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-white/[0.08]">
                <span className="text-zinc-500 text-[10px] block">Attack Vector:</span>
                <span className="font-semibold text-rose-300">{selectedNode.attackType}</span>
              </div>
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-white/[0.08]">
                <span className="text-zinc-500 text-[10px] block">High-Risk TLD:</span>
                <span className="font-semibold text-amber-300">{selectedNode.tld}</span>
              </div>
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-white/[0.08]">
                <span className="text-zinc-500 text-[10px] block">Attempts Deflected:</span>
                <span className="font-semibold text-emerald-400">{selectedNode.blockedCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#15171c] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">
            Telemetry fed from verified honeypots & community abuse reports.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors cursor-pointer"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
