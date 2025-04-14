import express from 'express';
import { getShopkeepers } from '../../controllers/Shopkeeper/shopkeeperController.js';

const router = express.Router();

router.get('/', getShopkeepers);

export default router;
