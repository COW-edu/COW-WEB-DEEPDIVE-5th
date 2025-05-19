import React from 'react';
import Input from '../atoms/input';
import Button from '../atoms/button';
import Todo from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      key={todo.id}
      className="w-full h-12 py-6 flex items-center group relative"
    >
      <Input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <label className="text-xl">{todo.text}</label>
      {/* 삭제버튼 */}
      <Button variant="delete" onClick={() => onDelete(todo.id)}>
        X
      </Button>
    </div>
  );
};

export default TodoItem;
