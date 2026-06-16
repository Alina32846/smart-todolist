import express from 'express';
import * as store from './store.js';

const router = express.Router();

// Проверка живости сервера — без ключа.
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middleware: базовая защита — проверка API-ключа в заголовке.
function requireApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Неверный или отсутствующий API-ключ' });
  }
  next();
}

// Middleware: валидация тела задачи для POST/PUT/PATCH.
function validateTodo(req, res, next) {
  const { title, completed } = req.body ?? {};
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Поле "title" должно быть непустой строкой' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Поле "title" не должно превышать 200 символов' });
    }
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Поле "completed" должно быть булевым' });
  }
  next();
}

// Все операции с задачами требуют API-ключ.
router.use('/todos', requireApiKey);

router.get('/todos', (req, res) => {
  res.json(store.getAll());
});

router.post('/todos', validateTodo, (req, res) => {
  const { title } = req.body ?? {};
  if (!title) {
    return res.status(400).json({ error: 'Поле "title" обязательно' });
  }
  res.status(201).json(store.create(title.trim()));
});

function updateHandler(req, res) {
  const updated = store.update(req.params.id, req.body ?? {});
  if (!updated) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  res.json(updated);
}
router.patch('/todos/:id', validateTodo, updateHandler);
router.put('/todos/:id', validateTodo, updateHandler);

router.delete('/todos/:id', (req, res) => {
  if (!store.remove(req.params.id)) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  res.status(204).end();
});

const app = express();
app.use(express.json());
// Основной префикс /api; дублирующее монтирование на / — страховка
// на случай, если платформа деплоя срежет префикс при маршрутизации.
app.use('/api', router);
app.use('/', router);

// Глобальный обработчик ошибок.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

export default app;
