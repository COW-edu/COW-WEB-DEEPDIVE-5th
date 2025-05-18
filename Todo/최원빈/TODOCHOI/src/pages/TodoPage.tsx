import { useState } from 'react';
import { Plus, Github } from 'lucide-react';

import * as Tabs from '@radix-ui/react-tabs';

import Button from '../components/atomic/Button';
import Input from '../components/atomic/Input';
import { TodoListItem } from '../types/todoType';
import TodoList from './contents/TodoList';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [todoContent, setTodoContent] = useState('');
  const [showTodoContent, setShowTodoContent] = useState('all');

  //파생 상태
  const completedTodoList = todoList.filter((item) => item.completed);
  const notCompletedTodoList = todoList.filter((item) => !item.completed);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = (): void => {
    if (todoContent.trim() === '') return;
    const newTodo = { id: Date.now(), text: todoContent, completed: false };
    setTodoList((prev) => [...prev, newTodo]);
    setTodoContent('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const deleteTodo = (id: number): void => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAllTabClick = () => {
    setShowTodoContent('all');
  };

  const handleCompleteTabClick = () => {
    setShowTodoContent('complete');
  };

  const handleNotCompleteTabClick = () => {
    setShowTodoContent('incomplete');
  };

  const handleTextClick = (id: number): void => {
    console.log('체크바뀜');
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Developer Todo List
        </h1>

        <div className="flex flex-row gap-4 items-center">
          <Input
            value={todoContent}
            variant="todo"
            onKeyDown={handleKeyDown}
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
          <Tabs.Root defaultValue="all" className="w-full ">
            <Tabs.List className="flex space-x-4 mb-4">
              <Tabs.Trigger
                onClick={handleAllTabClick}
                value="all"
                className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                All
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={handleCompleteTabClick}
                value="completed"
                className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                완료
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={handleNotCompleteTabClick}
                value="incomplete"
                className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                미완료
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>

        <div className="space-y-3">
          {showTodoContent === 'all' ? (
            <div>
              <TodoList
                todoList={todoList}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                handleTextClick={handleTextClick}
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
                      handleTextClick={handleTextClick}
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
                      handleTextClick={handleTextClick}
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
