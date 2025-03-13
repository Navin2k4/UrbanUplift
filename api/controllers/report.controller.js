import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Using zero-shot classification model
const ZERO_SHOT_MODEL_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

// List of possible issue categories
const issueCategories = [
  "pothole",
  "drainage leakage",
  "fused streetlight",
  "sewage overflow",
  "garbage dump",
  "broken sidewalk",
  "water pipeline leakage",
  "other",
];

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [totalIssues, pendingIssues, inProgressIssues, resolvedIssues] = await Promise.all([
      prisma.issue.count(),
      prisma.issue.count({ where: { status: "pending" } }),
      prisma.issue.count({ where: { status: "in-progress" } }),
      prisma.issue.count({ where: { status: "resolved" } }),
    ]);

    // Get monthly statistics for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await prisma.issue.groupBy({
      by: ['category'],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: true,
    });

    // Get category distribution
    const categoryStats = await prisma.issue.groupBy({
      by: ['category'],
      _count: true,
    });

    res.json({
      totalIssues,
      statusDistribution: {
        pending: pendingIssues,
        inProgress: inProgressIssues,
        resolved: resolvedIssues,
      },
      monthlyStats,
      categoryStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const recentIssues = await prisma.issue.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        location: true,
        createdAt: true,
      },
    });

    res.json(recentIssues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Classification function
export const classifyIssue = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // Perform zero-shot classification
    const response = await axios.post(
      ZERO_SHOT_MODEL_URL,
      {
        inputs: description,
        parameters: { candidate_labels: issueCategories },
      },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const { labels, scores } = response.data;
    const category = labels[0];
    const confidence = scores[0];

    return res.json({
      category,
      confidence,
    });
  } catch (error) {
    console.error("Error classifying issue:", error);
    res.status(500).json({ error: "Failed to classify issue" });
  }
};

// Helper function to classify description
const classifyDescription = async (description) => {
  try {
    const response = await axios.post(
      ZERO_SHOT_MODEL_URL,
      {
        inputs: description,
        parameters: { candidate_labels: issueCategories },
      },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const { labels } = response.data;
    return labels[0];
  } catch (error) {
    console.error("Error in classification:", error);
    return "other";
  }
};

// Get reports by status
export const getReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const reports = await prisma.issue.findMany({
      where: {
        status: status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CRUD operations using Prisma
export const getReport = async (req, res) => {
  try {
    const reports = await prisma.issue.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReportByID = async (req, res) => {
  try {
    const report = await prisma.issue.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { description, location, category, imageUrl } = req.body;

    if (!description || !location) {
      return res
        .status(400)
        .json({ error: "Description and location are required" });
    }

    // If category is not provided, classify the description
    const issueCategory = category || (await classifyDescription(description));

    const report = await prisma.issue.create({
      data: {
        description,
        location,
        category: issueCategory,
        imageUrl: imageUrl || null,
        status: "pending",
      },
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await prisma.issue.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await prisma.issue.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cleanup Prisma connection when the server shuts down
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
