import emailService from "../services/emailServices.js"; // Ajout de .js si nécessaire
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get email template from database and send email
export const sendEmail = async (req, res) => {
  try {
    const { templateId, to, subject, dynamicData } = req.body;
    console.log("sendEmailWithTemplate", req.body);

    await emailService.sendEmail({
      to,
      subject,
      dynamicData: dynamicData,
      templateId,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Send emails in batch to multiple recipients
export const sendEmailInBatch = async (req, res) => {
  try {
    const { templateId, subject, recipients } = req.body;
    console.log("sendEmailInBatch", { templateId, subject, recipientCount: recipients.length });

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ error: "No recipients provided" });
    }

    // Note: on garde templateId ici pour la compatibilité avec ton service email
    const formattedRecipients = recipients.map(recipient => ({
      to: recipient.email,
      dynamicData: {
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        company: recipient.company,
        main_content: recipient.main_content || ""
      }
    }));

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

export const getTemplates = async (req, res) => {
  try {
    const templates = await emailService.getTemplates();
    if (!templates || templates.length === 0) {
      return res.status(200).json([]); // On renvoie un tableau vide plutôt qu'une 404
    }
    return res.status(200).json(templates);
  } catch (error) {
    console.error("Error getting templates:", error);
    return res.status(500).json({ error: "Failed to get templates" });
  }
};

export const getSuscribers = async (req, res) => {
    try {
      const subscribers = await prisma.request.findMany({
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
        },
      });
      return res.status(200).json(subscribers);
    } catch (error) {
      console.error("Error getting subscribers:", error);
      return res.status(500).json({ error: "Failed to get subscribers" });
    }
};

// Export par défaut pour l'import dans emailRoutes.js
export default {
  sendEmail,
  getTemplates,
  getSuscribers,
  sendEmailInBatch,
};