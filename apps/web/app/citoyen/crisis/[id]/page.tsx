'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCrisis, closeCrisis } from '@/services/crisisService'
import { ArrowLeft, Clock, Map, Info, CheckCircle } from 'lucide-react'

export default function CrisisDetails() {
  const { id } = useParams()
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
                       
                    </div>
                </div>
            </div>

        
        </div>
      </div>
    </div>
  )
}