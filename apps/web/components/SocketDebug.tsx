'use client'

import { useSocket } from '@/hooks/useSocket'
import { Circle } from 'lucide-react'

export default function SocketDebug() {
    const { isConnected, socketId } = useSocket()

    return (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700 max-w-sm">
            <div className="flex items-center gap-2 mb-2">
                <Circle
                    size={12}
                    className={`fill-current ${isConnected ? 'text-green-500' : 'text-red-500'}`}
                />
                <span className="font-bold text-sm">
                    {isConnected ? '🟢 Socket Connecté' : '🔴 Socket Déconnecté'}
                </span>
            </div>

            <div className="text-xs space-y-1 text-gray-300">
                <div>
                    <span className="text-gray-400">ID:</span> {socketId || 'waiting...'}
                </div>
                <div>
                    <span className="text-gray-400">URL:</span> http://localhost:3000
                </div>
                <div>
                    <span className="text-gray-400">Status:</span>{' '}
                    {isConnected ? 'connected' : 'disconnected'}
                </div>
            </div>

            <button
                onClick={() => {
                    console.log('🔌 Socket Info:', {
                        connected: isConnected,
                        id: socketId,
                        listeners: (window as any).__socketListeners?.length || 'unknown',
                    })
                }}
                className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
            >
                Vérifier Console
            </button>
        </div>
    )
}
