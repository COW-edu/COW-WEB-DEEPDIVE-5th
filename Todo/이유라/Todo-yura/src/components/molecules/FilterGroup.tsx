import React from 'react';
import Button from '../atoms/button';
import FilterType from '../../types/filter';

interface FilterGroupProps {
  filterMode: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onDeleteAll: () => void;
}

const FilterGroup = ({
  filterMode,
  onFilterChange,
  onDeleteAll,
}: FilterGroupProps) => {
  return (
    <div className="flex justify-end w-5/6">
      <Button
        variant="filter"
        active={filterMode == 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        variant="filter"
        active={filterMode == 'active'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </Button>
      <Button
        variant="filter"
        active={filterMode == 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </Button>
      <Button variant="filter" onClick={onDeleteAll}>
        전체 삭제
      </Button>
    </div>
  );
};

export default FilterGroup;
