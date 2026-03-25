'use client'
import { useEffect, useState } from 'react'
import { getCrises, deleteCrisis } from '@/services/crisisService'
import { useRouter } from 'next/navigation'
import { Plus, Eye, Edit3, Trash2, AlertTriangle } from 'lucide-react'

export default function CrisisList() {
  const [crises, setCrises] = useState([])
  const router = useRouter()

  const fetchData = async () => {
    const data = await getCrises()
    setCrises(data)
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id: string) => {
    if(confirm("Confirmer la suppression ?")) {
      await deleteCrisis(id)
      fetchData()
    }
  }

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
      <div className="flex justify-between items-center mb-10 border-b border-[#8E1616]/30 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic">CRISES ACTIVES</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-bold">Surveillance du territoire</p>
        </div>
        <button
          onClick={() => router.push('/admin/crisis/create')}
          className="bg-[#D84040] hover:bg-[#8E1616] text-white px-6 py-3 rounded-sm flex items-center gap-2 font-bold uppercase tracking-widest transition-all shadow-lg"
        >
          <Plus size={18} /> Nouvelle Alerte
        </button>
      </div>

      <div className="overflow-hidden rounded-sm border border-[#8E1616]/20 bg-[#1e2427]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#8E1616]/10 text-white uppercase text-[10px] tracking-[0.2em] border-b border-[#8E1616]/20">
              <th className="p-5 font-black">Identifiant / Titre</th>
              <th className="p-5 font-black">Statut</th>
              <th className="p-5 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8E1616]/10">
            {crises.map((c: any) => (
              <tr key={c._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={16} className={c.status === 'EN_COURS' ? 'text-[#D84040]' : 'text-gray-500'} />
                    <span className="font-bold text-white uppercase tracking-tight">{c.title}</span>
                  </div>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 text-[10px] font-black rounded-full border ${
                    c.status === 'EN_COURS' ? 'border-[#D84040] text-[#D84040] bg-[#D84040]/10' : 'border-gray-500 text-gray-500'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => router.push(`/admin/crisis/${c._id}`)} className="p-2 hover:bg-[#D84040] hover:text-white rounded-sm transition-all"><Eye size={16}/></button>
                    <button onClick={() => router.push(`/admin/crisis/${c._id}/edit`)} className="p-2 hover:bg-blue-600 hover:text-white rounded-sm transition-all"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(c._id)} className="p-2 hover:bg-red-800 hover:text-white rounded-sm transition-all text-[#8E1616]"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}