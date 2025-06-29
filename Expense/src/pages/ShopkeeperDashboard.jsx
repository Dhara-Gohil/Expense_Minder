import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Package, Clipboard, Users, BarChart2, FileText } from 'lucide-react';

export default function ShopkeeperDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

 const shopkeeperName = localStorage.getItem("shopkeeperName") || "Shopkeeper";

  const features = [
    {
      icon: <Package className="text-blue-600 w-6 h-6" />,
      title: 'Manage Inventory',
      description: 'Update products, stock levels, and prices easily.',
    },
    {
      icon: <Clipboard className="text-green-600 w-6 h-6" />,
      title: 'View Orders',
      description: 'Track and manage all incoming orders from suppliers.',
    },
    {
      icon: <Users className="text-yellow-600 w-6 h-6" />,
      title: 'Suppliers',
      description: 'Manage suppliers, add new ones, and chat with them.',
    },
    {
      icon: <BarChart2 className="text-pink-600 w-6 h-6" />,
      title: 'Expense Report',
      description: 'Track and manage monthly expenses and pending payments.',
    },
    {
      icon: <FileText className="text-red-600 w-6 h-6" />,
      title: 'History',
      description: 'Review past orders, transactions, and supplier data.',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-white">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg h-full fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} 
        w-64 rounded-r-3xl`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold text-yellow-600">Shopkeeper</h2>
        </div>
        <nav className="flex flex-col space-y-3 p-6 text-gray-700">
          <button onClick={() => navigate('/shopkeeper/inventory')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium"> Manage Inventory</button>
          <button onClick={() => navigate('/shopkeeper/orders')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium"> View Orders</button>
          <button onClick={() => navigate('/shopkeeper/suppliers')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium"> Suppliers</button>
          <button onClick={() => navigate('/shopkeeper/expenses')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium">Expense Report</button>
          <button onClick={() => navigate('/shopkeeper/Reminders')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium">Reminder</button>
          <button onClick={() => navigate('/shopkeeper/history')} className="text-left px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium">History</button>
        </nav>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 hover:bg-yellow-100 rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className={`flex-1 px-6 py-20 transition-all duration-300 ${sidebarOpen ? 'ml-64' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-yellow-700 mb-2">Welcome, {shopkeeperName} 👋</h1>
            <p className="text-gray-600 text-lg">Manage your shop tasks and orders from here.</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start space-y-3 border border-gray-100 hover:shadow-xl transition">
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 text-center text-base font-medium shadow-sm">
            Use the sidebar to explore each section and take full control of your shop management!
          </p>
        </div>
      </main>
    </div>
  );
}
