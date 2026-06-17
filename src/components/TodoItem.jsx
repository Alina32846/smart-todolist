// Одна задача: чекбокс выполнения, текст и кнопка удаления.
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          aria-label={`Отметить «${todo.title}» выполненной`}
        />
        <span className="todo-title">{todo.title}</span>
      </label>
      <button
        type="button"
        className="btn btn-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить «${todo.title}»`}
      >
        ✕
      </button>
    </li>
  );
}
