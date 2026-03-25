'use client'

import { useEffect, useState } from 'react'
import { getCrisis, updateCrisis } from '@/services/crisisService'
import { useRouter, useParams } from 'next/navigation'
import { Edit3, ArrowLeft } from 'lucide-react'

export default function EditCrisis() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const fetch = async () => {
      const data = await getCrisis(id as string)
      setForm(data)
    }
    fetch()
  }, [id])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await updateCrisis(id as string, form)
    router.push('/admin/crisis')
  }

  const inputStyle = "w-full bg-[#1e2427] border border-[#8E1616]/30 p-3 text-white focus:border-[#D84040] focus:ring-1 focus:ring-[#D84040] outline-none transition-all rounded-sm text-sm";
  const labelStyle = "text-[10px] uppercase tracking-[0.2em] font-black text-[#D84040] mb-2 block";

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen flex justify-center items-start">
        <div className="w-full max-w-2xl bg-[#1e2427] p-10 border border-[#8E1616]/20 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>

            <button onClick={() => router.back()} className="text-[10px] text-[#CCCCCC]/40 hover:text-white uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                <ArrowLeft size={14}/> Retour
            </button>

            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-sm">
                    <Edit3 size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white italic uppercase tracking-tighter">Éditer l'Alerte</h1>
                    <p className="text-[10px] text-[#CCCCCC]/50 uppercase tracking-widest font-bold font-mono">CRISIS_REF: {id?.toString().slice(-8)}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={labelStyle}>Titre de la crise</label>
                    <input
                        className={inputStyle}
                        value={form.title || ''}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                </div>

                {/* Vous pouvez ajouter d'autres champs ici comme dans CreateCrisis si nécessaire */}

                <div className="pt-6">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 font-black uppercase tracking-[0.3em] transition-all shadow-lg border border-white/10">
                        Mettre à jour les données tactiques
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
