# MoroccoSafety

Plateforme web de gestion et de suivi des crises au Maroc. MoroccoSafety permet aux citoyens de signaler des situations de crise, aux autorités de suivre et traiter les signalements, et aux administrateurs de superviser les utilisateurs, les zones et les statistiques.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement en local](#lancement-en-local)
- [API](#api)
- [Structure du projet](#structure-du-projet)
- [Docker](#docker)
- [Déploiement Render](#déploiement-render)
- [Tests et qualité](#tests-et-qualité)
- [Dépannage](#dépannage)

## Fonctionnalités

- Inscription et connexion avec authentification JWT.
- Attribution des rôles `admin`, `authority` et `citizen`.
- Gestion du profil utilisateur.
- Création, consultation, validation, rejet et clôture des crises et signalements.
- Visualisation géographique des crises avec Leaflet et OpenStreetMap/CartoDB.
- Gestion des zones géographiques.
- Téléversement et consultation de médias associés aux signalements.
- Alertes et notifications.
- Statistiques globales et statistiques par type de crise.
- Communication temps réel avec Socket.IO.
- Interfaces dédiées aux espaces citoyen, autorité, administrateur et autres rôles métier.

## Architecture

Le projet est organisé comme un monorepo npm composé de deux applications :

```text
MoroccoSafety/
├── apps/
│   ├── api/    # Backend NestJS, port 3000
│   └── web/    # Frontend Next.js, port 3001
├── docker-compose.yaml
├── render.yaml
└── package.json
```

Le frontend appelle l’API avec `NEXT_PUBLIC_API_URL`. En local, le frontend est disponible sur `http://localhost:3001` et l’API sur `http://localhost:3000`.

## Technologies

### Frontend

- Next.js 16 avec App Router
- React 19 et TypeScript
- Redux Toolkit pour l’état d’authentification
- Axios et React Query pour les appels et données distantes
- Tailwind CSS
- Leaflet et React Leaflet pour la carte
- Socket.IO Client pour le temps réel
- Recharts pour les graphiques
- React Hook Form et Zod pour les formulaires
- Lucide React pour les icônes

### Backend

- NestJS 11 avec TypeScript
- MongoDB avec Mongoose
- JWT et Passport pour l’authentification
- bcrypt pour le chiffrement des mots de passe
- Socket.IO via l’intégration WebSocket NestJS
- Multer pour les téléversements de fichiers
- Jest et Supertest pour les tests

## Prérequis

- Node.js 20 ou une version compatible
- npm
- MongoDB local ou MongoDB Atlas
- Docker et Docker Compose, uniquement pour le lancement conteneurisé

## Installation

Depuis la racine du projet :

```bash
npm install
```

Les applications possèdent aussi leurs propres dépendances. Si nécessaire, installez-les séparément :

```bash
cd apps/api
npm install

cd ../web
npm install
```

## Configuration

### Frontend

Le fichier `apps/web/.env` contient la configuration locale :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

`NEXT_PUBLIC_API_URL` doit être l’URL accessible par le navigateur. Après toute modification, redémarrez Next.js.

### Backend

Le backend utilise les variables suivantes :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/moroccosafety
JWT_SECRET=changez-cette-valeur-en-production
NODE_ENV=development
```

Pour MongoDB Atlas, remplacez `MONGO_URI` par votre chaîne de connexion Atlas. Ne commitez jamais une URI MongoDB ou un secret JWT contenant des identifiants réels.

## Lancement en local

Ouvrez deux terminaux.

### Terminal 1 : API

```bash
cd apps/api
npm run start:dev
```

L’API démarre sur `http://localhost:3000`.

### Terminal 2 : frontend

```bash
cd apps/web
npm run dev
```

Le script utilise explicitement le port `3001`. Ouvrez ensuite `http://localhost:3001`.

Le premier utilisateur inscrit reçoit le rôle `admin`. Les utilisateurs suivants reçoivent par défaut le rôle `citizen`, sauf si un rôle est fourni par le flux autorisé de l’application.

## API

Les routes principales exposées par NestJS sont :

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/auth/register` | Inscription |
| `POST` | `/auth/login` | Connexion |
| `GET` | `/auth/me` | Profil de l’utilisateur connecté |
| `GET` / `PUT` | `/users/profile` | Consulter ou modifier son profil |
| `GET` | `/users` | Consulter les utilisateurs |
| `PUT` | `/users/role` | Modifier un rôle |
| `POST` / `GET` | `/crisis` | Créer ou lister les crises |
| `GET` / `PUT` / `DELETE` | `/crisis/:id` | Consulter, modifier ou supprimer une crise |
| `PATCH` | `/crisis/:id/close` | Clôturer une crise |
| `POST` / `GET` | `/alerts` | Créer ou lister les alertes |
| `POST` | `/alerts/:id/send` | Envoyer une alerte |
| `GET` | `/alerts/sent` | Lister les alertes envoyées |
| `POST` / `GET` | `/zones` | Créer ou lister les zones |
| `GET` | `/zones/:id` | Consulter une zone |
| `POST` / `GET` | `/reports` | Créer ou lister les signalements |
| `PATCH` | `/reports/:id/validate` | Valider un signalement |
| `PATCH` | `/reports/:id/reject` | Rejeter un signalement |
| `POST` | `/media/upload` | Téléverser un média |
| `GET` | `/media` | Lister les médias |
| `GET` | `/media/:id` | Consulter un média |
| `GET` | `/stats/overview` | Vue d’ensemble des statistiques |
| `GET` | `/stats/crisis-by-type` | Statistiques par type de crise |

Les routes protégées utilisent l’en-tête suivant :

```http
Authorization: Bearer <JWT>
```

Les fichiers téléversés sont servis depuis `/uploads` en développement.

## Structure du projet

### `apps/api`

```text
src/
├── auth/           # Inscription, connexion, JWT, guards et stratégies
├── users/          # Utilisateurs et profils
├── crisis/         # Crises et cycle de vie
├── alerts/         # Alertes et envoi
├── notifications/  # Notifications
├── reports/        # Signalements et modération
├── zones/          # Zones géographiques
├── media/          # Téléversement et médias
├── stats/          # Statistiques
├── common/         # Éléments partagés, dont les rôles
├── app.module.ts   # Module racine
└── main.ts         # Démarrage, CORS et fichiers statiques
```

### `apps/web`

```text
app/          # Pages App Router et espaces par rôle
components/   # Composants réutilisables, navigation et carte
features/     # Slices Redux et store
hooks/        # Hooks d’authentification et Socket.IO
lib/          # Axios et configuration partagée
services/     # Services d’accès aux ressources API
types/        # Types TypeScript
utils/        # Constantes, notamment l’URL API
public/       # Ressources statiques
```

## Docker

Pour démarrer MongoDB, l’API et le frontend :

```bash
docker compose up --build
```

Services disponibles :

| Service | URL/port |
|---|---|
| MongoDB | `localhost:27017` |
| API | `http://localhost:3000` |
| Frontend | `http://localhost:3001` |

Pour arrêter les services :

```bash
docker compose down
```

Les données MongoDB sont conservées dans le volume Docker `mongo_data`.

## Déploiement Render

Le fichier `render.yaml` définit deux services :

- `morocco-safety-api`, basé sur l’image Docker du backend.
- `morocco-safety-web`, construit avec `apps/web/Dockerfile`.

Variables à configurer dans Render :

```env
MONGO_URI=<URI MongoDB Atlas>
JWT_SECRET=<secret JWT fort>
NEXT_PUBLIC_API_URL=https://morocco-safety-api.onrender.com
NODE_ENV=production
```

Render fournit le port via la variable `PORT`. Le backend doit écouter `process.env.PORT`, ce qui est déjà prévu dans `apps/api/src/main.ts`.

## Tests et qualité

### Backend

```bash
cd apps/api
npm run build
npm test
npm run test:e2e
npm run test:cov
npm run lint
```

### Frontend

```bash
cd apps/web
npm run build
npm run lint
```

Le build frontend permet aussi de vérifier les erreurs TypeScript et de production Next.js.

## Dépannage

### Erreur `POST http://localhost:3000/auth/register 404`

Cette erreur apparaît lorsque Next.js occupe le port `3000`. Vérifiez que le frontend est lancé sur `http://localhost:3001` et que NestJS est lancé sur `http://localhost:3000`.

### Erreur `EADDRINUSE :::3000`

Une autre instance utilise déjà le port de l’API. Identifiez-la avec PowerShell :

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen
```

Arrêtez uniquement le processus identifié, puis relancez l’API :

```powershell
Stop-Process -Id <PID> -Force
```

### Erreur MongoDB

Vérifiez que MongoDB est démarré et que `MONGO_URI` est défini dans l’environnement du backend. En mode Docker, utilisez le nom de service `mongo` dans l’URI, et non `localhost`.

### Erreur CORS

En développement, l’origine frontend autorisée est `http://localhost:3001`. Si le frontend utilise un autre port, ajoutez son origine dans `apps/api/src/main.ts`.

## Sécurité

- Utilisez un `JWT_SECRET` long et unique en production.
- Gardez les fichiers `.env` hors du contrôle de version.
- N’exposez pas les identifiants MongoDB dans les logs ou la documentation publique.
- Vérifiez les permissions associées aux rôles avant de déployer en production.

## État du projet

Le projet est en développement actif. Les fonctionnalités et routes peuvent évoluer; les contrôleurs et services NestJS restent la référence pour le contrat API courant.