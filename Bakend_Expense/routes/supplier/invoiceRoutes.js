import express from 'express';
const router = express.Router();

import {
  createInvoice,
  getInvoices,
  getShopkeeperInvoices,
  markInvoiceAsPaid,
} from '../../controllers/supplier/invoiceController.js';

router.post('/create', createInvoice);
router.get('/all', getInvoices);
router.get('/shopkeeper', getShopkeeperInvoices); // /api/supplier/invoice/shopkeeper?shopkeeperId=xyz
router.put('/mark-paid/:invoiceId', markInvoiceAsPaid);

export default router;
  