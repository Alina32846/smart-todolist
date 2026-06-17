import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import Filters from './components/Filters.jsx';
import TodoList from './components/TodoList.jsx';
import * as api from './api/client.js';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка задач с сервера.
  async function load() {
    setLoading(true);
    setError(null);
    try {
      setTodos(await api.getTodos());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(title) {
    setError(null);
    try {
      const created = await api.createTodo(title);
      setTodos((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(todo) {
    setError(null);
    try {
      const updated = await api.updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError(null);
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Фильтрация выполняется на клиенте.
  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Умный список задач</h1>
        <p className="subtitle">Smart TodoList</p>
      </header>

      <main className="app-main">
        <TodoForm onAdd={handleAdd} />
        <Filters value={filter} onChange={setFilter} />

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" className="btn" onClick={load}>
              Повторить
            </button>
          </div>
        )}

        {loading ? (
          <p className="status">Загрузка…</p>
        ) : (
          <>
            <TodoList
              todos={visibleTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
            <p className="counter">Активных задач: {activeCount}</p>
          </>
        )}
      </main>
    </div>
  );
}
