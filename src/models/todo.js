// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: String, // Puedes ajustar el tipo según tus necesidades
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
