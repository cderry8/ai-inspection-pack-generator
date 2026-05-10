import express from "express";
import { createPack, exportPDF } from "../controllers/packcontroller.js";

const router = express.Router();

router.post("/generate", createPack);
router.post("/export", exportPDF);

export default router;
