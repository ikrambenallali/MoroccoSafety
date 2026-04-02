'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createReport } from '@/services/reportService'
import { uploadMedia } from '@/services/mediaService'
import {
    AlertOctagon,
    MapPin,
    Navigation,
    Send,
    ChevronDown,
    ChevronUp,
    Globe,
    Loader2,
    CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'

export default function ReportPage() {
    const token = useSelector((state: any) => state.auth.token)

    const [description, setDescription] = useState('')
    const [location, setLocation] = useState<any>(null)
    const [manualLocation, setManualLocation] = useState({ latitude: '', longitude: '' })
    const [useManualLocation, setUseManualLocation] = useState(false)
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [error, setError] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const getLocation = () => {
        setLocationLoading(true)
        setError('')

        if (!navigator.geolocation) {
            setError('La géolocalisation n\'est pas supportée par votre navigateur')
            setLocationLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
                setLocationLoading(false)
                toast.success("Position GPS verrouillée")
            },
            (err) => {
                let errorMessage = ' Erreur : '
                switch (err.code) {
                    case err.PERMISSION_DENIED: errorMessage += 'Permission refusée'; break
                    case err.POSITION_UNAVAILABLE: errorMessage += 'GPS indisponible'; break
                    case err.TIMEOUT: errorMessage += 'Temps d\'attente dépassé'; break
                    default: errorMessage += 'Erreur inconnue'; break
                }
                setError(errorMessage)
                setLocationLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    const handleManualLocationSubmit = () => {
        const lat = parseFloat(manualLocation.latitude)
        const lng = parseFloat(manualLocation.longitude)

        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            setError('Coordonnées GPS invalides')
            return
        }

        setLocation({ latitude: lat, longitude: lng })
        setError('')
    }
    const handleSubmit = async () => {
        if (!description.trim() || !location) return

        setLoading(true)

        try {
            let mediaId = null

            //  upload image d'abord
            if (file) {
                const media = await uploadMedia(file)
                mediaId = media._id
            }

            const reportData = {
                description: description.trim(),
                location: {
                    type: 'Point',
                    coordinates: [location.longitude, location.latitude]
                },
                mediaId 
            }

            await createReport(reportData, token)

            setDescription('')
            setLocation(null)
            setFile(null)
            setPreview(null)

            toast.success("Signalement transmis avec succès 🚀")

        } catch (err: any) {
            setError(err.response?.data?.message || 'Échec de la transmission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 md:p-8 bg-[#2B3337] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl bg-[#1e2427] border border-[#8E1616]/30 shadow-2xl rounded-sm overflow-hidden">

                {/* Header d'alerte */}
                <div className="bg-[#8E1616] p-6 flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full animate-pulse">
                        <AlertOctagon className="text-white" size={32} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white   tracking-tighter  ">
                            Signalement d'Urgence
                        </h1>
                        <p className="text-[10px] text-white/70 font-bold   tracking-widest">
                            Canal Sécurisé • Transmission Immédiate
                        </p>
                    </div>
                </div>

                <div className="p-6 md:p-10 space-y-8">
                    {/* Error Banner */}
                    {error && (
                        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 animate-in slide-in-from-left">
                            <p className="text-red-500 text-xs font-bold    ">{error}</p>
                        </div>
                    )}

                    {/* Zone de saisie */}
                    <div className="space-y-2">
                        <label className="text-[10px]   font-black text-[#D84040] tracking-widest">
                            Description de l'incident
                        </label>
                        <textarea
                            placeholder="Nature de l'urgence, blessés, dangers immédiats..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 p-4 text-white placeholder:text-white/10 focus:border-[#D84040] outline-none transition-all rounded-sm min-h-30 text-sm  "
                        />
                    </div>

                    {/* Localisation */}
                    <div className="space-y-4">
                        <label className="text-[10px]   font-black text-[#D84040] tracking-widest block">
                            Coordonnées de l'incident
                        </label>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={getLocation}
                                disabled={locationLoading || loading}
                                className="flex-1 flex items-center justify-center gap-3 bg-[#1e2427] border border-white/10 hover:border-[#D84040] text-white py-4 px-6 transition-all group"
                            >
                                {locationLoading ? (
                                    <Loader2 className="animate-spin text-[#D84040]" size={18} />
                                ) : (
                                    <Navigation className="group-hover:text-[#D84040] transition-colors" size={18} />
                                )}
                                <span className="text-[10px] font-black   tracking-widest">
                                    Localisation Auto
                                </span>
                            </button>

                            <button
                                onClick={() => setUseManualLocation(!useManualLocation)}
                                className={`flex-1 flex items-center justify-center gap-3 border py-4 px-6 transition-all ${useManualLocation ? 'bg-[#D84040] border-[#D84040]' : 'bg-transparent border-white/10'
                                    }`}
                            >
                                <Globe size={18} className="text-white" />
                                <span className="text-[10px] font-black   tracking-widest text-white">
                                    Saisie Manuelle
                                </span>
                                {useManualLocation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        </div>

                        {/* Saisie Manuelle Expandable */}
                        {useManualLocation && (
                            <div className="grid grid-cols-2 gap-4 p-4 bg-black/20 border border-white/5 animate-in fade-in zoom-in-95">
                                <input
                                    type="number"
                                    placeholder="LATITUDE"
                                    value={manualLocation.latitude}
                                    onChange={(e) => setManualLocation(p => ({ ...p, latitude: e.target.value }))}
                                    className="bg-transparent border-b border-white/10 p-2 text-white font-mono text-xs outline-none focus:border-[#D84040]"
                                />
                                <input
                                    type="number"
                                    placeholder="LONGITUDE"
                                    value={manualLocation.longitude}
                                    onChange={(e) => setManualLocation(p => ({ ...p, longitude: e.target.value }))}
                                    className="bg-transparent border-b border-white/10 p-2 text-white font-mono text-xs outline-none focus:border-[#D84040]"
                                />
                                <button
                                    onClick={handleManualLocationSubmit}
                                    className="col-span-2 text-[9px] font-black   tracking-widest text-[#D84040] hover:text-white transition-colors"
                                >
                                    Appliquer les coordonnées
                                </button>
                            </div>
                        )}

                        {/* Position validée */}
                        {location && (
                            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                                <CheckCircle2 className="text-green-500" size={20} />
                                <div>
                                    <p className="text-[9px] font-black   text-green-500 tracking-widest">Cible Verrouillée</p>
                                    <p className="text-[10px] font-mono text-white/60">
                                        GPS: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px]   font-black text-[#D84040] tracking-widest">
                            Photo (optionnel)
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const selectedFile = e.target.files?.[0]
                                if (selectedFile) {
                                    setFile(selectedFile)
                                    setPreview(URL.createObjectURL(selectedFile))
                                }
                            }}
                            className="text-white text-xs"
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-40 object-cover border border-white/10"
                            />
                        )}
                    </div>
                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !description.trim() || !location}
                        className="w-full bg-[#D84040] hover:bg-[#8E1616] disabled:bg-gray-800 disabled:opacity-50 text-white py-6 font-black   tracking-[0.4em] transition-all flex items-center justify-center gap-4 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                                Envoyer le Rapport
                            </>
                        )}
                    </button>
                </div>

                <div className="p-4 bg-black/40 text-center">
                    <p className="text-[8px] text-white/20   font-bold tracking-[0.5em]">
                        Usage strictement réservé aux situations réelles d'urgence
                    </p>
                </div>
            </div>
        </div>
    )
}