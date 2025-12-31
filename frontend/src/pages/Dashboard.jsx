import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [categories, setCategories] = useState(["Work", "Personal", "Study"]);

  useEffect(() => {
    fetchTasks();
  }, [search, filterCategory]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      params: {
        search,
        category: filterCategory,
      },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !category) {
      alert("Title and category required");
      return;
    }

    await api.post("/tasks", { title, category });

    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }

    setTitle("");
    setCategory("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen w-[98vw] bg-gradient-to-r from-slate-900 to-slate-800">
      <Navbar />

      <div className="flex justify-center items-center">
        <div className="w-[70%] px-8 py-10">
          <div className="bg-white rounded-2xl shadow-xl p-10 w-full">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Tasks</h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-3 border rounded-lg text-slate-900"
              />

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-3 border rounded-lg text-slate-900"
              >
                <option>All</option>
                {categories.map((cat, idx) => (
                  <option key={idx}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="flex-1 p-3 border rounded-lg text-slate-900"
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (e.g. Work, Personal or Study)"
                className="flex-1 p-3 border rounded-lg text-slate-900"
              />

              <button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg font-semibold"
              >
                Add
              </button>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 && (
                <p className="text-gray-500">No tasks found.</p>
              )}

              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-100 rounded-xl px-6 py-4"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {task.category}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-black text-red-500 px-6 py-2 rounded-xl font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
