const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');

class IntegrationTest {
    constructor() {
        this.backendUrl = 'http://localhost:5000';
        this.frontendUrl = 'http://localhost:5173';
        this.testResults = [];
    }

    async run() {
        console.log('🧪 Starting Voicenary Integration Tests...\n');

        try {
            // Test 1: Backend Health Check
            await this.testBackendHealth();

            // Test 2: Backend Status
            await this.testBackendStatus();

            // Test 3: API Endpoints
            await this.testAPIEndpoints();

            // Test 4: Frontend Accessibility
            await this.testFrontendAccess();

            // Test 5: Chat Functionality
            await this.testChatFunctionality();

            // Test 6: Text-to-Speech
            await this.testTextToSpeech();

            // Test 7: Voice Endpoints
            await this.testVoiceEndpoints();

            // Test 8: Error Handling
            await this.testErrorHandling();

            // Print results
            this.printResults();

        } catch (error) {
            console.error('❌ Integration test failed:', error.message);
            process.exit(1);
        }
    }

    async testBackendHealth() {
        console.log('🔍 Testing Backend Health...');
        try {
            const response = await axios.get(`${this.backendUrl}/health`, { timeout: 10000 });

            if (response.status === 200 && response.data.status === 'healthy') {
                this.addResult('Backend Health', 'PASS', 'Backend is healthy and responding');
                console.log('✅ Backend health check passed');
            } else {
                this.addResult('Backend Health', 'FAIL', 'Backend health check failed');
                console.log('❌ Backend health check failed');
            }
        } catch (error) {
            this.addResult('Backend Health', 'FAIL', error.message);
            console.log('❌ Backend health check failed:', error.message);
        }
    }

    async testBackendStatus() {
        console.log('📊 Testing Backend Status...');
        try {
            const response = await axios.get(`${this.backendUrl}/status`, { timeout: 10000 });

            if (response.status === 200) {
                const data = response.data;
                const apiKeysStatus = data.apiKeys;

                this.addResult('Backend Status', 'PASS',
                    `Server: ${data.server}, Environment: ${data.environment}, API Keys: ${JSON.stringify(apiKeysStatus)}`);
                console.log('✅ Backend status check passed');
            } else {
                this.addResult('Backend Status', 'FAIL', 'Backend status check failed');
                console.log('❌ Backend status check failed');
            }
        } catch (error) {
            this.addResult('Backend Status', 'FAIL', error.message);
            console.log('❌ Backend status check failed:', error.message);
        }
    }

    async testAPIEndpoints() {
        console.log('🔗 Testing API Endpoints...');
        const endpoints = [
            { path: '/', name: 'Root Endpoint' },
            { path: '/voices', name: 'Voices Endpoint' }
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.get(`${this.backendUrl}${endpoint.path}`, { timeout: 10000 });

                if (response.status === 200) {
                    this.addResult(endpoint.name, 'PASS', `Status: ${response.status}`);
                    console.log(`✅ ${endpoint.name} passed`);
                } else {
                    this.addResult(endpoint.name, 'FAIL', `Status: ${response.status}`);
                    console.log(`❌ ${endpoint.name} failed`);
                }
            } catch (error) {
                this.addResult(endpoint.name, 'FAIL', error.message);
                console.log(`❌ ${endpoint.name} failed:`, error.message);
            }
        }
    }

    async testFrontendAccess() {
        console.log('🌐 Testing Frontend Access...');
        try {
            const response = await axios.get(this.frontendUrl, { timeout: 10000 });

            if (response.status === 200) {
                this.addResult('Frontend Access', 'PASS', 'Frontend is accessible');
                console.log('✅ Frontend access test passed');
            } else {
                this.addResult('Frontend Access', 'FAIL', `Status: ${response.status}`);
                console.log('❌ Frontend access test failed');
            }
        } catch (error) {
            this.addResult('Frontend Access', 'FAIL', error.message);
            console.log('❌ Frontend access test failed:', error.message);
        }
    }

    async testChatFunctionality() {
        console.log('💬 Testing Chat Functionality...');
        try {
            const response = await axios.post(`${this.backendUrl}/chat`, {
                message: 'Hello, this is a test message',
                context: 'Test context'
            }, { timeout: 15000 });

            if (response.status === 200 && response.data.reply) {
                this.addResult('Chat Functionality', 'PASS', 'Chat endpoint working');
                console.log('✅ Chat functionality test passed');
            } else {
                this.addResult('Chat Functionality', 'FAIL', 'Chat endpoint not working properly');
                console.log('❌ Chat functionality test failed');
            }
        } catch (error) {
            if (error.response?.status === 500 && error.response?.data?.error?.includes('API key')) {
                this.addResult('Chat Functionality', 'WARN', 'Chat working but API key not configured');
                console.log('⚠️ Chat functionality test: API key not configured');
            } else {
                this.addResult('Chat Functionality', 'FAIL', error.message);
                console.log('❌ Chat functionality test failed:', error.message);
            }
        }
    }

    async testTextToSpeech() {
        console.log('🔊 Testing Text-to-Speech...');
        try {
            const response = await axios.post(`${this.backendUrl}/speak`, {
                text: 'Hello, this is a test',
                voiceId: '7c65Pcpdzr0GkR748U7h',
                teach: false
            }, {
                responseType: 'arraybuffer',
                timeout: 15000
            });

            if (response.status === 200 && response.data.byteLength > 0) {
                this.addResult('Text-to-Speech', 'PASS', 'TTS endpoint working');
                console.log('✅ Text-to-speech test passed');
            } else {
                this.addResult('Text-to-Speech', 'FAIL', 'TTS endpoint not working properly');
                console.log('❌ Text-to-speech test failed');
            }
        } catch (error) {
            if (error.response?.status === 500 && error.response?.data?.error?.includes('API key')) {
                this.addResult('Text-to-Speech', 'WARN', 'TTS working but API key not configured');
                console.log('⚠️ Text-to-speech test: API key not configured');
            } else {
                this.addResult('Text-to-Speech', 'FAIL', error.message);
                console.log('❌ Text-to-speech test failed:', error.message);
            }
        }
    }

    async testVoiceEndpoints() {
        console.log('🎤 Testing Voice Endpoints...');
        try {
            const response = await axios.get(`${this.backendUrl}/voices`, { timeout: 10000 });

            if (response.status === 200 && response.data) {
                const voices = response.data;
                const voiceCount = Object.keys(voices).length;
                this.addResult('Voice Endpoints', 'PASS', `${voiceCount} voices available`);
                console.log('✅ Voice endpoints test passed');
            } else {
                this.addResult('Voice Endpoints', 'FAIL', 'Voice endpoints not working properly');
                console.log('❌ Voice endpoints test failed');
            }
        } catch (error) {
            this.addResult('Voice Endpoints', 'FAIL', error.message);
            console.log('❌ Voice endpoints test failed:', error.message);
        }
    }

    async testErrorHandling() {
        console.log('⚠️ Testing Error Handling...');

        // Test invalid endpoint
        try {
            await axios.get(`${this.backendUrl}/invalid-endpoint`, { timeout: 5000 });
            this.addResult('Error Handling', 'FAIL', 'Should have returned 404');
            console.log('❌ Error handling test failed');
        } catch (error) {
            if (error.response?.status === 404) {
                this.addResult('Error Handling', 'PASS', 'Proper 404 error handling');
                console.log('✅ Error handling test passed');
            } else {
                this.addResult('Error Handling', 'FAIL', 'Unexpected error response');
                console.log('❌ Error handling test failed');
            }
        }
    }

    addResult(test, status, message) {
        this.testResults.push({ test, status, message, timestamp: new Date().toISOString() });
    }

    printResults() {
        console.log('\n📋 Integration Test Results:');
        console.log('='.repeat(60));

        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        const warned = this.testResults.filter(r => r.status === 'WARN').length;
        const total = this.testResults.length;

        this.testResults.forEach(result => {
            const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌';
            console.log(`${statusIcon} ${result.test}: ${result.message}`);
        });

        console.log('\n📊 Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`⚠️ Warnings: ${warned}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📊 Total: ${total}`);

        if (failed === 0) {
            console.log('\n🎉 All critical tests passed! Integration is working properly.');
            if (warned > 0) {
                console.log('⚠️ Some tests had warnings (likely due to missing API keys).');
            }
        } else {
            console.log('\n❌ Some tests failed. Please check the issues above.');
            process.exit(1);
        }
    }
}

// Run the integration test
async function main() {
    const test = new IntegrationTest();
    await test.run();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = IntegrationTest; 