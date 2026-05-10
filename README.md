# AI Inspection Pack Generator

A prototype that turns raw inspection notes into structured, professional reports. Paste in your notes, the AI analyzes them, and you get a summary of risks, a missing documents checklist, an action plan, and a downloadable PDF.

Built this as a trial task to demonstrate full-stack chops — frontend polish, backend architecture, AI integration, and PDF generation all wired together.

## What It Does

- Takes unstructured inspection notes via a textarea
- Sends them to Groq (Llama 3.3) with a strict system prompt
- Returns structured JSON: summary, risks with confidence scores, missing documents, and action items
- Lets you edit risk confidence levels (Low/Medium/High) before exporting
- Generates a styled PDF via Puppeteer
- Auto-saves every generated pack locally so you can browse history

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Node.js, Express, ES modules |
| AI | Groq API — Llama 3.3 70B |
| PDF | Puppeteer (headless Chromium) |
| Storage | JSON files on disk (no database needed for prototype) |

## Running It Locally

You need two terminals.

**Terminal 1 — Backend:**
```bash
cd backend
cp .env.example .env
# Add your GROQ_API_KEY to .env
npm install
npm run dev
```
Runs on `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:3000`

The frontend talks to the backend via `NEXT_PUBLIC_API_URL` (defaults to localhost:5000).

## API Endpoints

| Method | Endpoint | What it does |
|--------|----------|------------|
| POST | `/aipg/packs/generate` | Send notes, get AI-generated pack |
| POST | `/aipg/packs/export` | Send pack data, get PDF blob |
| GET | `/aipg/packs` | List all previously generated packs |
| GET | `/aipg/packs/:id` | Get a single pack by ID |
| GET | `/api/health` | Health check |

## What I Would Improve Next

1. **User sessions / auth** — Right now all packs live in one shared folder. For a real app I'd add lightweight auth (Clerk or NextAuth) and store packs per-user, probably in PostgreSQL.

2. **Better PDF templating** — The current PDF is a hand-rolled HTML string. In production I'd use a proper templating engine (Handlebars or React-to-PDF) for maintainability.

3. **Streaming AI response** — Currently waits for the full JSON before showing anything. Streaming partial results would feel snappier.

4. **Image uploads** — Inspections often include photos. Adding vision support (upload → AI analyzes image + text) would be a big value add.

5. **Pack re-generation** — Let users edit their notes and regenerate without losing confidence adjustments they've already made.

## Security Considerations If This Became a SaaS

- **API key exposure** — The Groq key lives server-side only, which is correct. Never ship it to the client.
- **Input sanitization** — Currently validates note length (50 char minimum) but doesn't sanitize HTML/JS. Would add DOMPurify or similar before sending to AI.
- **Rate limiting** — Rate limiter is configured but should be tightened for the generate endpoint specifically (AI calls cost money).
- **File storage** — JSON files on disk won't scale. Would move to S3 or a document store, with signed URLs for access.
- **PDF generation** — Puppeteer can be a vector for SSRF if user input reaches `page.goto()`. The current approach uses `setContent()` which is safer, but sandboxing the browser process is essential in production.
- **Data retention** — Inspection data might be sensitive. Would need encryption at rest, retention policies, and GDPR-compliant deletion.

## Project Structure

```
ai-inspection-pack-generator/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express setup, middleware, routes
│   │   ├── controllers/
│   │   │   └── packcontroller.js  # generate, export, list, detail
│   │   ├── routes/
│   │   │   └── packroute.js    # /generate, /export, GET /
│   │   └── services/
│   │       ├── aiagent.js      # Groq client + prompt
│   │       ├── pdfservice.js   # Puppeteer PDF generation
│   │       └── packstorage.js  # File-based JSON storage
│   ├── .env.example
│   └── package.json
│
└── client/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx          # Main view (form / preview / history)
    │   │   ├── layout.tsx        # Root layout + animated background
    │   │   └── globals.css       # Tailwind + custom styles
    │   ├── components/
    │   │   ├── input/
    │   │   │   └── inspectionform.tsx
    │   │   ├── output/
    │   │   │   ├── packpreview.tsx
    │   │   │   ├── risksummary.tsx
    │   │   │   ├── missingdocs.tsx
    │   │   │   └── actionplan.tsx
    │   │   ├── history/
    │   │   │   └── packhistory.tsx
    │   │   ├── ui/
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   ├── textarea.tsx
    │   │   │   └── confidenceselector.tsx
    │   │   ├── layout/
    │   │   │   ├── header.tsx
    │   │   │   └── animatedbackground.tsx
    │   │   └── loading/
    │   │       └── toploadingbar.tsx
    │   ├── hooks/
    │   │   └── usegeneratepack.ts
    │   ├── services/
    │   │   ├── api.ts            # Axios instance
    │   │   └── packs.ts          # API calls
    │   └── types/
    │       ├── pack.ts
    │       ├── risk.ts
    │       ├── action.ts
    │       └── document.ts
    ├── next.config.ts
    └── package.json
```
