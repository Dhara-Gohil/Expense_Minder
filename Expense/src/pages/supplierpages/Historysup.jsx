/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [bills, setBills] = useState([]);
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/all`,
          {
            params: { shopkeeperId },
          }
        );

        if (Array.isArray(response.data)) {
          setBills(response.data);
        } else {
          setBills([]);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    if (shopkeeperId) {
      fetchBills();
    }
  }, [shopkeeperId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bill History</h2>

      {bills.length === 0 ? (
        <p>No bills available.</p>
      ) : (
        <div className="space-y-6">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Supplier: {bill.supplierName}
              </h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(bill.billDate).toLocaleDateString()}
              </p>

              <ul className="mt-3 space-y-2">
                {bill.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm text-gray-600"
                  >
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
