/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  useEffect(() => {
    if (shopkeeperId) {
      fetchReminders();
    }
  }, [shopkeeperId]);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/shopkeeper?shopkeeperId=${shopkeeperId}`
      );
      const bills = res.data;
      const now = new Date();

      const overdue = bills.filter(bill => {
        const billDate = new Date(bill.createdAt);
        const diffDays = Math.floor((now - billDate) / (1000));
        return bill.paymentStatus !== "Paid" && diffDays > 7;
      });

      setReminders(overdue);
    } catch (err) {
      console.error("❌ Reminder Fetch Error:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">🔔 Your Pending Bill Reminders</h1>

      {reminders.length === 0 ? (
        <p className="text-gray-500">No overdue unpaid bills yet 🎉</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <div
              key={reminder._id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-xl mr-2">🔔</span>
                <h2 className="text-lg font-semibold text-gray-800">{reminder.supplierName}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium text-gray-700">Bill Amount:</span>{' '}
                <span className="text-red-600 font-semibold">₹{reminder.totalAmount}</span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Due Since:</span>{' '}
                <span className="text-blue-600 font-semibold">
                  {new Date(reminder.createdAt).toLocaleDateString('en-IN')}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
