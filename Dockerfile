# Etapa de build
FROM node:18 AS build
WORKDIR /app
COPY . .

# ENV VITE_API_AUTH_URL=https://localhost:8080
# ENV VITE_API_CORE_URL=https://localhost:3000

RUN yarn install && yarn build

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
