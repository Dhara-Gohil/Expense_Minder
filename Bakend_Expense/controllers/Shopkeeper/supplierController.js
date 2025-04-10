// controllers/Shopkeeper/supplierController.js
import Supplier from '../../models/Shopkeeper/supplierModel.js';

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};
