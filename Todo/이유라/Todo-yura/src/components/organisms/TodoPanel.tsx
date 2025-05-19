import React from 'react';
import TodoInput from '../molecules/TodoInput';
import TodoItem from '../molecules/TodoItem';
import FilterGroup from '../molecules/FilterGroup';
import Todo from '../../types/todo';
import FilterType from '../../types/filter';

interface TodoPanelProps {
  input: string;
  todos: Todo[];
  onCheckedAll: () => void;
  onTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  filteredTodos: Todo[];
  onToggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  filterMode: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onDeleteAll: () => void;
}

const TodoPanel = ({
  input,
  todos,
  onCheckedAll,
  onTodoText,
  onSubmit,
  filteredTodos,
  onToggleComplete,
  handleDelete,
  filterMode,
  onFilterChange,
  onDeleteAll,
}: TodoPanelProps) => {
  return (
    <div className="flex-col items-center justify-center">
      {/* Todo 입력창 영역 */}
      <TodoInput
        value={input}
        onCheckedAll={onCheckedAll}
        onChange={onTodoText}
        onSubmit={onSubmit}
      />
      <div className="w-full h-[240px] p-4 bg-primary-green overflow-hidden">
        {/* row */}
        {filteredTodos.map((todo) => (
          <TodoItem
            todo={todo}
            onToggle={() => onToggleComplete(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
      {/* 필터 영역 */}
      <div className="flex justify-between items-center w-full h-10 p-2 ">
        <p>{todos.filter((todo) => !todo.completed).length} 개</p>
        <FilterGroup
          filterMode={filterMode}
          onFilterChange={onFilterChange}
          onDeleteAll={onDeleteAll}
        />
      </div>
    </div>
  );
};

export default TodoPanel;
