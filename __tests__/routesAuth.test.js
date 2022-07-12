//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');
const test_config = require('../utils/test_config.js');
const mongoose = require('mongoose');

describe('routing', () => {
    describe('test routes with authentication', () => {
        beforeAll(function () {
            // create fake call backs for authentication
            auth.ensureGuest.callsFake(test_config.originalEnsureGuest);
            auth.ensureAuth.callsFake(test_config.originalEnsureAuth);
            auth.ensureAuth2.callsFake(test_config.originalEnsureAuth2);
        });
        afterAll(async function() {
            // restore original method
            auth.ensureGuest.restore();
            auth.ensureAuth.restore();
            auth.ensureAuth2.restore();
            await mongoose.disconnect();
        });
        it('Route for Entries should return an authentication error 401', async () => {
            const entriesId = '62b66cef20fba432c016e9c9';
            await supertest(app).get(`/entries/${entriesId}`).expect(401);
        });
        it('Route for Profile should return an authentication error 401', async () => {
            const profileId = '62b66acd4eb18e69d8ed4b5b';
            await supertest(app).get(`/profile/${profileId}`).expect(401);
        });
        it('Route for Themes should return an authentication error 401', async () => {
            const themeId = '62b66bb057af867560bdfe6e';
            await supertest(app).get(`/themes/${themeId}`).expect(401);
        });
        it('Route for Users should return an authentication error 401', async () => {
            const usersId = '62b66cef20fba432c016e9c9';
            await supertest(app).get(`/users/${usersId}`).expect(401);
        });
    })
});