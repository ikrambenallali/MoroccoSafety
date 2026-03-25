'use client'

import { useEffect, useState } from 'react'
import { getUsers, updateUserRole } from '@/services/userService'
import { Users, ShieldCheck, UserCog, UserCircle } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, role: string) => {
    if(confirm(`⚠️ Modifier l'accréditation de cet utilisateur vers : ${role.toUpperCase()} ?`)) {
        await updateUserRole(userId, role)
        fetchUsers()
    }
  }

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 border-b border-[#8E1616]/30 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic uppercase flex items-center gap-4">
            <Users className="text-[#D84040]" size={36} /> 
            Contrôle des Accès
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-bold mt-1">
            Gestion des privilèges et des rôles utilisateurs
          </p>
        </div>
        <div className="text-right">
            <span className="text-xs font-mono text-white/40">Total Utilisateurs: {users.length}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-sm border border-[#8E1616]/20 bg-[#1e2427] shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#8E1616]/10 text-white uppercase text-[10px] tracking-[0.2em] border-b border-[#8E1616]/20">
              <th className="p-5 font-black">Utilisateur</th>
              <th className="p-5 font-black">Contact / Email</th>
              <th className="p-5 font-black">Niveau de Privilège</th>
              <th className="p-5 font-black text-right">Modifier l'Accès</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8E1616]/10">
            {users.map((u: any) => (
              <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                {/* Nom + Avatar simulé */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <UserCircle size={24} className="text-[#CCCCCC]/30 group-hover:text-[#D84040] transition-colors" />
                    <span className="font-bold text-white uppercase tracking-tight text-sm">{u.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="p-5">
                  <span className="text-sm font-mono text-[#CCCCCC]/60">{u.email}</span>
                </td>

                {/* Badge de Rôle */}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    {u.role === 'admin' && <ShieldCheck size={14} className="text-[#D84040]" />}
                    {u.role === 'autorité' && <UserCog size={14} className="text-blue-400" />}
                    <span className={`px-3 py-1 text-[10px] font-black rounded-sm border uppercase ${
                        u.role === 'admin' ? 'border-[#D84040] text-[#D84040] bg-[#D84040]/5' :
                        u.role === 'autorité' ? 'border-blue-400 text-blue-400 bg-blue-400/5' :
                        'border-gray-600 text-gray-600'
                    }`}>
                        {u.role}
                    </span>
                  </div>
                </td>

                {/* Sélecteur de rôle tactique */}
                <td className="p-5 text-right">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="bg-[#2B3337] border border-[#8E1616]/40 text-[#CCCCCC] text-[10px] font-bold uppercase tracking-widest p-2 outline-none focus:border-[#D84040] transition-all cursor-pointer rounded-sm"
                  >
                    <option value="citoyen">Citoyen</option>
                    <option value="autorité">Autorité</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Légende */}
      <div className="mt-6 flex gap-8 justify-center opacity-30">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#D84040]"></div> Admin
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-2 h-2 bg-blue-400"></div> Autorité
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-2 h-2 bg-gray-600"></div> Citoyen
          </div>
      </div>
    </div>
  )
}