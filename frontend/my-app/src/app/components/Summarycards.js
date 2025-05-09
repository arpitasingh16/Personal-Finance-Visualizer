// components/SummaryCards.js
export default function SummaryCards({ total, latest }) {
    return (
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
          <h3 className="text-md">Total Expenses</h3>
          <p className="text-2xl font-semibold">₹{total}</p>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
          <h3 className="text-md">Most Recent</h3>
          <p className="text-sm">{latest?.description || 'No data yet'}</p>
        </div>
      </div>
    );
  }
  