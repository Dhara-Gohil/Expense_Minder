import express from 'express';
const router = express.Router();

import {
  createInvoice,
  getInvoices,
  getShopkeeperInvoices,
} from '../../controllers/supplier/invoiceController.js';

router.post('/create', createInvoice);
router.get('/all', getInvoices);
router.get('/shopkeeper', getShopkeeperInvoices); // /api/supplier/invoice/shopkeeper?shopkeeperId=xyz

export default router;
  