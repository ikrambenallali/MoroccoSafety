'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCrisis, closeCrisis } from '@/services/crisisService'
import { ArrowLeft, Clock, Map, Info, CheckCircle } from 'lucide-react'

export default function CrisisDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [crisis, setCrisis] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCrisis(id as string)
      setCrisis(data)
    }
    fetchData()
  }, [id])

  if (!crisis) return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-white flex items-center justify-center animate-pulse uppercase tracking-[0.5em]">
        Chargement des données tactiques...
    </div>
  )

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
      <div className="max-w-5xl mx-auto">
        {/* Navigation retour */}
        <button onClick={() => router.push('/admin/crisis')} className="flex items-center gap-2 text-[#D84040] hover:text-white mb-8 transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={16} /> Retour au registre
        </button>

        <div className="bg-[#1e2427] border border-[#8E1616]/30 overflow-hidden shadow-2xl">
            {/* Header du rapport */}
            <div className="bg-[#8E1616]/20 p-8 border-b border-[#8E1616]/30 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-white italic uppercase tracking-tighter">{crisis.title}</h1>
                    <p className="text-[10px] text-[#D84040] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <Clock size={12}/> ID: {id}
                    </p>
                </div>
                <div className={`px-6 py-2 border ${crisis.status === 'EN_COURS' ? 'border-[#D84040] text-[#D84040]' : 'border-green-500 text-green-500'} font-black uppercase tracking-widest text-sm`}>
                    {crisis.status}
                </div>
            </div>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#8E1616]/20">
                {/* Section gauche : Description */}
                <div className="md:col-span-2 p-8">
                    <h3 className="text-[10px] uppercase font-black text-[#D84040] tracking-widest mb-4 flex items-center gap-2">
                        <Info size={14}/> Analyse de la situation
                    </h3>
                    <p className="text-xl text-white/90 leading-relaxed font-light italic">
                        {crisis.description}
                    </p>
                </div>

                {/* Section droite : Données GPS */}
                <div className="p-8 space-y-8 bg-black/10">
                    <div>
                        <h3 className="text-[10px] uppercase font-black text-[#D84040] tracking-widest mb-4 flex items-center gap-2">
                            <Map size={14}/> Coordonnées Zone
                        </h3>
                        <div className="font-mono text-sm space-y-2 bg-[#2B3337] p-4 border border-white/5">
                            <p><span className="text-[#CCCCCC]/40">LAT:</span> {crisis.zone?.latitude}</p>
                            <p><span className="text-[#CCCCCC]/40">LNG:</span> {crisis.zone?.longitude}</p>
                            <p><span className="text-[#CCCCCC]/40">RAD:</span> {crisis.zone?.radius} KM</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[10px] uppercase font-black text-[#D84040] tracking-widest mb-2">Niveau de Sévérité</h3>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#D84040] h-full" style={{width: `${crisis.severity * 10}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barre d'actions basse */}
            <div className="p-8 border-t border-[#8E1616]/20 flex flex-wrap gap-4">
                <button 
                  onClick={() => router.push(`/admin/crisis/${id}/edit`)}
                  className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all border border-white/10"
                >
                  Modifier les données
                </button>
                <button 
                  onClick={async () => {
                    if(confirm("Confirmer la clôture de cette crise ?")) {
                        await closeCrisis(id as string);
                        router.refresh();
                    }
                  }}
                  className="bg-[#D84040] hover:bg-[#8E1616] text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center gap-2"
                >
                  <CheckCircle size={16}/> Clôturer l'incident
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}