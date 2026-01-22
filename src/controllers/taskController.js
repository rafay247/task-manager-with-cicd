const Task = require('../models/task');

exports.getAllTasks = (req, res) => {
    const tasks = Task.getAll();
    res.json({ success: true, data: tasks });
};

exports.getTaskById = (req, res) => {
    const task = Task.getById(req.params.id);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
};

exports.createTask = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const task = Task.create(title, description);
    res.status(201).json({ success: true, data: task });
};

exports.updateTask = (req, res) => {
    const task = Task.update(req.params.id, req.body);
    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
};

exports.deleteTask = (req, res) => {
    const deleted = Task.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted' });
};