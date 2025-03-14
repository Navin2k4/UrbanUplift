import { sendIssueNotification } from "../utils/emailService.js";

// Add this new route with your existing routes
router.post("/notify", async (req, res) => {
  try {
    const { issue, recipientEmail } = req.body;

    if (!issue || !recipientEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendIssueNotification(issue, recipientEmail);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});
