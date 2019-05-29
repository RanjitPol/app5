const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/product', (request, response) => {
    const statement = `select id, title, description, price, rating  from  Product`;
    const connection = db.connect();
    connection.query(statement, (error, products) => {
        connection.end();
        response.send(utils.createResponse(error, products));
    });
});

router.post('/product', (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const price = request.body.price;
    const rating = request.body.rating;

    const statement = `insert into Product 
        (title, description, price, rating) values
        ('${title}', '${description}', ${price}, ${rating})`;
    const connection = db.connect();
    connection.query(statement, (error, products) => {
        connection.end();
        response.send(utils.createResponse(error, products));
    });
});

router.put('/product/:id', (request, response) => {
    const id = request.params.id;
    const title = request.body.title;
    const description = request.body.description;
    const price = request.body.price;
    const rating = request.body.rating;
    
    const statement = `
        update Product set 
            title = '${title}',
            description = '${description}',
            price = ${price},
            rating = ${rating}
        where id = ${id}`;product
    const connection = db.connect();
    connection.query(statement, (error, products) => {
        connection.end();
        response.send(utils.createResponse(error, products));
    });
});

router.delete('/product/:id', (request, response) => {
    const id = request.params.id;
    const statement = `delete  from  Product where id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, products) => {
        connection.end();
        response.send(utils.createResponse(error, products));
    });
});

module.exports = router;