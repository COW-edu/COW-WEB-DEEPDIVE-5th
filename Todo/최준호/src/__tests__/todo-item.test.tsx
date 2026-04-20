import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "@/ui/todo-item";
import { vi } from "vitest";
import { TodoItemType } from "@/types/todo";

describe("TodoItem 컴포넌트", () => {
  let item: TodoItemType;
  let onDelete: ReturnType<typeof vi.fn>;
  let onToggle: ReturnType<typeof vi.fn>;

  const renderItem = (overrides?: Partial<TodoItemType>) => {
    const propsItem = { ...item, ...overrides };
    render(
      <TodoItem item={propsItem} onDelete={onDelete} onToggle={onToggle} />
    );
  };

  beforeEach(() => {
    item = { id: Date.now(), content: "할 일 테스트", done: false };
    onDelete = vi.fn();
    onToggle = vi.fn();
  });

  it("기본 상태: 내용, '완료' 버튼, '삭제' 버튼을 렌더링한다", () => {
    renderItem();

    expect(screen.getByText(item.content)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "완료" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();

    expect(screen.getByText(item.content)).not.toHaveStyle({
      textDecoration: "line-through",
    });
  });

  describe("완료 상태(done=true)일 때", () => {
    beforeEach(() => {
      renderItem({ done: true, content: "완료된 할 일" });
    });

    it("버튼 텍스트가 '취소'로 바뀌고, 텍스트에 취소선이 적용된다", () => {
      expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
      expect(screen.getByText("완료된 할 일")).toHaveStyle({
        textDecoration: "line-through",
      });
    });
  });

  it("삭제 버튼 클릭 시 onDelete(item.id)를 호출한다", async () => {
    renderItem();
    await userEvent.click(screen.getByRole("button", { name: "삭제" }));
    expect(onDelete).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledWith(item.id);
  });

  it("완료 버튼 클릭 시 onToggle(item.id)를 호출한다", async () => {
    renderItem();
    await userEvent.click(screen.getByRole("button", { name: "완료" }));
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle).toHaveBeenCalledWith(item.id);
  });
});
