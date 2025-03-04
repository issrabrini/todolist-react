import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface FilterButtonsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setFilter('all')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          filter === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          filter === 'active'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          filter === 'completed'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;