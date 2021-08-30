import express from 'express';

const tasksRoute = express.Router();

// GET method route
tasksRoute.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

// POST method route
tasksRoute.post('/', (req, res) => {
    res.send('POST request to the homepage');
});

module.exports = tasksRoute;
