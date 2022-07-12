//testing dependencies
const supertest = require('supertest');
const { app } = require('../utils/test_config.js');
const auth = require('../middleware/auth.js');

describe('endpoints', () => {
    describe('test themes endpoint functions', () => {
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
        it('Themes endpoint function getTheme() should return a 400', async () => {
            const themeId = '62b66cef20fba432c016e9';
            await supertest(app).get(`/themes/${themeId}`).expect(400);
        });
        it('Themes endpoint function getTheme() should return a 200', async () => {
            const themeId = '62b66bb057af867560bdfe6e';
            await supertest(app).get(`/themes/${themeId}`).expect(200);
        });
    })
});