'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Download, Trash2 } from 'lucide-react'
import { API_URL } from '@/utils/constants'

export default function MediaDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const [media, setMedia] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const res = await fetch(`${API_URL}/media/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setMedia(data)
                }
            } catch (err) {
                console.error('Erreur chargement média:', err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchMedia()
        }
    }, [id])

    if (loading) {
        return (
            <div className="p-8 bg-[#2B3337] min-h-screen flex items-center justify-center text-white">
                Chargement du média...
            </div>
        )
    }

    if (!media) {
        return (
            <div className="p-8 bg-[#2B3337] min-h-screen text-white">
                <button
                    onClick={() => router.back()}
                    className="text-blue-400 flex items-center gap-2 mb-4"
                >
                    <ArrowLeft size={18} /> Retour
                </button>
                <p>Média non trouvé</p>
            </div>
        )
    }

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
            <button
                onClick={() => router.back()}
                className="text-blue-400 hover:text-white flex items-center gap-2 mb-8"
            >
                <ArrowLeft size={18} /> Retour à la galerie
            </button>

            <div className="bg-[#1e2427] border border-[#8E1616]/20 rounded-lg overflow-hidden shadow-2xl max-w-4xl">
                <div className="aspect-video bg-black flex items-center justify-center">
                    <img
                        src={`${API_URL}/uploads/${media.filename}`}
                        alt={media.filename}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-white mb-4">{media.filename}</h1>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                            <p className="text-[#CCCCCC]/60">Taille</p>
                            <p className="text-white font-mono">{(media.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <div>
                            <p className="text-[#CCCCCC]/60">Type</p>
                            <p className="text-white font-mono">{media.mimetype}</p>
                        </div>
                        <div>
                            <p className="text-[#CCCCCC]/60">Uploadé le</p>
                            <p className="text-white">{new Date(media.uploadedAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                            <p className="text-[#CCCCCC]/60">ID</p>
                            <p className="text-white font-mono text-xs">{media._id}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                            <Download size={18} /> Télécharger
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                            <Trash2 size={18} /> Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
