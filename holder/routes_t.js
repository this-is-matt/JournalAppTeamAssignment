const app = require('express').Router();
const supertest = require('supertest');
const request = supertest.request;
const router = require('../controllers/entries');

app.use('/entries', router);

describe('Journal Routes', function () {

    test('responds to GET /', async () => {
      const res = await request(app).get('/');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
  
  });

module.exports = app;