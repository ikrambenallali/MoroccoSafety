import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
    autoConnect: true,
})

// 🔌 DEBUGGING - Vérifier la connexion Socket
socket.on('connect', () => {
    console.log('✅ Socket connecté:', socket.id)
})

socket.on('disconnect', () => {
    console.log('❌ Socket déconnecté')
})

socket.on('connect_error', (error) => {
    console.error('❌ Erreur de connexion Socket:', error)
})

socket.on('error', (error) => {
    console.error('❌ Erreur Socket:', error)
})

// Fonction pour tester la connexion
export const testSocketConnection = () => {
    console.log('🔌 État de connexion:', {
        connected: socket.connected,
        id: socket.id,
        url: socket.io.uri,
    })
    return socket.connected
}