// backend/src/services/emailService.js
const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");
require("dotenv").config();

// Set SendGrid API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
client.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send an email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {Object[]} options.recipients - List of recipients with data
 * @param {string} options.from - Sender email (must be verified in SendGrid)
 * @param {string} options.templateId - SendGrid template ID
 * @param {string} options.subject - Email subject
 * @param {Object} options.dynamicData - Dynamic data for the template
 * @param {Object[]} [options.attachments] - Optional email attachments
 * @returns {Promise} - SendGrid API response
 */
const sendEmail = async (options) => {
  console.log("sendEmail", options);
  const msg = {
    to: options.to,
    from: options.from || process.env.SENDGRID_FROM_EMAIL, // Use default from email if not provided
    subject: options.subject,
    templateId: options.templateId,
    dynamicTemplateData: options.dynamicData,
  };

  // Add attachments if provided
  if (options.attachments && options.attachments.length > 0) {
    msg.attachments = options.attachments;
  }

  try {
    const response = await sgMail.send(msg);
    console.log("sendEmail response", response);
    return response;
  } catch (error) {
    console.error("SendGrid error:", error);
    if (error.response) {
      console.error("Error body:", error.response.body);
    }
    throw error;
  }
};

const sendBatchEmail = async (options) => {
  console.log("sendBatchEmail", options);

  const personalizations = options.recipients.map((recipient) => ({
    to: { email: recipient.to },
    dynamic_template_data: recipient.dynamicData,
    subject: options.subject, // subject can go here if needed per recipient
  }));

  const msg = {
    from: options.from || process.env.SENDGRID_FROM_EMAIL,
    templateId: options.templateId,
    personalizations,
  };

  if (options.attachments && options.attachments.length > 0) {
    msg.attachments = options.attachments;
  }

  try {
    const response = await sgMail.sendMultiple(msg);
    console.log("sendBatchEmail response", response);
    return response;
  } catch (error) {
    console.error("SendGrid batch error:", error);
    if (error.response) {
      console.error("Error body:", error.response.body);
    }
    throw error;
  }
};

const getTemplates = async () => {
  try {
    const request = {
      method: "GET",
      url: "/v3/templates?generations=dynamic",
    };
    const [response, body] = await client.request(request);
    console.log("getTemplates response", body, response);
    return body;
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  getTemplates,
  sendBatchEmail
};
