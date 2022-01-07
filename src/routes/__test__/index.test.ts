import request from 'supertest';
import { app } from '../../app';

it('should not return any data!', async () => {
    const response = await request(app)
    .post('/api/challenge')
    .send({
        startDate: '2015-01-05',
        endDate: '2015-05-08',
        maxCount: 0,
        minCount: 0
    });

    expect(response.body[0].code).toEqual(404);
});

it('should validate date format!', async () => {
    const response = await request(app)
    .post('/api/challenge')
    .send({
        startDate: '2021-10-05',
        endDate: '2021-1030'
    });

    expect(response.body[0].code).toEqual(400);
});