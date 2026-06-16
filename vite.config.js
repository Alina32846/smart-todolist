import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Во время разработки фронтенд (порт 5173) проксирует запросы /api
// на локальный Express-сервер (порт 3001). На Vercel тот же код работает
// как serverless-функция на одном домене.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
