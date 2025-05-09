import TransactionForm from '../Transactions/TransactionForm';
import TransactionList from '../Transactions/TransactionList';

export default function TransactionSection({
  loadTransactions,
  transactions,
  isLoading,
  activeTab,
  setActiveTab
}) {
  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-black mb-4">Add Transaction</h2>
        <TransactionForm onAdd={loadTransactions} />
      </div>

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
            data={transactions} 
            refresh={loadTransactions} 
          />
        )}
      </div>
    </>
  );
}