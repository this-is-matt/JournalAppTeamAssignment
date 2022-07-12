const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');

describe('routes', () => {
    describe('test all routes', () => {
        describe('given the routes are working and ids exist', () => {
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
            it('Entries endpoint should return a 200', async () => {
               const entriesId = '62b66cef20fba432c016e9c9';
               await supertest(app).get(`/entries/${entriesId}`).expect(200);
            });
            it('Profile endpoint should return a 200', async () => {
                const profileId = '62b66acd4eb18e69d8ed4b5b';
                await supertest(app).get(`/profile/${profileId}`).expect(200);
            });
            it('Themes endpoint should return a 200', async () => {
                const themesId = '62b66bb057af867560bdfe6e';
                await supertest(app).get(`/themes/${themesId}`).expect(200);
            });
            it('Users endpoint should return a 200', async () => {
                const usersId = '62b64382b7240f4e657039fb';
                await supertest(app).get(`/users/${usersId}`).expect(200);
            });
        });
    });
});