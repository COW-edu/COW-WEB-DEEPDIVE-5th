import { useContext } from "react";
import { TodoDispatchContext } from "../context/TodoContext";
import { todoFilter } from "../types/todo";

type TodoFilterProps = {
  setMode: (mode: todoFilter) => void;
  mode: todoFilter;
  todoLength: number;
};

export default function TodoFilter({
  setMode,
  mode,
  todoLength,
}: TodoFilterProps) {
  const buttonStyle = "border px-3 py-1 rounded-lg hover:bg-gray-100";
  const modeStyle = "bg-gray-100";

  const buttonLabels: todoFilter[] = ["All", "Active", "Completed"];

  const dispatch = useContext(TodoDispatchContext);

  const ClearComplete = () => {
    dispatch?.({ type: "CLEAR_COMPLETED_TODOS", payload: null });
  };

  return (
    <div className="w-full bg-white flex justify-between items-center px-3 py-2 gap-7">
      <p>{todoLength} items left!</p>
      <div className="flex gap-2">
        {buttonLabels.map((label) => (
          <button
            key={label}
            className={`${buttonStyle} ${mode === label ? modeStyle : ""}`}
            onClick={() => setMode(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <button className="hover:border-b-2" onClick={ClearComplete}>
        Clear completed
      </button>
    </div>
  );
}
