'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarConfig } from '@/lib/sidebar'

type Props = {
    role: 'citizen' | 'authority' | 'admin' | undefined
}
type UserRole = 'citizen' | 'authority' | 'admin'

export default function Sidebar({ role }: Props) {
    const pathname = usePathname()
    const links = role ? sidebarConfig[role] : undefined
    // Style commun pour le container
    const sidebarStyles = "w-72 min-h-screen bg-[#1e2427] border-r-2 border-[#D84040] shadow-[4px_0_24px_rgba(216,64,64,0.4)] p-6 flex flex-col transition-all duration-300";

    if (!links || !role) {
        return (
            <aside className={sidebarStyles}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-[#8E1616] rounded-full animate-pulse"></div>
                    <h2 className="text-xl font-serif font-bold text-white tracking-widest">MoroccoSafety</h2>
                </div>
                <div className="text-[#CCCCCC]/50 italic text-sm animate-pulse">Initialisation du système...</div>
            </aside>
        )
    }

    return (
        <aside className={sidebarStyles}>
            {/* Header avec Logo */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-[#8E1616] rounded-sm flex items-center justify-center font-bold text-white italic border border-[#D84040]/50 shadow-[0_0_15px_rgba(142,22,22,0.4)]">
                    M
                </div>
                <div>
                    <h2 className="text-lg font-serif font-bold text-white leading-tight tracking-tighter">MoroccoSafety</h2>
                    <span className="text-[10px] text-[#D84040] font-bold uppercase tracking-widest">{role} panel</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#CCCCCC]/40 font-bold px-3 mb-4">Menu Principal</p>

                {links.map((item, index) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`group flex items-center gap-4 p-4 rounded-sm transition-all duration-200 relative
                                ${isActive
                                    ? 'bg-[#8E1616]/20 text-[#D84040] border-l-4 border-[#D84040]'
                                    : 'text-[#CCCCCC] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon
                                size={20}
                                className={`${isActive ? 'text-[#D84040]' : 'text-[#CCCCCC]/60 group-hover:text-[#D84040]'} transition-colors`}
                            />
                            <span className="text-sm font-bold uppercase tracking-widest leading-none">
                                {item.label}
                            </span>

                            {/* Petit indicateur visuel en hover */}
                            {!isActive && (
                                <div className="absolute right-4 w-1 h-1 bg-[#D84040] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer de Sidebar (Optionnel: État du système) */}
            <div className="mt-auto pt-6 border-t border-[#8E1616]/20">
                <div className="flex items-center gap-2 px-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] text-[#CCCCCC]/40 uppercase font-bold tracking-tighter italic">
                        Système Opérationnel
                    </span>
                </div>
            </div>
        </aside>
    )
}