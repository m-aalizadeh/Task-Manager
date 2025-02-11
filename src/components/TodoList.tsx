import React from "react";
import { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-2 bg-white shadow rounded"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span
              className={`text-lg ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
