//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');
const test_config = require('../utils/test_config.js');

describe('routing', () => {
    describe('test routes with authentication', () => {
        beforeAll(function () {
            // create fake call backs for authentication
            auth.ensureGuest.callsFake(test_config.originalEnsureGuest);
            auth.ensureAuth.callsFake(test_config.originalEnsureAuth);
            auth.ensureAuth2.callsFake(test_config.originalEnsureAuth2);
        });
        afterAll(function() {
            // restore original method
            auth.ensureGuest.restore();
            auth.ensureAuth.restore();
            auth.ensureAuth2.restore();
        });
        it('Route for Entries should return an authentication error 401', async () => {
            const entriesId = '62b66cef20fba432c016e9c9';
            await supertest(app).get(`/entries/${entriesId}`).expect(401);
        });
    })
});