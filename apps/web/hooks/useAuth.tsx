'use client'

import { useSelector } from 'react-redux'

export function useAuth() {
    const { user, isInitialized, loading } = useSelector((state: any) => state.auth)

    return { user, isInitialized, loading }
}