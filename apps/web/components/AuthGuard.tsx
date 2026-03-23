'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function AuthGuard({ children }: any) {
    const router = useRouter()
    const { token } = useSelector((state: any) => state.auth)
    const [isReady, setIsReady] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const validToken = token || storedToken

        if (validToken) {
            setIsAuthenticated(true)
        } else {
            router.push('/login')
        }

        setIsReady(true)
    }, [token, router])

    if (!isReady) return null
    if (!isAuthenticated) return null

    return children
}