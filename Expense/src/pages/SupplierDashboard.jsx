import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Package, Mail, History, MessageCircle, BarChart2, FileText } from 'lucide-react';

export default function SupplierDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const supplierName = localStorage.getItem("supplierName") || "Supplier";


  const features = [
    {
      icon: <Package className="text-blue-600 w-6 h-6" />,
      title: 'Manage Products',
      description: 'Easily update your available items, stock levels, and prices.',
    },
    {
      icon: <Mail className="text-green-600 w-6 h-6" />,
      title: 'Received Orders',
      description: 'Track and respond to all incoming orders from shopkeepers.',
    },
    {
      icon: <History className="text-yellow-600 w-6 h-6" />,
      title: 'Order History',
      description: 'Review your complete history of orders and transactions.',
    },
    {
      icon: <MessageCircle className="text-purple-600 w-6 h-6" />,
      title: 'Chat with Shopkeepers',
      description: 'Communicate instantly to confirm orders or solve queries.',
    },
    {
      icon: <BarChart2 className="text-pink-600 w-6 h-6" />,
      title: 'Monthly Expense',
      description: 'Keep track of all your payments, expenses, and pending dues.',
    },
    {
      icon: <FileText className="text-red-600 w-6 h-6" />,
      title: 'Bill Generation',
      description: 'Generate and send itemized bills for each transaction.',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg h-full fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} 
        w-64 rounded-r-3xl`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-extrabold text-blue-600">Supplier</h2>
        </div>
        <nav className="flex flex-col space-y-3 p-6 text-gray-700">
          <button onClick={() => navigate('/supplier/products')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium"> Manage Products</button>
          <button onClick={() => navigate('/supplier/received-orders')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Received Orders</button>
          <button onClick={() => navigate('/supplier/history')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium"> History</button>
          <button onClick={() => navigate('/supplier/chat')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Chat with Shopkeepers</button>
          <button onClick={() => navigate('/supplier/monthly-expense')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Monthly Expense</button>
          <button onClick={() => navigate('/supplier/bill-generation')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Bill Generation</button>
          <button onClick={() => navigate('/supplier/Reminders')} className="text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Reminder Section</button>
        </nav>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 hover:bg-blue-100 rounded-lg"
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
            <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome, {supplierName} 👋</h1>
            <p className="text-gray-600 text-lg">Manage all your supplier tasks from one smart dashboard.</p>
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
          <p className="mt-10 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 text-center text-base font-medium shadow-sm">
          Use the sidebar to explore each section and take full control of your supply management. We’re here to simplify your workflow!
         </p>

        </div>
      </main>
    </div>
  );
}
