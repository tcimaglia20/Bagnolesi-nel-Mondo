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
    if (!thread) {
        return res.status(404).json({ message: "Thread not found" })
    }
    if (thread.isDeleted && req.user?.role !== 'admin') {
        return res.status(404).json({ message: "Thread not found" })
    }
    const replies = await Reply.find({ thread: threadId }).populate('user', 'username');
    res.json({ thread, replies });
}

const adminDeleteThread = async (req, res) => {
    const threadId = req.params.id;
    try {
        const deletedThread = await Thread.findByIdAndUpdate(
            threadId,
            { isDeleted: true },
            { returnDocument: 'after' }
        );
        if (!deletedThread) {
            return res.status(404).json({
                success: false,
                message: "Thread not found."
            })
        }
        return res.status(200).json({
            success: true,
            message: `Thread successfully removed by admin.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error ocurred while removing thread."
        });
    }
}

const adminRestoreThread = async (req, res) => {
    const threadId = req.params.id;
    try {
        const restoredThread = await Thread.findByIdAndUpdate(
            threadId,
            { isDeleted: false },
            { returnDocument: 'after' }
        );
        if (!restore) {
            return res.status(404).json({
                success: false,
                message: "Thread not found."
            })
        }
        return res.status(200).json({
            success: true,
            message: `Thread successfully restored by admin.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error ocurred while restoring thread."
        });
    }
}

module.exports = {
    getReplyWithUser,
    getFullThread,
    adminDeleteThread,
    adminRestoreThread
}