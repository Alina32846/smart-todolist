// Локальный запуск Express-сервера для разработки.
// Переменные окружения берутся из .env (см. .env.example).
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API-сервер запущен на http://localhost:${PORT}`);
});
