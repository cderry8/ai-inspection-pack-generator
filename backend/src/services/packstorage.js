import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "..", "data", "packs");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create data directory:", err);
    throw err;
  }
}

function generateId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `pack-${timestamp}-${random}`;
}

function deriveTitle(summary) {
  if (!summary || typeof summary !== "string") return "Untitled Inspection Pack";
  const clean = summary.trim();
  if (clean.length <= 60) return clean;
  return clean.substring(0, 60).trim() + "...";
}

export async function savePack(packData) {
  await ensureDir();

  const id = generateId();
  const createdAt = new Date().toISOString();
  const title = deriveTitle(packData.summary);

  const record = {
    id,
    title,
    createdAt,
    summary: packData.summary || "",
    risks: packData.risks || [],
    missingDocuments: packData.missingDocuments || [],
    actionItems: packData.actionItems || [],
  };

  const filepath = path.join(DATA_DIR, `${id}.json`);
  await fs.writeFile(filepath, JSON.stringify(record, null, 2), "utf-8");

  return record;
}

export async function getAllPacks() {
  await ensureDir();

  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const packs = await Promise.all(
      jsonFiles.map(async (filename) => {
        try {
          const filepath = path.join(DATA_DIR, filename);
          const content = await fs.readFile(filepath, "utf-8");
          const data = JSON.parse(content);

          return {
            id: data.id,
            title: data.title,
            date: new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            risks: data.risks?.length || 0,
            highRisks: data.risks?.filter((r) => r.confidence === "High")?.length || 0,
            missingDocuments: data.missingDocuments?.length || 0,
            actionItems: data.actionItems?.length || 0,
            status: "completed",
          };
        } catch (err) {
          console.error(`Failed to read pack file ${filename}:`, err);
          return null;
        }
      })
    );

    return packs
      .filter(Boolean)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

export async function getPackById(id) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid pack ID");
  }

  const filepath = path.join(DATA_DIR, `${id}.json`);

  try {
    const content = await fs.readFile(filepath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("Pack not found");
    }
    throw new Error("Failed to read pack");
  }
}
