import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function SupplierDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const supplierData = {
    name: 'Ravi Suppliers',
    email: 'ravi@example.com',
    company: 'Ravi Wholesale Ltd.',
    totalSupplied: 320,
    pendingOrders: 4,
    receivedOrders: 120,
    products: [
      { item: 'Cement', quantity: 50 },
      { item: 'Bricks', quantity: 200 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md h-full fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} 
        w-64`}
      >
        <h2 className="text-xl font-bold text-blue-600 p-6 border-b">Supplier Dashboard</h2>
        <nav className="flex flex-col space-y-2 p-4">
        <button onClick={() => navigate('/supplier/products')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Manage Products</button>
          <button onClick={() => navigate('/supplier/received-orders')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Received Orders</button>
          <button onClick={() => navigate('/supplier/pending-payments')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Pending Payments</button>
          <button onClick={() => navigate('/supplier/chat')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Chat with Shopkeepers</button>
          <button onClick={() => navigate('/supplier/monthly-expense')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Monthly Expense</button>
          <button onClick={() => navigate('/supplier/bill-generation')} className="text-left px-4 py-2 rounded hover:bg-blue-100 transition">Bill genration</button>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-black rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className={`flex-1 px-6 py-10 transition-all duration-300 ${sidebarOpen ? 'ml-64' : ''}`}>
        <h1 className="text-4xl font-bold mb-6 text-blue-600">
          Welcome, {supplierData.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <p>Total Supplied: {supplierData.totalSupplied}</p>
              <p>Pending Orders: {supplierData.pendingOrders}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Received Orders</h2>
              <p>{supplierData.receivedOrders}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Contact Info</h2>
              <p>Company: {supplierData.company}</p>
              <p>Email: {supplierData.email}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">Products Supplied</h2>
          <ul className="space-y-2">
            {supplierData.products.map((p, index) => (
              <li key={index} className="border-b pb-2">
                <strong>{p.item}</strong> – {p.quantity} units
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
