const Todo = require('../models/todoModel');

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch todos', error: error.message });
    }
};

// Create a new todo for the logged-in user
const createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = new Todo({
            title,
            description,
            completed: completed || false,
            user: req.user.id,
        });

        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
};

// Update a specific todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or you do not have permission' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo', error: error.message });
    }
};

// Delete a specific todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or you do not have permission' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
