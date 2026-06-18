import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem.jsx';

const todo = { id: '1', title: 'Тестовая задача', completed: false, createdAt: '' };

function renderItem(props) {
  // TodoItem рендерит <li>, поэтому оборачиваем в <ul> для валидной разметки.
  return render(
    <ul>
      <TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} {...props} />
    </ul>
  );
}

test('отображает заголовок задачи', () => {
  renderItem();
  expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
});

test('переключение чекбокса вызывает onToggle с задачей', async () => {
  const user = userEvent.setup();
  const onToggle = jest.fn();
  renderItem({ onToggle });

  await user.click(screen.getByRole('checkbox'));

  expect(onToggle).toHaveBeenCalledWith(todo);
});

test('кнопка удаления вызывает onDelete с id задачи', async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  renderItem({ onDelete });

  await user.click(screen.getByRole('button', { name: /Удалить/ }));

  expect(onDelete).toHaveBeenCalledWith('1');
});

test('завершённая задача помечена классом completed', () => {
  const { container } = render(
    <ul>
      <TodoItem
        todo={{ ...todo, completed: true }}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    </ul>
  );
  expect(container.querySelector('.todo-item')).toHaveClass('completed');
});
