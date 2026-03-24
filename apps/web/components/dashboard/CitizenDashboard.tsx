// src/components/dashboard/CitizenDashboard.tsx
export default function CitizenDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Citoyen</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          📍 Carte des crises
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          🚨 Alertes récentes
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          ➕ Signaler un incident
        </div>
      </div>
    </div>
  )
}