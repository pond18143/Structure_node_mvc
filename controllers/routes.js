const express = require("express");
const app = express();
const logic = require("./logic");

//test server
app.get('/ping', (req, res) => {
    res.send('pong')
});

//Assignment
app.post('/Assignment', async (req, res) => {
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

//TurnIn
app.post('/TurnIn', async (req, res) => {
    try {
        let result = await new logic().TurnIn(req.body);
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

//TurnIn
app.get('/SummaryAssignment', async (req, res) => {
    try {
        let result = await new logic().GetAssignment(req.body);
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