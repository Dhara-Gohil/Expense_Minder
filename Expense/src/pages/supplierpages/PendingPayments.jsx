import React from 'react';

export default function PendingPayments() {
  const pendingPayments = [
    { id: 1, shop: 'Dhara General Store', amount: 4500, dueDate: '2025-04-20' },
    { id: 2, shop: 'Vyas SuperMart', amount: 3200, dueDate: '2025-04-25' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Pending Payments</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Shop</th>
              <th className="p-2">Amount (₹)</th>
              <th className="p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr key={payment.id} className="text-center border-b">
                <td className="p-2">{payment.shop}</td>
                <td className="p-2">₹{payment.amount}</td>
                <td className="p-2">{payment.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
