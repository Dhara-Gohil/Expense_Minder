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
      const res = await axios.get('http://localhost:5000/api/supplier/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.quantity) {
      try {
        await axios.post('http://localhost:5000/api/supplier/products/add', newProduct);
        setNewProduct({ name: '', quantity: '' });
        fetchProducts();
      } catch (err) {
        console.error('Error adding product:', err);
      }
    }
  };

  const updateProduct = async (id) => {
    const name = prompt('Enter new name');
    const quantity = prompt('Enter new quantity');
    if (name && quantity) {
      try {
        await axios.put(`http://localhost:5000/api/supplier/products/${id}`, { name, quantity });
        fetchProducts();
      } catch (err) {
        console.error('Error updating product:', err);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/supplier/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Manage Products</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={addProduct}>
          Add
        </button>
      </div>

      <ul className="bg-white rounded shadow p-4 space-y-2">
        {products.map((prod) => (
          <li key={prod._id} className="flex justify-between border-b pb-1">
            <span>{prod.name} - {prod.quantity} units</span>
            <div className="space-x-2">
              <button onClick={() => updateProduct(prod._id)} className="bg-yellow-500 text-white px-2 rounded">Edit</button>
              <button onClick={() => deleteProduct(prod._id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
