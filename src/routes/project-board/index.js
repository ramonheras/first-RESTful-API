import express from 'express';

const projectBoardRoute = express.Router();

// GET method route
projectBoardRoute.get('/', (req, res) => {
    res.redirect(process.env.PROJECT_BOARD_URL);
});

module.exports = projectBoardRoute;
