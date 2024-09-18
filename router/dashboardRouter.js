const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controller/dashboardController')
const auth = require('../middleware/authMiddleware')

//dashboard route
router.get('/recentActivity',auth.authenticate, dashboardcontroller.getRecentActivities);


module.exports = router;