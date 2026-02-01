const prisma = require("../config/db");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const sendToMakeCom = async (req, res) => {
  try {
    const { contact, company } = req.body;
    const url = `https://hook.eu2.make.com/${process.env.MAKECOM_API_KEY}`;
    const data = {
      contact,
      company,
    };

    const response = await axios.post(url, data);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching Builder.io content:", error);
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch data from Builder.io",
      details: error.response?.data || {},
    });
  }
};

module.exports = { sendToMakeCom };
