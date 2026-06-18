import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm.jsx';

test('вызывает onAdd с введённым текстом и очищает поле', async () => {
  const user = userEvent.setup();
  const onAdd = jest.fn();
  render(<TodoForm onAdd={onAdd} />);

  const input = screen.getByLabelText('Текст задачи');
  await user.type(input, 'Купить молоко');
  await user.click(screen.getByRole('button', { name: 'Добавить' }));

  expect(onAdd).toHaveBeenCalledWith('Купить молоко');
  expect(input).toHaveValue('');
});

test('не вызывает onAdd при пустом вводе', async () => {
  const user = userEvent.setup();
  const onAdd = jest.fn();
  render(<TodoForm onAdd={onAdd} />);

  await user.click(screen.getByRole('button', { name: 'Добавить' }));

  expect(onAdd).not.toHaveBeenCalled();
});
