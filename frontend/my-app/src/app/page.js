'use client';
import { useEffect, useState } from 'react';
import TransactionForm from './components/Transactions/TransactionForm';
import TransactionList from './components/Transactions/TransactionList';
import { fetchTransactions } from './lib/api';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const tx = await fetchTransactions();
      setTransactions(tx);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadTransactions(); }, [month]);

  // Calculate financial metrics
  const totalExpenses = transactions
    .filter(t => t.type !== 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const latestTransaction = transactions[0];

  // Filter transactions based on active tab
  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  // Category breakdown for chart
  const categoryData = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard 
            title="Balance" 
            value={balance} 
            isCurrency 
            trend={balance >= 0 ? 'up' : 'down'}
            icon={
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
          />

          <StatCard 
            title="Income" 
            value={totalIncome} 
            isCurrency 
            trend="up"
            icon={
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            }
          />

          <StatCard 
            title="Expenses" 
            value={totalExpenses} 
            isCurrency 
            trend="down"
            icon={
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            }
          />

          <StatCard 
            title="Transactions" 
            value={transactions.length} 
            icon={
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Form */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-black mb-4">Add Transaction</h2>
              <TransactionForm onAdd={loadTransactions} />
            </div>

            {/* Transaction List */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Transactions</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('income')}
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'income' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setActiveTab('expense')}
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'expense' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Expenses
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <TransactionList 
                  data={filteredTransactions} 
                  refresh={loadTransactions} 
                />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h2>
              <div className="h-64">
                {Object.keys(categoryData).length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(categoryData).map(([category, amount]) => (
                      <div key={category} className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{category}</span>
                          <span className="text-gray-500">₹{amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${(amount / totalExpenses) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No expense data available
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              {latestTransaction ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${latestTransaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {latestTransaction.type === 'income' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{latestTransaction.description}</p>
                      <p className="text-sm text-gray-500">
                        ₹{latestTransaction.amount} • {new Date(latestTransaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No recent transactions</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, isCurrency = false, trend, icon }) {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg p-5">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {isCurrency ? '₹' : ''}{value.toLocaleString()}
          </p>
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trend === 'up' ? '↑' : '↓'} {Math.abs(value * 0.12).toFixed(2)}%
          </span>
          <span className="ml-2 text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
}