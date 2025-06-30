#!/bin/bash

# 🚀 Voicenary Deployment Script
# This script helps deploy Voicenary to production

set -e  # Exit on any error

echo "🚀 Voicenary Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "project" ]; then
    print_error "Please run this script from the Voicenary root directory"
    exit 1
fi

# Function to deploy frontend
deploy_frontend() {
    print_status "Building frontend for production..."
    
    cd project
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    fi
    
    # Build the project
    print_status "Building React app..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully!"
        print_status "Build output: project/dist/"
        
        # Check if Netlify CLI is installed
        if command -v netlify &> /dev/null; then
            print_status "Netlify CLI detected. Would you like to deploy now? (y/n)"
            read -r response
            if [[ "$response" =~ ^[Yy]$ ]]; then
                print_status "Deploying to Netlify..."
                netlify deploy --prod --dir=dist
            fi
        else
            print_warning "Netlify CLI not found. Install with: npm install -g netlify-cli"
            print_status "Manual deployment steps:"
            echo "1. Go to netlify.com"
            echo "2. Drag and drop the 'project/dist' folder"
            echo "3. Or connect your GitHub repository"
        fi
    else
        print_error "Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Function to deploy backend
deploy_backend() {
    print_status "Preparing backend for deployment..."
    
    cd backend
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_error "Backend .env file not found!"
        print_status "Please create backend/.env with your API keys:"
        echo "GEMINI_API_KEY=your_gemini_api_key"
        echo "ELEVENLABS_API_KEY=your_elevenlabs_api_key"
        echo "VOICE_ID=your_voice_id"
        exit 1
    fi
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing backend dependencies..."
        npm install
    fi
    
    # Test the backend
    print_status "Testing backend..."
    npm start &
    BACKEND_PID=$!
    
    # Wait for backend to start
    sleep 3
    
    # Test health endpoint
    if curl -s http://localhost:5000/health > /dev/null; then
        print_success "Backend is working!"
        kill $BACKEND_PID 2>/dev/null || true
        
        print_status "Backend deployment options:"
        echo "1. Heroku: heroku create && git push heroku main"
        echo "2. Render: Connect GitHub repo at render.com"
        echo "3. Railway: Connect GitHub repo at railway.app"
        echo "4. Vercel: Connect GitHub repo at vercel.com"
        
    else
        print_error "Backend health check failed!"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    cd ..
}

# Function to show deployment status
show_status() {
    print_status "Checking deployment readiness..."
    
    # Run verification
    npm run verify
    
    # Build frontend
    npm run build:frontend
    
    print_success "Ready for deployment!"
}

# Main script logic
case "${1:-all}" in
    "frontend")
        deploy_frontend
        ;;
    "backend")
        deploy_backend
        ;;
    "status")
        show_status
        ;;
    "all"|*)
        print_status "Deploying both frontend and backend..."
        deploy_frontend
        echo
        deploy_backend
        ;;
esac

echo
print_success "Deployment script completed!"
print_status "Next steps:"
echo "1. Deploy backend to your chosen platform"
echo "2. Update VITE_API_URL in frontend environment"
echo "3. Deploy frontend to Netlify"
echo "4. Test your deployed application"
echo
print_status "For detailed instructions, see DEPLOYMENT.md" 