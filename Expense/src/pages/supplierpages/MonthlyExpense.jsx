/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthlyExpense() {
  const [bills, setBills] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const shopkeeperId = localStorage.getItem("shopkeeperId");  // Assuming shopkeeperId is stored in localStorage

  useEffect(() => {
    const fetchBills = async () => {
      try {
        // Fetching all invoices/bills for the shopkeeper from your API
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/all?shopkeeperId=${shopkeeperId}`);
        console.log("Fetched Bills: ", response.data);  // Debugging

        if (Array.isArray(response.data)) {
          setBills(response.data);  // Store the fetched bills

          // Calculate the total expense by summing the totalAmount of all bills
          const total = response.data.reduce((acc, bill) => acc + bill.totalAmount, 0);
          setTotalExpense(total);  // Store the total expense
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [shopkeeperId]);  // Re-run the fetch when shopkeeperId changes

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-600">Monthly Expense</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-200 text-left">
              <th className="p-4 text-sm font-medium text-gray-600">Supplier</th>
              <th className="p-4 text-sm font-medium text-gray-600">Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-600">No bills available.</td>
              </tr>
            ) : (
              bills.map((bill, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                  <td className="p-4 text-sm text-gray-800">{bill.supplierName}</td>
                  <td className="p-4 text-sm text-gray-800 font-semibold">₹{bill.totalAmount}</td>
                </tr>
              ))
            )}
            {/* Show the total amount at the end */}
            <tr className="font-semibold text-blue-600">
              <td colSpan="1" className="p-4 text-sm text-right">Total:</td>
              <td className="p-4 text-sm text-gray-800 font-semibold">₹{totalExpense}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
