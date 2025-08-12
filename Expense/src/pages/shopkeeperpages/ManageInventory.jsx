/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function ManageInventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });

  const API = `${import.meta.env.VITE_API_BASE_URL}/api/products`;

  // Fetch all products
  useEffect(() => {
      axios.get(API)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Add new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity) {
      axios.post(API, {
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
      })
      .then(res => {
        setProducts([...products, res.data]);
        setNewProduct({ name: '', quantity: '' });
      })
      .catch(err => console.error('Error adding product:', err));
    }
  };

  // Update quantity
  const handleQuantityChange = (id, value) => {
    const updatedQty = parseInt(value);
    axios.put(`${API}/${id}`, { quantity: updatedQty })
      .then(res => {
        setProducts(products.map(item => (item._id === id ? res.data : item)));
      })
      .catch(err => console.error('Error updating quantity:', err));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => {
        setProducts(products.filter(item => item._id !== id));
      })
      .catch(err => console.error('Error deleting product:', err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6">Manage Inventory</h2>

      {/* Add Product Section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded w-full md:w-1/2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            className="p-2 border rounded w-full md:w-1/4"
          />
          <button
            onClick={handleAddProduct}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Inventory</h3>
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    className="w-20 border p-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Product"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
