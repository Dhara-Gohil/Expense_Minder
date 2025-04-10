import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

const socket = io('http://localhost:5000');

const SupplierChat = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [messages, setMessages] = useState([]);

  // ✅ Manual product items
  const manualItems = [
    'Cement',
    'Bricks',
    'Sand',
    'Steel Rods',
    'Paint',
    'Tiles',
    'Gravel'
  ];

  // Fetch supplier list
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shopkeeper/suppliers');
        setSuppliers(res.data);
      } catch (err) {
        console.error('Failed to fetch suppliers:', err);
      }
    };

    fetchSuppliers();
  }, []);

  // Fetch past chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shopkeeper/chat');
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch chats:', err);
      }
    };

    fetchChats();
  }, []);

  // Socket listener for real-time messages
  useEffect(() => {
    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const handleSend = () => {
    if (!selectedSupplier || !itemName || !quantity) return;

    const newMsg = {
      supplier: selectedSupplier,
      item: itemName,
      quantity,
      timestamp: new Date().toISOString()
    };

    axios.post('http://localhost:5000/api/shopkeeper/chat', newMsg);
    socket.emit('chatMessage', newMsg);

    setMessages((prev) => [...prev, newMsg]);
    setItemName('');
    setQuantity('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat with Suppliers</h2>

      <div className="flex flex-col gap-3">
        {/* Supplier Dropdown */}
        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Choose Supplier</option>
          {suppliers.map((s, i) => (
            <option key={i} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        {/* ✅ Item Dropdown */}
        <select
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Item</option>
          {manualItems.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Quantity input */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </div>

      {/* Chat box */}
      <div className="mt-6 border rounded p-4 h-60 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 border-b pb-2">
            <strong>{msg.supplier}</strong>: {msg.item} x {msg.quantity}
            <div className="text-sm text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </div>
            <button
              onClick={() => navigate('/supplier-reply', { state: { message: msg } })}
              className="text-blue-600 underline text-sm mt-1"
            >
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierChat;
