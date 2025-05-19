import { useState } from "react";
import { useContext } from "react";
import { TodoStateContext, TodoDispatchContext } from "./context/TodoContext";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import TodoFilter from "./components/TodoFilter";
import { todo, todoFilter } from "./types/todo";

function App() {
  const { todos } = useContext(TodoStateContext) ?? { todos: [] };
  const dispatch = useContext(TodoDispatchContext);
  const [mode, setMode] = useState<todoFilter>("All");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl py-2">Todo List</h1>
      <div>
        <div className="overflow-y-scroll max-h-96 bg-gray-200 rounded-lg rounded-b-none shadow-lg">
          <AddTodo dispatch={dispatch} />
          {todos?.map((todo: todo) => (
            <TodoItem
              key={todo.id}
              content={todo.title}
              isChecked={todo.isCompleted}
              id={todo.id}
              mode={mode}
            />
          ))}
        </div>
        <TodoFilter setMode={setMode} mode={mode} todoLength={todos.length} />
      </div>
    </div>
  );
}

export default App;
