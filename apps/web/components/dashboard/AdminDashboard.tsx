// src/components/dashboard/AdminDashboard.tsx
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          👥 Utilisateurs
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          🚨 Crises
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          📢 Alertes
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          📈 Statistiques
        </div>
      </div>
    </div>
  )
}