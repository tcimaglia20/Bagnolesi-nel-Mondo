const express = require('express');
const router = express.Router();
const Thread = require('./models/Thread');

router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find()
        res.render('piazza', { title: 'The Piazza' , threads: threads })
    } catch (err) {
       res.status(500).send("Error fetching threads:" + err.message) 
    }
});

router.post('/threads', async (req, res) => {
    try {
        const newThread = new Thread(req.body);
        await newThread.save();
        res.redirect('/piazza')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const thread = await Thread.findById(id);
        if (!thread) {
            return res.redirect('/piazza');
        }
        res.render('id', { title: thread.title, thread: thread })
    } catch (error) {
        console.log(error);
        res.redirect('/piazza')
    }
})

module.exports = router;