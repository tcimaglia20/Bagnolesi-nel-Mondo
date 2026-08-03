const express = require('express');
const router = express.Router();

router.get('/legacy', (req, res) => {
    res.render('legacy', { title: 'Our Heritage' });
});

module.exports = router;