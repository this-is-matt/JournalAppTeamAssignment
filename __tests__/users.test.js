//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');

describe('endpoints', () => {
    describe('test entries endpoint functions', () => {
        beforeAll(function () {
            // create fake call backs for authentication
            auth.ensureGuest.callsFake((req, res, next) => next());
            auth.ensureAuth.callsFake((req, res, next) => next());
            auth.ensureAuth2.callsFake((req, res, next) => next());
            
        });
        afterAll(function() {
            // restore original method
            auth.ensureGuest.restore();
            auth.ensureAuth.restore();
            auth.ensureAuth2.restore();
        });
        it('Users endpoint function getUser() should return a 400', async () => {
            const usersId = '62b66cef20fba432c016e9';
            await supertest(app).get(`/users/${usersId}`).expect(400);
        });
        it('Users endpoint function getUser() should return a 200', async () => {
            const usersId = '62b66cef20fba432c016e9c9';
            await supertest(app).get(`/users/${usersId}`).expect(200);
        });
    })
});