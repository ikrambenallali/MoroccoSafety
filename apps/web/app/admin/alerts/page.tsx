'use client'

import { useEffect, useState } from 'react'
import { getAlerts, sendAlert } from '@/services/alertService'
import { useRouter } from 'next/navigation'
import { Bell, Send, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([])
  const router = useRouter()

  const fetchAlerts = async () => {
    const data = await getAlerts()
    setAlerts(data)
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  const handleSend = async (id: string) => {
    if(confirm("🚨 Confirmation : Diffuser cette alerte à tous les utilisateurs ?")) {
        await sendAlert(id)
        fetchAlerts()
    }
  }

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-[#8E1616]/30 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic uppercase flex items-center gap-4">
            <Bell className="text-[#D84040]" size={36} /> 
            Diffusion d'Alertes
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-bold mt-1">
            Système de notification de masse par satellite
          </p>
        </div>

        <button
          onClick={() => router.push('/admin/alerts/create')}
          className="bg-[#D84040] hover:bg-[#8E1616] text-white px-6 py-3 rounded-sm flex items-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg border border-white/10"
        >
          <Plus size={16} /> Rédiger une Alerte
        </button>
      </div>

      {/* Tableau de Contrôle */}
      <div className="overflow-hidden rounded-sm border border-[#8E1616]/20 bg-[#1e2427] shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#8E1616]/10 text-white uppercase text-[10px] tracking-[0.2em] border-b border-[#8E1616]/20">
              <th className="p-5 font-black">Message / Titre</th>
              <th className="p-5 font-black text-center">État de Diffusion</th>
              <th className="p-5 font-black text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8E1616]/10">
            {alerts.map((a: any) => (
              <tr key={a._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-white uppercase tracking-tight text-sm">{a.title}</span>
                    <span className="text-[10px] text-[#CCCCCC]/40 font-mono mt-1">ID: {a._id.slice(-6)}</span>
                  </div>
                </td>
             
                <td className="p-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {a.sent ? (
                      <span className="flex items-center gap-1 text-green-500 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle size={12} /> Diffusé
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                        <Clock size={12} /> En Attente
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-5 text-right">
                  {!a.sent ? (
                    <button
                      onClick={() => handleSend(a._id)}
                      className="bg-[#D84040] hover:bg-[#8E1616] text-white px-4 py-2 rounded-sm text-[10px] font-black uppercase flex items-center gap-2 transition-all ml-auto shadow-lg border border-white/10"
                    >
                      <Send size={14} /> Envoyer
                    </button>
                  ) : (
                    <span className="text-[10px] text-white/20 italic font-bold uppercase tracking-widest">Archivé</span>
                  )}
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-16 text-center opacity-20">
                        <AlertCircle size={40} className="mx-auto mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Aucun message dans la file d'attente</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}