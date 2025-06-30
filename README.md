# 🗣️ **Voicenary** – Talk to AI Characters. Learn Languages the Fun Way!

<<<<<<< HEAD
A modern language learning application with AI-powered conversation practice, featuring real-time voice interaction and personalized learning experiences.

## 🚀 Features

- **AI-Powered Conversations**: Practice with AI tutors in multiple languages
- **Text-to-Speech**: Natural voice responses using ElevenLabs
- **Voice Recognition**: Practice pronunciation with speech recognition
- **Multiple Languages**: French, Spanish, and Korean support
- **Interactive Lessons**: Structured learning with immediate feedback
- **Progress Tracking**: Monitor your learning journey
- **Real-time Integration**: Seamless frontend-backend communication

## 🏗️ Architecture

```
voicenary/
├── backend/           # Node.js Express server
│   ├── index.js      # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env          # Environment variables
├── project/          # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── start-servers.js       # Integration startup script
├── integration-test.js    # Integration test suite
├── verify-setup.js        # Setup verification script
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for:
  - Google Gemini AI
  - ElevenLabs

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd voicenary
   npm run setup
   ```

2. **Configure environment variables:**
   ```bash
   # Copy backend environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your API keys
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   VOICE_ID=your_default_voice_id_here
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

### Manual Setup

If you prefer to set up components individually:

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your API keys
   npm start
   ```

2. **Frontend Setup:**
   ```bash
   cd project
   npm install
   npm run dev
   ```

## 🚀 Deployment

### Quick Deployment

**For Windows:**
```bash
deploy.bat
```

**For Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment

1. **Deploy Backend** (choose one):
   - **Heroku**: `cd backend && heroku create && git push heroku main`
   - **Render**: Connect GitHub repo at [render.com](https://render.com)
   - **Railway**: Connect GitHub repo at [railway.app](https://railway.app)

2. **Deploy Frontend to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop `project/dist` folder
   - Or connect your GitHub repository

3. **Configure Environment**:
   - Set `VITE_API_URL` to your backend URL in Netlify
   - Set API keys in your backend platform

### Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# ElevenLabs API Key for text-to-speech
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Default Voice ID for ElevenLabs
VOICE_ID=your_default_voice_id_here

# Server Port (default: 5000)
PORT=5000
```

### Frontend Environment Variables

Create a `.env` file in the `project/` directory:

```env
# Backend API URL (default: http://localhost:5000)
VITE_API_URL=http://localhost:5000

# Development mode
VITE_DEV_MODE=true

# Feature flags
VITE_ENABLE_AUDIO=true
VITE_ENABLE_SPEECH_RECOGNITION=true
VITE_ENABLE_DEMO_MODE=false
```

## 🚀 Available Scripts

### Root Level Scripts

```bash
# Install all dependencies
npm run setup

# Start both frontend and backend
npm run dev

# Run integration tests
npm run test:integration

# Verify setup
npm run verify

# Build for production
npm run build

# Deploy frontend
npm run deploy:frontend

# Deploy backend
npm run deploy:backend

# Check deployment readiness
npm run deploy:check
```

### Backend Scripts

```bash
cd backend
npm start          # Start backend server
npm run dev        # Start in development mode
```

### Frontend Scripts

```bash
cd project
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🧪 Testing

### Integration Tests

```bash
npm run test:integration
```

### Setup Verification

```bash
npm run verify
```

### Troubleshooting

```bash
npm run troubleshoot
```

## 🚨 Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check if port 5000 is available
   - Verify API keys in `.env` file
   - Check Node.js version (v16+ required)

2. **Frontend not connecting:**
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API URL in frontend environment

3. **Audio not working:**
   - Check ElevenLabs API key
   - Verify voice ID configuration
   - Check browser audio permissions

4. **Chat not responding:**
   - Verify Gemini API key
   - Check API quota/limits
   - Review network connectivity

### Debug Mode

Enable debug logging by setting environment variables:

```bash
# Backend debug
DEBUG=* npm start

# Frontend debug
VITE_DEBUG=true npm run dev
```

## 📊 Monitoring

### Health Checks

- **Backend Health:** `http://localhost:5000/health`
- **Status Page:** `http://localhost:5000/status`
- **Frontend Status:** Connection indicator in top-right corner

### Logs

- **Backend Logs:** Console output with request/response details
- **Frontend Logs:** Browser console with API communication logs
- **Integration Logs:** Detailed test results and error reporting

## 🚀 Deployment

### Production Build

1. **Build frontend:**
   ```bash
   cd project
   npm run build
   ```

2. **Configure production environment:**
   - Set production API URLs
   - Configure CORS for production domain
   - Set up environment variables

3. **Deploy backend:**
   - Deploy to your preferred hosting service
   - Configure environment variables
   - Set up SSL certificates

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run integration tests
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Run integration tests
3. Review the logs
4. Create an issue with detailed information
=======
## 💡 Inspiration  
Language learning apps are often repetitive and lonely.  
We thought: _“What if you could talk to an AI-powered French chef... and they talk back?”_  
**Voicenary** brings language to life with AI characters and real voices.
>>>>>>> cac7b9132034bfa2a422b2b72a14134f729cd0cc

---

## 🔊 What It Does

- 👨‍🍳 Pick an AI character (French Chef, Spanish Teacher, etc.)  
- 🧠 Chat with them using lifelike ElevenLabs voices  
- ✍️ Type your replies and get instant feedback  
- 🎤 Practice pronunciation with speech recognition  
- 🌟 Learn through short, themed, interactive dialogues  

_It’s Duolingo meets ChatGPT — with real voices and personality._

---

## 🛠️ How We Built It

**Frontend:** React + TailwindCSS + Web Audio + Speech Recognition  
**Backend:** Node.js + Express  
- 🔊 ElevenLabs TTS for character voices  
- 🧠 BoltU AI for conversations  
- 🔐 Secure API key management  
- 🌐 Deployed on Netlify  

---

## 🚧 Challenges

- Smooth voice + chat loop with real-time audio  
- Handling user input variation and browser compatibility  
- Coordinating multiple APIs under tight hackathon deadlines  

---

## ✅ What We're Proud Of

- 🎙️ Natural AI voices via ElevenLabs  
- 💬 Chat flows that feel like real conversations  
- 🎨 Clean, themeable UI (light/dark mode)  
- 🚀 Shipped a working MVP in just 4 days  

---

## 🚀 What’s Next

- 🧠 Smarter input matching (NLP)  
- 🔐 User progress tracking  
- 🧑‍🏫 More characters and lesson packs  
- 🌍 New languages + mobile support  

---

Thanks for checking out **Voicenary**!  
Let’s make language learning sound awesome. 🎧🌍✨
