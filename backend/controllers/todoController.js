const todoService = require("../services/todoService");

// Controller to add a new todo
const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await todoService.addTodo(title, description);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller to get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching todos." });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { id,completed } = req.body;
    const todos = await todoService.updateTodo(id,completed);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {id} = req.body;
    const deleteTodo = await todoService.deleteTodo(id);
    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
};

