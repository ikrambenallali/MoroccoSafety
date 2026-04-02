'use client'

import 'leaflet/dist/leaflet.css'
// permet de charger un composant dynamiquement
import dynamic from 'next/dynamic'

const CrisisMap = dynamic(() => import('../../components/map/CrisisMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen bg-[#1e2427] flex items-center justify-center font-black text-[#D84040]   tracking-[1em]">
            Initialisation Radar...
        </div>
    )
})

export default function MapPage() {
    return (
        <div className="w-full h-screen bg-[#1e2427]">

            <CrisisMap />
        </div>
    )
}