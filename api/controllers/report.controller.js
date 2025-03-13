import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";

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
    const [totalIssues, pendingIssues, inProgressIssues, resolvedIssues] =
      await Promise.all([
        prisma.issue.count(),
        prisma.issue.count({ where: { status: "pending" } }),
        prisma.issue.count({ where: { status: "in-progress" } }),
        prisma.issue.count({ where: { status: "resolved" } }),
      ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await prisma.issue.groupBy({
      by: ["category"],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: true,
    });

  
    const categoryStats = await prisma.issue.groupBy({
      by: ["category"],
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

export const getRecentActivities = async (req, res) => {
  try {
    const recentIssues = await prisma.issue.findMany({
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
    res.status(500).json({ error: error.message });
  }
};

const classifyImage = async (imageUrl) => {
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
    const { status } = req.params;
    const reports = await prisma.issue.findMany({
      where: {
        status: status,
      },
      orderBy: {
        createdAt: "desc",
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
    const { description, location, category, imageUrl, priority } = req.body;

    if (!description || !location) {
      return res
        .status(400)
        .json({ error: "Description and location are required" });
    }

    // If category is not provided, classify using both description and image
    let issueCategory = category;
    let aiPriority = null;

    if (!category) {
      // Get text-based classification
      const textCategory = await classifyDescription(description);

      // Get image-based classification if image URL is provided
      let imageCategory = null;
      if (imageUrl) {
        imageCategory = await classifyImage(imageUrl);
      }

      // Use text category as default, but log both for reference
      issueCategory = textCategory;

      // Determine AI priority
      aiPriority = determineAIPriority(textCategory, 0.8);
      console.log("Classifications:", {
        textCategory,
        imageCategory,
        aiPriority,
      });
    }

    const report = await prisma.issue.create({
      data: {
        description,
        location,
        category: issueCategory,
        imageUrl: imageUrl || null,
        priority: priority || "medium",
        aiPriority: aiPriority,
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
