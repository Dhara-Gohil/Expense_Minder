import React from 'react';

export default function ViewOrders() {
  const orders = [
    {
      id: 1,
      item: 'Furniture',
      supplier: 'Ravi Suppliers',
      quantity: 10,
      price: 10000,
      status: 'Confirmed',
    },
    {
      id: 2,
      item: 'Construction Materials',
      supplier: 'Mehta Wholesales',
      quantity: 25,
      price: 15000,
      status: 'Pending',
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">View Orders</h1>
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-3">Item</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-3">{order.item}</td>
              <td className="p-3">{order.supplier}</td>
              <td className="p-3">{order.quantity}</td>
              <td className="p-3">₹{order.price}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    order.status === 'Confirmed' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
