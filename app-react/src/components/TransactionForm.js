import { useState } from "react";
import Input from "./Input";

function TransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState({
    account_id: "",
    amount: "",
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    setFormData({
      account_id: "",
      amount: "",
    });
  };

  const validateInput = () => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!formData.account_id.match(uuidRegex)) return "Invalid Account ID";
    if (isNaN(Number(formData.amount))) return "Invalid Amount";
    return null;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const error = validateInput();

    if (error) {
      setFormError(error);
      clearForm();
      return;
    }

    const payload = {
      account_id: formData.account_id,
      amount: Number(formData.amount),
    };

    try {
      await addTransaction(payload);
      clearForm();
      setFormError(null);
    } catch (error) {
      setFormError("An error occurred while processing your transaction.");
      console.error(error);
    }
  }

  return (
    <section className="transactionForm">
      <h2>Submit new transaction</h2>
      {formError && <p className="error">{formError}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Account ID:"
          id="account-id"
          name="account_id"
          dataType="account-id"
          type="text"
          value={formData.account_id}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="Amount:"
          id="amount"
          name="amount"
          dataType="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required={true}
        />
        <input data-type="transaction-submit" type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default TransactionForm;
