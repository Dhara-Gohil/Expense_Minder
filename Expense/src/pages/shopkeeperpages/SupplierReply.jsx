import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SupplierReply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  if (!message) {
    return (
      <div className="p-4">
        <p>No message found. Please go back and select a message.</p>
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Reply to Shopkeeper</h2>

      <div className="border p-4 rounded bg-gray-50 mb-4">
        <p><strong>Shopkeeper:</strong> {message.supplier}</p>
        <p><strong>Item:</strong> {message.item}</p>
        <p><strong>Quantity:</strong> {message.quantity}</p>
        <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
      </div>

      {/* You can add reply form below */}
      <textarea
        rows={4}
        placeholder="Type your reply..."
        className="w-full p-2 border rounded mb-2"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Send Reply
      </button>
    </div>
  );
};

export default SupplierReply;
