/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReceivedOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch chats on load
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Shopkeeper/chat`);
        // Filter messages with item and quantity (i.e., orders) and exclude replies
        const filtered = response.data.filter(
          msg => msg.item && msg.quantity && !msg.reply
        );
        setOrders(filtered); // status will come from DB
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchChats();
  }, []);

  // Update status in backend and frontend
  const handleDelivered = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/Shopkeeper/chat/status/${id}`, {
        status: 'Delivered',
      });

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: 'Delivered' } : order
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Received Orders</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="p-4 text-left">Shopkeeper</th>
              <th className="p-4 text-left">Item</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4">{order.shopkeeperName}</td>
                  <td className="p-4">{order.item}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleDelivered(order._id)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No orders received.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
