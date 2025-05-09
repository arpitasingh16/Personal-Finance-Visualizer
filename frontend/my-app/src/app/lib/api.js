export const fetchTransactions = async () => {
    const res = await fetch('http://localhost:5000/api/transactions');
    return res.json();
  };
  
  export const addTransaction = async (transaction) => {
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return res.json();
  };
  
  export const deleteTransaction = async (id) => {
    await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
    });
  };
  