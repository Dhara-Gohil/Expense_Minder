import Supplier from '../../models/Shopkeeper/supplierModel.js';

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}, 'name'); // Return only 'name' field
    const names = suppliers.map(s => s.name); // Map to plain array of names
    res.json(names);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Failed to fetch suppliers' });
  }
};
