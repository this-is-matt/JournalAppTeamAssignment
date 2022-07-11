const auth= require('../middleware/auth.js');
const sinon = require('sinon');

const originalEnsureGuest = auth.ensureGuest;
const stubbedEnsureGuest = sinon.stub(auth, 'ensureGuest');
const originalEnsureAuth = auth.ensureAuth;
const stubbedEnsureAuth = sinon.stub(auth, 'ensureAuth');
const originalEnsureAuth2 = auth.ensureAuth2;
const stubbedEnsureAuth2 = sinon.stub(auth, 'ensureAuth2');

const server = require('../utils/server.js');
const app = server.createServer();

module.exports = {
    originalEnsureGuest,
    stubbedEnsureGuest,
    originalEnsureAuth,
    stubbedEnsureAuth,
    originalEnsureAuth2,
    stubbedEnsureAuth2,
    app,
};