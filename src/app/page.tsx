"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Task } from "../types/todo";

const API_URL = "http://localhost:8000/todos";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    if (Array.isArray(tasks) && tasks.length) {
      setTasks(tasks);
    }
  };
  useEffect(() => {
    fetchTodos();
    // setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }, []);

  const onDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    console.log("Todo deleted:", id);
    fetchTodos(); // Refresh the todo list
    // const updatedTasks = tasks.filter((task) => task.id !== id);
    // setTasks(updatedTasks);
    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const onToggle = async (id: number) => {
    const todo = await fetch(`${API_URL}/${id}`).then((res) => res.json());
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updatedTodo = await response.json();
    console.log("Todo updated:", updatedTodo);
    fetchTodos();
    // Refresh the todo list
    // const updatedTasks = tasks.map((task) =>
    //   task.id === id ? { ...task, completed: !task.completed } : task
    // );
    // setTasks(updatedTasks);
    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between p-2 rounded">
          <h1 className="text-2xl font-bold mb-4">Tasks</h1>
          <Link href="/addTask">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
              Add Task
            </button>
          </Link>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 bg-white rounded"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span
                  className={`text-lg ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
