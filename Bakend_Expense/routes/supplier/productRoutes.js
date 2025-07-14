import express from 'express';
const router = express.Router();

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../../controllers/supplier/productController.js';

router.post('/products/add', addProduct);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
