import { TodoListItem } from '../../types/todoType';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';
import Button from '../atomic/Button';
interface TodoListProps {
  todoList: TodoListItem[]; //조건으로 분기해야하는 todoList에 대한 고찰
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  handleTextClick: (id: number) => void;
}

const TodoList = ({
  todoList,

  deleteTodo,
  toggleTodo,
  handleTextClick,
}: TodoListProps) => {
  return (
    <div>
      {todoList.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center bg-yellow-100 dark:bg-yellow-300 rounded-lg px-4 py-3 shadow"
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
    </div>
  );
};

export default TodoList;
