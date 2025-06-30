@echo off
REM 🚀 Voicenary Deployment Script for Windows
REM This script helps deploy Voicenary to production

echo 🚀 Voicenary Deployment Script
echo ================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] Please run this script from the Voicenary root directory
    exit /b 1
)

if not exist "backend" (
    echo [ERROR] Backend directory not found
    exit /b 1
)

if not exist "project" (
    echo [ERROR] Project directory not found
    exit /b 1
)

REM Function to deploy frontend
:deploy_frontend
echo [INFO] Building frontend for production...
cd project

REM Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing frontend dependencies...
    call npm install
)

REM Build the project
echo [INFO] Building React app...
call npm run build

if %errorlevel% equ 0 (
    echo [SUCCESS] Frontend built successfully!
    echo [INFO] Build output: project/dist/
    
    REM Check if Netlify CLI is installed
    where netlify >nul 2>&1
    if %errorlevel% equ 0 (
        echo [INFO] Netlify CLI detected. Would you like to deploy now? (y/n)
        set /p response=
        if /i "%response%"=="y" (
            echo [INFO] Deploying to Netlify...
            call netlify deploy --prod --dir=dist
        )
    ) else (
        echo [WARNING] Netlify CLI not found. Install with: npm install -g netlify-cli
        echo [INFO] Manual deployment steps:
        echo 1. Go to netlify.com
        echo 2. Drag and drop the 'project/dist' folder
        echo 3. Or connect your GitHub repository
    )
) else (
    echo [ERROR] Frontend build failed!
    cd ..
    exit /b 1
)

cd ..
goto :eof

REM Function to deploy backend
:deploy_backend
echo [INFO] Preparing backend for deployment...
cd backend

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] Backend .env file not found!
    echo [INFO] Please create backend/.env with your API keys:
    echo GEMINI_API_KEY=your_gemini_api_key
    echo ELEVENLABS_API_KEY=your_elevenlabs_api_key
    echo VOICE_ID=your_voice_id
    cd ..
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing backend dependencies...
    call npm install
)

REM Test the backend
echo [INFO] Testing backend...
start /b npm start

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Test health endpoint
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Backend is working!
    
    echo [INFO] Backend deployment options:
    echo 1. Heroku: heroku create ^&^& git push heroku main
    echo 2. Render: Connect GitHub repo at render.com
    echo 3. Railway: Connect GitHub repo at railway.app
    echo 4. Vercel: Connect GitHub repo at vercel.com
    
) else (
    echo [ERROR] Backend health check failed!
    cd ..
    exit /b 1
)

cd ..
goto :eof

REM Function to show deployment status
:show_status
echo [INFO] Checking deployment readiness...

REM Run verification
call npm run verify

REM Build frontend
call npm run build:frontend

echo [SUCCESS] Ready for deployment!
goto :eof

REM Main script logic
if "%1"=="frontend" goto deploy_frontend
if "%1"=="backend" goto deploy_backend
if "%1"=="status" goto show_status

REM Default: deploy both
echo [INFO] Deploying both frontend and backend...
call :deploy_frontend
if %errorlevel% neq 0 exit /b 1

echo.
call :deploy_backend
if %errorlevel% neq 0 exit /b 1

echo.
echo [SUCCESS] Deployment script completed!
echo [INFO] Next steps:
echo 1. Deploy backend to your chosen platform
echo 2. Update VITE_API_URL in frontend environment
echo 3. Deploy frontend to Netlify
echo 4. Test your deployed application
echo.
echo [INFO] For detailed instructions, see DEPLOYMENT.md 