'use client'

import { useAuth } from '@/hooks/useAuth'
import CitizenDashboard from '@/components/dashboard/CitizenDashboard'
import AuthorityDashboard from '@/components/dashboard/AuthorityDashboard'
import AdminDashboard from '@/components/dashboard/AdminDashboard'

type UserRole = 'citizen' | 'authority' | 'admin'

export default function DashboardPage() {
  const { user, isInitialized } = useAuth()

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Non autorisé</div>
  }

  const dashboards: Record<UserRole, React.ComponentType> = {
    citizen: CitizenDashboard,
    authority: AuthorityDashboard,
    admin: AdminDashboard,
  }

  const DashboardComponent = dashboards[user.role as UserRole]

  if (!DashboardComponent) {
    return <div>Erreur: Rôle utilisateur non reconnu ({user.role})</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardComponent />
    </div>
  )
}