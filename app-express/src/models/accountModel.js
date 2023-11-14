const { ValidationError } = require("../utils/errorTypes");

let accounts = [];

function findAccountById(account_id) {
  const account = accounts.find((acc) => acc.account_id === account_id);
  if (account) {
    return { ...account };
  }
  return;
}

function updateBalance(account_id, amount) {
  if (!account_id || isNaN(amount)) {
    throw new ValidationError("Invalid input");
  }

  let account = findAccountById(account_id);

  if (account) {
    const newAccount = { ...account, balance: account.balance + amount };
    accounts = accounts.map((acc) =>
      acc.account_id === account_id ? newAccount : acc
    );
    return newAccount;
  } else {
    accounts.push({ account_id, balance: amount });
    return { account_id, balance: amount };
  }
}

module.exports = {
  findAccountById,
  updateBalance,
};
