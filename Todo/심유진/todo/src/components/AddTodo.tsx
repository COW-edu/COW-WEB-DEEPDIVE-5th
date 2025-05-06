import { useContext, useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import useEnterKey from "../hooks/useEnterKey";
import { TodoDispatchContext } from "../context/TodoContext";
import { todoAction } from "../types/todo";

export default function AddTodo() {
  const [value, setValue] = useState<string>("");
  const dispatch = useContext(
    TodoDispatchContext
  ) as React.Dispatch<todoAction>;

  const addTodo = () => {
    if (value.trim() === "") return;
    const newTodo = {
      title: value.trim(),
      id: Date.now(),
      isCompleted: false,
      isEditing: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setValue("");
  };

  useEnterKey(addTodo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const allToggleTodo = () => {
    dispatch({ type: "ALL_TOGGLE_TODO", payload: null });
  };

  return (
    <div className="flex w-full p-2 bg-white gap-2">
      <Button onClick={allToggleTodo}>
        <Icon name="arrow_down" />
      </Button>
      <input
        className="text-xl px-2 py-2 w-full"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
