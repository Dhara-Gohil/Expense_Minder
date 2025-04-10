import React, { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';

export default function ExpenseReport() {
  const [monthlyExpenses] = useState([
    {
      month: 'March 2025',
      paid: 15000,
      unpaid: 5000,
    },
    {
      month: 'February 2025',
      paid: 12000,
      unpaid: 2000,
    },
    {
      month: 'January 2025',
      paid: 10000,
      unpaid: 0,
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600 flex items-center gap-2">
        📊 Monthly Expense Report
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {monthlyExpenses.map((entry, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-yellow-100 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <MdOutlineDateRange className="text-yellow-500" /> {entry.month}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-green-700">
                <span className="font-medium">Paid Amount:</span>
                <span className="font-semibold flex items-center gap-1">
                  <FaRupeeSign /> {entry.paid}
                </span>
              </div>

              <div className="flex justify-between text-red-500">
                <span className="font-medium">Unpaid Amount:</span>
                <span className="font-semibold flex items-center gap-1">
                  <FaRupeeSign /> {entry.unpaid}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
