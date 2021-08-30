import express from 'express';

const router = express.Router();

// Put together all routes through its routers
router.use('/tasks', require('./tasks'));
router.use('/doc', require('./doc'));
// add more routes here ...

// Export complete router
module.exports = router;
