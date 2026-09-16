const express = require('express');
const router = express.Router();
const passport = require('passport')
const authController = require('../controllers/auth.controller');

router.get('/login', (req, res) => {
    res.render('../views/login', authController.getLoginData(req, res));
})

router.get('/register', (req, res) => {
    res.render('../views/register', authController.getRegisterData(req, res) );
})

router.post('/register', authController.register);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: 'auth/login',
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

module.exports = router;