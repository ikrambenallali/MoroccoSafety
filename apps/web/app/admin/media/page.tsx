'use client'

import { useState, useEffect } from 'react'
import { uploadMedia, getAllMedias } from '@/services/mediaService'
import { Image as ImageIcon, UploadCloud, FileCode, ExternalLink, HardDrive, ShieldCheck } from 'lucide-react'

export default function MediaPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploadedMedias, setUploadedMedias] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMedias = async () => {
            try {
                const medias = await getAllMedias()
                setUploadedMedias(medias)
            } catch (error) {
                console.error('Error fetching medias:', error)
            }
        }
        fetchMedias()
    }, [])

    const handleUpload = async () => {
        if (!file) return
        setLoading(true)
        try {
            const data = await uploadMedia(file)
            setUploadedMedias([...uploadedMedias, data])
            setFile(null)
            // Utilisation d'un feedback plus propre que alert()
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC]">
            
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10 border-b border-[#8E1616]/30 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic uppercase flex items-center gap-4">
                        <HardDrive className="text-[#D84040]" size={36} /> 
                        Base de Médias
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-bold mt-1">
                        Stockage centralisé des preuves et documents
                    </p>
                </div>
            </div>

            {/* UPLOAD SECTION - Zone Tactique */}
            <div className="bg-[#1e2427] p-8 rounded-sm border border-[#8E1616]/20 shadow-2xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <UploadCloud size={120} />
                </div>
                
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
                    <UploadCloud size={16} className="text-[#D84040]" /> 
                    Nouveau Transfert de Fichier
                </h2>

                <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="flex-1 w-full">
                        <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#8E1616]/20 hover:border-[#D84040]/50 transition-all cursor-pointer bg-black/20">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="text-[#CCCCCC]/30 group-hover:text-[#D84040] mb-2 transition-colors" size={24} />
                                <p className="text-[10px] text-[#CCCCCC]/40 uppercase font-bold tracking-widest">
                                    {file ? file.name : "Sélectionner une image (JPG, PNG, WEBP)"}
                                </p>
                            </div>
                            <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="bg-[#D84040] hover:bg-[#8E1616] text-white px-8 py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] disabled:bg-gray-700 disabled:opacity-30 transition-all shadow-lg border border-white/10 shrink-0"
                    >
                        {loading ? 'Cryptage & Envoi...' : 'Exécuter l\'Upload'}
                    </button>
                </div>
            </div>

            {/* GALLERY SECTION */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-serif font-bold text-white italic uppercase flex items-center gap-3">
                        Archives Visuelles 
                        <span className="text-[10px] not-italic font-mono bg-[#D84040] px-2 py-0.5 rounded-sm">
                            {uploadedMedias.length} UNITÉS
                        </span>
                    </h2>
                    <div className="h-px flex-1 bg-[#8E1616]/20 ml-6"></div>
                </div>

                {uploadedMedias.length === 0 ? (
                    <div className="text-center py-20 border border-[#8E1616]/10 bg-black/10">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#CCCCCC]/20 font-bold italic">Archive vide - Aucun média détecté</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {uploadedMedias.map((media) => (
                            <div key={media._id} className="bg-[#1e2427] border border-[#8E1616]/20 rounded-sm overflow-hidden group hover:border-[#D84040]/50 transition-all shadow-lg">
                                {/* Image Container */}
                                <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                                    <img
                                        src={media.url}
                                        alt={media.filename}
                                        className="w-full h-full object-cover grayscale-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = 'https://via.placeholder.com/400x400?text=IMAGE+NOT+FOUND';
                                        }}
                                    />
                                    <div className="absolute top-2 right-2">
                                        <ShieldCheck size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>

                                {/* Info Container */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start gap-2">
                                        <FileCode size={14} className="text-[#D84040] mt-0.5" />
                                        <p className="text-[11px] font-mono text-[#CCCCCC] truncate uppercase tracking-tighter leading-tight" title={media.filename}>
                                            {media.filename}
                                        </p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-2 border-t border-[#8E1616]/10">
                                        <span className="text-[9px] font-mono text-[#CCCCCC]/30 uppercase">Ref: {media._id.slice(-8)}</span>
                                        {media.url && (
                                            <a
                                                href={media.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                Ouvrir <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer décoratif */}
            <div className="mt-12 text-center opacity-20">
                <p className="text-[8px] uppercase tracking-[0.8em] font-bold">MoroccoSafety Media Cloud Storage v2.0</p>
            </div>
        </div>
    )
}