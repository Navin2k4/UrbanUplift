import express from "express";
import {
  getReport,
  getReportByID,
  createReport,
  updateReport,
  deleteReport,
  classifyIssue,
  getDashboardStats,
  getRecentActivities,
  getReportsByStatus,
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/recent", getRecentActivities);
router.get("/status/:status", getReportsByStatus);

router.post("/classify", classifyIssue);

router.get("/", getReport);
router.get("/:id", getReportByID);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
