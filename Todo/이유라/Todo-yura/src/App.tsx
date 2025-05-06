import React from 'react';
import { useState } from 'react';
import ModeSwitch from './components/molecules/ModeSwitch';
import Todo from './types/todo';
import FilterType from './types/filter';
import TodoPanel from './components/organisms/TodoPanel';
import FarmPanel from './components/organisms/FarmPanel';

function App() {
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [filterMode, setFilterMode] = useState<FilterType>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCheckedAll = () => {
    const handleIncomplete = todos.some((todo) => !todo.completed);

    const newTodos: Todo[] = todos.map((todo) => {
      return { ...todo, completed: handleIncomplete ? true : false };
    });
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'active') return !todo.completed;
    if (filterMode === 'completed') return todo.completed;
  });

  const handleFilter = (filterType: FilterType) => {
    setFilterMode(filterType);
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todos) => todos.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* 타이틀 */}
      <p className="mb-4 text-4xl text-primary-green font-bold">Todo Forest</p>
      <div className="w-[200px] flex justify-between">
        {/* mode 변경 버튼 */}
        <ModeSwitch
          viewMode={viewMode}
          onChange={(mode) => setViewMode(mode)}
        />
      </div>
      {/* 버튼 별 분기 상황  */}
      {viewMode === 'farm' && (
        <div className="mt-10">
          <FarmPanel text="준비 중입니다" />
        </div>
      )}
      {viewMode === 'list' && (
        <TodoPanel
          input={input}
          todos={todos}
          onCheckedAll={handleCheckedAll}
          onTodoText={handleTodoText}
          onSubmit={handleSubmit}
          filteredTodos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          handleDelete={handleDelete}
          filterMode={filterMode}
          onFilterChange={handleFilter}
          onDeleteAll={handleDeleteAll}
        />
      )}
    </div>
  );
}

export default App;
