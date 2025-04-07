// FeaturesPage.jsx
import React from 'react';

export default function FeaturesPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Why Choose <span className="text-yellow-500">ExpenseMinder?</span>
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Our powerful features help you stay on top of your finances effortlessly.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Expense Tracking</h3>
            <p className="text-gray-600">Automatically categorize and track your daily spending with ease.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Budgets</h3>
            <p className="text-gray-600">Set personalized budget limits and get alerts before overspending.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Reports</h3>
            <p className="text-gray-600">Visualize your financial data through intuitive graphs and charts.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud Sync</h3>
            <p className="text-gray-600">Access your expense history across all your devices anytime.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Security First</h3>
            <p className="text-gray-600">Your data is protected with top-level encryption and privacy.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly Interface</h3>
            <p className="text-gray-600">Clean and modern UI that makes budgeting feel effortless.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
