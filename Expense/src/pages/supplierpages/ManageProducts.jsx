/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.quantity && newProduct.quantity >= 0) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/products/add`, newProduct);
        setNewProduct({ name: '', quantity: '' });
        fetchProducts();
      } catch (err) {
        console.error('Error adding product:', err);
      }
    } else {
      alert('Please enter a valid quantity (greater than or equal to 0).');
    }
  };

  const updateProduct = async (id) => {
    const name = prompt('Enter new name');
    const quantity = prompt('Enter new quantity');
    if (name && quantity && quantity >= 0) {
      try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/products/${encodeURIComponent(id)}`, {
          name,
          quantity,
        });
        fetchProducts();
      } catch (err) {
        console.error('Error updating product:', err);
      }
    } else {
      alert('Please enter a valid quantity (greater than or equal to 0).');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/products/${encodeURIComponent(id)}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-blue-700">Manage Products</h2>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              setNewProduct({ ...newProduct, quantity: value });
            }
          }}
          className="border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={addProduct}
        >
          Add
        </button>
      </div>

      <ul className="bg-white rounded-lg shadow p-6 space-y-4">
        {products.map((prod) => (
          <li key={prod._id} className="flex justify-between items-center border-b pb-4">
            <span className="text-lg text-gray-700 font-medium">
              {prod.name} - {prod.quantity} units
            </span>
            <div className="space-x-4">
              <button
                onClick={() => updateProduct(prod._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(prod._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
