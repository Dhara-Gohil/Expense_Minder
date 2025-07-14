/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(BASE_URL, {
  transports: ['websocket'],
  withCredentials: true,
});


const ShopkeeperChat = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/shopkeeper/suppliers/`)
      .then(res => setSuppliers(res.data))
      .catch(err => console.error('Error fetching suppliers:', err));

    axios.get(`${BASE_URL}/api/shopkeeper/chat`)
      .then(res => setMessages(res.data))
      .catch(err => console.error('Error fetching messages:', err));

    socket.on('supplierToShopkeeper', (msg) => {
      setMessages(prevMessages =>
        prevMessages.map(m =>
          m.shopkeeperName === msg.shopkeeperName &&
          m.supplierName === msg.supplierName &&
          m.item === msg.item &&
          m.quantity === msg.quantity &&
          !m.reply
            ? { ...m, reply: msg.reply }
            : m
        )
      );
    });

    return () => socket.off('supplierToShopkeeper');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!item || !quantity || !selectedSupplier) return;

    const shopkeeperName = localStorage.getItem('shopkeeperName');

    const newMsg = {
      shopkeeperName,
      supplierName: selectedSupplier,
      item,
      quantity,
      timestamp: new Date().toISOString(),
    };

    try {
      socket.emit('shopkeeperToSupplier', newMsg);
      await axios.post(`${BASE_URL}/api/shopkeeper/chat`, newMsg);
      setMessages([...messages, newMsg]);
      setItem('');
      setQuantity('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 h-[80vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Shopkeeper Chat</h2>

      <div className="mb-3">
        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto border rounded p-3 bg-gray-50 mb-3 space-y-3">
        {messages
          .filter(m => m.supplierName === selectedSupplier)
          .map((m, i) => (
            <div key={i}>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                  <div><b>{m.item} x {m.quantity}</b></div>
                  <div className="text-sm mt-1">{new Date(m.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>

              {m.reply && (
                <div className="flex justify-start mt-2">
                  <div className="bg-green-100 text-black px-4 py-2 rounded-lg max-w-xs">
                    <div><b>Reply:</b> {m.reply}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          className="border p-2 rounded"
          placeholder="Item"
          value={item}
          onChange={e => setItem(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </div>

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default ShopkeeperChat;
