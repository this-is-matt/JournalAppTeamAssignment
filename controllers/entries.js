let connect = require('../dbConnect/dbConnection');
let Entries = require('../models/entries');
let EntriesNoAuto = require('../models/entriesNoAuto');
let createError = require('http-errors');

// function to get all entries in the Entries collection
function getEntries(req, res) {
    try {
        const results = connect.getEntriesCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//function to get one entry from the Entries collection using the _id
function getEntry(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        Entries.findById(id, (err, doc) => {
            if (err) {
                throw err;
            } else if (doc == null) {
                res.status(200).send({ "Response": `No entries matched the id: ${id}` });
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

// function to create a new Journal entry
function createEntry(req, res) {
    try {
        const newEntry = new Entries(req.body);
        newEntry.save((err, doc) => {
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

// function to update a Journal entry
function updateEntry(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        const newEntry = new EntriesNoAuto(req.body);
        EntriesNoAuto.findByIdAndUpdate(id, newEntry, (err, doc) => {
            if (err) {
                res.status(400).send(`{"Error": "${err}"}`);
            } else {
                res.status(200).send( `{"Updated": ${doc} with ${newEntry}}`);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// function to delete a user
function deleteEntry(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)) {
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        };
        Entries.findByIdAndDelete(id, (err, doc) => {
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


module.exports = { getEntry, getEntries, createEntry, updateEntry, deleteEntry };