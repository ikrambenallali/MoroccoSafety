import AuthGuard from '@/components/AuthGuard'

export default function Dashboard() {
  return (
    <AuthGuard>
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </AuthGuard>
  )
}