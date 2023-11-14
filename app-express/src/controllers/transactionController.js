const { v4: uuidv4 } = require("uuid");
const transactionModel = require("../models/transactionModel");
const { updateBalance } = require("../models/accountModel");

function getTransactions(req, res) {
  const transactions = transactionModel.getTransactions();
  res.status(200).json(transactions);
}

function getTransactionById(req, res) {
  const { transaction_id } = req.params;

  const transaction = transactionModel.findTransactionById(transaction_id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  return res.status(200).json({ ...transaction });
}

function addTransaction(req, res) {
  const { account_id, amount } = req.body;

  const newTransaction = {
    transaction_id: uuidv4(),
    account_id,
    amount,
    createdAt: new Date().toISOString(),
  };

  const addedTransaction = transactionModel.addTransaction(newTransaction);
  updateBalance(account_id, amount);
  res.status(201).json(addedTransaction);
}

module.exports = {
  getTransactions,
  getTransactionById,
  addTransaction,
};
