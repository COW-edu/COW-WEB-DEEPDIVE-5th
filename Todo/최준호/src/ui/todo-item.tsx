import { TodoItemType } from "@/types/todo";

interface Props {
  item: TodoItemType;
  onDelete: () => void;
  onToggle: () => void;
}
export default function TodoItem({ item }: Props) {
  return (
    <div>
      <div>{item.content}</div>
      <button>삭제</button>
      <button>완료</button>
    </div>
  );
}
