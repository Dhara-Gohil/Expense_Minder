import React from 'react';

export default function ReceivedOrders() {
  const receivedOrders = [
    { id: 1, shop: 'Dhara General Store', item: 'Cement', quantity: 20, status: 'Delivered' },
    { id: 2, shop: 'Mehta Store', item: 'Bricks', quantity: 100, status: 'In Transit' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Received Orders</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Shop</th>
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {receivedOrders.map((order) => (
              <tr key={order.id} className="text-center border-b">
                <td className="p-2">{order.shop}</td>
                <td className="p-2">{order.item}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
