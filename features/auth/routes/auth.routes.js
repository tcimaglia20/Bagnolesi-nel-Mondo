const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', (req, res) => {
    res.render('../views/login', authController.getLoginData(req, res));
})

router.get('/register', (req, res) => {
    res.render('../views/register', authController.getRegisterData(req, res));
})

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;