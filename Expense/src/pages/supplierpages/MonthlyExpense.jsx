import React from 'react';

export default function MonthlyExpense() {
  const expenses = [
    { month: 'January', total: 15000 },
    { month: 'February', total: 17200 },
    { month: 'March', total: 13800 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Monthly Expense</h2>
      <div className="bg-white p-4 rounded shadow max-w-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 text-left">Month</th>
              <th className="p-2 text-left">Total Expense (₹)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{e.month}</td>
                <td className="p-2">₹{e.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
