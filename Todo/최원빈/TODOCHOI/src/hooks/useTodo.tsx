import React from 'react';
import { useState } from 'react';
import { TodoListItem } from '../types/todoType';
const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [todoContent, setTodoContent] = useState('');
  const [showTodoContent, setShowTodoContent] = useState('all');

  //파생 상태라서 상태로 두는게, 아닌 필터함수로 상태 대신 객체화
  const completedTodoList = todoList.filter((item) => item.completed);
  const notCompletedTodoList = todoList.filter((item) => !item.completed);

  const addTodo = (): void => {
    if (todoContent.trim() === '') return;
    const newTodo = { id: Date.now(), text: todoContent, completed: false };
    setTodoList((prev) => [...prev, newTodo]);
    setTodoContent('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const deleteTodo = (id: number): void => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  return {
    todoList,
    todoContent,
    setTodoList,
    setTodoContent,
    showTodoContent,
    setShowTodoContent,
    completedTodoList,
    notCompletedTodoList,
    addTodo,
    deleteTodo,
    toggleTodo,
    handleInputChange,
  };
};

export default useTodo;
