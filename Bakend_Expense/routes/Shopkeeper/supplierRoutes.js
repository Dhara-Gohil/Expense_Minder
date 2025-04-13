import express from 'express';
import { getSuppliers } from '../../controllers/Shopkeeper/supplierController.js';

const router = express.Router();

router.get('/', getSuppliers); // Route to fetch all supplier names

export default router;
