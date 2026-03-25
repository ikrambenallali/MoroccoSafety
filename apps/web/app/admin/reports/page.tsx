'use client'

import { useEffect, useState } from 'react'
import {
  getReports,
  validateReport,
  rejectReport
} from '@/services/reportService'
import { FileText, CheckCircle, XCircle, User, Clock, AlertTriangle } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  pending:  'text-[#D84040] bg-[#D84040]/10 border border-[#D84040]/30',
  validated:'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30',
  rejected: 'text-[#CCCCCC]/40 bg-[#CCCCCC]/5 border border-[#CCCCCC]/10',
}

const STATUS_LABELS: Record<string, string> = {
  pending:   'En attente',
  validated: 'Validé',
  rejected:  'Rejeté',
}

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const fetchReports = async () => {
    const data = await getReports()
    setReports(data)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleValidate = async (id: string) => {
    setLoadingId(id)
    await validateReport(id)
    await fetchReports()
    setLoadingId(null)
  }

  const handleReject = async (id: string) => {
    setLoadingId(id)
    await rejectReport(id)
    await fetchReports()
    setLoadingId(null)
  }

  return (
    <div className="p-8 bg-[#2B3337] min-h-screen text-[#CCCCCC] space-y-10">

      {/* Header */}
      <div className="border-b border-[#8E1616]/30 pb-6">
        <h1 className="text-4xl font-serif font-bold text-white tracking-tighter italic uppercase flex items-center gap-4">
          <FileText className="text-[#D84040]" size={36} />
          Rapports Citoyens
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D84040] font-bold mt-1">
          Centre de monitoring national — Gestion des signalements
        </p>
      </div>

   

      {/* Table */}
      <div className="bg-[#1e2427] border border-[#8E1616]/20 shadow-2xl overflow-hidden">

        {/* Table header */}
        <div className="grid grid-cols-[1fr_2fr_140px_180px] border-b border-[#8E1616]/20 px-6 py-3">
          {['Utilisateur', 'Description', 'Statut', 'Actions'].map((col) => (
            <span
              key={col}
              className="text-[9px] uppercase tracking-[0.3em] font-black text-[#CCCCCC]/40"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-30">
            <AlertTriangle size={28} className="text-[#D84040]" />
            <p className="text-[11px] uppercase tracking-widest font-black">Aucun rapport disponible</p>
          </div>
        ) : (
          reports.map((r: any, index: number) => {
            const isLoading = loadingId === r._id
            const statusKey = r.status as string
            const statusStyle = STATUS_STYLES[statusKey] ?? STATUS_STYLES.pending
            const statusLabel = STATUS_LABELS[statusKey] ?? r.status

            return (
              <div
                key={r._id}
                className={`
                  grid grid-cols-[1fr_2fr_140px_180px] items-center px-6 py-5
                  border-b border-[#8E1616]/10 last:border-0
                  transition-colors duration-200
                  ${isLoading ? 'opacity-40 pointer-events-none' : 'hover:bg-[#8E1616]/5'}
                `}
              >
                {/* User */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-sm bg-[#8E1616]/20 border border-[#8E1616]/30 flex items-center justify-center flex-shrink-0">
                    <User size={12} className="text-[#D84040]" />
                  </div>
                  <span className="text-[13px] font-bold text-white truncate">
                    {r.userId?.name || 'Inconnu'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12px] text-[#CCCCCC]/70 leading-relaxed pr-6 line-clamp-2">
                  {r.description}
                </p>

                {/* Status badge */}
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-black rounded-sm ${statusStyle}`}>
                    <Clock size={9} />
                    {statusLabel}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleValidate(r._id)}
                    disabled={isLoading || statusKey === 'validated'}
                    className="
                      flex items-center gap-1.5 px-3 py-1.5
                      text-[9px] uppercase tracking-[0.2em] font-black
                      text-emerald-400 border border-emerald-400/30
                      hover:bg-emerald-400/10 hover:border-emerald-400/60
                      disabled:opacity-20 disabled:cursor-not-allowed
                      transition-all duration-150 rounded-sm
                    "
                  >
                    <CheckCircle size={11} />
                    Valider
                  </button>

                  <button
                    onClick={() => handleReject(r._id)}
                    disabled={isLoading || statusKey === 'rejected'}
                    className="
                      flex items-center gap-1.5 px-3 py-1.5
                      text-[9px] uppercase tracking-[0.2em] font-black
                      text-[#D84040] border border-[#D84040]/30
                      hover:bg-[#D84040]/10 hover:border-[#D84040]/60
                      disabled:opacity-20 disabled:cursor-not-allowed
                      transition-all duration-150 rounded-sm
                    "
                  >
                    <XCircle size={11} />
                    Rejeter
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Footer décoratif */}
      <div className="flex justify-center items-center gap-4 opacity-20">
        <div className="h-[1px] w-20 bg-[#D84040]" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Reports Module: Active</span>
        <div className="h-[1px] w-20 bg-[#D84040]" />
      </div>

    </div>
  )
}