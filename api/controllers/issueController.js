import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

const SENTENCE_TRANSFORMERS_URL =
  "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";
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
  "other" // Fallback category
];

// Function to find best match using Sentence Similarity
const findBestMatch = async (inputText) => {
  try {
    const response = await axios.post(
      SENTENCE_TRANSFORMERS_URL,
      {
        inputs: {
          source_sentence: inputText,
          sentences: issueCategories
        }
      },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const similarityScores = response.data;
    let bestMatch = "other";
    let highestScore = 0;
    let allScores = {};

    similarityScores.forEach((score, index) => {
      allScores[issueCategories[index]] = score;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = issueCategories[index];
      }
    });

    return { bestMatch, highestScore, allScores };
  } catch (error) {
    console.error("Error finding best match:", error.response?.data || error.message);
    return { bestMatch: "other", highestScore: 0, allScores: {} };
  }
};

// Function to perform zero-shot classification
const zeroShotClassification = async (inputText) => {
  try {
    const response = await axios.post(
      ZERO_SHOT_MODEL_URL,
      {
        inputs: inputText,
        parameters: { candidate_labels: issueCategories }
      },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const { labels, scores } = response.data;
    let allScores = {};
    labels.forEach((label, index) => {
      allScores[label] = scores[index];
    });

    return { bestMatch: labels[0], highestScore: scores[0], allScores };
  } catch (error) {
    console.error("Error in zero-shot classification:", error.response?.data || error.message);
    return { bestMatch: "other", highestScore: 0, allScores: {} };
  }
};

// Main classification function
export const classifyIssue = async (req, res) => {
  try {
    let { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // Run both classification models
    const similarityResult = await findBestMatch(description);
    const zeroShotResult = await zeroShotClassification(description);

    let finalCategory = "";
    let finalScore = 0;

    if (similarityResult.bestMatch === zeroShotResult.bestMatch) {
      // If both models agree, use the common result
      finalCategory = similarityResult.bestMatch;
      finalScore = Math.max(similarityResult.highestScore, zeroShotResult.highestScore);
    } else {
      // If they disagree, choose the one with the highest confidence score
      if (similarityResult.highestScore > zeroShotResult.highestScore) {
        finalCategory = similarityResult.bestMatch;
        finalScore = similarityResult.highestScore;
      } else {
        finalCategory = zeroShotResult.bestMatch;
        finalScore = zeroShotResult.highestScore;
      }
    }

    // If confidence is low, return "unknown"
    if (finalScore < 0.5) {
      finalCategory = "unknown";
    }

    return res.json({
      finalCategory,
      finalScore,
      similarityScores: similarityResult.allScores,
      zeroShotScores: zeroShotResult.allScores
    });
  } catch (error) {
    console.error("Error classifying issue:", error);
    res.status(500).json({ error: "Failed to classify issue" });
  }
};
