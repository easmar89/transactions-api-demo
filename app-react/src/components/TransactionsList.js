import TransactionCard from "./TransactionCard";

function TransactionsList({ transactions }) {
  return !transactions ? (
    <p>No data</p>
  ) : (
    <section className="transactionsList">
      <h2>Transaction History</h2>
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          isFirstItem={index === 0}
          accountId={transaction.account_id}
          amount={transaction.amount}
          transactions={transactions}
        />
      ))}
    </section>
  );
}

export default TransactionsList;
