const Task = require('../../src/models/task');

describe('Task Model', () => {
    beforeEach(() => {
        Task.reset();
    });

    test('should create a new task', () => {
        const task = Task.create('Test Task', 'Description');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Description');
        expect(task.completed).toBe(false);
    });

    test('should get all tasks', () => {
        Task.create('Task 1', 'Desc 1');
        Task.create('Task 2', 'Desc 2');
        const tasks = Task.getAll();
        expect(tasks).toHaveLength(2);
    });

    test('should get task by id', () => {
        const created = Task.create('Find Me', 'Description');
        const found = Task.getById(created.id);
        expect(found.title).toBe('Find Me');
    });

    test('should update task', () => {
        const task = Task.create('Original', 'Desc');
        const updated = Task.update(task.id, { title: 'Updated', completed: true });
        expect(updated.title).toBe('Updated');
        expect(updated.completed).toBe(true);
    });

    test('should delete task', () => {
        const task = Task.create('Delete Me', 'Desc');
        const deleted = Task.delete(task.id);
        expect(deleted).toBe(true);
        expect(Task.getAll()).toHaveLength(0);
    });
});