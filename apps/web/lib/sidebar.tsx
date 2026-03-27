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
        {label :'Crisis' , icon: BarChart, href: '/citoyen/crisis'},
        { label: 'Carte', icon: Map, href: '/map' },
        { label: 'Signaler', icon: AlertTriangle, href: '/citoyen/report' },
        { label: 'Zones', icon: FileText, href: '/citoyen/zones' },
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
        { label: 'Dashboard', icon: Home, href: '/admin/stats' },
        { label: 'Crises', icon: AlertTriangle, href: '/admin/crisis' },
        { label: 'Utilisateurs', icon: Users, href: '/admin/users' },
        { label: 'Signalements', icon: FileText, href: '/admin/reports' },
        { label: 'Zones', icon: Map, href: '/admin/zones' },
        {label: 'alerte', icon: AlertTriangle, href: '/admin/alerts' },
        {label: 'medias', icon: FileText, href: '/admin/media' },
    ],
}