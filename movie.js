const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');
const upload = multer({dest:'images/'});

const router = express.Router();

router.get('/movie', (request, response) => {
    const statement = `select id, title, year, rating, shortdescription, directors, writers, stars, storyline, thumbnail 
     from  Movie`;
    const connection = db.connect();
    connection.query(statement, (error, movies) => {
        connection.end();
        response.send(utils.createResponse(error, movies));
    });
});

module.exports= router;