// backend/src/controllers/emailController.js
const emailService = require("../services/emailServices");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get email template from database and send email
const sendEmail = async (req, res) => {
  try {
    const { templateId, to, subject, dynamicData } = req.body;
    console.log("sendEmailWithTemplate", req.body);

    // Send email
    await emailService.sendEmail({
      to,
      subject,
      dynamicData: dynamicData, // Pass the dynamicData directly to the email service
      templateId,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Send emails in batch to multiple recipients
const sendEmailInBatch = async (req, res) => {
  try {
    const { templateId, subject, recipients } = req.body;
    console.log("sendEmailInBatch", { templateId, subject, recipientCount: recipients.length });

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ error: "No recipients provided" });
    }

    if (!templateId) {
      return res.status(400).json({ error: "Template ID is required" });
    }

    // Format recipients data for batch sending
    const formattedRecipients = recipients.map(recipient => ({
      to: recipient.email,
      dynamicData: {
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        company: recipient.company,
        main_content: recipient.main_content || ""
      }
    }));

    // Send batch email
    await emailService.sendBatchEmail({
      templateId,
      subject,
      recipients: formattedRecipients
    });

    res.status(200).json({ 
      message: `Successfully sent emails to ${recipients.length} recipients`
    });
  } catch (error) {
    console.error("Error sending batch emails:", error);
    res.status(500).json({ error: "Failed to send batch emails" });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await emailService.getTemplates();
    console.log("templates", templates);
    if (templates.length === 0) {
      return res.status(404).json({ error: "No templates found" });
    }
    return res.status(200).json(templates);
  } catch (error) {
    console.error("Error getting templates:", error);
    return res.status(500).json({ error: "Failed to get templates" });
  }
};

const getSuscribers = async (req, res) => {
    try {
      const suscribers = await prisma.request.findMany({
        where: {
          newsletter: true,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          company: true,
          phone_number: true,
          createdAt: true,
          status: true,
          email: true,
          newsletter: true,
          content: false,
        },
      });
      return res.status(200).json(suscribers);
    } catch (error) {
      console.error("Error getting suscribers:", error);
      return res.status(500).json({ error: "Failed to get suscribers" });
    }
};
module.exports = {
  sendEmail,
  getTemplates,
  getSuscribers,
  sendEmailInBatch,
};
