import { createContext } from "react";

export const TodoStateContext = createContext(null);
export const TodoDispatchContext = createContext(null);

export const initialState = {
  todos: [],
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "add todo":
      return { todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};
