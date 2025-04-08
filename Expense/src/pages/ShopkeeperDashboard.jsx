import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function ShopkeeperDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const shopkeeperData = {
    name: 'Dhara Traders',
    email: 'dhara@example.com',
    shopName: 'Dhara General Store',
    totalProducts: 120,
    lowStock: 8,
    totalOrders: 45,
    pendingOrders: 5,
    suppliers: [
      { name: 'Ravi Suppliers', contact: 'ravi@example.com' },
      { name: 'Mehta Wholesales', contact: 'mehta@example.com' },
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
        <h2 className="text-xl font-bold text-yellow-600 p-6 border-b">Dashboard</h2>
        <nav className="flex flex-col space-y-2 p-4">
          <button
            onClick={() => navigate('/inventory')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            Manage Inventory
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/suppliers')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            Add Supplier
          </button>
          <button
            onClick={() => navigate('/suppliers')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            History
          </button>
          <button
            onClick={() => navigate('/suppliers')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
           Remainders
          </button>
          <button
            onClick={() => navigate('/suppliers')}
            className="text-left px-4 py-2 rounded hover:bg-yellow-100 transition"
          >
            Expense Report
          </button>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-black rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay on small and large screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 px-6 py-10 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : ''
        }`}
      >
        <h1 className="text-4xl font-bold mb-6 text-yellow-600">
          Welcome, {shopkeeperData.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Inventory</h2>
              <p>Total Products: {shopkeeperData.totalProducts}</p>
              <p className="text-red-500">Low Stock: {shopkeeperData.lowStock}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <p>Total Orders: {shopkeeperData.totalOrders}</p>
              <p>Pending: {shopkeeperData.pendingOrders}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Shop Info</h2>
              <p>Shop Name: {shopkeeperData.shopName}</p>
              <p>Email: {shopkeeperData.email}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">Suppliers</h2>
          <ul className="space-y-2">
            {shopkeeperData.suppliers.map((supplier, index) => (
              <li key={index} className="border-b pb-2">
                <strong>{supplier.name}</strong> – {supplier.contact}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
