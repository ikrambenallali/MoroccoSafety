'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const { token } = useSelector((state: any) => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken || token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [token])

  return {
    isAuthenticated,
    token: token || localStorage.getItem('token'),
  }
}