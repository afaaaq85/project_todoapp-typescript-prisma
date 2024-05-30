const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/get-todos', todoController.getTodos);
router.post('/add-todo', todoController.addTodo);
router.patch('/update-todo', todoController.updateTodo);
router.delete('/delete-todo', todoController.deleteTodo);
// Include deleteTodo and updateTodo routes here as well

module.exports = router;
