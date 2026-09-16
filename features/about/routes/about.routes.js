const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');

router.get('/', aboutController.renderAbout);

module.exports = router;