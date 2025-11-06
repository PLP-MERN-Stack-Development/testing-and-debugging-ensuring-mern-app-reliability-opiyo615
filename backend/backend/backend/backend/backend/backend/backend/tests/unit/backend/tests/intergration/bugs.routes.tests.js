
// Uses an in-memory MongoDB server for integration tests
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Bug = require('../../models/Bug');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Bug.deleteMany({});
});

describe('Bugs API', () => {
    test('POST /api/bugs creates a bug', async () => {
        const res = await request(app)
            .post('/api/bugs')
            .send({ title: 'Login fails', description: 'Cannot login' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe('Login fails');
    });

    test('GET /api/bugs returns list', async () => {
        await Bug.create({ title: 't1' });
        const res = await request(app).get('/api/bugs');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });

    test('PUT /api/bugs/:id updates status', async () => {
        const b = await Bug.create({ title: 'x' });
        const res = await request(app)
            .put(/api/bugs / ${ b._id })
            .send({ status: 'resolved', title: 'x' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('resolved');
    });

    test('DELETE /api/bugs/:id deletes bug', async () => {
        const b = await Bug.create({ title: 'toDelete' });
        const res = await request(app).delete(/api/bugs / ${ b._id });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted');
    });
});
