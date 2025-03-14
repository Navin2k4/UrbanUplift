import { issueReportTemplate } from "./mailTemplate.js";

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Generic email sending function
 * @param {Object} emailOptions - Email options
 * @param {string} emailOptions.to - Recipient email
 * @param {string} emailOptions.subject - Email subject
 * @param {string} emailOptions.html - HTML content
 * @param {Object} [emailOptions.attachments] - Email attachments
 * @returns {Promise<void>}
 */
export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const mailOptions = {
      from: `"Urban Uplift" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
      attachments,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send issue notification email
 * @param {Object} issue - Issue details
 * @param {string} recipientEmail - Recipient email address
 * @returns {Promise<void>}
 */
export const sendIssueNotification = async (issue, recipientEmail) => {
  try {
    const emailHtml = issueReportTemplate(issue);
    await sendEmail({
      to: recipientEmail,
      subject: `Issue Report Confirmation: ${issue.category}`,
      html: emailHtml,
      attachments: issue.imageUrl
        ? [
            {
              filename: "issue-image.jpg",
              path: issue.imageUrl,
              cid: "issue-image",
            },
          ]
        : [],
    });
  } catch (error) {
    console.error("Error sending issue notification:", error);
    throw new Error(`Failed to send issue notification: ${error.message}`);
  }
};
