import React, { useState } from 'react';

export default function ChatWithShopkeepers() {
  const [messages, setMessages] = useState([
    { from: 'shopkeeper', text: 'Can you send 20 bags of cement?' },
    { from: 'supplier', text: 'Sure, dispatching tomorrow.' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'supplier', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Chat with Shopkeepers</h2>
      <div className="bg-white rounded shadow p-4 max-w-xl mx-auto">
        <div className="h-64 overflow-y-auto space-y-2 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded w-fit ${msg.from === 'supplier' ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
