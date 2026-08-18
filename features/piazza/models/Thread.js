const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Thread', ThreadSchema);