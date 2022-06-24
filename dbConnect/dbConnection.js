const mongoose = require('mongoose');
let createError = require('http-errors');
require('dotenv/config');

let _client;
let _usersCollection;
let _entriesCollection;
let _profileCollection;
let _themesCollection;


//initialize database
const initDB = () => {
    mongoose.connect(process.env.MONGODB_URI, (err, client) => {
        if (err) console.log(createError(500, "Can't connect to the database"));
        console.log('Connected to the database');
        _client = client;
        _usersCollection = _client.db.collection('users');
        _entriesCollection = _client.db.collection('entries');
        _profileCollection = _client.db.collection('profile');
        _themesCollection = _client.db.collection('themes');
    });
};

// get user data from database
const getUsersCollection = () => {
    return _usersCollection;
};

// get user data from database
const getEntriesCollection = () => {
    return _entriesCollection;
};

// get user data from database
const getProfileCollection = () => {
    return _profileCollection;
};

// get user data from database
const getThemesCollection = () => {
    return _themesCollection;
};

module.exports = { initDB, getUsersCollection, getEntriesCollection, getProfileCollection, getThemesCollection };