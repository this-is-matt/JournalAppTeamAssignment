//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');
const mongoose = require('mongoose');

describe('endpoints', () => {
    describe('test profile endpoint functions', () => {
        beforeAll(function () {
            // create fake call backs for authentication
            auth.ensureGuest.callsFake((req, res, next) => next());
            auth.ensureAuth.callsFake((req, res, next) => next());
            auth.ensureAuth2.callsFake((req, res, next) => next());
            
        });
        afterAll(async function() {
            // restore original method
            auth.ensureGuest.restore();
            auth.ensureAuth.restore();
            auth.ensureAuth2.restore();
            await mongoose.disconnect();
        });
        it('Profile endpoint function getProfile() should return a 400', async () => {
            const profileId = '62b66cef20fba432c016e9';
            await supertest(app).get(`/profile/${profileId}`).expect(400);
        });
        it('Profile endpoint function getProfile() should return a 200', async () => {
            const profileId = '62b66acd4eb18e69d8ed4b5b';
            await supertest(app).get(`/profile/${profileId}`).expect(200);
        });
    })
});