const express = require('express');
const router = express.Router();
const admincontroller = require('../controller/adminController')


// Admin  route
router.post('/login', admincontroller.login);
router.post('/register', admincontroller.register);

module.exports = router;
