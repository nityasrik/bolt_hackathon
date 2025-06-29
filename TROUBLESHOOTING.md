# 🔧 Voicenary Troubleshooting Guide

This guide helps you solve common issues with the Voicenary language learning application.

## 🚀 Quick Diagnosis

Run these commands to quickly diagnose issues:

```bash
# Check setup
npm run verify

# Test integration
npm run test:integration

# Check backend health
curl http://localhost:5000/health
```

## 🔍 Common Issues & Solutions

### 1. **Port Conflicts**

**Symptoms:**
- "Port 5173 is in use, trying another one..."
- Frontend starts on different port (5174, 5175, etc.)
- CORS errors in browser console

**Solutions:**

```bash
# Check what's using port 5173
Get-NetTCPConnection -LocalPort 5173

# Kill process using port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# The application automatically handles port conflicts
# Check the Vite output for the correct port
# Update your browser to use the correct port
```

**Note:** The application automatically handles port conflicts by trying ports 5173-5177. Check the Vite output for the correct port number.

### 2. **jsconfig.node.json Configuration Error**

**Symptoms:**
- "No inputs were found in config file" error
- TypeScript configuration warnings

**Solutions:**

```bash
# This file is optional and can be safely removed
# The application works without it
rm project/jsconfig.node.json

# Or ignore the warning - it doesn't affect functionality
```

### 3. **Backend Won't Start**

**Symptoms:**
- `npm run dev` fails
- Port 5000 already in use
- "Cannot find module" errors

**Solutions:**

```bash
# Check if port 5000 is in use
Get-NetTCPConnection -LocalPort 5000

# Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Reinstall dependencies
npm run setup

# Start manually
cd backend
npm start
```

### 4. **Frontend Can't Connect to Backend**

**Symptoms:**
- "Backend disconnected" message
- CORS errors in browser console
- Network errors

**Solutions:**

```bash
# Ensure backend is running
curl http://localhost:5000/health

# Check CORS configuration
# Verify backend/.env has correct settings

# Clear browser cache
# Try incognito/private mode

# Check firewall settings
```

### 5. **API Key Issues**

**Symptoms:**
- "API key not configured" errors
- "Invalid API key" messages
- Services showing "error" status

**Solutions:**

#### **Gemini API Key:**
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `backend/.env`:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Restart backend server

#### **ElevenLabs API Key:**
1. Get API key from [ElevenLabs](https://elevenlabs.io/)
2. Add to `backend/.env`:
   ```env
   ELEVENLABS_API_KEY=your_actual_key_here
   VOICE_ID=your_voice_id_here
   ```
3. Restart backend server

### 6. **Audio Not Working**

**Symptoms:**
- No sound from text-to-speech
- Audio playback errors
- "Demo mode" messages

**Solutions:**

```bash
# Check ElevenLabs API key
curl -H "xi-api-key: YOUR_KEY" https://api.elevenlabs.io/v1/voices

# Check browser audio permissions
# Allow audio in browser settings

# Test with different voice ID
# Check ElevenLabs credits/usage
```

### 7. **Chat Not Responding**

**Symptoms:**
- AI tutor not responding
- Chat errors
- "AI service error" messages

**Solutions:**

```bash
# Check Gemini API key
# Verify API quota not exceeded
# Test API key manually

# Check network connectivity
# Restart backend server
```

### 8. **Frontend Build Issues**

**Symptoms:**
- Build errors
- Missing dependencies
- Vite configuration issues

**Solutions:**

```bash
# Reinstall frontend dependencies
cd project
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version (v16+ required)
node --version
```

## 🛠️ Advanced Troubleshooting

### **Environment Variables**

Ensure your `backend/.env` file has all required variables:

```env
# Required API Keys
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VOICE_ID=your_default_voice_id_here

# Optional Settings
PORT=5000
NODE_ENV=development
```

### **Network Issues**

```bash
# Test backend connectivity
curl -v http://localhost:5000/health

# Check firewall settings
# Disable antivirus temporarily
# Try different network

# Test with different ports
# Update CORS settings if needed
```

### **Browser Issues**

```bash
# Clear browser cache
# Disable browser extensions
# Try different browser
# Check console for errors
# Enable developer tools
```

### **Performance Issues**

```bash
# Check system resources
# Monitor memory usage
# Restart application
# Update Node.js version
```

## 🔧 Debug Mode

Enable debug logging:

```bash
# Backend debug
DEBUG=* npm start

# Frontend debug
VITE_DEBUG=true npm run dev

# Check logs
# Monitor console output
```

## 📊 Health Check Analysis

The health check endpoint provides detailed service status:

```bash
curl http://localhost:5000/health
```

**Response Analysis:**
- `status: "healthy"` - All services working
- `status: "degraded"` - Some services have issues
- `status: "unhealthy"` - Critical services failing

**Service Status:**
- `working` - Service is operational
- `error` - Service has issues
- `not_configured` - API key missing

## 🚨 Emergency Recovery

If the application is completely broken:

```bash
# 1. Stop all processes
# 2. Clean reinstall
rm -rf node_modules backend/node_modules project/node_modules
npm run setup

# 3. Verify configuration
npm run verify

# 4. Start fresh
npm run dev
```

## 📞 Getting Help

If you're still having issues:

1. **Check the logs** - Look for error messages
2. **Run diagnostics** - Use `npm run verify` and `npm run test:integration`
3. **Check API keys** - Verify they're valid and have sufficient quota
4. **Test manually** - Try API endpoints directly
5. **Create issue** - Include error messages and system information

### **Information to Include:**
- Operating system and version
- Node.js version
- Error messages
- API key status (without sharing actual keys)
- Browser and version
- Steps to reproduce

## ✅ Prevention Tips

1. **Keep API keys secure** - Don't commit them to version control
2. **Monitor usage** - Check API quotas regularly
3. **Update dependencies** - Keep packages up to date
4. **Backup configuration** - Save working .env files
5. **Test regularly** - Run integration tests periodically

---

**Need more help?** Check the main README.md for additional resources and documentation. 