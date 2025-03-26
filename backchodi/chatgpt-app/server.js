import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ChatGPT Response Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("OpenAI API Error:", error.response ? error.response.data : error);
    res.status(500).json({ error: "Error fetching response from OpenAI" });
  }
});

// Image Generation Endpoint
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error generating image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("Server is running!");
  });
  