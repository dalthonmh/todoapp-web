FROM node:18-alpine
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn install
COPY . .

ENV VITE_API_AUTH_URL=https://todoapp.dev
ENV VITE_API_CORE_URL=https://todoapp.dev

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
