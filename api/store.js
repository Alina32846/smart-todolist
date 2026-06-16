import { randomUUID } from 'crypto';

// Данные хранятся в памяти (массив объектов), как и допускает задание.
let todos = [
  {
    id: randomUUID(),
    title: 'Посмотреть, как работает приложение',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Добавить свою первую задачу',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export function getAll() {
  return todos;
}

export function create(title) {
  const todo = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
}

export function update(id, patch) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  if (typeof patch.title === 'string') todo.title = patch.title.trim();
  if (typeof patch.completed === 'boolean') todo.completed = patch.completed;
  return todo;
}

export function remove(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
