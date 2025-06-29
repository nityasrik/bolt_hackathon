require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 Confirm API keys loaded
console.log('ELEVENLABS_API_KEY:', process.env.ELEVENLABS_API_KEY ? '✔' : '❌');
console.log('VOICE_ID:', process.env.VOICE_ID ? '✔' : '❌');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✔' : '❌');

// Enhanced CORS configuration for dynamic ports
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
    'http://127.0.0.1:5177',
    'http://127.0.0.1:3000',
    'http://localhost:4173', // Vite preview port
    'http://127.0.0.1:4173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const DEFAULT_VOICE_ID = process.env.VOICE_ID;
const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY;

// 🎭 Voices endpoint
app.get("/voices", (req, res) => {
  const voiceIds = {
    maria: "EXAVITQu4vr4xnSDxMaL",
    pierre: "VR6AewLTigWG4xSOukaG", 
    akiko: "XrExE9yKIg1WjnnlVkGX",
    hans: "yoZ06aMxZJJ28mfd3POQ",
    elena: "ThT5KcBeYPX3keUQqHPh"
  };
  res.json(voiceIds);
});

// 🧑‍🏫 Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, context = "" } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a friendly, encouraging language teacher. The correct answer is: ${context.replace('The correct answer is: ', '')} The student said: "${message}". Give a single, natural, supportive response as the teacher would say to the student. Do not list options or explain what a teacher could say. Just say it as the teacher.`;
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = await response.text();
    res.json({ reply: text });
  } catch (e) {
    console.error("/chat error:", e);
    res.status(500).json({ error: e.message });
  }
});

// 🔊 Text-to-speech endpoint
app.post("/speak", async (req, res) => {
  const { text, voiceId, teach = false } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const finalTTS = teach ? `Repeat after me: ${text}` : text;
  try {
    const resp = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || DEFAULT_VOICE_ID}`,
      { text: finalTTS, model_id: 'eleven_monolingual_v1' },
      {
        responseType: 'arraybuffer',
        headers: {
          'xi-api-key': ELEVEN_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    res.set('Content-Type', 'audio/mpeg');
    res.send(resp.data);
  } catch (e) {
    console.error("/speak error:", e.response?.data || e.message);
    res.status(500).json({ error: 'TTS failed', details: e.message });
  }
});

// Add a root route handler to avoid 'CANNOT GET /' error
app.get('/', (req, res) => {
  res.send('Voicenary backend is running.');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      gemini: !!process.env.GEMINI_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
      voice: !!process.env.VOICE_ID
    }
  });
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    port: PORT,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for frontend communication`);
  console.log(`🔗 Frontend should be running on http://localhost:5173`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});