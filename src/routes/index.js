import express from 'express';

const router = express.Router();

// Put together all routes through its routers
router.use('/tasks', require('./tasks'));
// other routes here ...

// Export complete router
module.exports = router;
