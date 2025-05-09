export default function ChartsSection({ transactions, latestTransaction, totalExpenses }) {
    // Category breakdown for chart
    const categoryData = transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      }
      return acc;
    }, {});
  
    return (
      <>
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
      </>
    );
  }