// Клиент для общения с REST API. Использует fetch и async/await,
// добавляет API-ключ в заголовок и обрабатывает сетевые и серверные ошибки.

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE = '/api';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...(options.headers || {}),
      },
    });
  } catch {
    // Сетевая ошибка: сервер недоступен, нет соединения и т. п.
    throw new Error('Не удалось связаться с сервером. Проверьте подключение к интернету.');
  }

  if (!response.ok) {
    let message = `Ошибка сервера (код ${response.status})`;
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // тело ответа не является JSON — оставляем сообщение по умолчанию
    }
    throw new Error(message);
  }

  // DELETE возвращает 204 без тела
  if (response.status === 204) return null;
  return response.json();
}

export const getTodos = () => request('/todos');

export const createTodo = (title) =>
  request('/todos', { method: 'POST', body: JSON.stringify({ title }) });

export const updateTodo = (id, patch) =>
  request(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });

export const deleteTodo = (id) =>
  request(`/todos/${id}`, { method: 'DELETE' });
