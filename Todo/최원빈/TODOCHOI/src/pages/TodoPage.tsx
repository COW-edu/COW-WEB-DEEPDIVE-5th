import { useState } from 'react';
import { Plus, Trash2, Github } from 'lucide-react';
import Button from '../../components/atomic/Button';
import Input from '../../components/atomic/Input';
import { TodoListItem } from '../../types/todoType';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Tabs from '@radix-ui/react-tabs';
import { Check } from 'lucide-react';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [todoContent, setTodoContent] = useState('');
  const [showCompleteted, setShowCompleted] = useState<boolean>();
  const [showNotCompleted, setShowNotCompleted] = useState<boolean>();

  //파생 상태
  const completedTodoList = todoList.filter((item) => item.completed);
  const notCompletedTodoList = todoList.filter((item) => !item.completed);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('엔터 실행');
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

  const handleCompleteTabClick = () => {
    setShowCompleted((prev) => !prev);
    console.log(showCompleteted);
  };

  const handleNotCompleteTabClick = () => {
    setShowNotCompleted((prev) => !prev);
    console.log(showNotCompleted);
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
          🛠️ Developer Todo List
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

            <Tabs.Content value="all">{/* 전체 todo */}</Tabs.Content>
            <Tabs.Content value="completed">{/* 완료 todo */}</Tabs.Content>
            <Tabs.Content value="incomplete">{/* 미완료 todo */}</Tabs.Content>
          </Tabs.Root>
        </div>

        <div className="space-y-3">
          {todoList.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-yellow-100 dark:bg-yellow-200 rounded-lg px-4 py-3 shadow"
            >
              <Checkbox.Root
                className="w-5 h-5 bg-white border rounded flex  shadow"
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-green-500" />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <span
                className={`text-gray-800 font-medium ${
                  todo.completed ? 'line-through text-red-400' : null
                }`}
                onClick={() => handleTextClick(todo.id)}
              >
                {todo.text}
              </span>
              <Button variant="reduce" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="w-4 h-4 mr-1" />
              </Button>
            </div>
          ))}
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
