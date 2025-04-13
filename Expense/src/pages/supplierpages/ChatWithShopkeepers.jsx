import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const SupplierChat = () => {
  const [supplierName, setSupplierName] = useState('Supplier1'); // Hardcoded or use auth later
  const [shopkeepers, setShopkeepers] = useState([]);
  const [selectedShopkeeper, setSelectedShopkeeper] = useState('');
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  // Fetch initial messages
  useEffect(() => {
    axios.get(`http://localhost:5000/api/supplier/chat?supplierName=${supplierName}`)
      .then(res => {
        const msgs = res.data;
        setMessages(msgs);
        const uniqueShopkeepers = [...new Set(msgs.map(m => m.shopkeeperName))];
        setShopkeepers(uniqueShopkeepers);
      })
      .catch(err => console.error('Fetch error:', err));

    socket.on('shopkeeperToSupplier', (newMessage) => {
      if (newMessage.supplierName === supplierName) {
        // Append new message and keep the history
        setMessages(prev => [...prev, newMessage]);
        if (!shopkeepers.includes(newMessage.shopkeeperName)) {
          setShopkeepers(prev => [...prev, newMessage.shopkeeperName]);
        }
      }
    });

    return () => socket.off('shopkeeperToSupplier');
  }, [supplierName, shopkeepers]);

  const handleReply = async () => {
    if (!reply || !selectedShopkeeper) return;

    const newReply = {
      shopkeeperName: selectedShopkeeper,
      supplierName,
      reply,
      timestamp: new Date().toISOString(),
    };

    // Send supplier reply to shopkeeper via socket
    socket.emit('supplierToShopkeeper', newReply);
    await axios.post('http://localhost:5000/api/supplier/chat/reply', newReply);

    // Add new reply to state
    setMessages(prev => [...prev, newReply]);
    setReply('');
  };

  // Filter messages for selected chat
  const chatMessages = messages.filter(m => m.shopkeeperName === selectedShopkeeper);

  return (
    <div className="flex h-[90vh] max-w-6xl mx-auto bg-white rounded shadow">
      {/* Sidebar with shopkeepers */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <h3 className="text-lg font-semibold mb-4">📨 Shopkeepers</h3>
        {shopkeepers.map((name, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedShopkeeper(name)}
            className={`p-2 mb-2 rounded cursor-pointer ${selectedShopkeeper === name ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'}`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b px-4 py-2 font-bold text-lg">
          {selectedShopkeeper ? `Chat with ${selectedShopkeeper}` : 'Select a Shopkeeper'}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="bg-gray-200 p-2 rounded">
              {/* If it's a shopkeeper message, show item, quantity, and name */}
              {msg.item && msg.quantity ? (
                <div><b>{msg.shopkeeperName}:</b> {msg.item} x {msg.quantity}</div>
              ) : (
                // Otherwise, show just the reply message from supplier
                <div><b>{msg.shopkeeperName}:</b> {msg.reply}</div>
              )}

              {/* Show supplier's reply as plain text */}
              {msg.reply && msg.supplierName === supplierName && (
                <div className="text-green-700 mt-1"><b>You:</b> {msg.reply}</div>
              )}
            </div>
          ))}
        </div>

        {selectedShopkeeper && (
          <div className="p-4 border-t flex gap-3">
            <textarea
              className="flex-1 border rounded p-2"
              rows="2"
              placeholder="Type your reply..."
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierChat;
