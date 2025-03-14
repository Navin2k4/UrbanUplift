/**
 * Generate simple HTML email template for issue reports
 * @param {Object} issue - Issue details
 * @returns {string} HTML email template
 */
export const issueReportTemplate = (issue) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Issue Report Confirmation</h2>
          <p>Thank you for helping improve our community</p>
        </div>

        <div class="content">
          <p>Hello ${issue.userName || "Valued Citizen"},</p>
          <p>Your issue has been successfully reported and is being reviewed by our team.</p>
          
          <p><strong>Reference ID:</strong> ${issue.id}</p>

          <h3>Issue Details:</h3>
          <p><strong>Category:</strong> ${issue.category}</p>
          <p><strong>Description:</strong> ${issue.description}</p>
          <p><strong>Location:</strong> ${issue.location}</p>
          <p><strong>Priority:</strong> ${issue.priority}</p>
          <p><strong>Status:</strong> PENDING REVIEW</p>

          ${
            issue.coordinates
              ? `
          <h3>Location Details:</h3>
          <p><strong>Coordinates:</strong> ${issue.coordinates}</p>
          ${
            issue.district
              ? `<p><strong>District:</strong> ${issue.district}</p>`
              : ""
          }
          ${issue.state ? `<p><strong>State:</strong> ${issue.state}</p>` : ""}
          ${
            issue.address
              ? `<p><strong>Full Address:</strong> ${issue.address}</p>`
              : ""
          }
          `
              : ""
          }

          ${
            issue.imageUrl
              ? `
          <p><strong>Issue Image:</strong></p>
          <img src="${issue.imageUrl}" alt="Issue Image" style="max-width: 100%; margin: 10px 0;">
          `
              : ""
          }

          <h3>What's Next?</h3>
          <ul>
            <li>Our team will review your report within 24 hours</li>
            <li>You'll receive updates as we process your issue</li>
            <li>Track progress in your dashboard</li>
          </ul>

          <p><em>Reported on: ${formatDate(issue.createdAt)}</em></p>
        </div>

        <div class="footer">
          <p>This is an automated notification from Urban Uplift</p>
          <p>We appreciate your contribution to making our community better</p>
          <p>If you didn't report this issue, please contact support immediately</p>
        </div>
      </body>
    </html>
  `;
};
