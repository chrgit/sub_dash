import React, { useState } from 'react';
import { PlusCircle, DollarSign, Calendar, Trash2 } from 'lucide-react';

interface Subscription {
  id: number;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
}

const initialSubscriptions: Subscription[] = [
  { id: 1, name: 'Netflix', amount: 15.99, frequency: 'monthly' },
  { id: 2, name: 'Spotify', amount: 9.99, frequency: 'monthly' },
  { id: 3, name: 'Amazon Prime', amount: 119, frequency: 'yearly' },
];

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [newSubscription, setNewSubscription] = useState<Omit<Subscription, 'id'>>({
    name: '',
    amount: 0,
    frequency: 'monthly',
  });

  const addSubscription = () => {
    if (newSubscription.name && newSubscription.amount > 0) {
      setSubscriptions([
        ...subscriptions,
        { ...newSubscription, id: Date.now() },
      ]);
      setNewSubscription({ name: '', amount: 0, frequency: 'monthly' });
    }
  };

  const removeSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const calculateTotalPerYear = () => {
    return subscriptions.reduce((total, sub) => {
      return total + (sub.frequency === 'monthly' ? sub.amount * 12 : sub.amount);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Subscription Dashboard</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Subscription</h2>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                <input
                  type="text"
                  placeholder="Subscription name"
                  className="w-full p-2 border rounded"
                  value={newSubscription.name}
                  onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                />
              </div>
              <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full p-2 border rounded"
                  value={newSubscription.amount || ''}
                  onChange={(e) => setNewSubscription({ ...newSubscription, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="w-full sm:w-1/3 px-2">
                <select
                  className="w-full p-2 border rounded"
                  value={newSubscription.frequency}
                  onChange={(e) => setNewSubscription({ ...newSubscription, frequency: e.target.value as 'monthly' | 'yearly' })}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              onClick={addSubscription}
            >
              <PlusCircle className="mr-2" size={20} />
              Add Subscription
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Subscriptions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Name</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b">
                      <td className="p-3">{sub.name}</td>
                      <td className="p-3">
                        <span className="flex items-center">
                          <DollarSign size={16} className="mr-1" />
                          {sub.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {sub.frequency}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeSubscription(sub.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total per Year:</span>
              <span className="text-2xl font-bold text-green-600">
                ${calculateTotalPerYear().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;