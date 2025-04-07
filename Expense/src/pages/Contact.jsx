import React from 'react';

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Get in <span className="text-yellow-500">Touch</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          We'd love to hear from you. Send us a message!
        </p>

        <form className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
