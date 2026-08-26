const User = require('../../../models/User');
const Reply = require('../models/Reply');
const Thread = require('../models/Thread');

const getReplyWithUser = async (req, res) => {
    const replies = await Reply.find().populate('user', 'username avatar');
    res.json(replies);
};

const getFullThread = async (req, res) => {
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId).populate('user', 'username');
    if (!thread) return res.status(404).json({ message: "Thread not found" })
    const replies = await Reply.find({ thread: threadId }).populate('user', 'username');
    res.json({ thread, replies });
}

module.exports = {
    getReplyWithUser,
    getFullThread
}