import express from 'express';
const router = express.Router();
import { createInvoice, getInvoices } from '../../controllers/supplier/invoiceController.js';

router.post('/create', createInvoice);
router.get('/all', getInvoices);

export default router;
