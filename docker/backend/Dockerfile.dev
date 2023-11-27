# Build the backend
FROM node:16.17.1-alpine3.16 as build

# Assurez-vous que le chemin est correct
WORKDIR /usr/app

# Copiez les fichiers backend dans le conteneur
COPY ./backend /usr/app

# Install Python et autres dépendances de construction
RUN apk add --no-cache make gcc g++ python3

# Set Python environment variable
ENV PYTHON=/usr/bin/python3

# Install dependencies
RUN npm install

# Force reinstallation de bcrypt avec les drapeaux appropriés
RUN npm uninstall bcrypt
RUN npm install bcrypt --build-from-source

# Exposez le port nécessaire pour l'application backend
EXPOSE 5001

# Démarrer l'application backend
CMD ["npm", "start"]
