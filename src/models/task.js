// In-memory database (for learning purposes)
let tasks = [];
let currentId = 1;

class Task {
    constructor(title, description, completed = false) {
        this.id = currentId++;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = new Date();
    }

    static getAll() {
        return tasks;
    }

    static getById(id) {
        return tasks.find(task => task.id === parseInt(id));
    }

    static create(title, description) {
        const task = new Task(title, description);
        tasks.push(task);
        return task;
    }

    static update(id, updates) {
        const task = this.getById(id);
        if (!task) return null;

        Object.assign(task, updates);
        return task;
    }

    static delete(id) {
        const index = tasks.findIndex(task => task.id === parseInt(id));
        if (index === -1) return false;

        tasks.splice(index, 1);
        return true;
    }

    static reset() {
        tasks = [];
        currentId = 1;
    }
}

module.exports = Task;