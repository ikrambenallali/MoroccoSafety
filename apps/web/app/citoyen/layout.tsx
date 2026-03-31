'use client'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth()

  return (
    <ProtectedRoute allowedRoles={['citizen']}>
      <div>
        <div className="flex">
          <main className="flex-1 bg-gray-50 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}