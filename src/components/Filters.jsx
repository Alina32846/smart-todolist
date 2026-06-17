// Переключатель фильтров: все / активные / завершённые.
const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Завершённые' },
];

export default function Filters({ value, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Фильтры задач">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`filter-btn${value === filter.key ? ' active' : ''}`}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
