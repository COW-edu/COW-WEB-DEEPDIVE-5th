export type TodoListItem = {
  id: number;
  text: string;
  completed: boolean;
};

export type ShowContent = 'all' | 'complete' | 'incomplete';

export interface UseTodoReturn {
  todoList: TodoListItem[];
  todoContent: string;
  showTodoContent: ShowContent;
  completedTodoList: TodoListItem[];
  notCompletedTodoList: TodoListItem[];

  setTodoList: React.Dispatch<React.SetStateAction<TodoListItem[]>>;
  setTodoContent: (value: string) => void;
  setShowTodoContent: (value: ShowContent) => void;

  addTodo: () => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
