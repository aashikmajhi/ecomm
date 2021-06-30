const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    query: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, { timestamps: true })

const replySchema = new mongoose.Schema({
    reply: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    queries: [querySchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        require: true
    }
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 50,
        require: true,
        unique: true
    },
    desc: {
        type: String,
        max: 1000,
        require: true
    },
    queries: [querySchema],
    replies: [replySchema]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)