import StatCard from './Statcard';

export default function StatsGrid({ balance, totalIncome, totalExpenses, transactionCount }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard 
        title="Balance" 
        value={balance} 
        isCurrency 
        trend={balance >= 0 ? 'up' : 'down'}
        icon="balance"
      />
      <StatCard 
        title="Income" 
        value={totalIncome} 
        isCurrency 
        trend="up"
        icon="income"
      />
      <StatCard 
        title="Expenses" 
        value={totalExpenses} 
        isCurrency 
        trend="down"
        icon="expense"
      />
      <StatCard 
        title="Transactions" 
        value={transactionCount}
        icon="transaction"
      />
    </div>
  );
}