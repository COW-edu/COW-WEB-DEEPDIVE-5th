import { create } from 'zustand';
import { TodoListItem, ShowContent } from '../types/todoType';

interface TodoStore {
  todoList: TodoListItem[];
  todoContent: string;
  showTodoContent: ShowContent;

  setTodoContent: (value: string) => void;
  setShowTodoContent: (value: ShowContent) => void;
  addTodo: () => void;
  deleteTodo: (id: number) => void;
  handleInputChange: any;
  toggleTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todoList: [],
  todoContent: '',
  showTodoContent: 'all',

  setTodoContent: (value: string) => {
    set({ todoContent: value });
  },

  setShowTodoContent: (value: ShowContent) => {
    set({ showTodoContent: value });
  },

  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    set({ todoContent: e.target.value });
  },

  addTodo: () => {
    const content = get().todoContent.trim();
    if (!content) return;
    const newTodo: TodoListItem = {
      id: Date.now(),
      text: content,
      completed: false,
    };
    set((state) => ({
      todoList: [...state.todoList, newTodo],
      todoContent: '',
    }));
  },

  deleteTodo: (id: number) => {
    set((state) => ({
      todoList: state.todoList.filter((todo) => todo.id !== id),
    }));
  },

  toggleTodo: (id: number) => {
    set((state) => ({
      todoList: state.todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  },
}));
