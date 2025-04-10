import React, { useState } from 'react';

export default function Reminders() {
  const [reminders] = useState([
    {
      id: 1,
      supplier: 'Mehta Constructions',
      billAmount: 4500,
      dueDate: '2025-04-15',
    },
    {
      id: 2,
      supplier: 'Ravi Furniture',
      billAmount: 3000,
      dueDate: '2025-04-10',
    },
    {
      id: 3,
      supplier: 'ColorMart',
      billAmount: 2000,
      dueDate: '2025-04-12',
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">🔔 Pending Bill Reminders</h1>

      {reminders.length === 0 ? (
        <p className="text-gray-500">No pending bills at the moment.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-xl mr-2">🔔</span>
                <h2 className="text-lg font-semibold text-gray-800">{reminder.supplier}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium text-gray-700">Bill Amount:</span>{' '}
                <span className="text-red-600 font-semibold">₹{reminder.billAmount}</span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Due Date:</span>{' '}
                <span className="text-blue-600 font-semibold">{reminder.dueDate}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
