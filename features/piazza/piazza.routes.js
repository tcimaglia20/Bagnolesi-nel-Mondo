const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('piazza', { title: 'The Piazza' })
});

module.exports = router;