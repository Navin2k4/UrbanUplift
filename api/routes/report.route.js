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

// User-specific dashboard routes
router.get("/stats/:userId", getDashboardStats);
router.get("/recent/:userId", getRecentActivities);
router.get("/status/:status/:userId", getReportsByStatus);

// Classification route
router.post("/classify", classifyIssue);

// General CRUD routes
router.get("/", getReport);
router.get("/:id", getReportByID);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
