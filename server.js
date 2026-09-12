require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/generate-message", async (req, res) => {

    try {

        const {
            userName,
            studentName,
            studentBranch,
            sharedInterests,
            purpose
        } = req.body;

        const shared =
            Array.isArray(sharedInterests) && sharedInterests.length > 0
                ? sharedInterests.join(", ")
                : "shared interests";

        const prompt = `
You are the AI connection assistant for a college networking platform called UNSEEN.

Write a short, natural and friendly connection request from one college student to another.

Sender: ${userName}
Recipient: ${studentName}
Recipient branch/year: ${studentBranch}
Shared interests: ${shared}
Purpose: ${purpose}

Rules:
- Write only the connection message.
- Keep it to 2 or 3 sentences.
- Sound like a normal college student.
- Mention the shared interest naturally.
- Make the purpose clear.
- Do not invent facts.
- Do not say you are an AI.
- Do not use overly formal language.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const message = response.text.trim();

        res.json({
            success: true,
            message: message
        });

    } catch (error) {

        console.error("Gemini error:", error);

        res.status(500).json({
            success: false,
            message: "Gemini could not generate a message."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`UNSEEN running on port ${PORT}`);
});
