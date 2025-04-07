import React, { useState } from 'react';

export default function PricingPage() {
  const [selected, setSelected] = useState('Pro');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['✓ Basic Expense Tracking', '✓ Monthly Reports', '✓ 1 Device Sync'],
    },
    {
      name: 'Pro',
      price: '$9.99/mo',
      features: ['✓ All Free Features', '✓ Advanced Analytics', '✓ Multi-Device Sync', '✓ Budget Alerts'],
    },
    {
      name: 'Premium',
      price: '$19.99/mo',
      features: ['✓ All Pro Features', '✓ Personalized Insights', '✓ Family Sharing', '✓ 24/7 Support'],
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Choose Your <span className="text-yellow-500">Plan</span>
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Flexible pricing options that suit your needs.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`cursor-pointer bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 ${
                selected === plan.name
                  ? 'border-2 border-yellow-500 scale-105'
                  : 'border border-gray-200'
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-yellow-500 mb-4">{plan.price}</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                {plan.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button
                className={`${
                  selected === plan.name
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } px-6 py-2 rounded-full transition`}
              >
                {selected === plan.name ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
