# 🚀 Voicenary Deployment Guide


This guide will help you deploy Voicenary to production. We'll deploy the frontend to Netlify and the backend to a cloud platform.

## 📋 Prerequisites

- GitHub repository with your Voicenary code
- API keys for:
  - Google Gemini AI
  - ElevenLabs
- Netlify account (free)
- Backend hosting account (Heroku, Render, Railway, etc.)

## 🎯 Deployment Strategy

1. **Frontend**: Deploy to Netlify (static hosting)
2. **Backend**: Deploy to cloud platform (Heroku/Render/Railway)
3. **Environment**: Configure production environment variables
4. **Integration**: Connect frontend to deployed backend

---

## 🌐 Frontend Deployment (Netlify)

### Option 1: Deploy via Netlify UI

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `cd project && npm install && npm run build`
     - **Publish directory**: `project/dist`
     - **Base directory**: Leave empty

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.herokuapp.com
     VITE_DEV_MODE=false
     ```

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**
   ```bash
   netlify login
   cd project
   netlify deploy --prod --dir=dist
   ```

3. **Set environment variables**
   ```bash
   netlify env:set VITE_API_URL https://your-backend-url.herokuapp.com
   netlify env:set VITE_DEV_MODE false
   ```

---

## 🔧 Backend Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and create app**
   ```bash
   heroku login
   heroku create your-voicenary-backend
   ```

3. **Set environment variables**
   ```bash
   heroku config:set GEMINI_API_KEY=your_gemini_api_key
   heroku config:set ELEVENLABS_API_KEY=your_elevenlabs_api_key
   heroku config:set VOICE_ID=your_voice_id
   ```

4. **Deploy**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend deployment"
   heroku git:remote -a your-voicenary-backend
   git push heroku main
   ```

### Option 2: Deploy to Render

1. **Connect GitHub repository**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo

2. **Configure service**
   - **Name**: voicenary-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

3. **Set environment variables**
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   VOICE_ID=your_voice_id
   ```

### Option 3: Deploy to Railway

1. **Connect repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repo

2. **Configure service**
   - Select the backend directory
   - Set start command: `npm start`

3. **Set environment variables**
   - Add your API keys in the Railway dashboard

---

## 🔗 Connect Frontend to Backend

1. **Get your backend URL**
   - Heroku: `https://your-app-name.herokuapp.com`
   - Render: `https://your-app-name.onrender.com`
   - Railway: `https://your-app-name.railway.app`

2. **Update frontend environment**
   - In Netlify dashboard, update `VITE_API_URL`
   - Or update `project/.env.production` and redeploy

3. **Test the connection**
   - Visit your Netlify site
   - Check browser console for connection status
   - Test the chat functionality

---

## 🔧 Configuration Files

### Frontend (Netlify)

**netlify.toml** (already created):
```toml
[build]
  base = "project"
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**public/_redirects** (already created):
```
/*    /index.html   200
```

### Backend (Heroku/Render/Railway)

**Procfile** (already created):
```
web: node index.js
```

**package.json** (updated with engines):
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

## 🧪 Testing Deployment

1. **Frontend Tests**
   ```bash
   # Test build locally
   cd project
   npm run build
   npm run preview
   ```

2. **Backend Tests**
   ```bash
   # Test backend locally
   cd backend
   npm start
   curl http://localhost:5000/health
   ```

3. **Integration Tests**
   ```bash
   # Run integration tests
   npm run test:integration
   ```

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Environment Variables**
   - Ensure all API keys are set
   - Check variable names match exactly
   - Restart services after changes

3. **CORS Issues**
   - Update backend CORS settings for production domain
   - Check frontend API URL configuration

4. **Audio Not Working**
   - Verify ElevenLabs API key
   - Check browser audio permissions
   - Test with different voice IDs

### Debug Commands

```bash
# Check backend logs
heroku logs --tail

# Check frontend build
netlify build

# Test API endpoints
curl https://your-backend-url.herokuapp.com/health
```

---

## 📊 Monitoring

1. **Netlify Analytics**
   - View site performance
   - Monitor build status
   - Check error rates

2. **Backend Monitoring**
   - Heroku: `heroku logs --tail`
   - Render: Dashboard logs
   - Railway: Real-time logs

3. **Health Checks**
   - Frontend: Connection status indicator
   - Backend: `/health` endpoint
   - Integration: Automated tests

---

## 🔄 Continuous Deployment

### Automatic Deployments

1. **Netlify**: Automatically deploys on git push
2. **Heroku**: Connect GitHub for auto-deploy
3. **Render**: Automatic deployments enabled by default

### Manual Deployments

```bash
# Frontend
netlify deploy --prod

# Backend
git push heroku main
```

---

## 🎉 Success!

Your Voicenary app should now be live at:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend-url.herokuapp.com`

Share your deployed app and start learning languages! 🌍🗣️ 