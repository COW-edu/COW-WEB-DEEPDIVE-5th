import { ChangeEvent, useState } from "react";

export default function InputTodo() {
  const [todoItem, setTodoItem] = useState<string>("");

  function putValue(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
    setTodoItem(e.target.value);
  }

  return (
    <div>
      <input
        placeholder="오늘의 할일은?"
        value={todoItem}
        onChange={putValue}
      ></input>
    </div>
  );
}
