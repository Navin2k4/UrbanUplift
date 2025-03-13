import express from "express";
import { classifyIssue } from "../controllers/issueController.js";

const router = express.Router();

router.post("/classify", classifyIssue);

export default router;
