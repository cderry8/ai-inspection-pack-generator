import express from "express";
import { createPack } from "../controllers/packcontroller.js";

const router = express.Router();

router.post("/generate", createPack);

export default router;
