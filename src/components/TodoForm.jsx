import { useState } from 'react';

// Форма добавления новой задачи.
export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return; // пустые задачи не добавляем
    onAdd(trimmed);
    setValue('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Новая задача…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Текст задачи"
      />
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}
