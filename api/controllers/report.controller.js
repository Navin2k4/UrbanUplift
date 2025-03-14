import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import { sendIssueNotification } from "../utils/emailService.js";

dotenv.config();
const prisma = new PrismaClient();
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

const ZERO_SHOT_MODEL_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const IMAGE_MODEL_URL =
  "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";

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

export const getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required",
      });
    }

    // Get total issues count
    const totalIssues = await prisma.issue.count({
      where: {
        createdById: userId,
      },
    });

    // Get status distribution
    const statusDistribution = await prisma.issue.groupBy({
      by: ["status"],
      where: {
        createdById: userId,
      },
      _count: true,
    });

    // Format status distribution
    const formattedStatusDistribution = {
      pending: 0,
      inProgress: 0,
      resolved: 0,
    };

    statusDistribution.forEach((item) => {
      const status = item.status.toLowerCase();
      const count = item._count;

      if (status === "pending") formattedStatusDistribution.pending = count;
      if (status === "in_progress")
        formattedStatusDistribution.inProgress = count;
      if (status === "resolved") formattedStatusDistribution.resolved = count;
    });

    // Get monthly stats for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await prisma.issue.groupBy({
      by: ["category"],
      where: {
        createdById: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: true,
    });

    // Get category distribution
    const categoryStats = await prisma.issue.groupBy({
      by: ["category"],
      where: {
        createdById: userId,
      },
      _count: true,
    });

    return res.json({
      totalIssues,
      statusDistribution: formattedStatusDistribution,
      monthlyStats: monthlyStats.map((stat) => ({
        category: stat.category,
        _count: stat._count,
      })),
      categoryStats: categoryStats.map((stat) => ({
        category: stat.category,
        _count: stat._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      error: "Failed to fetch dashboard statistics",
      details: error.message,
    });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate if userId exists
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const recentIssues = await prisma.issue.findMany({
      where: {
        createdById: userId,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
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
    console.error("Error in getRecentActivities:", error);
    res.status(500).json({
      error: "Failed to fetch recent activities",
      details: error.message,
    });
  }
};

const classifyReport = async (imageUrl) => {
  try {
    const response = await axios.post(
      IMAGE_MODEL_URL,
      { inputs: imageUrl },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const predictions = response.data;
    return predictions[0].label;
  } catch (error) {
    console.error("Error classifying image:", error);
    return null;
  }
};

const determineAIPriority = (category, confidence) => {
  const highPriorityIssues = [
    "sewage overflow",
    "water pipeline leakage",
    "drainage leakage",
  ];
  const mediumPriorityIssues = [
    "pothole",
    "fused streetlight",
    "broken sidewalk",
  ];

  if (highPriorityIssues.includes(category) && confidence > 0.7) {
    return "high";
  } else if (mediumPriorityIssues.includes(category) || confidence > 0.5) {
    return "medium";
  }
  return "low";
};

export const classifyIssue = async (req, res) => {
  try {
    const { description, imageUrl } = req.body;
    if (!description && !imageUrl) {
      return res
        .status(400)
        .json({ error: "Either description or image URL is required" });
    }

    let textCategory = null;
    let textConfidence = null;
    let imageCategory = null;

    if (description) {
      const textResponse = await axios.post(
        ZERO_SHOT_MODEL_URL,
        {
          inputs: description,
          parameters: { candidate_labels: issueCategories },
        },
        { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
      );
      textCategory = textResponse.data.labels[0];
      textConfidence = textResponse.data.scores[0];
    }

    if (imageUrl) {
      const imageResponse = await axios.post(
        IMAGE_MODEL_URL,
        { inputs: imageUrl },
        { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
      );
      imageCategory = imageResponse.data[0].label;
    }

    let finalCategory;
    let finalConfidence;

    if (textCategory && imageCategory) {
      finalCategory = textCategory;
      finalConfidence = textConfidence;
    } else if (textCategory) {
      finalCategory = textCategory;
      finalConfidence = textConfidence;
    } else {
      finalCategory = imageCategory;
      finalConfidence = 0.8;
    }

    // Determine AI priority
    const aiPriority = determineAIPriority(finalCategory, finalConfidence);

    return res.json({
      category: finalCategory,
      confidence: finalConfidence,
      aiPriority,
      textAnalysis: textCategory
        ? {
            category: textCategory,
            confidence: textConfidence,
          }
        : null,
      imageAnalysis: imageCategory
        ? {
            category: imageCategory,
          }
        : null,
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
    const { status, userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required",
      });
    }

    // Validate status and convert to uppercase
    const validStatuses = ["PENDING", "IN_PROGRESS", "RESOLVED"];
    const normalizedStatus = status.toUpperCase();

    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const reports = await prisma.issue.findMany({
      where: {
        status: normalizedStatus,
        createdById: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json(reports);
  } catch (error) {
    console.error("Error fetching reports by status:", error);
    return res.status(500).json({
      error: "Failed to fetch reports",
      details: error.message,
    });
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
    const {
      description,
      category,
      location,
      imageUrl,
      priority,
      aiPriority,
      createdById,
      coordinates,
      address,
      district,
      state,
    } = req.body;

    // Validate required fields
    if (!description || !category || !location || !createdById) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          description: !description,
          category: !category,
          location: !location,
          createdById: !createdById,
        },
      });
    }

    // Get user with email in a single query
    const user = await prisma.user.findUnique({
      where: { id: createdById },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        details: `No user found with ID: ${createdById}`,
      });
    }

    // Create the report with user information
    const report = await prisma.issue.create({
      data: {
        description,
        category,
        location,
        imageUrl,
        priority: priority || "MEDIUM",
        aiPriority,
        createdById: user.id,
        coordinates,
        address,
        district,
        state,
        status: "PENDING", // Set initial status
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send email notification
    try {
      await sendIssueNotification(
        {
          ...report,
          userName: user.name, // Add user name for personalization
          priority: report.priority.toUpperCase(),
          createdAt: new Date().toISOString(),
        },
        user.email
      );

      // Return success with email status
      res.status(201).json({
        success: true,
        message: "Issue reported successfully and notification sent",
        data: report,
      });
    } catch (emailError) {
      // Log email error but still return success for report creation
      console.error("Error sending email notification:", emailError);
      res.status(201).json({
        success: true,
        message: "Issue reported successfully but notification failed",
        data: report,
        emailError: "Failed to send email notification",
      });
    }
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      error: "Failed to create report",
      details: error.message,
    });
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
