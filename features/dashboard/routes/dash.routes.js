const express = require('express');
const router = express.Router();
const dashController = require('../controller/dash.controller');

router.get('/', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    };
    next();
}, dashController.userDashboard);

router.get('/admin', (req, res, next) => { 
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
}, dashController.adminDashboard);

module.exports = router;