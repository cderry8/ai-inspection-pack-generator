import { generateInspectionPack } from "../services/aiagent.js";

export async function createPack(req, res) {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return res.status(400).json({
        error: "Notes are required and must be a non-empty string",
      });
    }

    const packData = await generateInspectionPack(notes);

    res.status(200).json({
      success: true,
      data: packData,
    });
  } catch (error) {
    console.error("Error in createPack:", error);
    res.status(500).json({
      error: "Failed to generate inspection pack",
      message: error.message,
    });
  }
}
