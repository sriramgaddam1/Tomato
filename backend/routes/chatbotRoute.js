import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/chatbot
router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent({
  contents: [
    {
      role: "user",
      parts: [{ text: userMessage }]
    }
  ]
});


    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).send("Something went wrong with the chatbot.");
  }
});

export default router;
