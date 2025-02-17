"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../types/todo";
export default function AddTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localStorage.getItem("tasks")) {
      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, { id: uuidv4(), title, completed: false }])
      );
    } else {
      localStorage.setItem(
        "tasks",
        JSON.stringify([{ id: uuidv4(), title, completed: false }])
      );
    }
    router.push("/");
  };

  return (
    <div className="container mx-auto p-t">
      <h1 className="text-2xl m-4 font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-5">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-green-500 text-white ml-5 px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
      {/* <Link href="/">
        <button className=" mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded">
          Back to Tasks
        </button>
      </Link> */}
    </div>
  );
}
