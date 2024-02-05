const Todo = require('../models/todo');
const { jsonResponse } = require('./jsonResponse');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ isUser: req.user.id });
        if (todos.length > 0) {
            res.json(todos);
        } else {
            res.status(404).json({ error: 'Tareas no encontradas.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error interno del servidor.' }));
    }
};

exports.createTodo = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({ error: 'Se requiere un título para la tarea.' });
        return;
    }

    try {
        const todo = new Todo({
            title: req.body.title,
            completed: false,
            isUser: req.user.id,
        });

        const newTodo = await todo.save();

        res.json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error interno del servidor.' }));
    }
};
