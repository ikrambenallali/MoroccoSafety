'use client'

// ============================================================
// hooks/useMap.ts
// ============================================================

import { useState, useCallback } from 'react'
import { Crisis, GeoZone, Report, CrisisSeverity, CrisisStatus, UserRole } from '@/types/map'
import { MOCK_CRISES, MOCK_ZONES, MOCK_REPORTS } from '@/lib/mockData'

interface MapFilters {
  severity: CrisisSeverity[]
  status: CrisisStatus[]
  type: string[]
  showReports: boolean
  showZones: boolean
  showHeatmap: boolean
  showResolved: boolean
}

const DEFAULT_FILTERS: MapFilters = {
  severity: ['critical', 'high', 'medium', 'low'],
  status: ['reported', 'validated', 'ongoing'],
  type: [],
  showReports: true,
  showZones: true,
  showHeatmap: false,
  showResolved: false,
}

export function useMap(userRole: UserRole = 'citizen') {
  const [crises, setCrises] = useState<Crisis[]>(MOCK_CRISES)
  const [zones] = useState<GeoZone[]>(MOCK_ZONES)
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)

  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS)
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Crises filtrées ──────────────────────────────────────
  const filteredCrises = crises.filter((crisis) => {
    if (!filters.severity.includes(crisis.severity)) return false
    if (!filters.showResolved && crisis.status === 'resolved') return false
    if (filters.type.length > 0 && !filters.type.includes(crisis.type)) return false
    return true
  })

  // ── Signalements visibles (autorité + admin uniquement) ──
  const visibleReports =
    (userRole === 'authority' || userRole === 'admin') && filters.showReports
      ? reports
      : []

  // ── Zones visibles ───────────────────────────────────────
  const visibleZones = filters.showZones ? zones : []

  // ── Actions ─────────────────────────────────────────────
  const selectCrisis = useCallback((crisis: Crisis | null) => {
    setSelectedCrisis(crisis)
    setSelectedReport(null)
    if (crisis) setSidebarOpen(true)
  }, [])

  const selectReport = useCallback((report: Report | null) => {
    setSelectedReport(report)
    setSelectedCrisis(null)
    if (report) setSidebarOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    setSelectedCrisis(null)
    setSelectedReport(null)
  }, [])

  const toggleFilter = useCallback(<K extends keyof MapFilters>(
    key: K,
    value: MapFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleSeverityFilter = useCallback((severity: CrisisSeverity) => {
    setFilters((prev) => ({
      ...prev,
      severity: prev.severity.includes(severity)
        ? prev.severity.filter((s) => s !== severity)
        : [...prev.severity, severity],
    }))
  }, [])

  // ── Actions autorité / admin ─────────────────────────────
  const validateReport = useCallback(async (reportId: string) => {
    if (userRole !== 'authority' && userRole !== 'admin') return
    // TODO: appel API → PATCH /reports/:id/validate
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'validated' as const } : r))
    )
  }, [userRole])

  const rejectReport = useCallback(async (reportId: string) => {
    if (userRole !== 'authority' && userRole !== 'admin') return
    // TODO: appel API → PATCH /reports/:id/reject
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'rejected' as const } : r))
    )
  }, [userRole])

  const closeCrisis = useCallback(async (crisisId: string) => {
    if (userRole !== 'authority' && userRole !== 'admin') return
    // TODO: appel API → PATCH /crisis/:id/close
    setCrises((prev) =>
      prev.map((c) =>
        c.id === crisisId
          ? { ...c, status: 'resolved' as const, updatedAt: new Date().toISOString() }
          : c
      )
    )
    setSelectedCrisis(null)
    setSidebarOpen(false)
  }, [userRole])

  return {
    // Données
    crises: filteredCrises,
    allCrises: crises,
    zones: visibleZones,
    reports: visibleReports,

    // État UI
    filters,
    selectedCrisis,
    selectedReport,
    sidebarOpen,

    // Actions
    selectCrisis,
    selectReport,
    closeSidebar,
    toggleFilter,
    toggleSeverityFilter,

    // Actions autorité/admin
    validateReport,
    rejectReport,
    closeCrisis,
  }
}