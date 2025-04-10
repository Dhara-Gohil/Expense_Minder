// routes/Shopkeeper/supplierRoutes.js
import express from 'express';
import { getSuppliers } from '../../controllers/Shopkeeper/supplierController.js';

const router = express.Router();

router.get('/', getSuppliers);

export default router;
