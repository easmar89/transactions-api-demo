const { findAccountById, updateBalance } = require("../models/accountModel");

function getAccount(req, res) {
  const { account_id } = req.params;
  const account = findAccountById(account_id);

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  return res.status(200).json({ account_id, balance: account.balance });
}

function updateAccountBalance(req, res) {
  const { account_id, amount } = req.body;
  const updatedAccount = updateBalance(account_id, amount);

  if (!updatedAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  return res.json({ account_id, balance: updatedAccount.balance });
}

module.exports = {
  getAccount,
  updateAccountBalance,
};
