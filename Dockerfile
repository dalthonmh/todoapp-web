# Build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY . .

# Define build arguments
ARG VITE_API_AUTH_URL
ARG VITE_API_CORE_URL

# Install dependencies and build
RUN yarn install && yarn build

# Nginx serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
