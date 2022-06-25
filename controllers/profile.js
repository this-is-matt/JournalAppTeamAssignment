let connect = require('../dbConnect/dbConnection');
let Profile = require('../models/profile');
let ProfileNoAuto = require('../models/profileNoAuto');
let createError = require('http-errors');

// function to get all Profiles in the Profile collection
function getProfiles(req, res) {
    try {
        const results = connect.getProfileCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//function to get one Profile from the Profile collection using the _id
function getProfile(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        Profile.findById(id, (err, doc) => {
            if (err) {
                throw err;
            } else if (doc == null) {
                res.status(200).send({ "Response": `No profiles matched the id: ${id}` });
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

// function to create a new Profile
function createProfile(req, res) {
    try {
        const newProfile = new Profile(req.body);
        newProfile.save((err, doc) => {
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

// function to update a Profile
function updateProfile(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        const newProfile = new ProfileNoAuto(req.body);
        ProfileNoAuto.findByIdAndUpdate(id, newProfile, (err, doc) => {
            if (err) {
                res.status(400).send(`{"Error": "${err}"}`);
            } else {
                res.status(200).send( `{"Updated": ${doc} with ${newProfile}}`);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// function to delete a Profile
function deleteProfile(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)) {
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        };
        Profile.findByIdAndDelete(id, (err, doc) => {
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


module.exports = { getProfile, getProfiles, createProfile, updateProfile, deleteProfile };