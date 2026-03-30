'use client'

import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '@/services/userService'
import { User, Mail, ShieldCheck, Save, Fingerprint, BadgeCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfilePage() {
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const data = await getProfile()
      setForm(data)
    }
    fetch()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile(form)
      toast.success("Profil mis à jour avec succès", {
        style: { background: '#1e2427', color: '#fff', border: '1px solid #8E1616' }
      })
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = "w-full bg-[#1e2427] border border-[#8E1616]/30 p-4 text-white focus:border-[#D84040] focus:ring-1 focus:ring-[#D84040] outline-none transition-all placeholder:text-white/10 rounded-sm text-sm font-mono";
  const labelStyle = "text-[10px]   tracking-[0.2em] font-black text-[#D84040] mb-2 block";

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen flex justify-center items-start font-sans">
      <div className="w-full max-w-2xl bg-[#1e2427] border border-[#8E1616]/20 shadow-2xl relative overflow-hidden">

        {/* Header de la carte d'identité */}
        <div className="bg-[#8E1616]/10 p-8 border-b border-[#8E1616]/20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-[#2B3337] border-2 border-[#D84040] flex items-center justify-center rounded-sm">
                <User size={40} className="text-[#D84040]" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#D84040] p-1 rounded-full border-2 border-[#1e2427]">
                <BadgeCheck size={16} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white     tracking-tighter">
                Dossier Citoyen
              </h1>
              <p className="text-[9px] font-mono text-[#D84040] font-black tracking-[0.3em]   mt-1">
                ID_VERIFIED // MOR_99283
              </p>
            </div>
          </div>
          <Fingerprint size={48} className="text-white/5" />
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section Informations de base */}
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <label className={labelStyle}>Nom Complet & Prénom</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D84040]/50" size={16} />
                  <input
                    value={form.name || ''}
                    placeholder="NOM_UTILISATEUR"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputStyle} pl-12  `}
                  />
                </div>
              </div>

              <div className="relative">
                <label className={labelStyle}>Adresse Électronique Sécurisée</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D84040]/50" size={16} />
                  <input
                    type="email"
                    value={form.email || ''}
                    placeholder="EMAIL@DOMAIN.COM"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputStyle} pl-12 lowercase font-sans`}
                  />
                </div>
              </div>
            </div>



            {/* Bouton de validation */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D84040] hover:bg-[#8E1616] text-white py-4 font-black   tracking-[0.3em] text-[10px] transition-all shadow-lg border border-white/10 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <span className="animate-pulse">Traitement en cours...</span>
              ) : (
                <>
                  <Save size={16} className="group-hover:scale-110 transition-transform" />
                  Mettre à jour le dossier
                </>
              )}
            </button>
          </form>
        </div>

        {/* Pied de page style administratif */}
        <div className="p-6 bg-black/40 text-center border-t border-white/5">
          <p className="text-[8px] text-white/20   tracking-[0.5em] font-bold">
            Système National de Sécurité Civile • MoroccoSafety Confidential
          </p>
        </div>
      </div>
    </div>
  )
}