'use client'

import { useEffect } from 'react'
import { socket } from '@/services/socket'
import { toast } from 'sonner'
import { AlertTriangle, Bell, X, ShieldAlert } from 'lucide-react'

export default function CitizenDashboard() {
  useEffect(() => {
    socket.on('alert', (data) => {
      toast.custom((t) => (
        <div className="w-95  bg-[#1e2427] border-l-4 border-[#D84040] shadow-2xl p-4 flex gap-4 animate-in slide-in-from-right-full border  relative">

          <div className="shrink-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#D84040]/20 rounded-full flex items-center justify-center animate-pulse">
              <ShieldAlert className="text-[#D84040]" size={28} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-[#D84040] font-black   tracking-wide   text-sm">
                Alerte de Sécurité
              </h3>

              <button
                onClick={() => toast.dismiss(t)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-white font-bold text-base mt-1 leading-tight">
              {data.title}
            </p>

            <p className="text-[#CCCCCC]/70 text-xs mt-2   leading-relaxed">
              {data.message}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D84040] rounded-full animate-ping"></span>
              <span className="text-[10px] text-[#D84040] font-black   tracking-widest">
                Diffusion Immédiate
              </span>
            </div>
          </div>
        </div>
      ), {
        duration: 15000,
        position: 'top-right',
      })
    })

    return () => {
      socket.off('alert')
    }
  }, [])

  const cardStyle = "p-6 bg-[#1e2427] border border-[#8E1616]/20 rounded-sm shadow-xl hover:border-[#D84040] transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-4";

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen">
      <div className="mb-10 border-b border-[#8E1616]/30 pb-6">
        <h1 className="text-4xl font-serif font-bold text-white tracking-tighter    ">
          Tableau de Bord Citoyen
        </h1>

        <p className="text-xs   tracking-widest text-[#D84040] font-bold mt-1">
          Statut de surveillance : <span className="text-green-500">Connecté</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className={cardStyle}>
          <div className="p-4 bg-[#D84040]/10 text-[#D84040] rounded-full group-hover:bg-[#D84040] group-hover:text-white transition-all">
            <AlertTriangle size={32} />
          </div>
          <span className="text-xs font-black   tracking-widest text-white">
            Carte des crises
          </span>
        </div>

        <div className={cardStyle}>
          <div className="p-4 bg-[#D84040]/10 text-[#D84040] rounded-full group-hover:bg-[#D84040] group-hover:text-white transition-all">
            <Bell size={32} />
          </div>
          <span className="text-xs font-black   tracking-widest text-white">
            Alertes récentes
          </span>
        </div>

        <div className={cardStyle}>
          <div className="p-4 bg-blue-600/10 text-blue-500 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ShieldAlert size={32} />
          </div>
          <span className="text-xs font-black   tracking-widest text-blue-500">
            Signaler un incident
          </span>
        </div>

      </div>
    </div>
  )
}