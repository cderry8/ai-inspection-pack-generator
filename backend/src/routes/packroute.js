import express from "express";
import { createPack, exportPDF, getPacks, getPack } from "../controllers/packcontroller.js";

const router = express.Router();

router.post("/generate", createPack);
router.post("/export", exportPDF);
router.get("/", getPacks);
router.get("/:id", getPack);

export default router;
