// src/components/dashboard/AuthorityDashboard.tsx
export default function AuthorityDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Autorité</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          📊 Crises en cours
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          📢 Alertes publiées
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          ⚠️ Signalements reçus
        </div>
      </div>
    </div>
  )
}