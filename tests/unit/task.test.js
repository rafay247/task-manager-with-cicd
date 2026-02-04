/**
 * Unit tests for the Task model.
 * These tests verify the core logic of task management without any HTTP overhead.
 */
const Task = require('../../src/models/task');

describe('Task Model', () => {
    // Reset the internal task store before each test to ensure test isolation
    beforeEach(() => {
        Task.reset();
    });

    /**
     * Test case: Verify that a new task can be successfully created.
     * It checks if the title, description are set correctly and completion status is false by default.
     */
    test('should create a new task', () => {
        const task = Task.create('Test Task', 'Description');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Description');
        expect(task.completed).toBe(false);
    });

    /**
     * Test case: Verify that all tasks can be retrieved.
     * It adds two tasks and expects the list to contain exactly two items.
     */
    test('should get all tasks', () => {
        Task.create('Task 1', 'Desc 1');
        Task.create('Task 2', 'Desc 2');
        const tasks = Task.getAll();
        expect(tasks).toHaveLength(2);
    });

    /**
     * Test case: Verify retrieval of a specific task by its unique ID.
     */
    test('should get task by id', () => {
        const created = Task.create('Find Me', 'Description');
        const found = Task.getById(created.id);
        expect(found.title).toBe('Find Me');
    });

    /**
     * Test case: Verify that existing tasks can be updated correctly.
     * Checks if both specific fields (title) and toggleable fields (completed) are updated.
     */
    test('should update task', () => {
        const task = Task.create('Original', 'Desc');
        const updated = Task.update(task.id, { title: 'Updated', completed: true });
        expect(updated.title).toBe('Updated');
        expect(updated.completed).toBe(true);
    });

    /**
     * Test case: Verify that a task can be deleted.
     * It ensures the deletion returns true and the total count of tasks decreases.
     */
    test('should delete task', () => {
        const task = Task.create('Delete Me', 'Desc');
        const deleted = Task.delete(task.id);
        expect(deleted).toBe(true);
        expect(Task.getAll()).toHaveLength(0);
    });
});