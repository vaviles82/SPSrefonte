const prisma = require("../config/db");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const getBuilderIoPages = async (req, res) => {
  try {
    const path = req.params.path || "/";
    console.log(path);
    console.log(process.env.BUILDER_API_KEY);
    const url = `https://cdn.builder.io/api/v3/content/global?apiKey=${process.env.BUILDER_API_KEY}&userAttributes.urlPath=/${path}`;
    console.log(url);
    const response = await axios.get(url);
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

module.exports = { getBuilderIoPages };
