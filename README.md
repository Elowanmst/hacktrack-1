# HackTrack

HackTrack est une application web permettant de gérer des hackathons, de créer des équipes et de rejoindre des équipes existantes.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)
- [Git](https://git-scm.com/)

## Installation

1. Clonez le dépôt GitHub sur votre machine locale :

```bash
git clone https://github.com/Elowanmst/hacktrack-1.git
```

## Accédez au dossier du projet 

```bash
cd hacktrack-1
```

## installer les dependances du projet
```bash
npm install
```

## lancer le projet en mode devellopement 
```bash
npm run dev
```
Cela lancera le projet sur http://localhost:5173 (par défaut). Vous pouvez ouvrir cette URL dans votre navigateur pour voir l'application.


## Configuration de l'API Backend
L'application nécessite un backend fonctionnel pour gérer les données des hackathons, des équipes et des utilisateurs. Par défaut, l'application est configurée pour communiquer avec un backend sur http://localhost:3002.

concernant l'api vous la trouverez sur mon depot ou via cette URL ;
https://github.com/hellodamien/hacktrack-api



## structure du projet 

mon projet est structurer comme suit ; 
```bash
hacktrack-1/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── context/          # Contexte global (ex. AuthContext)
│   ├── pages/            # Pages principales de l'application
│   ├── [App.jsx](http://_vscodecontentref_/1)           # Composant principal
│   ├── [main.jsx](http://_vscodecontentref_/2)          # Point d'entrée de l'application
│   └── [index.css](http://_vscodecontentref_/3)         # Fichier CSS principal
├── public/               # Fichiers publics (ex. favicon)
├── [package.json](http://_vscodecontentref_/4)          # Dépendances et scripts npm
├── [vite.config.js](http://_vscodecontentref_/5)        # Configuration de Vite
└── [tailwind.config.js](http://_vscodecontentref_/6)    # Configuration de Tailwind CSS

```

