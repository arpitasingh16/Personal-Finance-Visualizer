

'use client';
import { useState } from 'react';
import { addTransaction } from '../../lib/api';

const predefinedCategories = ['Food', 'Travel', 'Rent', 'Utilities', 'Shopping', 'Entertainment', 'Others'];

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
    category: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(form);
    setForm({ amount: '', date: '', description: '', category: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow">
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required className="border p-2 w-full text-black" />
      <input name="date" type="date" value={form.date} onChange={handleChange} required className="border p-2 w-full text-black" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-2 w-full text-black" />
      <select name="category" value={form.category} onChange={handleChange} required className="border p-2 w-full text-black">
        <option value="">Select Category</option>
        {predefinedCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Transaction</button>
    </form>
  );
}
