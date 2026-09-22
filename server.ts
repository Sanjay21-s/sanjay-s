import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Lazy initialization of Gemini client
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI | null {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
        aiClient = new GoogleGenAI({ apiKey });
      }
    }
    return aiClient;
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  // Real-time Gemini AI Scan API
  app.post('/api/scan', async (req, res) => {
    try {
      const { content, mode } = req.body;

      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({ error: 'Valid content string is required for scanning' });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY not configured on server',
          fallback: true,
        });
      }

      const prompt = `You are PhishInspect's Advanced AI Cyber Defense & Scam Forensic Engine.
Analyze the following text or URL for fake offer letters, equipment check advance-fee fraud, deposit traps, phishing, and fake recruiters:

CONTENT TO INSPECT (${mode || 'text'}):
"""
${content.trim()}
"""

Provide an authoritative, rigorous threat assessment and return ONLY valid JSON matching this exact JSON schema:
{
  "scamThreatIndex": number,
  "domainAgeAssessment": string,
  "paymentRedFlags": string[],
  "analysisSummary": string
}

Field requirements:
1. "scamThreatIndex": Integer strictly between 0 and 100.
   - Advance fee / check scam / deposit wire traps should score 70-100.
   - Unverified webmail recruiters or suspicious contact channels should score 40-69.
   - Verified legitimate enterprise offers with no advance payment should score 0-20.
2. "domainAgeAssessment": A clear string assessing domain age and registration tenure (e.g., "Simulated registration age: <15 days via anonymous privacy proxy (High Risk)" or "Established corporate domain >15 years with ICANN verification").
3. "paymentRedFlags": Array of specific detected traps, e.g. ["$1,800 fake equipment stipend check", "Advance $1,200 wire fee via Zelle / Gift Cards", "Sight-unseen escrow holding deposit wire"]. If none, return an empty array [].
4. "analysisSummary": A concise 1-2 sentence executive explanation of the threat verdict.`;

      // Call Gemini standard model (gemini-3.6-flash / gemini-3.8-flash / gemini-flash-latest)
      const candidateModels = ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let response: any = null;
      let usedModel = 'gemini-3.6-flash';

      for (const modelName of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.1,
            },
          });
          usedModel = modelName;
          if (response && response.text) {
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} attempt failed, trying next candidate:`, modelErr?.message || modelErr);
        }
      }

      if (!response || !response.text) {
        throw new Error('No candidate Gemini model could complete the scan generation');
      }

      const rawText = response.text || '{}';
      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseError) {
        // In case markdown block wrapped the JSON
        const cleaned = rawText.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleaned);
      }

      const scamThreatIndex = Math.max(
        0,
        Math.min(100, Math.round(Number(parsed.scamThreatIndex) || 0))
      );
      const domainAgeAssessment = String(parsed.domainAgeAssessment || 'Standard Active Domain');
      const paymentRedFlags = Array.isArray(parsed.paymentRedFlags)
        ? parsed.paymentRedFlags.map((item: any) => String(item))
        : [];
      const analysisSummary = String(parsed.analysisSummary || 'Analysis completed by Gemini AI.');

      return res.json({
        scamThreatIndex,
        domainAgeAssessment,
        paymentRedFlags,
        analysisSummary,
        model: usedModel,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('[PhishInspect] Gemini API Scan Error:', err?.message || err);
      return res.status(500).json({
        error: err?.message || 'Gemini scanning encountered an error',
        fallback: true,
      });
    }
  });

  // Vite middleware for development; static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PhishInspect Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[PhishInspect Server] Fatal startup failure:', err);
  process.exit(1);
});
