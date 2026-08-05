const express = require('express');
const router = express.Router();

router.get('/legacy', (req, res) => {
    res.render('legacy', { title: 'Our Heritage' });
});

router.get('/profiles/pietro-cimaglia', (req, res) => {
    res.render('profiles/pietro-cimaglia', { title: 'Pietro Cimaglia' });
});

router.get('/vault', (req, res) => {
    res.render('vault', { title: 'Vault' })
});

module.exports = router;