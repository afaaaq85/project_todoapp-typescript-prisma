// src/services/todoService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addTodo = async (title, description) => {
  return await prisma.todo.create({
    data: {
      title,
      description,
      completed: false,
    },
  });
};

const getTodos = async () => {
    const allTodos = await prisma.todo.findMany();
    return allTodos;
};

const deleteTodo = async (id) => {
  return await prisma.todo.delete({
    where: { id },
  });
};

const updateTodo = async (id, completed) => {
  return await prisma.todo.update({
    where: { id: id },
    data: { completed: completed },
  });
};

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};
