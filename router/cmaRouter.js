const express = require('express');
const router = express.Router();
const cmacontroller = require('../controller/cmacontroller')
const auth = require('../middleware/authMiddleware')
const upload = require('../middleware/fileUpload')

// cma  route
router.get('/getContent',auth.authenticate, cmacontroller.getHomePageContent);
router.patch('/content',auth.authenticate,upload.array('banners', 5), cmacontroller.updateHomePageContent);

module.exports = router;
