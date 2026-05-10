import { generateInspectionPack } from "../services/aiagent.js";
import { generatePDF } from "../services/pdfservice.js";
import { savePack, getAllPacks, getPackById } from "../services/packstorage.js";

const MIN_NOTES_LENGTH = 50;

function validatePackData(data) {
  if (!data || typeof data !== "object") {
    return "AI response is not valid";
  }
  if (!Array.isArray(data.risks) || data.risks.length === 0) {
    return "No risks identified. Please provide detailed inspection notes with specific hazards.";
  }
  if (!Array.isArray(data.missingDocuments) || data.missingDocuments.length === 0) {
    return "No missing documents found. Please include document checks in your notes.";
  }
  if (!Array.isArray(data.actionItems) || data.actionItems.length === 0) {
    return "No action items generated. Please provide specific issues to address.";
  }
  return null;
}

export async function createPack(req, res) {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return res.status(400).json({
        error: "Notes are required and must be a non-empty string",
      });
    }

    if (notes.trim().length < MIN_NOTES_LENGTH) {
      return res.status(400).json({
        error: `Notes are too short. Please provide at least ${MIN_NOTES_LENGTH} characters with specific inspection details.`,
      });
    }

    const packData = await generateInspectionPack(notes);

    const validationError = validatePackData(packData);
    if (validationError) {
      return res.status(422).json({
        error: validationError,
      });
    }

    const savedPack = await savePack(packData);

    res.status(200).json({
      success: true,
      data: {
        ...packData,
        id: savedPack.id,
        title: savedPack.title,
        createdAt: savedPack.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in createPack:", error);
    res.status(500).json({
      error: "Failed to generate inspection pack",
      message: error.message,
    });
  }
}

export async function exportPDF(req, res) {
  try {
    const { packData } = req.body;

    if (!packData || !packData.risks || !packData.actionItems) {
      return res.status(400).json({
        error: "Valid pack data is required",
      });
    }

    const pdfBuffer = await generatePDF(packData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=inspection-pack.pdf");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error in exportPDF:", error);
    res.status(500).json({
      error: "Failed to generate PDF",
      message: error.message,
    });
  }
}

export async function getPacks(req, res) {
  try {
    const packs = await getAllPacks();
    res.status(200).json({
      success: true,
      data: packs,
    });
  } catch (error) {
    console.error("Error in getPacks:", error);
    res.status(500).json({
      error: "Failed to retrieve packs",
      message: error.message,
    });
  }
}

export async function getPack(req, res) {
  try {
    const { id } = req.params;
    const pack = await getPackById(id);
    res.status(200).json({
      success: true,
      data: pack,
    });
  } catch (error) {
    if (error.message === "Pack not found") {
      return res.status(404).json({
        error: "Pack not found",
      });
    }
    console.error("Error in getPack:", error);
    res.status(500).json({
      error: "Failed to retrieve pack",
      message: error.message,
    });
  }
}