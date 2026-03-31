'use client'

import {
  BarChart3,
  Megaphone,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Users,
  Clock,
  ArrowUpRight
} from 'lucide-react'

export default function AuthorityDashboard() {

  // Style réutilisable pour les cartes de statistiques
  const statsCard = "bg-[#1e2427] border border-[#8E1616]/20 p-6 rounded-sm shadow-xl relative overflow-hidden group hover:border-[#D84040] transition-all"

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">

      {/* HEADER TACTIQUE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-[#8E1616]/30 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tighter     flex items-center gap-3">
            <ShieldCheck className="text-[#D84040]" size={36} />
            Poste de Commandement
          </h1>
          <p className="text-[10px]   tracking-[0.3em] text-[#D84040] font-black mt-1">
            Système National de Gestion des Crises <span className="text-white/20 mx-2">|</span> ID: AUTH-UNIT-01
          </p>
        </div>

      
      </div>

      {/* GRID DE STATISTIQUES RAPIDES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Crises en cours */}
        <div className={statsCard}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#D84040]/10 rounded-sm text-[#D84040]">
              <BarChart3 size={24} />
            </div>
            <span className="text-[10px] font-mono text-green-500 flex items-center gap-1">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-[10px]   font-black tracking-widest text-white/40">Crises Actives</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1  ">14</p>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#D84040] w-[65%]"></div>
          </div>
        </div>

        {/* Alertes Publiées */}
        <div className={statsCard}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-sm text-blue-500">
              <Megaphone size={24} />
            </div>
            <span className="text-[10px] font-mono text-white/40  ">Global</span>
          </div>
          <h3 className="text-[10px]   font-black tracking-widest text-white/40">Alertes Diffusées</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1  ">128</p>
          <p className="text-[9px] mt-4 font-mono text-white/20 tracking-tighter">Dernière diffusion: il y a 14min</p>
        </div>

        {/* Signalements reçus */}
        <div className={statsCard}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-sm text-orange-500">
              <AlertTriangle size={24} />
            </div>
            <span className="bg-orange-500 text-black text-[8px] px-1 font-black rounded-sm animate-pulse">URGENT</span>
          </div>
          <h3 className="text-[10px]   font-black tracking-widest text-white/40">Signalements Citoyens</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1  ">42</p>
          <p className="text-[9px] mt-4 font-mono text-orange-500/70   underline cursor-pointer hover:text-orange-400">
            8 en attente de validation
          </p>
        </div>

      </div>

    

    </div>
  )
}