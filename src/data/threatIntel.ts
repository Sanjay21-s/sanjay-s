import { ScamTrendItem, ScamIQQuestion } from '../types';

export const TELEMETRY_METRICS = {
  dbVersion: 'v2026.4',
  globalAttacksBlocked: 1428912,
  flaggedDomainsCount: 84210,
  highRiskTLDs: ['.xyz', '.top', '.work', '.click', '.buzz', '.space', '.loan', '.tk'],
  avgAnalysisTimeMs: 412,
  activeThreatSignatures: 39512,
};

export const ACTIVE_SCAM_TRENDS: ScamTrendItem[] = [
  {
    id: 'trend-job-scam',
    category: 'Employment Fraud',
    title: 'Remote Equipment Advance-Fee & Check Laundering',
    activeVector: 'Telegram / WhatsApp / Gmail impersonation of Fortune 500 HR',
    frequencyDelta: '+34% this month',
    riskSeverity: 'CRITICAL',
    indicators: [
      'Interviews conducted exclusively via anonymous messenger apps',
      'Certified cashier check sent upfront for home-office hardware',
      'Mandatory wire transfer back to "approved IT vendor" via Zelle or Crypto',
    ],
    mitigation: 'Verify recruiter identity directly through official corporate switchboard. Never transfer personal funds against uncleared checks.',
  },
  {
    id: 'trend-smishing-logistics',
    category: 'Logistics Impersonation',
    title: 'USPS / FedEx / DHL Unpaid Customs Smishing',
    activeVector: 'Automated SMS blast with urgency timer and shortlink',
    frequencyDelta: '+58% this week',
    riskSeverity: 'CRITICAL',
    indicators: [
      'SMS claims parcel cannot be delivered due to small fee ($1.50 - $3.00)',
      'Lookalike domain mimicking postal portal (e.g., usps-redelivery-pay.top)',
      'Credit card CVV extraction form hosted on unverified cloud bucket',
    ],
    mitigation: 'Track parcels exclusively by pasting the tracking number directly into official carriers official apps or carrier domains.',
  },
  {
    id: 'trend-rental-trap',
    category: 'Real Estate Fraud',
    title: 'Phantom Sublease & Sight-Unseen Deposit Traps',
    activeVector: 'Facebook Marketplace, Craigslist, and Zillow scraped listings',
    frequencyDelta: '+21% this month',
    riskSeverity: 'HIGH',
    indicators: [
      'Landlord claims to be out of state / missionary / military deploy',
      'Below-market monthly rent on luxury amenities to induce FOMO',
      'Keys supposedly held by courier service pending upfront wire deposit',
    ],
    mitigation: 'Never send non-refundable holding fees before conducting an in-person physical walkthrough inside the rental unit.',
  },
  {
    id: 'trend-crypto-drainer',
    category: 'Web3 & Financial Fraud',
    title: 'Permit2 / Seaport Malicious Airdrop Token Drainers',
    activeVector: 'Hacked verified X (Twitter) accounts & Discord broadcast webhooks',
    frequencyDelta: '+47% this month',
    riskSeverity: 'CRITICAL',
    indicators: [
      'Unsolicited high-value token claims ($1,000+) requiring wallet connect',
      'Smart contract approval requests (eth_sign / Permit2 unlimited allowances)',
      'Urgency counters claiming allocation expires in less than 60 minutes',
    ],
    mitigation: 'Inspect transaction simulation prompts using Revoke.cash or hardware wallet air-gapped confirmation displays.',
  },
  {
    id: 'trend-tax-refund',
    category: 'Government Impersonation',
    title: 'IRS / HMRC Immediate Tax Rebate Harvester',
    activeVector: 'Spoofed email sender headers with governmental coat of arms',
    frequencyDelta: '+62% seasonal surge',
    riskSeverity: 'HIGH',
    indicators: [
      'Notification of unclaimed tax refund requiring banking details within 48h',
      'Embedded PDF attachment triggering credential harvesting landing page',
      'Sender domain mismatch (e.g. tax-rebate-irs.xyz instead of irs.gov)',
    ],
    mitigation: 'Government tax agencies will never initiate refund or penalty notices via SMS, WhatsApp, or unsolicited email links.',
  },
  {
    id: 'trend-ecommerce-trap',
    category: 'Brand Mimicry',
    title: 'Flash Sale 90% Off Social Media Storefronts',
    activeVector: 'Sponsored Instagram / TikTok ads linking to duplicate storefronts',
    frequencyDelta: '+19% this month',
    riskSeverity: 'MODERATE',
    indicators: [
      'Discounts on high-end luxury goods (Stanley cups, North Face, Dyson) exceeding 85%',
      'Domain registered fewer than 14 days ago via privacy-cloaked registrar',
      'Checkout only permits direct card numbers or obscure third-party processors',
    ],
    mitigation: 'Perform domain age lookup and cross-check brand official social media handle handles before authorizing card charges.',
  },
];

export const RED_FLAG_CHECKLIST = [
  {
    id: 'flag-1',
    rule: 'Rule 01: The Overpayment & Check Reversal Trap',
    summary: 'Never accept a cashier check and wire a portion back to a "third-party vendor".',
    details: 'Federal banking law makes deposited check funds available within 1-2 days, but the issuing bank may take 2-4 weeks to discover a counterfeit check. When it bounces, your bank pulls the full amount from your personal account, leaving you responsible for any money you wired out.',
    indicator: 'Overpayment / Equipment check / Reimbursement scheme',
  },
  {
    id: 'flag-2',
    rule: 'Rule 02: Disposable & Unauthenticated Communication',
    summary: 'Legitimate corporate enterprises communicate from authenticated domain MX records.',
    details: 'If a recruiter or hiring manager claims to represent a global company (e.g., Apple, Google, Amazon) but contacts you from @gmail.com, @yahoo.com, or uses Telegram/WhatsApp/Signal for formal contracts, it is 100% an impersonation attack.',
    indicator: 'Free webmail / Messaging app recruitment',
  },
  {
    id: 'flag-3',
    rule: 'Rule 03: The "Too-Good-To-Be-True" Speed Run',
    summary: 'Legitimate high-paying employers never hire without live two-way interviews.',
    details: 'Job offers extending $40-$80/hr after only a written questionnaire, text-based Telegram chat, or no interview at all are designed to exploit excitement before rational scrutiny intervenes.',
    indicator: 'No video interview / Immediate same-day employment contract',
  },
  {
    id: 'flag-4',
    rule: 'Rule 04: Sight-Unseen Rental Key Couriers',
    summary: 'Never remit a holding deposit or lease fee before an in-person physical walkthrough.',
    details: 'Scammers copy photos from public real estate listings, list them at below-market rates, and claim they are abroad on missionary/military duty. They promise keys will be shipped via FedEx once you Zelle or CashApp an earnest deposit.',
    indicator: 'Overseas landlord / Courier key dispatch / Wire before viewing',
  },
  {
    id: 'flag-5',
    rule: 'Rule 05: Artificial Panic & 24-Hour ultimatums',
    summary: 'Extreme temporal urgency is the core psychological lever in social engineering.',
    details: 'Fraudsters create fake scarcity ("35 other applicants are waiting", "offer expires in 12 hours", "package destroyed unless paid today") to prevent victims from consulting family, friends, or cybersecurity guidance.',
    indicator: 'Short deadlines / Threat of forfeiture / Panic inducements',
  },
  {
    id: 'flag-6',
    rule: 'Rule 06: Deceptive Lookalike Domain Syntax (Typosquatting)',
    summary: 'Inspect the address bar carefully for hyphenated subdomains and cheap TLDs.',
    details: 'Look for subtle substitutions (e.g. micros0ft.com, netfIix.com with capital i), brand prefixes (e.g. chase-verify-support.xyz), or obscure generic TLDs (.top, .work, .space) that genuine financial institutions avoid.',
    indicator: 'Lookalike spelling / Suspicious TLD / Multiple hyphens',
  },
];

export const SCAM_IQ_QUIZ: ScamIQQuestion[] = [
  {
    id: 1,
    prompt: 'Question 1: Remote Job Onboarding',
    scenario: 'You receive an email from "careers@microsoft-talent-portal.work" offering a Remote Data Analyst position at $55/hr. They include a $3,500 equipment check and ask you to buy a MacBook from their vendor via Zelle. What is the correct response?',
    options: [
      {
        text: 'Deposit the check, wait 24 hours until funds show in your checking balance, then send the Zelle payment.',
        isCorrect: false,
        explanation: 'Incorrect. Available funds do NOT mean the check has cleared. Counterfeit checks often take 2-3 weeks to be returned unpaid by the Federal Reserve, leaving you in debt.',
      },
      {
        text: 'Immediately report the email as phishing, do not deposit the check, and contact Microsoft directly via their official careers portal.',
        isCorrect: true,
        explanation: 'Correct! Legitimate enterprise employers ship hardware directly via corporate IT procurement and never send checks for personal wire reimbursement.',
      },
      {
        text: 'Ask the recruiter to deduct the equipment cost from your upcoming first monthly paycheck.',
        isCorrect: false,
        explanation: 'Incorrect. Engaging with the fraudster keeps your contact active on targeted victim lead lists.',
      },
    ],
  },
  {
    id: 2,
    prompt: 'Question 2: Apartment Rental Holding Fee',
    scenario: 'A landlord on Facebook Marketplace lists a gorgeous 1-bedroom apartment for $900/mo. He says he is out of state caring for a sick relative, but will mail you the keys as soon as you transfer a $450 holding deposit via Venmo. What should you do?',
    options: [
      {
        text: 'Request a phone call or driver license photo first, and if he sends it, transfer the holding fee.',
        isCorrect: false,
        explanation: 'Incorrect. Scammers routinely steal identities and use photos of real stolen licenses to appear trustworthy.',
      },
      {
        text: 'Refuse to send any money and insist on meeting at the property to view the inside with a licensed agent or owner.',
        isCorrect: true,
        explanation: 'Correct! Never send money sight-unseen. Legitimate property managers always permit verified physical access before demanding tenancy funds.',
      },
      {
        text: 'Send the deposit because Venmo purchase protection guarantees a full refund on personal transfers.',
        isCorrect: false,
        explanation: 'Incorrect. Peer-to-peer apps like Venmo and Zelle treat transfers like cash, and purchase protection does not cover unauthorized real estate deposits.',
      },
    ],
  },
  {
    id: 3,
    prompt: 'Question 3: Urgent Courier SMS',
    scenario: 'You receive a text: "[USPS]: Your delivery #US-91048 is held at the sorting depot due to an incomplete street address. Update here within 24h: usps-post-redelivery.xyz/address". You are expecting a package. How should you react?',
    options: [
      {
        text: 'Click the link, enter your address, but stop if it asks for a credit card.',
        isCorrect: false,
        explanation: 'Incorrect. Merely visiting the spoofed domain can expose your browser to fingerprinting, tracking, or drive-by payload scripts.',
      },
      {
        text: 'Navigate directly to USPS.com in a new browser tab and enter the tracking number into the official search tool.',
        isCorrect: true,
        explanation: 'Correct! Authentic couriers provide standardized 22-digit USPS tracking numbers that resolve on official usps.com domains without requiring paid address redelivery.',
      },
      {
        text: 'Reply STOP to ensure your phone number is unsubscribed from the courier server.',
        isCorrect: false,
        explanation: 'Incorrect. Replying to smishing messages confirms to automated botnets that your mobile number is active and monitored.',
      },
    ],
  },
];

export const VERIFIED_RESOURCES = [
  {
    name: 'FTC Fraud Reporting Portal',
    url: 'https://reportfraud.ftc.gov',
    description: 'Federal Trade Commission official intake for identity theft, fake checks, and advance-fee schemes.',
    badge: 'U.S. Federal Agency',
  },
  {
    name: 'CISA Phishing Threat Reporting',
    url: 'https://www.cisa.gov/report',
    description: 'Cybersecurity and Infrastructure Security Agency national cyber incident response portal.',
    badge: 'National Defense',
  },
  {
    name: 'Anti-Phishing Working Group (APWG)',
    url: 'https://apwg.org',
    description: 'Global coalition uniting law enforcement, cybersecurity firms, and financial institutions to dismantle fraud networks.',
    badge: 'Global Cyber Alliance',
  },
  {
    name: 'VirusTotal Multi-Engine Lookup',
    url: 'https://www.virustotal.com',
    description: 'Analyze suspicious URLs, IP addresses, domains, and files through 70+ antivirus and threat blacklist databases.',
    badge: 'Threat Intelligence',
  },
  {
    name: 'FBI Internet Crime Complaint Center (IC3)',
    url: 'https://www.ic3.gov',
    description: 'Central hub for reporting high-value internet wire scams, crypto fraud, and business email compromise.',
    badge: 'Law Enforcement',
  },
  {
    name: 'Google Safe Browsing Transparency',
    url: 'https://transparencyreport.google.com/safe-browsing/search',
    description: 'Check Google real-time automated web reputation engine for reported malware and phishing hosts.',
    badge: 'Public Safety Feed',
  },
];
