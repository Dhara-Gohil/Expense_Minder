/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const products = [
  { name: 'Cement', price: 320 },
  { name: 'Bricks', price: 8 },
  { name: 'Steel Rods', price: 450 },
  { name: 'Paint Buckets', price: 600 },
];

export default function BillGeneration() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shopkeepers, setShopkeepers] = useState([]);
  const [selectedShopkeeperId, setSelectedShopkeeperId] = useState('');
  const [shopkeeperName, setShopkeeperName] = useState('');
  const [shopkeeperEmail, setShopkeeperEmail] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [storedBills, setStoredBills] = useState([]);
  // const [paymentStatusMap, setPaymentStatusMap] = useState({}); // ✅ for local status

  useEffect(() => {
    fetchStoredBills();
    fetchShopkeepers();
  }, []);

  const fetchStoredBills = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/all`);
      setStoredBills(res.data);
    } catch (err) {
      console.error('Error fetching stored bills:', err);
    }
  };

  const fetchShopkeepers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/shopkeepers`);
      setShopkeepers(res.data);
    } catch (err) {
      console.error('Failed to fetch shopkeepers:', err);
    }
  };

  const handleShopkeeperSelect = (e) => {
    const id = e.target.value;
    setSelectedShopkeeperId(id);

    const selected = shopkeepers.find(s => s.id === id); // ✅ use s.id not s._id
    if (selected) {
      setShopkeeperName(selected.name);
      setShopkeeperEmail(selected.email);
    }
  };

  const addToBill = () => {
    if (!selectedProduct || !quantity) return;

    const product = products.find(p => p.name === selectedProduct);
    const qty = parseInt(quantity);

    if (!product || isNaN(qty) || qty <= 0) return;

    setSelectedItems(prevItems => {
      const existing = prevItems.find(item => item.name === product.name);
      if (existing) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: qty }];
      }
    });

    setSelectedProduct('');
    setQuantity('');
  };

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateInvoice = () => {
    if (!selectedShopkeeperId || !shopkeeperName || !shopkeeperEmail || selectedItems.length === 0) {
      alert("Please select a shopkeeper and add products to generate invoice.");
      return;
    }

    setShowInvoice(true);
    saveInvoiceToBackend();
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);

    doc.setFontSize(12);
    doc.text(`Shopkeeper: ${shopkeeperName}`, 14, 30);
    doc.text(`Email: ${shopkeeperEmail}`, 14, 36);
    const date = new Date().toLocaleDateString('en-IN');
    doc.text(`Date: ${date}`, 14, 42);
    doc.text(`Invoice No: INV-${Date.now().toString().slice(-6)}`, 14, 48);

    const tableData = selectedItems.map(item => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.price * item.quantity}`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Item', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'grid',
    });

    doc.text(`Grand Total: ₹${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`Invoice_${shopkeeperName.replace(/\s/g, '_')}.pdf`);
  };

  const saveInvoiceToBackend = async () => {
    try {
      const invoicePayload = {
        supplierName: shopkeeperName,
        email: shopkeeperEmail,
        totalAmount,
        shopkeeperId: selectedShopkeeperId,
        items: selectedItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/create`, invoicePayload);
      fetchStoredBills();
      setSelectedItems([]);
    } catch (err) {
      console.error('Error saving invoice:', err);
    }
  };

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/invoice/mark-paid/${invoiceId}`);
      // ✅ Refresh the bills after update
      fetchStoredBills();
    } catch (err) {
      console.error("Failed to mark as paid:", err);
      alert("Failed to update payment status.");
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Bill Generation</h1>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Select Shopkeeper</label>
        <select
          value={selectedShopkeeperId}
          onChange={handleShopkeeperSelect}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">-- Select Shopkeeper --</option>
          {shopkeepers.map(shop => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input
          type="email"
          className="border rounded px-4 py-2 w-full bg-gray-100"
          value={shopkeeperEmail}
          readOnly
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          className="border rounded px-4 py-2 w-1/2"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((product, idx) => (
            <option key={idx} value={product.name}>
              {product.name} – ₹{product.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          className="border rounded px-4 py-2 w-1/3"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          onClick={addToBill}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Bill Summary</h2>
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Qty</th>
                <th className="border px-4 py-2">Unit Price</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">₹{item.price}</td>
                  <td className="border px-4 py-2">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4 font-semibold text-lg">
            Total Amount: ₹{totalAmount}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={generateInvoice}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Generate Invoice
        </button>

        {showInvoice && (
          <button
            onClick={downloadInvoice}
            className="bg-yellow-500 text-white px-6 py-2 rounded"
          >
            Download Invoice
          </button>
        )}
      </div>

      {storedBills.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Stored Bills</h2>
          <table className="w-full border text-left bg-gray-50 shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Invoice No</th>
                <th className="border px-4 py-2">Shopkeeper</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {storedBills.map((bill, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="border px-4 py-2">{bill.invoiceNumber || `INV-${index + 1}`}</td>
                  <td className="border px-4 py-2">{bill.supplierName}</td>
                  <td className="border px-4 py-2">{bill.email}</td>
                  <td className="border px-4 py-2">₹{bill.totalAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bill.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded ${bill.paymentStatus === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {bill.paymentStatus || 'Unpaid'}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    {bill.paymentStatus !== 'Paid' && (
                      <button
                        onClick={() => handleMarkAsPaid(bill._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
