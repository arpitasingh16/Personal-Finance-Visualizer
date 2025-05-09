// components/Topbar.js
import { Bell, PlusCircle } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 px-6">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-sm px-3 py-1.5 rounded text-white"
        />
        <Bell />
        <PlusCircle />
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full w-8 h-8"
          alt="Profile"
        />
      </div>
    </div>
  );
}
