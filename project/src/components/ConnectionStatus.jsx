import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react';
import { connectionUtils } from '../services/api';

export default function ConnectionStatus() {
    const [status, setStatus] = useState({ connected: false, message: 'Checking connection...' });
    const [isChecking, setIsChecking] = useState(true);

    const checkConnection = async () => {
        setIsChecking(true);
        try {
            const result = await connectionUtils.checkBackendStatus();
            setStatus(result);
        } catch (error) {
            setStatus({ connected: false, message: error.message });
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        checkConnection();

        // Check connection every 30 seconds
        const interval = setInterval(checkConnection, 30000);

        return () => clearInterval(interval);
    }, []);

    const getStatusIcon = () => {
        if (isChecking) {
            return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>;
        }

        if (status.connected) {
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        }

        return <WifiOff className="h-4 w-4 text-red-500" />;
    };

    const getStatusColor = () => {
        if (isChecking) return 'text-blue-500';
        if (status.connected) return 'text-green-500';
        return 'text-red-500';
    };

    const getStatusText = () => {
        if (isChecking) return 'Checking connection...';
        if (status.connected) return 'Backend connected';
        return 'Backend disconnected';
    };

    if (status.connected && !isChecking) {
        return null; // Don't show anything when connected
    }

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border p-3 max-w-xs ${getStatusColor()}`}>
                <div className="flex items-center space-x-2">
                    {getStatusIcon()}
                    <span className="text-sm font-medium">{getStatusText()}</span>
                </div>

                {!status.connected && !isChecking && (
                    <div className="mt-2 text-xs text-gray-600">
                        <p className="mb-2">{status.message}</p>
                        <div className="space-y-1">
                            <p>• Make sure backend is running on port 5000</p>
                            <p>• Check your API keys in backend/.env</p>
                            <p>• Try refreshing the page</p>
                        </div>
                        <button
                            onClick={checkConnection}
                            className="mt-2 text-blue-600 hover:text-blue-800 underline text-xs"
                        >
                            Retry connection
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 