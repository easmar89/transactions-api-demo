const BASE_URL = "http://localhost:5000";

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "An error occurred");
  }
  return response.json();
}

export function fetchTransactions() {
  return fetchData(`${BASE_URL}/transactions`);
}

export function fetchTransactionById(transactionId) {
  return fetchData(`${BASE_URL}/transactions/${transactionId}`);
}

export function addTransaction(transaction) {
  return fetchData(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
}

export function fetchAccount(accountId) {
  return fetchData(`${BASE_URL}/accounts/${accountId}`);
}
