"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "../components/TodoList";
import { Todo } from "../types/todo";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const todo: Todo = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => [
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    ),
  ];
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Todo App</h1>
      <div className="w-full max-w-md">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
      </div>
    </main>
  );
};
export default Home;
