const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const UserController = require('../controllers/UserController');
const ChatRoomController = require('../controllers/ChatRoomController');
const auth = require('../middlewares/auth');
// user apis
router.post('/api/user/login', catchErrors(UserController.login));
router.post('/api/user/register', catchErrors(UserController.register));
// Chatroom apis
router.post("/api/chatroom/create", auth, catchErrors(ChatRoomController.createChatRoom));
router.get("/api/chatroom", auth, catchErrors(ChatRoomController.getAllChatRooms));
// Message api
module.exports = router;