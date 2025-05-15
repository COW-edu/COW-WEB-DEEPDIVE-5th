import { TodoListItem } from '../../types/todoType';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';
import Button from '../../components/atomic/Button';
type todoList = {
  kind: 'complete' | 'notCompleted' | 'origin';
  item: TodoListItem;
};

const todoList = ({ todoList, setTodoList, toggleTodo, handleTextClick }) => {
  return (
    <div>
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
    </div>
  );
};

export default todoList;
