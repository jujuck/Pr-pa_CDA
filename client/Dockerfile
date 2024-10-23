# Étape de build
FROM node:lts-alpine AS build

# Créer le répertoire de travail
WORKDIR /app

# Copier le fichier de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du projet
COPY . .

# Construire l'application pour la production
# RUN npm run build

# Étape pour le serveur
# FROM node:lts-alpine AS serve

# Définir le répertoire de travail dans le conteneur
# WORKDIR /app

# Copier les fichiers de build de l'étape précédente
# COPY --from=build /app .

# Exposer le port par défaut de vite preview
EXPOSE 5173

# Commande pour démarrer l'application en mode preview
CMD ["npm", "run", "dev"]
