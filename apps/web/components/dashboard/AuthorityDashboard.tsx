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
          <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic uppercase flex items-center gap-3">
            <ShieldCheck className="text-[#D84040]" size={36} />
            Poste de Commandement
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-black mt-1">
            Système National de Gestion des Crises <span className="text-white/20 mx-2">|</span> ID: AUTH-UNIT-01
          </p>
        </div>

        <div className="flex gap-4">
            <div className="bg-black/20 px-4 py-2 border border-white/5 rounded-sm">
                <p className="text-[8px] uppercase font-bold text-white/40">Statut Système</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-xs font-mono font-bold text-green-500">OPÉRATIONNEL</span>
                </div>
            </div>
            <div className="bg-black/20 px-4 py-2 border border-white/5 rounded-sm text-right">
                <p className="text-[8px] uppercase font-bold text-white/40">Dernière MaJ</p>
                <p className="text-xs font-mono font-bold text-white">14:02:55</p>
            </div>
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
          <h3 className="text-[10px] uppercase font-black tracking-widest text-white/40">Crises Actives</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1 italic">14</p>
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
            <span className="text-[10px] font-mono text-white/40 italic">Global</span>
          </div>
          <h3 className="text-[10px] uppercase font-black tracking-widest text-white/40">Alertes Diffusées</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1 italic">128</p>
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
          <h3 className="text-[10px] uppercase font-black tracking-widest text-white/40">Signalements Citoyens</h3>
          <p className="text-4xl font-serif font-bold text-white mt-1 italic">42</p>
          <p className="text-[9px] mt-4 font-mono text-orange-500/70 italic underline cursor-pointer hover:text-orange-400">
            8 en attente de validation
          </p>
        </div>

      </div>

      {/* SECTION DU BAS : ACTIVITÉ RÉCENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Journal d'activité */}
        <div className="bg-[#1e2427] border border-white/5 rounded-sm overflow-hidden">
            <div className="bg-white/5 p-4 border-b border-white/5 flex items-center gap-2">
                <Activity size={16} className="text-[#D84040]" />
                <h2 className="text-xs font-black uppercase tracking-widest text-white">Journal des Opérations</h2>
            </div>
            <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors border-l border-white/5 hover:border-[#D84040]">
                        <Clock size={14} className="text-white/20" />
                        <div className="flex-1">
                            <p className="text-xs text-white/80 font-bold uppercase tracking-tighter">Alerte "Inondation" publiée sur Casablanca</p>
                            <p className="text-[9px] text-white/30 font-mono italic">Par: Officier_Medhi • 12:45:00</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Supervision Equipe */}
        <div className="bg-[#1e2427] border border-white/5 rounded-sm overflow-hidden">
            <div className="bg-white/5 p-4 border-b border-white/5 flex items-center gap-2">
                <Users size={16} className="text-[#D84040]" />
                <h2 className="text-xs font-black uppercase tracking-widest text-white">Unités de Surveillance</h2>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-white/10" size={24} />
                </div>
                <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.3em]">Module de gestion d'équipe <br/> en cours de déploiement</p>
            </div>
        </div>

      </div>

    </div>
  )
}