'use client'

import { Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { AlertTriangle, Clock, MapPin } from 'lucide-react'

export default function CrisisMarker({ crisis, isUser = false }: any) {
  let lat = crisis?.zone?.latitude || (crisis?.zone?.coordinates ? crisis.zone.coordinates[1] : null)
  let lng = crisis?.zone?.longitude || (crisis?.zone?.coordinates ? crisis.zone.coordinates[0] : null)

  if (!lat || !lng) return null
  const position: [number, number] = [lat, lng]

  const getColor = () => {
    if (isUser) return 'blue'
    const sev = crisis.severity?.toLowerCase()
    if (sev === 'high') return 'red'
    if (sev === 'medium') return 'orange'
    return 'yellow'
  }

  const icon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getColor()}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <>
      <Marker position={position} icon={icon}>
        <Popup className="custom-tactical-popup">
          <div className="min-w-50 bg-[#1e2427] text-[#CCCCCC] p-1 font-sans">
            <div className={`flex items-center gap-2 border-b border-white/10 pb-2 mb-2 ${getColor() === 'red' ? 'text-red-500' : 'text-orange-500'}`}>
              <AlertTriangle size={14} />
              <h3 className="font-black   tracking-tighter  ">{crisis.title}</h3>
            </div>

            <p className="text-[11px] leading-relaxed   mb-3">"{crisis.description}"</p>

            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
              <div className="flex flex-col">
                <span className="text-[8px]   text-white/30 font-bold">Priorité</span>
                <span className="text-[9px] font-black  ">{crisis.severity}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px]   text-white/30 font-bold">État</span>
                <span className="text-[9px] font-black   text-green-500">{crisis.status}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-white/20">
              <span className="flex items-center gap-1"><MapPin size={8} /> {lat.toFixed(3)}, {lng.toFixed(3)}</span>
              <span className="flex items-center gap-1"><Clock size={8} /> LIVE</span>
            </div>
          </div>
        </Popup>
      </Marker>

      {crisis.zone?.radius && (
        <Circle
          center={position}
          radius={crisis.zone.radius}
          pathOptions={{
            color: getColor() === 'red' ? '#D84040' : '#f97316',
            fillColor: getColor() === 'red' ? '#D84040' : '#f97316',
            fillOpacity: 0.1,
            weight: 2
          }}
        />
      )}
    </>
  )
}