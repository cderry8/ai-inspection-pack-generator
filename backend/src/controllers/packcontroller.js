import { generateInspectionPack } from "../services/aiAgent.js";
import { generatePDF } from "../services/pdfservice.js";

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