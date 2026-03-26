// src/lib/sidebar.ts
import {
    Home,
    Map,
    AlertTriangle,
    FileText,
    Users,
    BarChart,
    Settings
} from 'lucide-react'

export const sidebarConfig = {
    citizen: [
        { label: 'Dashboard', icon: Home, href: '/dashboard' },
        { label: 'Carte', icon: Map, href: '/map' },
        { label: 'Signaler', icon: AlertTriangle, href: '/reports/new' },
        { label: 'Mes signalements', icon: FileText, href: '/reports' },
        { label: 'Profil', icon: Settings, href: '/profile' },
    ],

    authority: [
        { label: 'Dashboard', icon: Home, href: '/dashboard' },
        { label: 'Carte', icon: Map, href: '/map' },
        { label: 'Crises', icon: AlertTriangle, href: '/crises' },
        { label: 'Alertes', icon: FileText, href: '/alerts' },
        { label: 'Signalements', icon: FileText, href: '/reports' },
    ],

    admin: [
        { label: 'Dashboard', icon: Home, href: '/dashboard' },
        { label: 'Crises', icon: AlertTriangle, href: '/admin/crisis' },
        { label: 'Utilisateurs', icon: Users, href: '/admin/users' },
        { label: 'Stats', icon: BarChart, href: '/admin/stats' },
        { label: 'Signalements', icon: FileText, href: '/admin/reports' },
        { label: 'Zones', icon: Map, href: '/admin/zones' },
        {label: 'alerte', icon: AlertTriangle, href: '/admin/alerts' },
        {label: 'medias', icon: FileText, href: '/admin/media' },
    ],
}