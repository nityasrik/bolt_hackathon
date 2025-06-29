const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

console.log('🚀 Starting Voicenary Application...\n');

// Check if dependencies are installed
function checkDependencies() {
    const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
    const frontendNodeModules = path.join(__dirname, 'project', 'node_modules');

    if (!fs.existsSync(backendNodeModules)) {
        console.log('❌ Backend dependencies not found. Installing...');
        return false;
    }

    if (!fs.existsSync(frontendNodeModules)) {
        console.log('❌ Frontend dependencies not found. Installing...');
        return false;
    }

    return true;
}

// Install dependencies
function installDependencies() {
    return new Promise((resolve, reject) => {
        console.log('📦 Installing dependencies...');

        // Install backend dependencies
        const backendInstall = spawn('npm', ['install'], {
            cwd: path.resolve('./backend'),
            stdio: 'inherit',
            shell: true
        });

        backendInstall.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('Backend dependencies installation failed'));
                return;
            }

            // Install frontend dependencies
            const frontendInstall = spawn('npm', ['install'], {
                cwd: path.resolve('./project'),
                stdio: 'inherit',
                shell: true
            });

            frontendInstall.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error('Frontend dependencies installation failed'));
                    return;
                }

                console.log('✅ Dependencies installed successfully!\n');
                resolve();
            });
        });
    });
}

// Health check function
async function healthCheck(url, maxRetries = 10, delay = 2000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await axios.get(url, { timeout: 5000 });
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.log(`⏳ Health check attempt ${i + 1}/${maxRetries} failed, retrying in ${delay / 1000}s...`);
        }

        if (i < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return false;
}

// Check for available frontend port
async function findFrontendPort() {
    const ports = [5173, 5174, 5175, 5176, 5177];

    for (const port of ports) {
        try {
            await axios.get(`http://localhost:${port}`, { timeout: 2000 });
            console.log(`⚠️ Port ${port} is in use, trying next port...`);
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.log(`✅ Port ${port} is available for frontend`);
                return port;
            }
        }
    }

    console.log('⚠️ All common ports are in use, Vite will auto-select a port');
    return 5173; // Default, Vite will handle port selection
}

// Function to start a process
function startProcess(command, args, cwd, name) {
    console.log(`📡 Starting ${name}...`);

    const process = spawn(command, args, {
        cwd: path.resolve(cwd),
        stdio: 'inherit',
        shell: true
    });

    process.on('error', (error) => {
        console.error(`❌ Error starting ${name}:`, error.message);
    });

    process.on('close', (code) => {
        console.log(`🔚 ${name} process exited with code ${code}`);
    });

    return process;
}

// Main startup function
async function startServers() {
    try {
        // Check and install dependencies if needed
        if (!checkDependencies()) {
            await installDependencies();
        }

        // Start backend
        const backendProcess = startProcess('npm', ['start'], './backend', 'Backend Server');

        // Wait for backend to be ready
        console.log('⏳ Waiting for backend to be ready...');
        const backendReady = await healthCheck('http://localhost:5000/health');

        if (!backendReady) {
            console.error('❌ Backend failed to start properly');
            backendProcess.kill();
            process.exit(1);
        }

        console.log('✅ Backend is ready!');

        // Check for available frontend port
        const frontendPort = await findFrontendPort();

        // Start frontend
        const frontendProcess = startProcess('npm', ['run', 'dev'], './project', 'Frontend Server');

        // Wait for frontend to be ready (try multiple ports)
        console.log('⏳ Waiting for frontend to be ready...');
        let frontendReady = false;
        const frontendPorts = [5173, 5174, 5175, 5176, 5177];

        for (const port of frontendPorts) {
            try {
                const ready = await healthCheck(`http://localhost:${port}`, 3, 1000);
                if (ready) {
                    frontendReady = true;
                    console.log(`✅ Frontend is ready on port ${port}!`);
                    break;
                }
            } catch (error) {
                // Continue to next port
            }
        }

        if (!frontendReady) {
            console.error('❌ Frontend failed to start properly');
            frontendProcess.kill();
            backendProcess.kill();
            process.exit(1);
        }

        console.log('\n🎉 Voicenary is now running!');
        console.log('🔗 Backend: http://localhost:5000');
        console.log('🌐 Frontend: Check the Vite output above for the correct port');
        console.log('📊 Health Check: http://localhost:5000/health');
        console.log('📋 Status: http://localhost:5000/status');
        console.log('\n💡 Press Ctrl+C to stop both servers');

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down servers...');
            backendProcess.kill();
            frontendProcess.kill();
            process.exit(0);
        });

        // Handle process termination
        process.on('SIGTERM', () => {
            console.log('\n🛑 Received SIGTERM, shutting down...');
            backendProcess.kill();
            frontendProcess.kill();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Failed to start servers:', error.message);
        console.log('\n💡 Try running: npm run setup');
        process.exit(1);
    }
}

// Start the servers
startServers(); 