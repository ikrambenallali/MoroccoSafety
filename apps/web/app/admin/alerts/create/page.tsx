'use client'

import { useState } from 'react'
import { createAlert } from '@/services/alertService'
import { useRouter } from 'next/navigation'
import { Send, ArrowLeft, ShieldAlert } from 'lucide-react'

export default function CreateAlert() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    message: '',
    severity: 'MEDIUM'
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createAlert(form)
    router.push('/admin/alerts')
  }

  const inputStyle = "w-full bg-[#1e2427] border border-[#8E1616]/30 p-4 text-white focus:border-[#D84040] focus:ring-1 focus:ring-[#D84040] outline-none transition-all placeholder:text-white/10 rounded-sm text-sm";
  const labelStyle = "text-[10px]   tracking-[0.2em] font-black text-[#D84040] mb-2 block";

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-[#1e2427] p-10 border border-[#8E1616]/20 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#D84040]"></div>

        <button
          onClick={() => router.back()}
          className="text-[10px] text-[#CCCCCC]/40 hover:text-white   font-black tracking-widest mb-8 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={14} /> Annuler la rédaction
        </button>

        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-[#D84040]/10 text-[#D84040] rounded-sm">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white     tracking-tighter">Nouvelle Alerte SMS/Push</h1>
            <p className="text-[10px] text-[#CCCCCC]/50   tracking-widest font-bold font-mono text-white/40">Système de messagerie publique</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelStyle}>Titre de l'Alerte (Court)</label>
            <input
              required
              placeholder="Ex: EVACUATION IMMÉDIATE - SECTEUR RIF"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Corps du Message (Max 160 car.)</label>
            <textarea
              required
              rows={4}
              placeholder="Instructions précises pour les citoyens..."
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputStyle} resize-none  `}
            />
          </div>

          <div>
            <label className={labelStyle}>Niveau de Priorité</label>
            <select
              onChange={(e) => setForm({ ...form, severity: e.target.value })}
              className={`${inputStyle} cursor-pointer font-bold`}
              value={form.severity}
            >
              <option value="LOW" className="text-blue-400">INFO - BASSE (Bleu)</option>
              <option value="MEDIUM" className="text-orange-500">AVERTISSEMENT - MOYENNE (Orange)</option>
              <option value="HIGH" className="text-red-500 font-bold">URGENCE - HAUTE (Rouge)</option>
            </select>
          </div>

          <button className="w-full bg-[#D84040] hover:bg-[#8E1616] text-white py-4 font-black   tracking-[0.3em] transition-all shadow-lg border border-white/10 flex items-center justify-center gap-3 group">
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Enregistrer et Préparer l'envoi
          </button>
        </form>
      </div>
    </div>
  )
}