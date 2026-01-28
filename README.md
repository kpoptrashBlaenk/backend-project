# NestJS Mongoose Boilerplate

Boilerplate NestJS avec intégration Mongoose/MongoDB, prêt à l'emploi.

## 🚀 Installation rapide

```bash
# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer MongoDB dans le fichier .env
# MONGODB_URI=mongodb://localhost:27017/nest-js-mongoose

# Démarrer en mode développement
pnpm start:dev
```

## 📋 Prérequis

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB (local ou distant)

## 🔧 Scripts disponibles

- `pnpm start:dev` : Démarrer en mode développement avec hot-reload
- `pnpm start` : Démarrer en mode production
- `pnpm build` : Compiler le projet
- `pnpm lint` : Linter le code
- `pnpm test` : Lancer les tests
- `pnpm format` : Formater le code avec Prettier

## 📁 Structure

```
nestjs-mongoose/
├── src/
│   ├── config/          # Configuration (variables d'environnement)
│   ├── filters/         # Filtres d'exception HTTP
│   ├── user/            # Module utilisateur (exemple avec Mongoose)
│   ├── app.module.ts    # Module principal
│   └── main.ts          # Point d'entrée
├── .env.example         # Exemple de fichier d'environnement
└── package.json         # Dépendances et scripts
```

## 🔐 Variables d'environnement

Créez un fichier `.env` à partir de `.env.example` :

- `APP_API_PORT` : Port sur lequel l'API écoute (défaut: 3000)
- `APP_API_KEY` : Clé API pour l'authentification
- `MONGODB_URI` : URI de connexion MongoDB (ex: `mongodb://localhost:27017/nest-js-mongoose`)

## 📝 Notes

Ce package peut être utilisé indépendamment ou dans le cadre du monorepo parent.

Le module `user` est inclus comme exemple d'utilisation de Mongoose avec NestJS.
