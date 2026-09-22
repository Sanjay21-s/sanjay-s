export type ScanMode = 'text' | 'rental' | 'url' | 'brand';

export type RiskTier = 'LEGITIMATE' | 'HIGH RISK' | 'CRITICAL SCAM';

export type SeverityLevel = 'HIGH' | 'CRITICAL' | 'MODERATE' | 'LOW';

export interface RedFlagItem {
  category: string;
  evidenceSnippet: string;
  explanation: string;
  severity: SeverityLevel;
}

export interface MetricBreakdown {
  paymentDemandScore: number; // 0-100
  domainVerificationScore: number; // 0-100
  urgencyCoercionScore: number; // 0-100
}

export interface CategorizedBreakdown {
  paymentDemand: {
    flagged: boolean;
    title: string;
    points: number;
    evidence: string;
    analysis: string;
    severity: SeverityLevel;
  };
  domainSender: {
    flagged: boolean;
    title: string;
    points: number;
    evidence: string;
    domainAge: string;
    analysis: string;
    severity: SeverityLevel;
  };
  contractClauses: {
    flagged: boolean;
    title: string;
    points: number;
    evidence: string;
    analysis: string;
    severity: SeverityLevel;
  };
}

export interface DeepThreatChecklist {
  domainAgeWhois: {
    status: 'FLAGGED' | 'VERIFIED' | 'UNKNOWN';
    headline: string;
    details: string;
    risk: SeverityLevel;
  };
  typosquattingUnicode: {
    status: 'FLAGGED' | 'CLEAN';
    headline: string;
    details: string;
    risk: SeverityLevel;
  };
  urgencySocialEngineering: {
    status: 'CRITICAL_URGENCY' | 'ELEVATED' | 'NORMAL';
    headline: string;
    details: string;
    risk: SeverityLevel;
  };
  sslCertificateAuthenticity: {
    status: 'SUSPICIOUS_ISSUER' | 'VALID_EXTENDED' | 'UNENCRYPTED_OR_DEV';
    headline: string;
    details: string;
    risk: SeverityLevel;
  };
}

export interface DomainAnalysis {
  extractedDomain: string;
  domainAssessment: string;
  isFreeWebmail: boolean;
  domainAgeEstimate?: string;
  infrastructureStatus?: string;
  sslStatus?: string;
  hasHomoglyph?: boolean;
  registrationDate?: string;
  daysActive?: number;
  registrar?: string;
  isHighRiskAge?: boolean;
  riskSummary?: string;
}

export interface ScoreBreakdown {
  baseScore: number;
  paymentDemandDelta: number;
  domainAgeDelta: number;
  freeWebmailDelta: number;
  urgencyDelta: number;
  verifiedDomainDelta: number;
  totalClamped: number;
}

export interface GeminiScanResponse {
  scamThreatIndex: number;
  domainAgeAssessment: string;
  paymentRedFlags: string[];
  analysisSummary: string;
}

export interface ScanResult {
  threatScore: number;
  riskTier: RiskTier;
  metrics: MetricBreakdown;
  domainAnalysis: DomainAnalysis;
  detectedRedFlags: RedFlagItem[];
  categorizedBreakdown: CategorizedBreakdown;
  deepChecklist?: DeepThreatChecklist;
  actionSteps: string[];
  executiveSummary: string;
  scoreBreakdown?: ScoreBreakdown;
  analyzedAt: string;
  scanMode: ScanMode;
  targetInputPreview: string;
  isAiPowered?: boolean;
  geminiResponse?: GeminiScanResponse;
}

export interface QuickExample {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconType: 'briefcase' | 'home' | 'message' | 'shield';
  mode: ScanMode;
  content: string;
  summary: string;
  tagColor: 'coral' | 'amber' | 'violet' | 'emerald';
}

export interface ScamTrendItem {
  id: string;
  category: string;
  title: string;
  activeVector: string;
  frequencyDelta: string;
  riskSeverity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  indicators: string[];
  mitigation: string;
}

export interface ScamIQQuestion {
  id: number;
  prompt: string;
  scenario: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
