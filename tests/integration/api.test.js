/**
 * Integration tests for the Task API.
 * These tests verify the connectivity between the API endpoints, controllers, and the Task model
 * by making actual HTTP requests using supertest.
 */
const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');

describe('Task API Endpoints', () => {
    // Clean up the task repository before each test to ensure a clean state
    beforeEach(() => {
        Task.reset();
    });

    /**
     * Testing the Health Check endpoint.
     * This ensures the server is running and responding correctly at the base level.
     */
    describe('GET /health', () => {
        test('should return healthy status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('healthy');
        });
    });

    /**
     * Testing the Task Creation endpoint.
     * Verifies both successful creation and validation error handling (missing title).
     */
    describe('POST /api/tasks', () => {
        // Success case: Title and description provided
        test('should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ title: 'New Task', description: 'Test description' });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe('New Task');
        });

        // Failure case: Missing title should trigger a 400 Bad Request
        test('should return 400 if title is missing', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ description: 'Test description' });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    /**
     * Testing the retrieval of all tasks.
     */
    describe('GET /api/tasks', () => {
        test('should get all tasks', async () => {
            // Seed the data for the test
            Task.create('Task 1', 'Desc 1');
            Task.create('Task 2', 'Desc 2');

            const res = await request(app).get('/api/tasks');
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveLength(2);
        });
    });

    /**
     * Testing specific task retrieval by ID.
     */
    describe('GET /api/tasks/:id', () => {
        // Success case: ID exists
        test('should get task by id', async () => {
            const task = Task.create('Find Me', 'Description');
            const res = await request(app).get(`/api/tasks/${task.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.title).toBe('Find Me');
        });

        // Failure case: Non-existent ID returns 404 Not Found
        test('should return 404 for non-existent task', async () => {
            const res = await request(app).get('/api/tasks/999');
            expect(res.statusCode).toBe(404);
        });
    });

    /**
     * Testing the update functionality of the task API.
     */
    describe('PUT /api/tasks/:id', () => {
        test('should update task', async () => {
            const task = Task.create('Original', 'Desc');
            const res = await request(app)
                .put(`/api/tasks/${task.id}`)
                .send({ title: 'Updated', completed: true });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.title).toBe('Updated');
            expect(res.body.data.completed).toBe(true);
        });
    });

    /**
     * Testing the deletion functionality of the task API.
     */
    describe('DELETE /api/tasks/:id', () => {
        test('should delete task', async () => {
            const task = Task.create('Delete Me', 'Desc');
            const res = await request(app).delete(`/api/tasks/${task.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});