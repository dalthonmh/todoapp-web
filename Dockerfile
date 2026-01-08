FROM node:24-alpine
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn install
COPY . .

ARG VITE_API_AUTH_URL=https://todoapp.test
ARG VITE_API_CORE_URL=https://todoapp.test

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
