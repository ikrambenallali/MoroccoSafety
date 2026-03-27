'use client'

import { useEffect, useState } from 'react'
import { getSentAlerts } from '@/services/alertService'
import { useSelector } from 'react-redux'
import { Bell, Loader2 } from 'lucide-react'

export default function SentAlertsPage() {
  const token = useSelector((state: any) => state.auth.token)

  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getSentAlerts()
        setAlerts(data)
      } catch (err) {
        console.error('Erreur récupération alerts', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  return (
    <div className="min-h-screen bg-[#2B3337] p-6">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-[#D84040]" size={28} />
        <h1 className="text-white text-2xl font-bold uppercase tracking-wider">
          Alertes envoyées
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-20">
          <Loader2 className="animate-spin text-[#D84040]" size={30} />
        </div>
      )}

      {/* LISTE */}
      {!loading && alerts.length === 0 && (
        <p className="text-gray-400 text-center mt-10">
          Aucune alerte envoyée
        </p>
      )}

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div
            key={alert._id}
            className="bg-[#1e2427] border border-white/10 p-5 rounded-sm shadow-lg hover:border-[#D84040] transition"
          >
            <h2 className="text-white font-bold text-lg mb-2">
              {alert.title || 'Alerte'}
            </h2>

            <p className="text-gray-400 text-sm mb-3">
              {alert.message || 'Pas de description'}
            </p>

            <div className="flex justify-between text-xs text-gray-500">
          

              <span>
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}