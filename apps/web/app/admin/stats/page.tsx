'use client'

import { useEffect, useState } from 'react'
import {
    getOverview,
    getCrisisByType,
    getResolutionTime
} from '@/services/statsService'

import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Cell
} from 'recharts'

import { Activity, AlertCircle, FileText, Clock } from 'lucide-react'

export default function StatsPage() {
    const [overview, setOverview] = useState<any>({})
    const [crisisType, setCrisisType] = useState([])
    const [resolution, setResolution] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const o = await getOverview()
            const c = await getCrisisByType()
            const r = await getResolutionTime()

            setOverview(o)
            setCrisisType(c)
            setResolution(r)
        }
        fetchData()
    }, [])

    // Style commun pour les cartes de stats
    const statCardStyle = "bg-[#1e2427] border border-[#8E1616]/20 p-6 rounded-sm shadow-xl flex flex-col items-center justify-center relative overflow-hidden group";

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC] space-y-10">

            {/* Header */}
            <div className="border-b border-[#8E1616]/30 pb-6">
                <h1 className="text-4xl font-serif font-bold text-white tracking-tighter     flex items-center gap-4">
                    <Activity className="text-[#D84040]" size={36} />
                    Analyse des Données
                </h1>
                <p className="text-[10px]   tracking-[0.3em] text-[#D84040] font-bold mt-1">
                    Centre de monitoring national - Statistiques en temps réel
                </p>
            </div>

            {/* 🔥 OVERVIEW - Cartes Tactiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={statCardStyle}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D84040]"></div>
                    <AlertCircle className="text-[#D84040] mb-2 opacity-50" size={20} />
                    <h2 className="text-[10px]   tracking-[0.2em] font-black text-[#CCCCCC]/60">Total Crises</h2>
                    <p className="text-5xl font-serif font-bold text-white mt-2  ">{overview.crisis || 0}</p>
                </div>

                <div className={statCardStyle}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D84040]"></div>
                    <Activity className="text-[#D84040] mb-2 opacity-50" size={20} />
                    <h2 className="text-[10px]   tracking-[0.2em] font-black text-[#CCCCCC]/60">Alertes Actives</h2>
                    <p className="text-5xl font-serif font-bold text-white mt-2  ">{overview.alerts || 0}</p>
                </div>

                <div className={statCardStyle}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D84040]"></div>
                    <FileText className="text-[#D84040] mb-2 opacity-50" size={20} />
                    <h2 className="text-[10px]   tracking-[0.2em] font-black text-[#CCCCCC]/60">Rapports Citoyens</h2>
                    <p className="text-5xl font-serif font-bold text-white mt-2  ">{overview.reports || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 📊 CRISIS BY TYPE - Graphique Stylisé */}
                <div className="bg-[#1e2427] border border-[#8E1616]/20 p-8 shadow-2xl relative">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-serif font-bold text-white     tracking-tight">Répartition par Type</h2>
                        <div className="h-[1px] flex-1 bg-[#8E1616]/20 ml-4"></div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={crisisType}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#8E1616/10" vertical={false} />
                            <XAxis
                                dataKey="_id"
                                stroke="#CCCCCC"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#CCCCCC', fontWeight: 'bold' }}
                            />
                            <YAxis stroke="#CCCCCC" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(216, 64, 64, 0.1)' }}
                                contentStyle={{ backgroundColor: '#2B3337', border: '1px solid #8E1616', color: '#white' }}
                            />
                            <Bar dataKey="total" radius={[2, 2, 0, 0]}>
                                {crisisType.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#D84040' : '#8E1616'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* ⏱ RESOLUTION TIME - Graphique Stylisé */}
                <div className="bg-[#1e2427] border border-[#8E1616]/20 p-8 shadow-2xl relative">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-serif font-bold text-white     tracking-tight">Temps moyen de réponse</h2>
                        <Clock className="text-[#D84040] opacity-30" size={20} />
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={resolution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#8E1616/10" vertical={false} />
                            <XAxis
                                dataKey="_id"
                                stroke="#CCCCCC"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis stroke="#CCCCCC" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2B3337', border: '1px solid #D84040', color: '#white' }}
                            />
                            <Bar dataKey="resolutionTime" fill="#D84040" radius={[2, 2, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-[9px]   tracking-widest text-[#CCCCCC]/30 mt-4 text-center">Données exprimées en heures moyennes</p>
                </div>

            </div>

            {/* Footer décoratif Dashboard */}
            <div className="flex justify-center items-center gap-4 opacity-20">
                <div className="h-[1px] w-20 bg-[#D84040]"></div>
                <span className="text-[10px] font-black   tracking-[0.5em]">System Status: Nominal</span>
                <div className="h-[1px] w-20 bg-[#D84040]"></div>
            </div>
        </div>
    )
}