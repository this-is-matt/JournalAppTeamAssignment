let connect = require('../dbConnect/dbConnection');
let Themes = require('../models/themes');
let ThemesNoAuto = require('../models/themesNoAuto');
let createError = require('http-errors');

// function to get all Themes in the Themes collection
function getThemes(req, res) {
    try {
        const results = connect.getThemesCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//function to get one Theme from the Themes collection using the _id
function getTheme(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        Themes.findById(id, (err, doc) => {
            if (err) {
                throw err;
            } else if (doc == null) {
                res.status(200).send({ "Response": `No Themes matched the id: ${id}` });
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

// function to create a new Themes
function createTheme(req, res) {
    try {
        const newTheme = new Themes(req.body);
        newTheme.save((err, doc) => {
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

// function to update a Themes
function updateTheme(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)){
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        }
        const newTheme = new ThemesNoAuto(req.body);
        ThemesNoAuto.findByIdAndUpdate(id, newTheme, (err, doc) => {
            if (err) {
                res.status(400).send(`{"Error": "${err}"}`);
            } else {
                res.status(200).send( `{"Updated": ${doc} with ${newTheme}}`);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

// function to delete a user
function deleteTheme(req, res) {
    let error = '';
    try {
        const id = req.params.id;
        if (!/^[A-Za-z0-9]{24}$/.test(id)) {
            error = createError(400, 'ID is required to be a 24 character string of letters and numbers');
            throw error;
        };
        Themes.findByIdAndDelete(id, (err, doc) => {
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


module.exports = { getTheme, getThemes, createTheme, updateTheme, deleteTheme };