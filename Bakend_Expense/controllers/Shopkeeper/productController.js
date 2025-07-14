import Product from '../../models/Shopkeeper/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching products' });
  }
};

// Add new product 
export const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = new Product({ name, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

// Update product quantity
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
