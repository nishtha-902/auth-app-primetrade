import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: "Title and category are required" });
  }

  const task = await Task.create({
    title,
    category,
    user: req.user,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const { search, category } = req.query;

  let query = { user: req.user };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
