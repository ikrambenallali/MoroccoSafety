'use client'

import { useState } from 'react'
import { createCrisis } from '@/services/crisisService'
import { useRouter } from 'next/navigation'
import { ShieldAlert, MapPin, Activity } from 'lucide-react'

export default function CreateCrisis() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'EN_COURS',
        severity: '',
        latitude: '',
        longitude: '',
        radius: '',
    })

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            title: form.title,
            description: form.description,
            status: form.status,
            severity: form.severity,
            zone: {
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                radius: Number(form.radius),
            }
        }
        await createCrisis(data)
        router.push('/admin/crisis')
    }

    const inputStyle = "w-full bg-[#1e2427] border border-[#8E1616]/30 p-3 text-white focus:border-[#D84040] focus:ring-1 focus:ring-[#D84040] outline-none transition-all placeholder:text-white/10 rounded-sm text-sm";
    const labelStyle = "text-[10px] uppercase tracking-[0.2em] font-black text-[#D84040] mb-2 block";

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen flex justify-center items-start">
            <div className="w-full max-w-3xl bg-[#1e2427] p-10 border border-[#8E1616]/20 shadow-2xl relative">
                {/* Ligne décorative top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D84040]"></div>

                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-[#D84040]/10 text-[#D84040] rounded-sm">
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white italic uppercase tracking-tighter">Déclarer une Alerte</h1>
                        <p className="text-[10px] text-[#CCCCCC]/50 uppercase tracking-widest font-bold">Formulaire officiel de signalement</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Infos de base */}
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className={labelStyle}>Titre de l'incident</label>
                            <input required className={inputStyle} placeholder="Ex: INCENDIE FORÊT DU RIF" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelStyle}>Description des faits</label>
                            <textarea required className={`${inputStyle} h-32 resize-none`} placeholder="Détaillez la situation tactique..." onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                    </div>

                    {/* Paramètres techniques */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 bg-black/20 border-l-2 border-[#D84040]">
                        <div>
                            <label className={labelStyle}><Activity size={12} className="inline mr-1"/> Sévérité (1-10)</label>
                            <input required type="number" className={inputStyle} onChange={(e) => setForm({ ...form, severity: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelStyle}>Rayon d'impact (KM)</label>
                            <input required type="number" className={inputStyle} onChange={(e) => setForm({ ...form, radius: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelStyle}><MapPin size={12} className="inline mr-1"/> Latitude</label>
                            <input required type="number" step="any" className={inputStyle} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelStyle}><MapPin size={12} className="inline mr-1"/> Longitude</label>
                            <input required type="number" step="any" className={inputStyle} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-[#D84040] hover:bg-[#8E1616] text-white py-4 font-black uppercase tracking-[0.3em] transition-all shadow-lg border border-white/10">
                            Diffuser l'Alerte Immédiatement
                        </button>
                        <button type="button" onClick={() => router.back()} className="px-8 py-4 border border-white/10 text-white/40 hover:text-white uppercase text-[10px] font-bold tracking-widest transition-all">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}