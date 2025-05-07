import TodoForm from "@/ui/todo-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

describe("TodoForm 컴포넌트 테스트", async () => {
  it("할 일을 입력하면 제출 버튼이 활성화된다.", async () => {
    render(<TodoForm />);
    const user = userEvent.setup();
    const textField = screen.getByRole("textbox");
    const addButton = screen.getByRole("button");

    expect(addButton).toBeDisabled();

    await user.type(textField, "user input test");
    expect(addButton).toBeEnabled();
  });

  it("할 일을 제출하면 인풋 창이 빈 값이 된다.", async () => {
    render(<TodoForm />);
    const user = userEvent.setup();
    const textField = screen.getByRole("textbox");
    const addButton = screen.getByRole("button");

    await user.type(textField, "user input test");
    await user.click(addButton);

    expect(textField).toHaveValue("");
  });
});
