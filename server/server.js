require("dotenv").config();
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Message = require('./models/Message');
// const mongoose = require('mongoose');
// require('./models/User');
// require('./models/ChatRoom');
// require('./models/Message');
const app = require('./app');
const port = process.env.PORT || 8000;
connectDB();
// // bring in all models
// mongoose.connect(process.env.DATABASE_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
// mongoose.connection.on('error', (err) => {
//     console.log(`Mongoose connection error: ${err.message}`);
// });
// mongoose.connection.on('open', () => console.log('Mongodb connected'))

const server = app.listen(port, () => {
    console.log(`Server is listining on port:${port}`)
});
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = payload.user.id;
        next();
    } catch (err) { }
});
io.on('connection', (socket) => {
    console.log(`Connected ${socket.userId}`);
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.userId}`)
    });

    socket.on('joinRoom', ({ chatRoomId }) => {
        socket.join(chatRoomId);
        console.log(`A user joined chatroom: ${chatRoomId}`);
    })
    socket.on('leaveRoom', ({ chatRoomId }) => {
        socket.leave(chatRoomId);
        console.log(`A user left chatroom: ${chatRoomId}`);
    })
    socket.on('chatRoomMessage', async ({ chatRoomId, message }) => {
        console.log("new message:", chatRoomId, message, socket.userId, message.trim().length > 0);
        if (message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.userId });
            const newMessage = new Message({
                chatRoom: chatRoomId,
                user: user.id,
                message
            });
            await newMessage.save();
            io.to(chatRoomId).emit("newMessage", {
                chatRoomId,
                message,
                name: user.name,
                userId: socket.userId,
            })
        }
    })
});
// test route
app.get('/', (req, res) => res.status(200).send('Working'));