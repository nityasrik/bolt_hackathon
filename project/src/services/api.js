import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Reduced timeout for faster feedback
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging and error handling
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ API Response Error:', error.response?.data || error.message);

        // Handle specific error cases with detailed messages
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            throw new Error('Backend server is not running. Starting backend...');
        }

        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout. The server took too long to respond.');
        }

        if (error.response?.status === 500) {
            const errorData = error.response.data;
            if (errorData.error === 'Gemini API key not configured') {
                throw new Error('Demo mode: Gemini API key not configured');
            } else if (errorData.error === 'ElevenLabs API key not configured') {
                throw new Error('Demo mode: ElevenLabs API key not configured');
            } else {
                throw new Error(`Server error: ${errorData.details || errorData.error || 'Unknown server error'}`);
            }
        }

        if (error.response?.status === 401) {
            throw new Error('Demo mode: API key validation needed');
        }

        if (error.response?.status === 429) {
            throw new Error('API quota exceeded. Using demo mode.');
        }

        if (error.response?.status === 404) {
            throw new Error('API endpoint not found. Please check backend.');
        }

        throw error;
    }
);

// API Service Functions
export const apiService = {
    // Health check
    async healthCheck() {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            return { status: 'Demo mode - backend not connected' };
        }
    },

    // Get detailed status
    async getStatus() {
        try {
            const response = await api.get('/status');
            return response.data;
        } catch (error) {
            return { 
                status: 'demo',
                message: 'Running in demo mode',
                timestamp: new Date().toISOString()
            };
        }
    },

    // Get health status with service checks
    async getHealth() {
        try {
            const response = await api.get('/health');
            return response.data;
        } catch (error) {
            return {
                status: 'demo',
                services: {
                    gemini: false,
                    elevenlabs: false
                }
            };
        }
    },

    // Chat with AI tutor
    async chat(message, context = '') {
        try {
            const response = await api.post('/chat', {
                message,
                context: context ? `The correct answer is: ${context}` : ''
            });
            return response.data;
        } catch (error) {
            // Demo response
            return {
                reply: "Great job! Keep practicing! (Demo mode - connect backend for AI responses)"
            };
        }
    },

    // Text-to-speech
    async speak(text, voiceId = null, teach = false) {
        try {
            const response = await api.post('/speak', {
                text,
                voiceId,
                teach
            }, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Return empty blob for demo mode
            return new Blob([''], { type: 'audio/mpeg' });
        }
    },

    // Get available voices
    async getVoices() {
        try {
            const response = await api.get('/voices');
            return response.data;
        } catch (error) {
            return {
                'french-basics': 'demo-voice',
                'spanish-conversation': 'demo-voice',
                'korean-basics': 'demo-voice'
            };
        }
    },

    // Test connection with timeout
    async testConnection(timeout = 3000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await api.get('/status', {
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            return { connected: true, data: response.data };
        } catch (error) {
            return { connected: false, error: 'Demo mode' };
        }
    }
};

// Audio utility functions
export const audioUtils = {
    // Play audio from blob
    async playAudio(audioBlob, onEnded = null) {
        return new Promise((resolve, reject) => {
            try {
                if (audioBlob.size === 0) {
                    // Demo mode - no audio
                    if (onEnded) onEnded();
                    resolve();
                    return;
                }

                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    if (onEnded) onEnded();
                    resolve();
                };

                audio.onerror = (error) => {
                    URL.revokeObjectURL(audioUrl);
                    if (onEnded) onEnded();
                    resolve(); // Don't reject in demo mode
                };

                audio.play().catch(() => {
                    // Silently handle audio play failures in demo mode
                    if (onEnded) onEnded();
                    resolve();
                });
            } catch (error) {
                if (onEnded) onEnded();
                resolve(); // Don't reject in demo mode
            }
        });
    },

    // Stop audio
    stopAudio(audioElement) {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    },

    // Check if audio is supported
    isAudioSupported() {
        return typeof Audio !== 'undefined' && typeof URL.createObjectURL !== 'undefined';
    },

    // Check browser audio permissions
    async checkAudioPermissions() {
        try {
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                return permission.state;
            }
            return 'unknown';
        } catch (error) {
            return 'unknown';
        }
    }
};

// Connection status utility
export const connectionUtils = {
    async checkBackendStatus() {
        try {
            const status = await apiService.getStatus();
            return {
                connected: status.status !== 'demo',
                message: status.status === 'demo' ? 'Running in demo mode' : 'Backend is running',
                details: status
            };
        } catch (error) {
            return {
                connected: false,
                message: 'Demo mode - backend not connected',
                details: null
            };
        }
    },

    async checkHealth() {
        try {
            const health = await apiService.getHealth();
            return {
                healthy: health.status === 'healthy',
                degraded: health.status === 'degraded' || health.status === 'demo',
                services: health.services || {},
                uptime: health.uptime || 0,
                message: health.status === 'healthy' ? 'All services working' :
                    health.status === 'degraded' ? 'Some services have issues' :
                    health.status === 'demo' ? 'Demo mode active' : 'Services not working'
            };
        } catch (error) {
            return {
                healthy: false,
                degraded: true,
                services: {},
                uptime: 0,
                message: 'Demo mode - limited functionality'
            };
        }
    },

    // Retry mechanism for failed requests
    async retryRequest(requestFn, maxRetries = 2, delay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
        }
    },

    // Monitor connection status
    async monitorConnection(callback, interval = 30000) {
        const checkConnection = async () => {
            const result = await this.checkBackendStatus();
            callback(result);
        };

        await checkConnection();
        const intervalId = setInterval(checkConnection, interval);
        return () => clearInterval(intervalId);
    }
};

// Integration utilities
export const integrationUtils = {
    // Initialize the application
    async initialize() {
        console.log('🚀 Initializing Voicenary application...');

        try {
            // Check backend connection
            const connectionResult = await connectionUtils.checkBackendStatus();
            
            if (!connectionResult.connected) {
                console.warn('⚠️ Backend not connected, running in demo mode');
            }

            // Check health status
            const healthResult = await connectionUtils.checkHealth();
            
            if (healthResult.degraded) {
                console.warn('⚠️ Running in demo mode with limited functionality');
            }

            // Try to get available voices
            try {
                const voices = await apiService.getVoices();
                console.log('✅ Voices loaded:', Object.keys(voices).length);
            } catch (error) {
                console.warn('⚠️ Using demo voices');
            }

            // Check audio support
            if (!audioUtils.isAudioSupported()) {
                console.warn('⚠️ Audio playback not supported in this browser');
            }

            console.log('✅ Application initialized successfully');
            return {
                connected: connectionResult.connected,
                healthy: healthResult.healthy,
                degraded: healthResult.degraded,
                services: healthResult.services
            };
        } catch (error) {
            console.warn('⚠️ Initialization completed with warnings:', error.message);
            return {
                connected: false,
                healthy: false,
                degraded: true,
                services: {}
            };
        }
    },

    // Get system information
    async getSystemInfo() {
        try {
            const [status, health] = await Promise.all([
                apiService.getStatus(),
                apiService.getHealth()
            ]);

            return {
                backend: {
                    status: status.server || 'demo',
                    environment: status.environment || 'demo',
                    timestamp: status.timestamp || new Date().toISOString(),
                    apiKeys: status.apiKeys || {}
                },
                services: health.services || {},
                uptime: health.uptime || 0,
                frontend: {
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    online: navigator.onLine,
                    audioSupported: audioUtils.isAudioSupported()
                }
            };
        } catch (error) {
            return {
                backend: { status: 'demo' },
                services: {},
                uptime: 0,
                frontend: {
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    online: navigator.onLine,
                    audioSupported: audioUtils.isAudioSupported()
                }
            };
        }
    },

    // Troubleshooting helper
    async diagnoseIssues() {
        const issues = [];

        try {
            const health = await apiService.getHealth();

            if (health.status === 'demo') {
                issues.push({
                    type: 'demo_mode',
                    severity: 'info',
                    message: 'Running in demo mode',
                    details: 'Backend services not connected',
                    solution: 'This is normal for the demo. Full features available when backend is connected.'
                });
            }
        } catch (error) {
            issues.push({
                type: 'connection',
                severity: 'info',
                message: 'Demo mode active',
                details: 'Backend not accessible',
                solution: 'Application works in demo mode with limited features'
            });
        }

        return issues;
    }
};

// Shared voice IDs for all characters
export const voiceIds = {
    'french-basics': '7c65Pcpdzr0GkR748U7h',
    'spanish-conversation': 'wHiOjOiwglSlcqGt7GVl',
    'korean-basics': '2gbExjiWDnG1DMGr81Bx',
};

export default api;