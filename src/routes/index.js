import express from 'express';

const router = express.Router();

// Put together all routes through its routers
router.use('/doc', require('./doc'));
router.use('/project-board', require('./project-board'));
router.use('/tasks', require('./tasks'));
// add more routes here ...

// Export complete router
module.exports = router;
