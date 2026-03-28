# Benak Hills — Villas de Luxe à Marrakech

Site vitrine et système de gestion pour **Benak Hills**, un domaine résidentiel de prestige à Marrakech.

## Stack technique

- **Frontend** : React 18 + TypeScript + Vite + Tailwind CSS
- **Base de données** : Neon PostgreSQL (serverless)
- **API** : Vercel Serverless Functions (`/api/`)
- **Déploiement** : Vercel
- **i18n** : Français, Anglais, Arabe (inclus)

## Variables d'environnement

Créer un fichier `.env` à la racine (ou les configurer dans Vercel) :

```env
# Neon PostgreSQL — requis pour les leads et offres
NEON_DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Admin Panel
VITE_ADMIN_EMAIL="bena@hills.com"
VITE_ADMIN_PASSWORD="Azerty2026"
```

## Base de données

Exécuter `neon-schema.sql` dans le **SQL Editor de Neon** pour initialiser les tables.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement

Le projet se déploie automatiquement sur **Vercel** à chaque push sur `main`.

Pour configurer les variables d'environnement : Vercel Dashboard → Project → Settings → Environment Variables.

## Panel Admin

Accès : `/admin`  
Email : `bena@hills.com`  
Mot de passe : `Azerty2026`

## Structure API

| Route | Méthode | Description |
|---|---|---|
| `/api/leads` | GET | Lister les leads |
| `/api/leads` | POST | Créer un lead (formulaire contact) |
| `/api/leads` | PATCH | Mettre à jour statut/notes |
| `/api/leads?id=` | DELETE | Supprimer un lead |
| `/api/offers` | GET | Lister les offres |
| `/api/offers` | POST | Créer une offre |
| `/api/offers` | PUT | Modifier une offre |
| `/api/offers?id=` | DELETE | Supprimer une offre |
