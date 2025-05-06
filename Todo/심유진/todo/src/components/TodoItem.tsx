import { Button } from "./Button";
import { Icon } from "./Icon";
import { TodoDispatchContext } from "../context/TodoContext";
import { useContext } from "react";

type Props = {
  id: number;
  isChecked: boolean;
  content: string;
  mode: "All" | "Active" | "Completed";
};

export default function TodoItem({ mode, id, isChecked, content }: Props) {
  const dispatch = useContext(TodoDispatchContext);

  if (!dispatch) {
    return null;
  }

  const toggleTodo = () => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  const removeTodo = () => {
    dispatch({ type: "REMOVE_TODO", payload: { id } });
  };

  const isVisible = () => {
    if (mode === "All") return true;
    if (mode === "Active" && !isChecked) return true;
    if (mode === "Completed" && isChecked) return true;
    return false;
  };

  return (
    isVisible() && (
      <div className="flex w-full rounded-sm bg-white p-2 h-16 hover:bg-gray-100">
        <Button onClick={toggleTodo}>
          <Icon
            name={isChecked ? "checked" : "unchecked"}
            size={isChecked ? 23 : 30}
          />
        </Button>
        <div className="px-4 py-2 w-full text-black text-xl">{content}</div>
        <Button onClick={removeTodo}>
          <Icon name="delete" size={30} />
        </Button>
      </div>
    )
  );
}
