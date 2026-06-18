import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from './Filters.jsx';

test('рендерит три кнопки фильтра', () => {
  render(<Filters value="all" onChange={() => {}} />);

  expect(screen.getByRole('button', { name: 'Все' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Активные' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Завершённые' })).toBeInTheDocument();
});

test('вызывает onChange с ключом фильтра при клике', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Filters value="all" onChange={onChange} />);

  await user.click(screen.getByRole('button', { name: 'Активные' }));

  expect(onChange).toHaveBeenCalledWith('active');
});
