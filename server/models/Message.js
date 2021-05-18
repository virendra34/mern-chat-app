const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required",
        ref: "ChatRoom"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "User is required!",
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required!",
    }
});
module.exports = Message = mongoose.model('Message', MessageSchema);