'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/services/socket'

export function useSocket() {
    const [isConnected, setIsConnected] = useState(false)
    const [socketId, setSocketId] = useState<string>('')

    useEffect(() => {
        // Vérifier l'état au montage
        if (socket.connected) {
            setIsConnected(true)
            setSocketId(socket.id)
            console.log('✅ Socket déjà connecté:', socket.id)
        }

        // Écouter les événements de connexion
        socket.on('connect', () => {
            console.log('✅ Socket connecté:', socket.id)
            setIsConnected(true)
            setSocketId(socket.id)
        })

        socket.on('disconnect', () => {
            console.log('❌ Socket déconnecté')
            setIsConnected(false)
            setSocketId('')
        })

        socket.on('connect_error', (error) => {
            console.error('❌ Erreur de connexion:', error)
        })

        // Cleanup
        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('connect_error')
        }
    }, [])

    return { isConnected, socketId }
}
