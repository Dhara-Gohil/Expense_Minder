import ProductSupplier from '../../models/supplier/Product.js';

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = new ProductSupplier({ name, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductSupplier.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await ProductSupplier.findByIdAndUpdate(id, { name, quantity }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductSupplier.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
