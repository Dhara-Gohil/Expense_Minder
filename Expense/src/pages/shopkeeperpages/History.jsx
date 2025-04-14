// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const History = () => {
//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const shopkeeperId = localStorage.getItem("shopkeeperId");  // Get the shopkeeperId from localStorage

//   useEffect(() => {
//     // Check if shopkeeperId exists
//     if (!shopkeeperId) {
//       setError("No shopkeeper ID found!");
//       setLoading(false);
//       return;
//     }

//     // Fetch invoices from backend
//     const fetchBills = async () => {
//       try {
//         console.log("Shopkeeper id",shopkeeperId)
//         const response = await axios.get(
//           `http://localhost:5000/api/supplier/invoice/shopkeeper?shopkeeperId=${shopkeeperId}`
//         );
//         setBills(response.data);  // Set the fetched bills
//       } catch (error) {
//         setError("Failed to fetch bills. Please try again later.");
//         console.error("Error fetching bills:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBills();  // Call the fetchBills function
//   }, [shopkeeperId]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   // Display bills
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Bill History</h2>
//       {bills.length === 0 ? (
//         <p>No bills available.</p>
//       ) : (
//         <div className="space-y-6">
//           {bills.map((bill) => (
//             <div key={bill._id} className="border rounded-lg shadow-md p-4 bg-white">
//               <h3 className="text-lg font-semibold text-gray-700">Supplier: {bill.supplierName}</h3>
//               <p className="text-sm text-gray-500">
//                 Date: {bill.date ? new Date(bill.date).toLocaleDateString() : 'N/A'}
//               </p>

//               <ul className="mt-3 space-y-2">
//                 {bill.items.map((item, index) => (
//                   <li key={index} className="flex justify-between text-sm text-gray-600">
//                     <span>{item.name}</span>
//                     <span>Qty: {item.quantity}</span>
//                     <span>Price: ₹{item.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-3 font-semibold text-right text-green-700">
//                 Total: ₹{bill.totalAmount}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;


import React, { useEffect, useState } from "react";

// Fake Data for demonstration purposes
const fakeBills = [
  {
    _id: "1",
    supplierName: "Dhara",
    date: "2025-04-01",
    items: [
      { name: "Ciment bags", quantity: 2, price: 100 },
      { name: "Table", quantity: 1, price: 150 },
    ],
    totalAmount: 350,
  },
  {
    _id: "2",
    supplierName: "Dhara",
    date: "2025-04-05",
    items: [
      { name: "Chair", quantity: 3, price: 50 },
      { name: "Windows", quantity: 2, price: 200 },
    ],
    totalAmount: 650,
  },
  {
    _id: "3",
    supplierName: "Dhara",
    date: "2025-04-10",
    items: [
      { name: "Doors", quantity: 1, price: 300 },
      { name: "Windows", quantity: 4, price: 50 },
    ],
    totalAmount: 500,
  },
];

const History = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  useEffect(() => {
    // For now, using fake data
    setBills(fakeBills);
    setLoading(false);

    // Simulate an API call (uncomment when using real backend)
    // const fetchBills = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:5000/api/supplier/invoice/shopkeeper?shopkeeperId=${shopkeeperId}`
    //     );
    //     setBills(response.data);
    //   } catch (error) {
    //     setError("Failed to fetch bills. Please try again later.");
    //     console.error("Error fetching bills:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchBills();  // Call the fetchBills function
  }, [shopkeeperId]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Display bills
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Bill History</h2>
      {bills.length === 0 ? (
        <p>No bills available.</p>
      ) : (
        <div className="space-y-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="border rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                Supplier: {bill.supplierName}
              </h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(bill.date).toLocaleDateString()}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
