# NestJS Boilerplate Monorepo

Monorepo contenant deux boilerplates NestJS prêts à l'emploi :

- **nestjs-base** : Boilerplate NestJS de base sans base de données
- **nestjs-mongoose** : Boilerplate NestJS avec intégration Mongoose/MongoDB

## Structure

```
nestjs-boilerplate/
├── nestjs-base/          # Boilerplate NestJS de base
├── nestjs-mongoose/      # Boilerplate NestJS avec Mongoose
├── package.json          # Configuration monorepo
└── pnpm-workspace.yaml   # Configuration pnpm workspaces
```

## Installation

### Utilisation dans le monorepo

```bash
# Installer toutes les dépendances
pnpm install
```

### Utilisation indépendante

Chaque package peut être copié et utilisé indépendamment ! 

Pour utiliser un package seul (par exemple `nestjs-mongoose`) :

1. Copiez le dossier `nestjs-mongoose` où vous voulez
2. Allez dans le dossier : `cd nestjs-mongoose`
3. Installez les dépendances : `pnpm install`
4. Copiez `.env.example` vers `.env` : `cp .env.example .env`
5. Configurez vos variables d'environnement dans `.env`
6. Lancez : `pnpm start:dev`

C'est tout ! Chaque package est complètement autonome avec toutes ses dépendances et configurations.

## Utilisation

### NestJS Base

```bash
# Démarrer en mode développement
pnpm start:base:dev

# Build
pnpm build:base

# Démarrer en production
pnpm start:base
```

### NestJS Mongoose

```bash
# Démarrer en mode développement
pnpm start:mongoose:dev

# Build
pnpm build:mongoose

# Démarrer en production
pnpm start:mongoose
```

## Scripts disponibles

- `pnpm build` : Build tous les packages
- `pnpm build:base` : Build uniquement nestjs-base
- `pnpm build:mongoose` : Build uniquement nestjs-mongoose
- `pnpm start:base:dev` : Démarrer nestjs-base en mode dev
- `pnpm start:mongoose:dev` : Démarrer nestjs-mongoose en mode dev
- `pnpm lint` : Linter tous les packages
- `pnpm test` : Tester tous les packages
- `pnpm format` : Formater tout le code

## Technologies utilisées

- **NestJS** : Framework Node.js
- **pnpm** : Gestionnaire de paquets
- **TypeScript** : Langage de programmation
- **Mongoose** : ODM pour MongoDB (dans nestjs-mongoose)
