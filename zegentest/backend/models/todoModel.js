const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referensi ke model User
        required: true
    }
});
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;