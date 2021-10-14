const express = require("express");
const app = express();
const logic = require("./logic");

//test server
app.get('/ping', (req, res) => {
    res.send('pong')
});

//register
app.post('/register', async (req, res) => {
    try {
        let result = await new logic().CreatePolitic(req.body);
        res.status(201).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

module.exports = app;