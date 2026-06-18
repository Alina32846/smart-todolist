import { render, screen } from '@testing-library/react';
import App from './App.jsx';
import * as api from './api/client.js';

// Подменяем модуль клиента, чтобы тестировать приложение без реального сервера.
jest.mock('./api/client.js', () => ({
  getTodos: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

test('приложение монтируется и показывает загруженные задачи', async () => {
  api.getTodos.mockResolvedValueOnce([
    { id: '1', title: 'Загруженная задача', completed: false, createdAt: '' },
  ]);

  render(<App />);

  expect(
    screen.getByRole('heading', { name: 'Умный список задач' })
  ).toBeInTheDocument();
  expect(await screen.findByText('Загруженная задача')).toBeInTheDocument();
});

test('показывает баннер ошибки, если загрузка не удалась', async () => {
  api.getTodos.mockRejectedValueOnce(new Error('Сервер недоступен'));

  render(<App />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Сервер недоступен');
});
