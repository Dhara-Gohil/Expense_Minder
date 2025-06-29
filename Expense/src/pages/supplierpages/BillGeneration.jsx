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
  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [storedBills, setStoredBills] = useState([]);

  useEffect(() => {
    fetchStoredBills();
  }, []);

  const fetchStoredBills = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/supplier/invoice/all');
      setStoredBills(res.data);
    } catch (err) {
      console.error('Error fetching stored bills:', err);
    }
  };

  const addToBill = () => {
    const product = products.find(p => p.name === selectedProduct);
    if (!product || !quantity) return;

    const existing = selectedItems.find(item => item.name === product.name);
    if (existing) {
      const updated = selectedItems.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + parseInt(quantity) }
          : item
      );
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: parseInt(quantity) }]);
    }

    setSelectedProduct('');
    setQuantity('');
  };

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateInvoice = () => {
  if (!supplierName || !email || selectedItems.length === 0) {
    alert("Please fill all fields and add at least one item before generating the invoice.");
    return;
  }

  setShowInvoice(true);         // ✅ Show Download Invoice button
  saveInvoiceToBackend();       // ✅ Save the invoice to backend
};


  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);

    doc.setFontSize(12);
    doc.text(`Supplier: ${supplierName}`, 14, 30);
    doc.text(`Email: ${email}`, 14, 36);
    const date = new Date().toLocaleDateString('en-IN'); // Safe for PDF
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
    doc.save(`Invoice_${supplierName.replace(/\s/g, '_')}.pdf`);

   
  };

  const saveInvoiceToBackend = async () => {
    try {
      const shopkeeperId = localStorage.getItem('shopkeeperId'); // ✅ or get from context/auth

      const invoicePayload = {
        supplierName,
        email,
        totalAmount,
        shopkeeperId, // ✅ pass it dynamically
        items: selectedItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };


      await axios.post('http://localhost:5000/api/supplier/invoice/create', invoicePayload);
      fetchStoredBills();

      setSelectedItems([]);
      setSupplierName('');
      setEmail('');
     
    } catch (err) {
      console.error('Error saving invoice:', err);

      if (err.response) {
        console.error('Response Data:', err.response.data);
        console.error('Status Code:', err.response.status);
      } else if (err.request) {
        console.error('No Response:', err.request);
      } else {
        console.error('Error Message:', err.message);
      }
    }

  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Bill Generation</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          placeholder="Supplier Name"
          className="border rounded px-4 py-2 w-full"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Supplier Email"
          className="border rounded px-4 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
                <th className="border px-4 py-2">Supplier</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {storedBills.map((bill, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="border px-4 py-2">INV-{index + 1}</td>
                  <td className="border px-4 py-2">{bill.supplierName}</td>
                  <td className="border px-4 py-2">{bill.email}</td>
                  <td className="border px-4 py-2">₹{bill.totalAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bill.createdAt).toLocaleDateString('en-IN')}
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