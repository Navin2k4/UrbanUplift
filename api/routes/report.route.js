import express from "express";
import {
  getReport,
  getReportByID,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/report.controller";

const router = express.Router();

router.get("/", getReport);
router.get("/:id", getReportByID);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);
router.post("/:id/recognizeImage", recognizeImage);

export default router;
