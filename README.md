# ToDo-APP Web

A modern web frontend for the TodoApp, built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/).

## Prerequisites

- **Node.js**: (v22+ recommended)
- **Yarn**: Package manager
- **Docker** (Optional, for containerized deployment)

## Project Setup

1. **Install Dependencies**
   ```sh
   yarn install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory and configure your API endpoints.

   ```properties
   # Auth Service API
   VITE_API_AUTH_URL=http://localhost:8081

   # Tasks Service API
   VITE_API_CORE_URL=http://localhost:3000
   ```

## Development

Start the development server with hot-reload:

```sh
yarn dev
```

The application will typically be accessible at `http://localhost:5173` (check terminal output).

## Docker Support

To build and run the application using Docker:

### 1. Build and Run with Docker Compose

Ensure your `.env` file is set up, then run:

```sh
docker compose up -d --build
```
The app will be accessible at `http://localhost`.

### 2. Manual Docker Build

You can also build the image directly, passing the environment variables as build arguments:

```sh
docker build \
  --build-arg VITE_API_AUTH_URL=http://localhost:8081 \
  --build-arg VITE_API_CORE_URL=http://localhost:3000 \
  -t dalthonmh/todoapp-web .
```

Run the container:
```sh
docker run -p 80:80 dalthonmh/todoapp-web
```
