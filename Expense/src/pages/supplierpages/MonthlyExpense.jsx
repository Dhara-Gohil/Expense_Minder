import React from 'react';

export default function MonthlyExpense() {
  const expenses = [
    { month: 'January', total: 15000 },
    { month: 'February', total: 17200 },
    { month: 'March', total: 13800 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-600">Monthly Expense</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-200 text-left">
              <th className="p-4 text-sm font-medium text-gray-600">Month</th>
              <th className="p-4 text-sm font-medium text-gray-600">Total Expense (₹)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, i) => (
              <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-4 text-sm text-gray-800">{e.month}</td>
                <td className="p-4 text-sm text-gray-800 font-semibold">₹{e.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
