import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [bills, setBills] = useState([]);
  const shopkeeperId = localStorage.getItem("shopkeeperId");  // Assuming shopkeeperId is stored in localStorage

  useEffect(() => {
    const fetchBills = async () => {
      try {
        // Fetching all invoices for the shopkeeper
        const response = await axios.get(`http://localhost:5000/api/supplier/invoice/all?shopkeeperId=${shopkeeperId}`);
        console.log("Bill response:", response.data);  // Debug

        if (Array.isArray(response.data)) {
          setBills(response.data);  // Storing invoices in state
        } else {
          console.warn("Unexpected response format:", response.data);
          setBills([]);  // Empty array if response is not as expected
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [shopkeeperId]);  // Re-run when shopkeeperId changes

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bill History</h2>

      {bills.length === 0 ? (
        <p>No bills available.</p>  // Message when no bills are found
      ) : (
        <div className="space-y-6">
          {bills.map((bill, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-700">Supplier: {bill.supplierName}</h3>
              <p className="text-sm text-gray-500">Date: {new Date(bill.billDate).toLocaleDateString()}</p>

              <ul className="mt-3 space-y-2">
                {bill.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Price: ₹{item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 font-semibold text-right text-green-700">
                Total: ₹{bill.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
