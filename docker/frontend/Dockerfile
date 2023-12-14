# Stage 1: Build the frontend
FROM node:16.17.1-alpine3.16 as build
# Assurez-vous que le chemin est correct
WORKDIR /usr/app/frontend  
COPY ./frontend /usr/app/frontend

RUN npm install
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/frontend/default.conf /etc/nginx/conf.d/default.conf
# Assurez-vous que le chemin de build est correct
COPY --from=build /usr/app/frontend/dist /usr/share/nginx/html  
# Copier le sitemap.xml et le robots.txt dans le répertoire HTML de Nginx
COPY ./sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY ./robots.txt /usr/share/nginx/html/robots.txt