import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  timeout: 30000,
});

const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an AI assistant that analyzes inspection notes and generates a professional inspection pack.
Extract the following information from the inspection notes:
1. Summary - a 2-3 sentence overview of the inspection findings
2. Risks - potential hazards with severity (Low/Medium/High)
3. Missing Documents - required documents that are missing or outdated
4. Action Items - tasks to address the issues with priority and assignee

Return the response in strict JSON format with this structure:
{
  "summary": "2-3 sentence overview of the inspection findings",
  "risks": [
    {
      "id": "unique_id",
      "title": "short title",
      "description": "detailed description",
      "confidence": "Low|Medium|High"
    }
  ],
  "missingDocuments": [
    {
      "id": "unique_id",
      "name": "document name",
      "required": true|false,
      "category": "Safety|Compliance|Maintenance|Training|General"
    }
  ],
  "actionItems": [
    {
      "id": "unique_id",
      "title": "action description",
      "priority": "Low|Medium|High",
      "assignee": "role or person",
      "dueDays": number
    }
  ]
}`;

function validateResponse(data) {
  if (!data || typeof data !== "object") {
    throw new Error("AI returned invalid data structure");
  }
  if (!Array.isArray(data.risks)) data.risks = [];
  if (!Array.isArray(data.missingDocuments)) data.missingDocuments = [];
  if (!Array.isArray(data.actionItems)) data.actionItems = [];
  if (!data.summary) data.summary = "No summary available";
  return data;
}

export async function generateInspectionPack(notes) {
  try {
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Here are the inspection notes:\n\n${notes}` },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const data = JSON.parse(content);
    return validateResponse(data);
  } catch (error) {
    console.error("Error generating inspection pack:", error);
    throw new Error("Failed to generate inspection pack");
  }
}
