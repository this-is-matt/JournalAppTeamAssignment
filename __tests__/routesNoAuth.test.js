//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');

describe('routing', () => {
    describe('test routes without authentication', () => {
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
        it('Route test should return a 404 error because of bad path request', async () => {
            await supertest(app).get(`/user`).expect(404);
        });
    })
});