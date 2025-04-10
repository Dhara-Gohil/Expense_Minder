import React, { useState } from 'react';

export default function History() {
  const [orderHistory] = useState([
    {
      id: 1,
      item: 'Cement Bags',
      supplier: 'Mehta Constructions',
      quantity: 30,
      price: 3000,
      status: 'Paid',
      date: '2025-03-10',
    },
    {
      id: 2,
      item: 'Wooden Chairs',
      supplier: 'Ravi Furniture',
      quantity: 15,
      price: 4500,
      status: 'Pending',
      date: '2025-03-20',
    },
    {
      id: 3,
      item: 'Paint Cans',
      supplier: 'ColorMart',
      quantity: 20,
      price: 2000,
      status: 'Paid',
      date: '2025-04-01',
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">Order History</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-yellow-100">
            <tr>
              <th className="p-4 border-b">#</th>
              <th className="p-4 border-b">Item</th>
              <th className="p-4 border-b">Supplier</th>
              <th className="p-4 border-b">Quantity</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={order.id} className="hover:bg-yellow-50 transition">
                <td className="p-4 border-b">{index + 1}</td>
                <td className="p-4 border-b">{order.item}</td>
                <td className="p-4 border-b">{order.supplier}</td>
                <td className="p-4 border-b">{order.quantity}</td>
                <td className="p-4 border-b">₹{order.price}</td>
                <td className={`p-4 border-b ${order.status === 'Pending' ? 'text-red-500' : 'text-green-600'}`}>
                  {order.status}
                </td>
                <td className="p-4 border-b">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
