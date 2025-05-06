export type todo = {
  title: string;
  id: number;
  isCompleted: boolean;
  isEditing: boolean;
};

export type todoList = {
  todos: todo[];
};

export type todoInput = {
  content: string;
};

export type todoFilter = "All" | "Active" | "Completed";

export type todosFilter = {
  state: todoFilter;
};

export type todoAction = {
  type: string;
  payload: todo;
};
