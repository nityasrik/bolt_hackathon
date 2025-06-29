import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds timeout
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
        if (error.code === 'ECONNREFUSED') {
            throw new Error('Backend server is not running. Please start the backend server with: npm run dev');
        }

        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout. The server took too long to respond. Please try again.');
        }

        if (error.response?.status === 500) {
            const errorData = error.response.data;
            if (errorData.error === 'Gemini API key not configured') {
                throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your backend/.env file');
            } else if (errorData.error === 'ElevenLabs API key not configured') {
                throw new Error('ElevenLabs API key not configured. Please add ELEVENLABS_API_KEY to your backend/.env file');
            } else {
                throw new Error(`Server error: ${errorData.details || errorData.error || 'Unknown server error'}`);
            }
        }

        if (error.response?.status === 401) {
            const errorData = error.response.data;
            if (errorData.error === 'Invalid API key') {
                throw new Error('Invalid API key. Please check your API keys in backend/.env file');
            } else {
                throw new Error('Authentication failed. Please check your API keys.');
            }
        }

        if (error.response?.status === 429) {
            throw new Error('API quota exceeded. Please check your usage limits for Gemini or ElevenLabs.');
        }

        if (error.response?.status === 404) {
            throw new Error('API endpoint not found. Please check if the backend is running correctly.');
        }

        throw error;
    }
);

// API Service Functions
export const apiService = {
    // Health check
    async healthCheck() {
        const response = await api.get('/');
        return response.data;
    },

    // Get detailed status
    async getStatus() {
        const response = await api.get('/status');
        return response.data;
    },

    // Get health status with service checks
    async getHealth() {
        const response = await api.get('/health');
        return response.data;
    },

    // Chat with AI tutor
    async chat(message, context = '') {
        const response = await api.post('/chat', {
            message,
            context: context ? `The correct answer is: ${context}` : ''
        });
        return response.data;
    },

    // Text-to-speech
    async speak(text, voiceId = null, teach = false) {
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
    },

    // Get available voices
    async getVoices() {
        const response = await api.get('/voices');
        return response.data;
    },

    // Test connection with timeout
    async testConnection(timeout = 5000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await api.get('/status', {
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            return { connected: true, data: response.data };
        } catch (error) {
            if (error.name === 'AbortError') {
                return { connected: false, error: 'Connection timeout' };
            }
            return { connected: false, error: error.message };
        }
    }
};

// Audio utility functions
export const audioUtils = {
    // Play audio from blob
    async playAudio(audioBlob, onEnded = null) {
        return new Promise((resolve, reject) => {
            try {
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    if (onEnded) onEnded();
                    resolve();
                };

                audio.onerror = (error) => {
                    URL.revokeObjectURL(audioUrl);
                    reject(new Error('Failed to play audio: ' + error.message));
                };

                audio.play().catch(reject);
            } catch (error) {
                reject(new Error('Failed to create audio: ' + error.message));
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
                connected: true,
                message: 'Backend is running',
                details: status
            };
        } catch (error) {
            return {
                connected: false,
                message: error.message || 'Backend is not accessible',
                details: null
            };
        }
    },

    async checkHealth() {
        try {
            const health = await apiService.getHealth();
            return {
                healthy: health.status === 'healthy',
                degraded: health.status === 'degraded',
                services: health.services,
                uptime: health.uptime,
                message: health.status === 'healthy' ? 'All services working' :
                    health.status === 'degraded' ? 'Some services have issues' : 'Services not working'
            };
        } catch (error) {
            return {
                healthy: false,
                degraded: false,
                services: {},
                uptime: 0,
                message: error.message || 'Health check failed'
            };
        }
    },

    // Retry mechanism for failed requests
    async retryRequest(requestFn, maxRetries = 3, delay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                if (i === maxRetries - 1) throw error;

                // Wait before retrying
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

        // Initial check
        await checkConnection();

        // Set up interval
        const intervalId = setInterval(checkConnection, interval);

        // Return cleanup function
        return () => clearInterval(intervalId);
    }
};

// Integration utilities
export const integrationUtils = {
    // Initialize the application
    async initialize() {
        console.log('🚀 Initializing Voicenary application...');

        // Check backend connection
        const connectionResult = await connectionUtils.checkBackendStatus();
        if (!connectionResult.connected) {
            throw new Error('Backend is not accessible. Please start the backend server.');
        }

        // Check health status
        const healthResult = await connectionUtils.checkHealth();
        if (!healthResult.healthy && !healthResult.degraded) {
            throw new Error('Backend services are not working properly. Please check your API keys.');
        }

        if (healthResult.degraded) {
            console.warn('⚠️ Some backend services may not be working properly:', healthResult.message);

            // Log specific service issues
            if (healthResult.services.gemini?.status === 'error') {
                console.warn('⚠️ Gemini API issue:', healthResult.services.gemini.error);
            }
            if (healthResult.services.elevenlabs?.status === 'error') {
                console.warn('⚠️ ElevenLabs API issue:', healthResult.services.elevenlabs.error);
            }
        }

        // Get available voices
        try {
            const voices = await apiService.getVoices();
            console.log('✅ Available voices loaded:', Object.keys(voices).length);
        } catch (error) {
            console.warn('⚠️ Could not load voices:', error.message);
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
    },

    // Get system information
    async getSystemInfo() {
        const [status, health] = await Promise.all([
            apiService.getStatus(),
            apiService.getHealth()
        ]);

        return {
            backend: {
                status: status.server,
                environment: status.environment,
                timestamp: status.timestamp,
                apiKeys: status.apiKeys
            },
            services: health.services,
            uptime: health.uptime,
            frontend: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                online: navigator.onLine,
                audioSupported: audioUtils.isAudioSupported()
            }
        };
    },

    // Troubleshooting helper
    async diagnoseIssues() {
        const issues = [];

        try {
            const health = await apiService.getHealth();

            if (health.services.gemini?.status === 'error') {
                issues.push({
                    type: 'gemini_api',
                    severity: 'high',
                    message: 'Gemini API is not working',
                    details: health.services.gemini.error,
                    solution: 'Check your GEMINI_API_KEY in backend/.env file'
                });
            }

            if (health.services.elevenlabs?.status === 'error') {
                issues.push({
                    type: 'elevenlabs_api',
                    severity: 'medium',
                    message: 'ElevenLabs API is not working',
                    details: health.services.elevenlabs.error,
                    solution: 'Check your ELEVENLABS_API_KEY in backend/.env file'
                });
            }

        } catch (error) {
            issues.push({
                type: 'connection',
                severity: 'high',
                message: 'Cannot connect to backend',
                details: error.message,
                solution: 'Start the backend server with: npm run dev'
            });
        }

        return issues;
    }
};

// Shared voice IDs for all characters
export const voiceIds = {
    'french-basics': '7c65Pcpdzr0GkR748U7h', // Pierre Dubois
    'spanish-conversation': 'wHiOjOiwglSlcqGt7GVl', // María González
    'korean-basics': '2gbExjiWDnG1DMGr81Bx', // Minjun Kim
    // Add more as needed
};

export default api; 