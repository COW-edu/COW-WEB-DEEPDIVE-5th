import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "@/ui/todo-item";
import { vi } from "vitest";
import { TodoItemType } from "@/types/todo";

describe("todo item 테스트", () => {
  it("todo 내용과 완료버튼, 삭제 버튼을 보여준다.", () => {
    const item: TodoItemType = {
      id: Date.now(),
      content: "test case 1",
      done: false,
    };
    render(<TodoItem item={item} />);

    const todoText = screen.getByText(item.content);
    const deleteButton = screen.getByRole("button", { name: "x" });
    const toggleButton = screen.getByRole("button", { name: "완료" });

    expect(todoText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();
  });

  it("done=true 이면 완료 버튼이 '취소'로, 텍스트에 취소선이 적용된다", () => {
    const item: TodoItemType = { id: 3, content: "done item", done: true };
    render(<TodoItem item={item} onDelete={() => {}} onToggle={() => {}} />);

    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    const text = screen.getByText(item.content);
    expect(text).toHaveStyle({ textDecoration: "line-through" });
  });

  it("삭제 버튼 클릭 시 onDelete(id)가 호출된다", () => {
    const item: TodoItemType = { id: 1, content: "test", done: false };
    const onDelete = vi.fn();
    render(<TodoItem item={item} onDelete={onDelete} onToggle={() => {}} />);

    const deleteButton = screen.getByRole("button", { name: "x" });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(item.id);
  });

  it("완료 버튼 클릭 시 onToggle(id)가 호출된다", () => {
    const item: TodoItemType = { id: 2, content: "foo", done: false };
    const onToggle = vi.fn();
    render(<TodoItem item={item} onDelete={() => {}} onToggle={onToggle} />);

    const toggleButton = screen.getByRole("button", { name: "완료" });
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledWith(item.id);
  });
});
