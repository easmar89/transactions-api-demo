const transactions = [];

function getTransactions() {
  return JSON.parse(JSON.stringify(transactions));
}

function findTransactionById(id) {
  const transaction = transactions.find(
    (transaction) => transaction.transaction_id === id
  );
  return transaction ? JSON.parse(JSON.stringify(transaction)) : null;
}

function addTransaction(transaction) {
  if (
    !transaction.transaction_id ||
    !transaction.amount ||
    !transaction.account_id ||
    !transaction.createdAt
  ) {
    throw new Error("Invalid transaction object");
  }

  transactions.push(transaction);
  return transaction;
}

module.exports = {
  getTransactions,
  findTransactionById,
  addTransaction,
};
