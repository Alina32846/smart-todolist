import { render, screen } from '@testing-library/react';
import TodoList from './TodoList.jsx';

const todos = [
  { id: '1', title: 'Задача 1', completed: false, createdAt: '' },
  { id: '2', title: 'Задача 2', completed: true, createdAt: '' },
];

test('рендерит по одному элементу на каждую задачу', () => {
  render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('показывает пустое состояние, если задач нет', () => {
  render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Задач пока нет.')).toBeInTheDocument();
});
