'use client'

import { useEffect, useState } from 'react'
import { getZones } from '@/services/zoneService'
import { Map, MapPin, Plus, Globe, Layers } from 'lucide-react'

export default function ZonesPage() {
    const [zones, setZones] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const data = await getZones()
            setZones(data)
        }
        fetch()
    }, [])

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">

            {/* HEADER TACTIQUE */}
            <div className="flex justify-between items-center mb-10 border-b border-[#8E1616]/30 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-white tracking-tighter     flex items-center gap-4">
                        <Map className="text-[#D84040]" size={36} />
                        Zones Périmétrales
                    </h1>
                    <p className="text-[10px]   tracking-[0.3em] text-[#D84040] font-bold mt-1">
                        Cartographie des secteurs sous surveillance
                    </p>
                </div>


            </div>

            {/* TABLEAU DES ZONES */}
            <div className="overflow-x-auto rounded-sm border border-[#8E1616]/20 bg-[#1e2427] shadow-2xl">
                <table className="w-full min-w-[800px] text-left border-collapse">
                    <thead>
                        <tr className="bg-[#8E1616]/10 text-white   text-[10px] tracking-[0.2em] border-b border-[#8E1616]/20">
                            <th className="p-5 font-black">Nom du Secteur</th>
                            <th className="p-5 font-black">Type Géométrique</th>
                            <th className="p-5 font-black">Point d'Entrée (Lat, Long)</th>
                            <th className="p-5 font-black">Incident Associé</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#8E1616]/10">
                        {zones.map((z: any) => {
                            const firstCoord = z.geometry?.coordinates?.[0]?.[0];
                            const coordDisplay = firstCoord
                                ? `${firstCoord[1].toFixed(4)}°N, ${firstCoord[0].toFixed(4)}°E`
                                : 'COORD_PENDING';

                            return (
                                <tr key={z._id} className="hover:bg-white/5 transition-colors group">
                                    {/* NOM */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-black/20 rounded-sm">
                                                <MapPin size={14} className="text-[#D84040]" />
                                            </div>
                                            <span className="font-bold text-white   tracking-tight text-sm">
                                                {z.name || 'SECTEUR_ANONYME'}
                                            </span>
                                        </div>
                                    </td>

                                    {/* TYPE */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#CCCCCC]/60  ">
                                            <Layers size={12} />
                                            {z.geometry?.type || 'N/A'}
                                        </div>
                                    </td>

                                    {/* COORDONNÉES */}
                                    <td className="p-5 font-mono text-xs text-[#D84040]">
                                        {coordDisplay}
                                    </td>

                                    {/* CRISE */}
                                    <td className="p-5">
                                        {z.crisisId ? (
                                            <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#8E1616]/10 border border-[#8E1616]/40 text-[#D84040] text-[10px] font-black  ">
                                                <Globe size={10} />
                                                {z.crisisId.title}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-white/20   font-bold tracking-widest">Zone Libre</span>
                                        )}
                                    </td>


                                </tr>
                            );
                        })}

                        {zones.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-20 text-center">
                                    <p className="text-[10px]   tracking-[0.4em] text-white/20 font-bold  ">
                                        Aucun périmètre cartographié pour le moment
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* FOOTER TECHNIQUE */}
            <div className="mt-6 flex justify-between items-center px-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#D84040] rounded-full shadow-[0_0_8px_#3b82f6]"></div>
                    <span className="text-[9px]   font-bold tracking-widest text-white/40">Projection: WGS 84 / Pseudo-Mercator</span>
                </div>
            </div>
        </div>
    )
}