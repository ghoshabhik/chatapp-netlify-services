const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    textMessage: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    recepientIds:{
        type: [String],
        required: true,
    },
    isGroupMessage: {
        type: Boolean,
        required: false
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    status:{
        type: [String],
        required: false
    }
})


module.exports = mongoose.model('Message', messageSchema)