require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/generate-intro", async (req, res) => {
  const { name, role, style } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  const prompt = `Write a short personal introduction (2-3 sentences) for someone named ${name} who is a ${role}. 
The tone should be ${style}. Make it natural, engaging, and suitable for LinkedIn, networking, or a website bio.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert at writing polished personal introductions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b", // Fast and good quality
      temperature: 0.7,
      max_tokens: 150,
    });

    const intro = completion.choices[0]?.message?.content?.trim();
    res.json({ intro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate introduction" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});