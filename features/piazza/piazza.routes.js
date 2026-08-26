const express = require('express');
const router = express.Router();
const Thread = require('./models/Thread');
const { getReplyWithUser, getFullThread } = require('./controllers/piazzaController');
const Reply = require('./models/Reply');

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
        const replies = await Reply.find({ thread: id }).populate('user', 'username');
        res.render('id', { title: thread.title, thread, replies })
    } catch (error) {
        console.log(error);
        res.redirect('/piazza')
    }
})

router.get('/:id/reply', async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id);
        if (!thread) return res.status(404).send('Thread not found');
        res.render('reply', {
            thread,
            currentUser: { id: '65c123456789abcdef123456' },
            title: 'Create a Reply!'
        })
    } catch {
        res.redirect('/piazza')
    }
})

router.post('/replies', async (req, res) => {
    try {
        const newReply = new Reply(req.body);
        await newReply.save();
        const threadId = req.body.thread;
        res.redirect(`/piazza/${threadId}`)
    } catch {
        res.redirect('/piazza')
    }
})

router.get('/replies', getReplyWithUser);

router.get('/thread/:threadId', getFullThread);

module.exports = router;