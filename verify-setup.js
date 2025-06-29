const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class SetupVerifier {
    constructor() {
        this.results = [];
        this.backendUrl = 'http://localhost:5000';
    }

    async run() {
        console.log('🔍 Verifying Voicenary Setup...\n');

        try {
            // Check project structure
            await this.checkProjectStructure();

            // Check dependencies
            await this.checkDependencies();

            // Check environment files
            await this.checkEnvironmentFiles();

            // Check Node.js version
            await this.checkNodeVersion();

            // Check ports availability
            await this.checkPorts();

            // Check backend configuration
            await this.checkBackendConfig();

            // Check frontend configuration
            await this.checkFrontendConfig();

            // Print results
            this.printResults();

        } catch (error) {
            console.error('❌ Setup verification failed:', error.message);
            process.exit(1);
        }
    }

    async checkProjectStructure() {
        console.log('📁 Checking project structure...');

        const requiredDirs = ['backend', 'project'];
        const requiredFiles = [
            'backend/package.json',
            'project/package.json',
            'package.json',
            'start-servers.js'
        ];

        for (const dir of requiredDirs) {
            if (fs.existsSync(dir)) {
                this.addResult('Project Structure', 'PASS', `Directory ${dir} exists`);
            } else {
                this.addResult('Project Structure', 'FAIL', `Directory ${dir} missing`);
            }
        }

        for (const file of requiredFiles) {
            if (fs.existsSync(file)) {
                this.addResult('Project Structure', 'PASS', `File ${file} exists`);
            } else {
                this.addResult('Project Structure', 'FAIL', `File ${file} missing`);
            }
        }
    }

    async checkDependencies() {
        console.log('📦 Checking dependencies...');

        const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
        const frontendNodeModules = path.join(__dirname, 'project', 'node_modules');

        if (fs.existsSync(backendNodeModules)) {
            this.addResult('Dependencies', 'PASS', 'Backend dependencies installed');
        } else {
            this.addResult('Dependencies', 'FAIL', 'Backend dependencies not installed. Run: npm run install:backend');
        }

        if (fs.existsSync(frontendNodeModules)) {
            this.addResult('Dependencies', 'PASS', 'Frontend dependencies installed');
        } else {
            this.addResult('Dependencies', 'FAIL', 'Frontend dependencies not installed. Run: npm run install:frontend');
        }
    }

    async checkEnvironmentFiles() {
        console.log('🔐 Checking environment files...');

        const backendEnv = path.join(__dirname, 'backend', '.env');
        const backendEnvExample = path.join(__dirname, 'backend', 'env.example');

        if (fs.existsSync(backendEnvExample)) {
            this.addResult('Environment Files', 'PASS', 'Backend env.example exists');
        } else {
            this.addResult('Environment Files', 'FAIL', 'Backend env.example missing');
        }

        if (fs.existsSync(backendEnv)) {
            this.addResult('Environment Files', 'PASS', 'Backend .env file exists');

            // Check if .env has content
            const envContent = fs.readFileSync(backendEnv, 'utf8');
            if (envContent.trim().length > 0) {
                this.addResult('Environment Files', 'PASS', 'Backend .env has content');
            } else {
                this.addResult('Environment Files', 'WARN', 'Backend .env is empty');
            }
        } else {
            this.addResult('Environment Files', 'FAIL', 'Backend .env file missing. Copy env.example to .env');
        }

        // Check frontend env
        const frontendEnv = path.join(__dirname, 'project', '.env');
        const frontendEnvExample = path.join(__dirname, 'project', 'env.example');

        if (fs.existsSync(frontendEnvExample)) {
            this.addResult('Environment Files', 'PASS', 'Frontend env.example exists');
        } else {
            this.addResult('Environment Files', 'WARN', 'Frontend env.example missing (optional)');
        }

        if (fs.existsSync(frontendEnv)) {
            this.addResult('Environment Files', 'PASS', 'Frontend .env file exists');
        } else {
            this.addResult('Environment Files', 'INFO', 'Frontend .env file not found (optional)');
        }
    }

    async checkNodeVersion() {
        console.log('🟢 Checking Node.js version...');

        return new Promise((resolve) => {
            const nodeProcess = spawn('node', ['--version'], { stdio: 'pipe' });
            let output = '';

            nodeProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            nodeProcess.on('close', (code) => {
                if (code === 0) {
                    const version = output.trim();
                    const majorVersion = parseInt(version.replace('v', '').split('.')[0]);

                    if (majorVersion >= 16) {
                        this.addResult('Node.js Version', 'PASS', `Node.js ${version} (v16+ required)`);
                    } else {
                        this.addResult('Node.js Version', 'FAIL', `Node.js ${version} (v16+ required)`);
                    }
                } else {
                    this.addResult('Node.js Version', 'FAIL', 'Node.js not found');
                }
                resolve();
            });
        });
    }

    async checkPorts() {
        console.log('🔌 Checking port availability...');

        const net = require('net');

        // Check port 5000 (backend)
        const backendPort = await this.checkPort(5000);
        if (backendPort) {
            this.addResult('Port Availability', 'PASS', 'Port 5000 is available for backend');
        } else {
            this.addResult('Port Availability', 'WARN', 'Port 5000 might be in use');
        }

        // Check port 5173 (frontend)
        const frontendPort = await this.checkPort(5173);
        if (frontendPort) {
            this.addResult('Port Availability', 'PASS', 'Port 5173 is available for frontend');
        } else {
            this.addResult('Port Availability', 'WARN', 'Port 5173 might be in use');
        }
    }

    checkPort(port) {
        return new Promise((resolve) => {
            const server = require('net').createServer();

            server.listen(port, () => {
                server.close();
                resolve(true);
            });

            server.on('error', () => {
                resolve(false);
            });
        });
    }

    async checkBackendConfig() {
        console.log('⚙️ Checking backend configuration...');

        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8'));

            // Check required dependencies
            const requiredDeps = ['express', 'cors', 'dotenv', '@google/generative-ai'];
            const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);

            if (missingDeps.length === 0) {
                this.addResult('Backend Config', 'PASS', 'All required dependencies found');
            } else {
                this.addResult('Backend Config', 'FAIL', `Missing dependencies: ${missingDeps.join(', ')}`);
            }

            // Check scripts
            if (packageJson.scripts && packageJson.scripts.start) {
                this.addResult('Backend Config', 'PASS', 'Start script configured');
            } else {
                this.addResult('Backend Config', 'FAIL', 'Start script missing');
            }

        } catch (error) {
            this.addResult('Backend Config', 'FAIL', `Error reading package.json: ${error.message}`);
        }
    }

    async checkFrontendConfig() {
        console.log('⚙️ Checking frontend configuration...');

        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'project', 'package.json'), 'utf8'));

            // Check required dependencies
            const requiredDeps = ['react', 'react-dom', 'axios'];
            const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);

            if (missingDeps.length === 0) {
                this.addResult('Frontend Config', 'PASS', 'All required dependencies found');
            } else {
                this.addResult('Frontend Config', 'FAIL', `Missing dependencies: ${missingDeps.join(', ')}`);
            }

            // Check scripts
            if (packageJson.scripts && packageJson.scripts.dev) {
                this.addResult('Frontend Config', 'PASS', 'Dev script configured');
            } else {
                this.addResult('Frontend Config', 'FAIL', 'Dev script missing');
            }

            // Check Vite config
            const viteConfig = path.join(__dirname, 'project', 'vite.config.js');
            if (fs.existsSync(viteConfig)) {
                this.addResult('Frontend Config', 'PASS', 'Vite configuration exists');
            } else {
                this.addResult('Frontend Config', 'FAIL', 'Vite configuration missing');
            }

        } catch (error) {
            this.addResult('Frontend Config', 'FAIL', `Error reading package.json: ${error.message}`);
        }
    }

    addResult(category, status, message) {
        this.results.push({ category, status, message, timestamp: new Date().toISOString() });
    }

    printResults() {
        console.log('\n📋 Setup Verification Results:');
        console.log('='.repeat(60));

        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        const warned = this.results.filter(r => r.status === 'WARN').length;
        const info = this.results.filter(r => r.status === 'INFO').length;
        const total = this.results.length;

        // Group by category
        const categories = [...new Set(this.results.map(r => r.category))];

        categories.forEach(category => {
            console.log(`\n📂 ${category}:`);
            const categoryResults = this.results.filter(r => r.category === category);

            categoryResults.forEach(result => {
                const statusIcon = result.status === 'PASS' ? '✅' :
                    result.status === 'WARN' ? '⚠️' :
                        result.status === 'INFO' ? 'ℹ️' : '❌';
                console.log(`  ${statusIcon} ${result.message}`);
            });
        });

        console.log('\n📊 Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`⚠️ Warnings: ${warned}`);
        console.log(`ℹ️ Info: ${info}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📊 Total: ${total}`);

        if (failed === 0) {
            console.log('\n🎉 Setup verification completed successfully!');
            console.log('\n🚀 Next steps:');
            console.log('1. Configure your API keys in backend/.env');
            console.log('2. Run: npm run dev');
            console.log('3. Visit http://localhost:5173');
        } else {
            console.log('\n❌ Some issues found. Please fix the failed items above.');
            console.log('\n💡 Quick fixes:');
            console.log('- Run: npm run setup (to install dependencies)');
            console.log('- Copy backend/env.example to backend/.env');
            console.log('- Configure your API keys');
        }

        if (warned > 0) {
            console.log('\n⚠️ Warnings (non-critical):');
            console.log('- These are suggestions for optimal setup');
            console.log('- The application may still work without fixing these');
        }
    }
}

// Run the verification
async function main() {
    const verifier = new SetupVerifier();
    await verifier.run();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = SetupVerifier; 