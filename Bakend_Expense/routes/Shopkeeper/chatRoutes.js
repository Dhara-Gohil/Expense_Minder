import express from 'express';
import { getChats, insertSuppliers ,saveChat } from '../../controllers/Shopkeeper/chatController.js'; // ✅ updated

const router = express.Router();

router.get('/', getChats);
router.post('/', saveChat); 
router.post('/insert-suppliers', insertSuppliers); // ✅ meaningful endpoint

export default router;
