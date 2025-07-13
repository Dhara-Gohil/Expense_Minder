/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SupplierChat = () => {
  // eslint-disable-next-line no-unused-vars
  const [supplierName, setSupplierName] = useState('Supplier1');
  const [shopkeepers, setShopkeepers] = useState([]);
  const [shopkeeperNames, setShopkeeperNames] = useState({});
  const [selectedShopkeeper, setSelectedShopkeeper] = useState('');
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/chat?supplierName=${supplierName}`);
        const msgs = res.data;
        setMessages(msgs);

        const uniqueShopkeepers = [...new Set(msgs.map(m => m.shopkeeperName))];
        setShopkeepers(uniqueShopkeepers);

        const shopkeeperNamesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/shopkeepers`);
        const namesMap = {};
        shopkeeperNamesRes.data.forEach(shopkeeper => {
          namesMap[shopkeeper.username] = shopkeeper.name;
        });
        setShopkeeperNames(namesMap);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchMessages();

    const socket = socketRef.current;
    socket.on('shopkeeperToSupplier', (newMessage) => {
      if (newMessage.supplierName === supplierName) {
        setMessages(prev => [...prev, newMessage]);
        setShopkeepers(prev => {
          if (!prev.includes(newMessage.shopkeeperName)) {
            return [...prev, newMessage.shopkeeperName];
          }
          return prev;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [supplierName]);

  const handleReply = async () => {
    if (!reply || !selectedShopkeeper) return;

    const newReply = {
      shopkeeperName: selectedShopkeeper,
      supplierName,
      reply,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit('supplierToShopkeeper', newReply);
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/chat/reply`, newReply);
    setMessages(prev => [...prev, newReply]);
    setReply('');
  };

  const chatMessages = messages.filter(m => m.shopkeeperName === selectedShopkeeper);

  return (
    <div className="flex h-[90vh] max-w-6xl mx-auto bg-white rounded shadow">
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
        <h3 className="text-lg font-semibold mb-4">Shopkeepers</h3>
        {shopkeepers.map((username, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedShopkeeper(username)}
            className={`p-2 mb-2 rounded cursor-pointer ${selectedShopkeeper === username ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'}`}
          >
            {shopkeeperNames[username] || username}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b px-4 py-2 font-bold text-lg">
          {selectedShopkeeper ? `Chat with ${shopkeeperNames[selectedShopkeeper] || selectedShopkeeper}` : 'Select a Shopkeeper'}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded">
              {msg.item && msg.quantity && (
                <div><b>{shopkeeperNames[msg.shopkeeperName] || msg.shopkeeperName}:</b> {msg.item} x {msg.quantity}</div>
              )}
              {msg.reply && msg.supplierName === supplierName && (
                <div className="text-green-700 mt-1"><b>You:</b> {msg.reply}</div>
              )}
              {msg.reply && msg.supplierName !== supplierName && (
                <div className="text-blue-700 mt-1"><b>{shopkeeperNames[msg.shopkeeperName] || msg.shopkeeperName}:</b> {msg.reply}</div>
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
