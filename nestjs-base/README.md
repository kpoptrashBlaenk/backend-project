# NestJS Base Boilerplate

Boilerplate NestJS de base sans base de données, prêt à l'emploi.

## 🚀 Installation rapide

```bash
# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer en mode développement
pnpm start:dev
```

## 📋 Prérequis

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 🔧 Scripts disponibles

- `pnpm start:dev` : Démarrer en mode développement avec hot-reload
- `pnpm start` : Démarrer en mode production
- `pnpm build` : Compiler le projet
- `pnpm lint` : Linter le code
- `pnpm test` : Lancer les tests
- `pnpm format` : Formater le code avec Prettier

## 📁 Structure

```
nestjs-base/
├── src/
│   ├── config/          # Configuration (variables d'environnement)
│   ├── filters/         # Filtres d'exception HTTP
│   ├── app.module.ts    # Module principal
│   └── main.ts          # Point d'entrée
├── .env.example         # Exemple de fichier d'environnement
└── package.json         # Dépendances et scripts
```

## 🔐 Variables d'environnement

Créez un fichier `.env` à partir de `.env.example` :

- `APP_API_PORT` : Port sur lequel l'API écoute (défaut: 3000)
- `APP_API_KEY` : Clé API pour l'authentification

## 📝 Notes

Ce package peut être utilisé indépendamment ou dans le cadre du monorepo parent.
