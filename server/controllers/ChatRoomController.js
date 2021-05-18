const ChatRoom = require('../models/ChatRoom');
exports.createChatRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const nameRegex = /^[A-Za-z\s]+$/;
        // console.log(nameRegex.test(name));
        if (!nameRegex.test(name)) {
            return res.json({
                message: "Chatroom name can contain only alphabets"
            });
        }
        const chatRoomExists = await ChatRoom.findOne({ name, createdBy: req.payload.user.id });
        if (chatRoomExists) {
            return res.json({
                message: `Chatroom with name [${name}] already exists!`
            });
        }
        const chatRoom = new ChatRoom({
            name,
            createdBy: req.payload.user.id
        })
        await chatRoom.save();
        return res.json({
            message: "Chatroom created"
        });
    } catch (err) {
        console.log(err)
    }
}
exports.getAllChatRooms = async (req, res) => {
    try {
        const projection = { _id: 1, name: 1 };
        const chatRooms = await ChatRoom.find({});
        return res.json({
            data: chatRooms,
        });
    } catch (err) {

    }
}