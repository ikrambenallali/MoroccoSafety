'use client'

import { useEffect, useState } from 'react'
import { createZone } from '@/services/zoneService'
import { useRouter } from 'next/navigation'
import { getCrises } from '@/services/crisisService'
import { MapPin, Target, ArrowLeft, Info } from 'lucide-react'

export default function CreateZone() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        crisisId: '',
        lat: '',
        lng: ''
    })
    const [crises, setCrises] = useState([])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const zoneData = {
            name: form.name,
            crisisId: form.crisisId,
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [Number(form.lng), Number(form.lat)],
                    [Number(form.lng) + 0.01, Number(form.lat)],
                    [Number(form.lng) + 0.01, Number(form.lat) + 0.01],
                    [Number(form.lng), Number(form.lat) + 0.01],
                    [Number(form.lng), Number(form.lat)]
                ]]
            }
        }

        await createZone(zoneData)
        router.push('/admin/zones')
    }

    useEffect(() => {
        const fetch = async () => {
            const data = await getCrises()
            setCrises(data)
        }
        fetch()
    }, [])

    const inputStyle = "w-full bg-[#1e2427] border border-[#8E1616]/30 p-3 text-white focus:border-[#D84040] focus:ring-1 focus:ring-[#D84040] outline-none transition-all placeholder:text-white/10 rounded-sm text-sm font-mono";
    const labelStyle = "text-[10px]   tracking-[0.2em] font-black text-[#D84040] mb-2 block";

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen flex justify-center items-start">
            <div className="w-full max-w-2xl bg-[#1e2427] p-10 border border-[#8E1616]/20 shadow-2xl relative">

                {/* Ligne décorative style "Radar" */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D84040]"></div>

                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] font-black   tracking-widest text-[#CCCCCC]/40 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={14} /> Annuler l'opération
                </button>

                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-[#D84040]/10 text-[#D84040] rounded-sm">
                        <Target size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white     tracking-tighter">Définir un Périmètre</h1>
                        <p className="text-[10px] text-[#CCCCCC]/50   tracking-widest font-bold">Initialisation de zone géographique</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Identification */}
                    <div>
                        <label className={labelStyle}>Nom du Secteur / Code Zone</label>
                        <input
                            required
                            placeholder="Ex: ZONE_NORD_ALPHA"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputStyle}
                        />
                    </div>

                    {/* Liaison Crise */}
                    <div>
                        <label className={labelStyle}>Associer à une Crise Active</label>
                        <select
                            required
                            onChange={(e) => setForm({ ...form, crisisId: e.target.value })}
                            className={`${inputStyle} cursor-pointer appearance-none`}
                        >
                            <option value="" className="bg-[#2B3337]">-- AUCUNE SÉLECTION --</option>
                            {crises.map((c: any) => (
                                <option key={c._id} value={c._id} className="bg-[#2B3337]">
                                    {c.title.toLowerCase()} (SÉVÉRITÉ: {c.severity})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Coordonnées GPS */}
                    <div className="grid grid-cols-2 gap-4 p-6 bg-black/20 border-l-2 border-[#D84040]">
                        <div className="col-span-2 mb-2 flex items-center gap-2">
                            <MapPin size={14} className="text-[#D84040]" />
                            <span className="text-[10px] text-white/40   font-bold tracking-widest">Coordonnées du Point d'Origine</span>
                        </div>
                        <div>
                            <input
                                required
                                type="number"
                                step="any"
                                placeholder="LATITUDE"
                                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <input
                                required
                                type="number"
                                step="any"
                                placeholder="LONGITUDE"
                                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    <div className="bg-[#D84040]/5 p-4 flex gap-3 rounded-sm border border-[#D84040]/20">
                        <Info size={16} className="text-[#D84040] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-200/60 leading-relaxed  ">
                            Note : Le système générera automatiquement un polygone de 0.01° autour de ce point pour définir le périmètre initial.
                        </p>
                    </div>

                    <button className="w-full bg-[#D84040] hover:bg-[#D84040] text-white py-4 font-black   tracking-[0.3em] transition-all shadow-lg border border-white/10 group">
                        Confirmer le Périmètre
                    </button>
                </form>
            </div>
        </div>
    )
}