import TransactionSection from './TransactionSection';
import ChartsSection from './ChartsSection';

export default function MainContent({
  transactions,
  isLoading,
  activeTab,
  setActiveTab,
  loadTransactions,
  latestTransaction,
  totalExpenses
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <TransactionSection
          loadTransactions={loadTransactions}
          transactions={transactions}
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="space-y-6">
        <ChartsSection
          transactions={transactions}
          latestTransaction={latestTransaction}
          totalExpenses={totalExpenses}
        />
      </div>
    </div>
  );
}