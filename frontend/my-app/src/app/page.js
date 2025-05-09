'use client';
import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryPiechart from './components/CategoryPiechart';
import DashboardSummary from './components/DashboardSummary';
import { fetchTransactions } from './lib/api';


export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const load = async () => {
    const tx = await fetchTransactions();
    
    setTransactions(tx);
    
  };

  useEffect(() => { load(); }, [month]);

  return (
    <main className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Personal Finance Dashboard</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Month: </h2>
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2 rounded" />
      </div>

      <DashboardSummary transactions={transactions} />
      <CategoryPiechart data={transactions} />

    
      <TransactionForm onAdd={load} />
      <TransactionList data={transactions} refresh={load} />
    </main>
  );
}
