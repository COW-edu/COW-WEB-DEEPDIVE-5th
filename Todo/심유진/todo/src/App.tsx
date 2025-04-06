import React, { useReducer } from "react";
import {
  TodoStateContext,
  TodoDispatchContext,
  todoReducer,
  initialState,
} from "./context/TodoContext";

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <div>
          <h1>Todo List</h1>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
