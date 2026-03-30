// src/app/dashboard/layout.tsx
'use client' // 🔥 IMPORTANT

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isInitialized } = useAuth()

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>Non autorisé</div>
    }

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar role={user.role} />
                <main className="flex-1 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}