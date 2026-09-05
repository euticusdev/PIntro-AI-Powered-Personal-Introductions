require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listModels() {
  const models = await groq.models.list();
  console.log("Available models for your account:");
  models.data.forEach(m => console.log("- " + m.id));
}

listModels();