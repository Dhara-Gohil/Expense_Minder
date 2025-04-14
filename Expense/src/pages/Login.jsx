import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (role) => {
    const route =
      role === 'shopkeeper'
        ? 'http://localhost:5000/api/auth/login/shopkeeper'
        : 'http://localhost:5000/api/auth/login/supplier';
  
    try {
      const res = await axios.post(route, formData);
      alert(res.data.message);
  
      localStorage.setItem("token", res.data.token);
      if (role === 'shopkeeper') {
        localStorage.setItem("shopkeeperId", res.data.user._id);
      } else {
        localStorage.setItem("supplierId", res.data.user._id);
      }
      window.dispatchEvent(new Event("storage"));
  
      if (role === 'shopkeeper') {
        navigate('/shopkeeper/dashboard');
      } else {
        navigate('/supplier/dashboard');
      }
  
      setFormData({ email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome <span className="text-yellow-500">Back</span>
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-yellow-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => handleLogin('shopkeeper')}
              className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition"
            >
              Login as Shopkeeper
            </button>

            <button
              type="button"
              onClick={() => handleLogin('supplier')}
              className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition"
            >
              Login as Supplier
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-yellow-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
