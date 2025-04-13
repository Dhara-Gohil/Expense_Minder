import React, { useState } from 'react';

const ChatWindow = ({ messages, onSend }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      onSend(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white shadow-md rounded-xl flex flex-col justify-between">
      <div className="overflow-y-auto flex-1 mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.sender === 'shopkeeper'
                ? 'bg-gray-200 self-start'
                : 'bg-blue-500 text-white self-end'
            }`}
          >
            <strong className="block mb-1">{msg.sender}</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
