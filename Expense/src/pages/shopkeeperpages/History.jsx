/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const History = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const fetchBills = async () => {
      if (!shopkeeperId) {
        setError("No shopkeeper ID found!");
        setLoading(false);
        return;
      }

      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${BASE_URL}/api/supplier/invoice/shopkeeper?shopkeeperId=${shopkeeperId}`
        );
        setBills(response.data);
      } catch (error) {
        setError("Failed to fetch bills. Please try again later.");
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [shopkeeperId]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Make your Payments</h2>
      {bills.length === 0 ? (
        <p>No bills available.</p>
      ) : (
        <div className="space-y-6">
          {bills.map((bill) => {
            const upiLink = `upi://pay?pa=dharagohil3333@oksbi&pn=ShopSupplier&am=${bill.totalAmount}&cu=INR&tn=Bill Payment - ${bill._id}`;

            return (
              <div
                key={bill._id}
                className={`border rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition duration-300 ${
                  bill.paymentStatus === "Paid" ? "opacity-70" : ""
                }`}
              >
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {bill.createdAt
                    ? new Date(bill.createdAt).toLocaleDateString("en-IN")
                    : "N/A"}
                </p>

                <ul className="mt-4 space-y-3">
                  {bill.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 font-semibold text-right text-green-700">
                  Total: ₹{bill.totalAmount}
                </div>

                {/* Payment section */}
                <div className="mt-4 text-right">
                  {bill.paymentStatus === "Paid" ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
                      ✅ Paid
                    </span>
                  ) : isMobile ? (
                    <a
                      href={upiLink}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Pay Now
                    </a>
                  ) : (
                    <div className="flex flex-col items-end">
                      <p className="text-sm text-gray-500 mb-2">
                        Scan QR to pay:
                      </p>
                      <div className="bg-white p-2 rounded shadow">
                        <QRCode value={upiLink} size={128} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
