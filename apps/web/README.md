This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# 🗺️ CrisAlert — Module Carte avec Leaflet (100% Gratuit)

## ✅ Pourquoi Leaflet ?
- **100% gratuit** — pas de token, pas de compte requis
- **OpenStreetMap** — tuiles gratuites et open source
- **react-leaflet** — intégration officielle avec React
- Très utilisé en production (Wikipedia, Wikimedia, etc.)

---

## 📦 Installation (3 packages seulement)

```bash
npm install leaflet react-leaflet @types/leaflet
```

---

## ⚙️ Configuration globale

### 1. Ajoute le CSS Leaflet dans `app/layout.tsx`

```tsx
// app/layout.tsx
import 'leaflet/dist/leaflet.css'
```

### 2. Corrige l'icône par défaut de Leaflet (bug connu avec Next.js)

Ajoute ce code dans un fichier `lib/leafletFix.ts` et importe-le dans ton layout :

```ts
// lib/leafletFix.ts
import L from 'leaflet'

// Fix le bug des icônes manquantes avec Webpack/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
```

### 3. Chargement dynamique OBLIGATOIRE (pas de SSR)

```tsx
// app/map/page.tsx
import dynamic from 'next/dynamic'

const CrisisMap = dynamic(
  () => import('@/components/map/CrisisMap'),
  { ssr: false }  // ← OBLIGATOIRE, Leaflet utilise window/document
)
```

---

## 🎨 Tuiles disponibles (toutes gratuites)

```tsx
{/* Standard (clair) */}
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

{/* Sombre — CartoDB Dark */}
<TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

{/* Sombre — CartoDB Dark (sans labels) */}
<TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />

{/* Satellite — ESRI (gratuit) */}
<TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

{/* Topographique */}
<TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
```

> 💡 **Recommandation pour CrisAlert** : utilise CartoDB Dark pour un rendu professionnel sombre

---

## 📁 Structure des fichiers

```
├── app/
│   └── map/
│       └── page.tsx               ← dynamic() import + ssr:false obligatoire
│
├── components/
│   └── map/
│       ├── CrisisMap.tsx          ← Composant principal Leaflet
│       ├── MapFilters.tsx         ← Filtres (inchangé)
│       └── MapTopBar.tsx          ← Barre supérieure (inchangé)
│
├── hooks/
│   └── useMap.ts                  ← Hook état (inchangé)
│
├── types/
│   └── map.ts                     ← Types (inchangé)
│
└── lib/
    ├── mockData.ts                ← Données test (inchangé)
    └── leafletFix.ts              ← Fix icônes Leaflet + Next.js
```

---

## 🔌 Connexion API NestJS

```ts
// hooks/useMap.ts — remplace le mockData par :
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const { data: crises = [] } = useQuery({
  queryKey: ['crises'],
  queryFn: () => axios.get('/crisis').then(r => r.data),
  refetchInterval: 30_000, // refresh toutes les 30s
})
```

---

## 🚀 Prochaines étapes

- [ ] Remplacer mockData par les appels API NestJS
- [ ] Ajouter dessin de zones avec `leaflet-draw`
  ```bash
  npm install leaflet-draw @types/leaflet-draw
  ```
- [ ] WebSocket temps réel (nouvelle crise → marker qui apparaît)
- [ ] Formulaire signalement au clic sur la carte (citoyen)
- [ ] Géolocalisation → centrer sur l'utilisateur au démarrage
