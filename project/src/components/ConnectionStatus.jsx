import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { connectionUtils } from '../services/api';

export default function ConnectionStatus() {
    const [status, setStatus] = useState({ connected: false, message: 'Checking connection...' });
    const [isChecking, setIsChecking] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const checkConnection = async () => {
        setIsChecking(true);
        try {
            const result = await connectionUtils.checkBackendStatus();
            setStatus(result);
            
            // Only show status if there's an issue or in demo mode
            setShowStatus(!result.connected || result.message.includes('demo'));
        } catch (error) {
            setStatus({ connected: false, message: 'Demo mode active' });
            setShowStatus(true);
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

        if (status.message.includes('demo')) {
            return <Info className="h-4 w-4 text-blue-500" />;
        }

        return <WifiOff className="h-4 w-4 text-orange-500" />;
    };

    const getStatusColor = () => {
        if (isChecking) return 'text-blue-500';
        if (status.connected) return 'text-green-500';
        if (status.message.includes('demo')) return 'text-blue-500';
        return 'text-orange-500';
    };

    const getStatusText = () => {
        if (isChecking) return 'Checking connection...';
        if (status.connected) return 'Backend connected';
        if (status.message.includes('demo')) return 'Demo mode';
        return 'Limited functionality';
    };

    const getBgColor = () => {
        if (status.connected) return 'bg-green-50 border-green-200';
        if (status.message.includes('demo')) return 'bg-blue-50 border-blue-200';
        return 'bg-orange-50 border-orange-200';
    };

    // Don't show anything if fully connected and not checking
    if (status.connected && !isChecking && !showStatus) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`backdrop-blur-sm rounded-lg shadow-lg border p-3 max-w-xs ${getBgColor()}`}>
                <div className="flex items-center space-x-2">
                    {getStatusIcon()}
                    <span className={`text-sm font-medium ${getStatusColor()}`}>
                        {getStatusText()}
                    </span>
                </div>

                {status.message.includes('demo') && !isChecking && (
                    <div className="mt-2 text-xs text-blue-600">
                        <p className="mb-1">✨ Demo mode active</p>
                        <p className="text-blue-500">All features available for testing!</p>
                    </div>
                )}

                {!status.connected && !status.message.includes('demo') && !isChecking && (
                    <div className="mt-2 text-xs text-gray-600">
                        <p className="mb-2">{status.message}</p>
                        <button
                            onClick={checkConnection}
                            className="text-blue-600 hover:text-blue-800 underline text-xs"
                        >
                            Retry connection
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}