import { useState, useEffect } from "react";
import { fetchAccount } from "../api";

function TransactionCard({ accountId, isFirstItem, amount, transactions }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchAccountDetails() {
      const accountData = await fetchAccount(accountId);
      setBalance(accountData.balance);
    }

    fetchAccountDetails();
  }, [transactions, accountId]);

  let message = `Transferred ${Math.abs(amount)}$ ${
    amount < 0 ? "from" : "to"
  } ${accountId}`;

  return (
    <div
      data-type="transaction"
      data-account-id={accountId}
      data-amount={amount}
      data-balance={balance}
      className="transactionCard"
    >
      <p>{message}</p>
      {isFirstItem && <p>{`The current account balance is: ${balance}$`}</p>}
    </div>
  );
}

export default TransactionCard;
