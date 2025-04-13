import express from 'express';
import { getChats, saveChat,saveSupplierReply } from '../controllers/chatController.js';
import { updateChatStatus } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getChats);
router.post('/', saveChat);
// Adding route to handle supplier reply
router.post('/reply', saveSupplierReply); // New route for supplier reply
router.patch('/status/:id', updateChatStatus); 



export default router;
