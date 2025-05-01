import { useState } from 'react';
import Button from '../../components/atomic/Button';
const TodoPage = () => {
  //todoList Type
  type todoListItems = {
    id: number;
    text: string;
  };
  const [todoList, setTodoList] = useState<todoListItems[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [todoContent, setTodoContent] = useState('');

  const addTodo = (): void => {
    const newTodo = {
      id: Date.now(),
      text: todoContent,
    };
    setTodoList((prev) => [...prev, newTodo]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
  };

  const deleteTodo = (): void => {};
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          DEVELOPER TODO
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-6xl bg-cyan-100 px-6 py-4 rounded-md shadow flex justify-between items-center">
            <input type="text" onChange={handleInputChange} />
            <div className=" flex gap-2">
              <Button variant="append" onClick={addTodo}>
                추가
              </Button>
              <Button variant="reduce">삭제</Button>
              <Button variant="black">GitHub</Button>
            </div>
          </div>
          <div className="w-full bg-yellow-50 max-w-6xl">
            <div className="flex flex-col">
              {todoList.map((val) => {
                return <div key={val.id}>{val.text}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TodoPage;
