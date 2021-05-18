const mongoose = require('mongoose');
const ChatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required!'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:"User id is required!",
    }
});
module.exports = ChatRoom = mongoose.model('chatRoom', ChatRoomSchema);