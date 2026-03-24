'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { LogOut, Bell, ShieldAlert } from 'lucide-react' // Import d'icones pour le look "Dashboard"

export default function Navbar() {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }

    return (
        <nav className="bg-[#D84040] text-white h-16 px-8 flex justify-between items-center shadow-[0_4px_20px_rgba(216,64,64,0.25)] z-40 relative">

            {/* Côté Gauche : Indicateur de statut */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    <ShieldAlert size={16} className="text-white animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Système de Vigilance Actif</span>
                </div>
            </div>

            {/* Côté Droit : Actions Utilisateur */}
            <div className="flex items-center gap-6">

                {/* Icône de notification stylisée */}
                <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors group">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#8E1616] border-2 border-[#D84040] rounded-full"></span>
                </button>

                <div className="h-8 w-[1px] bg-white/20 mx-2"></div>

                {/* Bouton Logout Amélioré */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#8E1616] hover:bg-black/20 px-4 py-2 rounded-sm text-xs uppercase tracking-[0.2em] font-black transition-all duration-300 border border-white/10 shadow-lg group"
                >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </nav>
    )
}