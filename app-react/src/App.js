import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionsList";
import { fetchTransactions, addTransaction } from "./api";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTransactions();
        setTransactions(data.reverse());
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  async function handleAddTransaction(newTransaction) {
    try {
      const data = await addTransaction(newTransaction);
      setTransactions([data, ...transactions]);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main>
      <h1>Transaction App</h1>
      {error && <p>Error: {error}</p>}
      <section className="transactions">
        <TransactionForm addTransaction={handleAddTransaction} />
        <TransactionList transactions={transactions} />
      </section>
    </main>
  );
};

export default App;
