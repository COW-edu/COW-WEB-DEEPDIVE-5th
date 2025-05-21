import { useEffect, useRef } from 'react';
import { Plus, Github } from 'lucide-react';
import TabContent from '../components/contents/TabContent';
import Button from '../components/atomic/Button';
import Input from '../components/atomic/Input';

import TodoList from '../components/contents/TodoList';
import useTodo from '../hooks/useTodo';

const TodoPage = () => {
  const {
    todoList,
    todoContent,
    completedTodoList,
    showTodoContent,
    notCompletedTodoList,
    addTodo,
    handleInputChange,
    deleteTodo,
    toggleTodo,
  } = useTodo();

  const inputFocusRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputFocusRef.current?.focus();
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Todo List
        </h1>

        <div className="flex flex-row gap-4 items-center">
          <Input
            value={todoContent}
            variant="todo"
            inputFocusRef={inputFocusRef}
            onKeyUp={handleKeyUp}
            onChange={handleInputChange}
            className="flex-1  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="할 일을 입력하세요..."
          />
          <Button className="flex flex-row" variant="append" onClick={addTodo}>
            <Plus className="w-46 h-4 mr-1" />
          </Button>
          <Button
            className="flex flex-row gap-1"
            variant="black"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-6 h-4 mr-1" />
          </Button>
        </div>
        <div className="flex flex-row justify-between">
          <TabContent></TabContent>
        </div>

        <div className="space-y-3">
          {showTodoContent === 'all' ? (
            <div>
              <TodoList
                todoList={todoList}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
              ></TodoList>
            </div>
          ) : (
            <div>
              {' '}
              {showTodoContent === 'complete' ? (
                <div>
                  <div>
                    <TodoList
                      todoList={completedTodoList}
                      deleteTodo={deleteTodo}
                      toggleTodo={toggleTodo}
                    ></TodoList>
                  </div>
                </div>
              ) : (
                <div>
                  {' '}
                  <div>
                    <TodoList
                      todoList={notCompletedTodoList}
                      deleteTodo={deleteTodo}
                      toggleTodo={toggleTodo}
                    ></TodoList>
                  </div>
                </div>
              )}
            </div>
          )}

          {todoList.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              할 일이 없습니다.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoPage;
