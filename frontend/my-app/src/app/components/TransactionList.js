'use client';
import { deleteTransaction } from '../lib/api';

export default function TransactionList({ data, refresh }) {
  return (
    <ul className="space-y-2">
      {data.map((t) => (
        <li key={t._id} className="flex justify-between items-center p-2 border rounded">
          <span>{t.description} - ₹{t.amount}</span>
          <button onClick={() => { deleteTransaction(t._id); refresh(); }} className="text-red-600">Delete</button>
        </li>
      ))}
    </ul>
  );
}

