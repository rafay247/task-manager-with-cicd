const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');

describe('Task API Endpoints', () => {
    beforeEach(() => {
        Task.reset();
    });

    describe('GET /health', () => {
        test('should return healthy status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('healthy');
        });
    });

    describe('POST /api/tasks', () => {
        test('should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ title: 'New Task', description: 'Test description' });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe('New Task');
        });

        test('should return 400 if title is missing', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({ description: 'Test description' });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('GET /api/tasks', () => {
        test('should get all tasks', async () => {
            Task.create('Task 1', 'Desc 1');
            Task.create('Task 2', 'Desc 2');

            const res = await request(app).get('/api/tasks');
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveLength(2);
        });
    });

    describe('GET /api/tasks/:id', () => {
        test('should get task by id', async () => {
            const task = Task.create('Find Me', 'Description');
            const res = await request(app).get(`/api/tasks/${task.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.title).toBe('Find Me');
        });

        test('should return 404 for non-existent task', async () => {
            const res = await request(app).get('/api/tasks/999');
            expect(res.statusCode).toBe(404);
        });
    });

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

    describe('DELETE /api/tasks/:id', () => {
        test('should delete task', async () => {
            const task = Task.create('Delete Me', 'Desc');
            const res = await request(app).delete(`/api/tasks/${task.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});