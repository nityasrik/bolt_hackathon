# Voicenary - AI-Powered Language Learning App

A modern language learning application with AI-powered conversation practice, featuring real-time voice interaction and personalized learning experiences.
Voicenary lets you learn new languages by chatting with AI-powered tutors, each with their own personality and authentic voice. You can listen, speak, and get real-time feedback, making language learning fun and interactive

## How it Works
When you start a lesson, you’ll see a prompt from your AI tutor.
You can click “Play Audio” to hear the phrase spoken in the tutor’s real voice, thanks to ElevenLabs.
⁠You can practice speaking, and the app gives you instant feedback using AI.
⁠All communication between the frontend and backend is seamless, with health checks and error handling to ensure a smooth experience.

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

## 🔌 API Integration

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root endpoint with server info |
| `/health` | GET | Health check with service status |
| `/status` | GET | Detailed server status |
| `/chat` | POST | AI conversation endpoint |
| `/speak` | POST | Text-to-speech endpoint |
| `/voices` | GET | Available voice options |

### Frontend-Backend Communication

The frontend communicates with the backend through:

1. **API Service Layer** (`project/src/services/api.js`)
   - Centralized API communication
   - Error handling and retry logic
   - Connection monitoring

2. **Connection Status Component** (`project/src/components/ConnectionStatus.jsx`)
   - Real-time backend status monitoring
   - Automatic reconnection attempts
   - User-friendly error messages

3. **Vite Proxy Configuration** (`project/vite.config.js`)
   - Development proxy for seamless API calls
   - CORS handling
   - Request/response logging

## 🧪 Testing Integration

### Run Integration Tests

```bash
npm run test:integration
```

This will test:
- Backend health and status
- API endpoint functionality
- Frontend accessibility
- Chat and TTS functionality
- Error handling
- Voice endpoints

### Manual Testing

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Frontend Access:**
   ```bash
   curl http://localhost:5173
   ```

3. **API Endpoint Test:**
   ```bash
   curl -X POST http://localhost:5000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello", "context": "test"}'
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check if port 5000 is available
   - Verify API keys in `backend/.env`
   - Check Node.js version (v16+)

2. **Frontend not connecting:**
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify `VITE_API_URL` in frontend `.env`

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

---

**Happy Learning! 🌍🗣️** 
