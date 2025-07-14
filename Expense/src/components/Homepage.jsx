// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const scrollDown = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}
export default function HomePage() {
  return (
    <main className="bg-gray-50 scroll-smooth">

      {/* Hero */}
      <section className="text-center px-6 py-20 bg-gradient-to-r from-yellow-200 to-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Manage Your Expenses Smarter</h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700">Track bills, get reminders, and simplify expense management with Expense Minder.</p>
        <button
          onClick={scrollDown}
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Track Bills Easily", "Smart Reminders", "Expense Reports", "Multi-user Support", "Cloud Backup", "Secure & Private"].map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Can Use */}
      <section className="bg-yellow-50 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">Who Can Use It?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Shopkeepers", desc: "Generate bills, manage customer records and track payments." },
            { title: "Customers", desc: "View past bills, set reminders and never forget due dates." },
            { title: "Accountants", desc: "Download reports, analyze expenses and organize tax details." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center text-gray-800">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-100 to-yellow-200 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Start Managing Your Expenses Today</h2>
        <p className="text-lg mb-6 text-gray-700">Join thousands who use Expense Minder to stay financially organized and stress-free.</p>
        <Link
          to="/signup"
          className="bg-gray-900 text-white px-6 py-3 rounded-lg transition hover:bg-white hover:text-black"
        >
          Sign Up Free
        </Link>
      </section>
    </main>
  );
}

