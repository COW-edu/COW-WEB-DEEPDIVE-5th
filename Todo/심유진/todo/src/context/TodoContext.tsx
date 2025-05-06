import { createContext, useReducer } from "react";
import { todoList } from "../types/todo";

const initialState: todoList = {
  todos: [],
};

type Action =
  | { type: "ADD_TODO"; payload: { title: string } }
  | { type: "REMOVE_TODO"; payload: { id: number } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "CLEAR_COMPLETED_TODOS"; payload: null }
  | { type: "ALL_TOGGLE_TODO" };

const todoReducer = (state: todoList, action: Action): todoList => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: Date.now(),
            isCompleted: false,
            isEditing: false,
          },
        ],
      };
    case "REMOVE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case "CLEAR_COMPLETED_TODOS":
      return { todos: state.todos.filter((todo) => !todo.isCompleted) };
    case "ALL_TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.isCompleted
            ? { ...todo, isCompleted: false }
            : { ...todo, isCompleted: true }
        ),
      };
    default:
      return state;
  }
};

export const TodoStateContext = createContext<todoList | null>(null);
export const TodoDispatchContext = createContext<React.Dispatch<Action> | null>(
  null
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
