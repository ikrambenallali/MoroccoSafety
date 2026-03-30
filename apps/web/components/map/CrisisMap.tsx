'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import CrisisMarker from './CrisisMarker'
import { ShieldAlert, Layers, Filter } from 'lucide-react'
import { API_URL } from '@/utils/constants'

const moroccoBounds = L.latLngBounds(
  [21.0, -17.0],
  [36.0, -1.0]
)

const isInMorocco = (lat: number, lng: number) =>
  lat >= 21.0 && lat <= 36.0 && lng >= -17.0 && lng <= -1.0

export default function CrisisMap() {
  const [crises, setCrises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const loadCrises = async () => {
      try {
        const response = await fetch(`${API_URL}/crisis`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Échec /crisis ${response.status}`)
        const data = await response.json()
        const filtered = Array.isArray(data)
          ? data.filter((c: any) => {
            const zone = c.zone
            if (!zone || typeof zone.latitude !== 'number' || typeof zone.longitude !== 'number') return false
            return isInMorocco(zone.latitude, zone.longitude)
          })
          : []
        setCrises(filtered)
      } catch (err: any) {
        if (err.name !== 'AbortError') setError('Impossible de charger les crises.')
      } finally {
        setLoading(false)
      }
    }
    loadCrises()
    return () => controller.abort()
  }, [])

  return (
    <div className="relative h-full w-full bg-[#1e2427] overflow-hidden">

      {/* OVERLAY TACTIQUE : HEADER DE CARTE */}
      <div className="absolute z-1000 top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="bg-[#1e2427]/90 backdrop-blur-md border border-[#D84040]/30 p-4 shadow-2xl pointer-events-auto">
          <h2 className="text-white font-serif font-bold     tracking-tighter flex items-center gap-3">
            <ShieldAlert className="text-[#D84040]" size={20} />
            Surveillance Nationale
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] text-[#CCCCCC]/60 font-black   tracking-[0.2em]">Flux Live : Opérationnel</span>
          </div>
        </div>

        {/* FILTRES DE CARTE */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button className="bg-[#1e2427]/90 p-3 border border-[#D84040]/30 text-white hover:text-[#D84040] transition-colors">
            <Layers size={18} />
          </button>
          <button className="bg-[#1e2427]/90 p-3 border border-[#D84040]/30 text-white hover:text-[#D84040] transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* INDICATEURS D'ÉTAT */}
      {loading && (
        <div className="absolute z-2000 inset-0 bg-[#1e2427]/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D84040] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[10px] font-black   tracking-[0.4em] text-white">Synchronisation satellite...</p>
          </div>
        </div>
      )}

      {/* LA CARTE (STYLISEE VIA CSS) */}
      <div className="h-full w-full grayscale-[0.2] contrast-[1.1] invert-[0.05]">
        <MapContainer
          center={[31.7917, -7.0926]} // Centre du Maroc
          zoom={6}
          minZoom={5}
          maxBounds={moroccoBounds}
          maxBoundsViscosity={1.0}
          zoomControl={false} // On va le mettre à droite
          style={{ height: '100%', width: '100%', background: '#1e2427' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            // Utilisation d'un layer plus sombre (CartoDB Dark Matter) ou OSM standard
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {crises.map((crisis) => (
            <CrisisMarker key={crisis._id || crisis.id} crisis={crisis} />
          ))}
        </MapContainer>
      </div>

      {/* LEGENDE EN BAS A GAUCHE */}
      <div className="absolute z-1000 bottom-8 left-8 bg-[#1e2427]/95 border-l-4 border-[#D84040] p-4 shadow-2xl">
        <p className="text-[10px] font-black   tracking-widest text-white mb-2">Légende des Alertes</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_red]"></div>
            <span className="text-[9px] text-[#CCCCCC] font-bold  ">Critique / Haute</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_orange]"></div>
            <span className="text-[9px] text-[#CCCCCC] font-bold  ">Alerte / Moyenne</span>
          </div>
        </div>
      </div>
    </div>
  )
}