import React, { useState } from 'react';
import { X, Terminal, Copy, Check } from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const curlExample = `curl -X POST https://api.phishinspect.security/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mode": "text",
    "content": "Deposit this cashier check of $4,850 and wire $4,200 via Zelle to our IT vendor within 24 hours."
  }'`;

  const jsonResponseExample = `{
  "status": "success",
  "threatScore": 80,
  "riskTier": "Critical Phishing",
  "verdict": "CRITICAL MALICIOUS",
  "detectedRedFlags": [
    {
      "category": "Payment Traps",
      "evidenceSnippet": "cashier check",
      "explanation": "Advance-fee check reimbursement trap detected.",
      "severity": "CRITICAL"
    }
  ],
  "domainAnalysis": {
    "extractedDomain": "Unspecified",
    "isFreeWebmail": false,
    "infrastructureStatus": "Flagged / High Risk"
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="api-docs-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-docs-modal-title"
    >
      <div
        id="api-docs-modal-panel"
        className="w-full max-w-3xl bg-[#0c0d10] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#15171c]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 id="api-docs-modal-title" className="text-base font-bold text-white font-mono">
                PhishInspect Threat Engine REST API v1
              </h3>
              <p className="text-xs text-zinc-400">
                Automate real-time fraud scoring for job boards, rental marketplaces, and mail gateways.
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

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto font-mono text-xs text-zinc-300">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-400 font-semibold uppercase tracking-wider">
                Endpoint Specification:
              </span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px]">
                POST /v1/scan
              </span>
            </div>
            <p className="text-zinc-400 font-sans text-xs">
              Analyzes incoming payload against the weighted heuristic engine and typosquatting database.
            </p>
          </div>

          {/* cURL Code Block */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-400 text-[11px]">Request Example (cURL):</span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center space-x-1 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] overflow-x-auto text-[11px] text-emerald-300 leading-relaxed">
              <code>{curlExample}</code>
            </pre>
          </div>

          {/* JSON Response Schema */}
          <div>
            <span className="text-zinc-400 text-[11px] block mb-1.5">Standard JSON Response (HTTP 200 OK):</span>
            <pre className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] overflow-x-auto text-[11px] text-zinc-300 leading-relaxed max-h-48 overflow-y-auto">
              <code>{jsonResponseExample}</code>
            </pre>
          </div>

          {/* Rate Limits */}
          <div className="bg-[#15171c] p-3.5 rounded-xl border border-white/[0.08] space-y-1">
            <span className="text-emerald-400 font-semibold block text-[11px]">Developer Tier Limits:</span>
            <p className="text-zinc-400 font-sans text-xs">
              1,000 requests/minute per API key. Enterprise clients receive unlimited concurrency with dedicated webhook streams.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#15171c] flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">
            OpenAPI 3.1 & SDK definitions available for TypeScript & Python.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors cursor-pointer"
          >
            Close API Docs
          </button>
        </div>
      </div>
    </div>
  );
};
