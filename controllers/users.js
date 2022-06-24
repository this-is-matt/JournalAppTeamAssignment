let connect = require('../dbConnect/dbConnection');
let Users = require('../models/users');
let UsersNoAuto = require('../models/usersNoAuto');
let createError = require('http-errors');

// function to get all Users in the users collection
function getUsers(req, res) {
    try {
        const results = connect.getUsersCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//function to get one user from the users collection using the _id
function getUser(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        Users.findById(id, (err, doc) => {
            if (err) {
                throw err;
            } else if (doc == null) {
                res.status(200).send({ "Response": `No users matched the id: ${id}` });
            } else {
                res.status(200).json(doc);
            }
        });
    } catch (err) {
        if (error !== '') {
            res.status(400).send(error);
        } else {
            res.status(500).send(err);
        }
    }
}

// function to create a new user
function createUser(req, res) {
    try {
        const newUser = new Users(req.body);
        newUser.save((err, doc) => {
            if (err) {
                res.status(400).send(`{"Error": "${JSON.stringify(err.keyValue)} already exists"}`);
            } else {
                res.status(200).send({ "Created": doc });
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// function to update a user
function updateUser(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        const newUser = new UsersNoAuto(req.body);
        UsersNoAuto.findByIdAndUpdate(id, newUser, (err, doc) => {
            if (err) {
                res.status(400).send(`{"Error": "${err}"}`);
            } else {
                res.status(200).send( `{"Updated": ${doc} with ${newUser}}`);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// function to delete a user
function deleteUser(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)) {
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        };
        Users.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.status(400).send(`{"Deletion Error": "Id ${err.value}"}`);
            } else {
                res.status(200).send({ "Deleted": doc });
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };