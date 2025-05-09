// components/Sidebar.js
export default function Sidebar() {
    const navItems = ['Dashboard', 'Wallet', 'Records', 'Accounts', 'Shoplist', 'Send/Request', 'Settings', 'Logout'];
  
    return (
      <aside className="bg-black text-white w-60 min-h-screen flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">💰 Fintech</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map(item => (
            <button key={item} className="text-left hover:bg-gray-800 px-3 py-2 rounded">
              {item}
            </button>
          ))}
        </nav>
      </aside>
    );
  }
  