type Todo = {
  title: string;
  id: number;
  isCompleted: boolean;
  isEditing: boolean;
};

type TodoList = {
  todos: Todo[];
};

type TodoInput = {
  content: string;
};

type TodoFilter = "All" | "Active" | "Completed";

type TodosFilter = {
  state: TodoFilter;
};
