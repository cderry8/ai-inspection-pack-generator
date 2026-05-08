# AI Inspection Pack Generator - Backend

## Libraries to Install

Run this command in the backend folder:

```bash
npm install
```

Or manually install each:

```bash
npm install express cors helmet express-rate-limit compression morgan dotenv @google/generative-ai mongoose
npm install --save-dev nodemon jest
```

## Setup

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Setup MongoDB (optional - server works without it):**
   - Install MongoDB locally or use MongoDB Atlas free tier
   - Update `MONGODB_URI` in `.env` file

3. **Get your free Gemini API key (optional):**
   - Go to https://aistudio.google.com/app/apikey
   - Copy key into `.env` file
   - Works without key using mock data

4. **Start the server:**
   ```bash
   npm run dev      # Development with auto-reload
   npm start        # Production mode
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/generate` | Generate inspection pack |
| GET | `/api/packs` | Get previous packs (requires MongoDB) |

## POST /api/generate

**Request:**
```json
{
  "notes": "Inspection found exposed wiring in the warehouse..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "risks": [...],
    "missingDocuments": [...],
    "actionItems": [...]
  },
  "generatedAt": "2026-01-08T10:30:00Z"
}
```

## Security Features Included

- **Helmet**: Security headers (XSS, clickjacking protection)
- **CORS**: Restricted to your frontend origin
- **Rate Limiting**: 100 req/15min general, 10 req/min for generation
- **Input Validation**: Max 50KB notes, XSS sanitization
- **Error Handling**: No stack traces leaked in production

## Free Tier Limits (Gemini 2.5 Flash)

- 1,500 requests per day
- 15 requests per minute
- 1 million token context window

Works without API key (returns mock data) for development.
