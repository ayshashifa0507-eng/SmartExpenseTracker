import { useState } from "react";

function ExpenseForm({ addTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    addTransaction({
      text,
      amount: Number(amount),
    });

    setText("");
    setAmount("");
  };

  const handleClear = () => {
    setText("");
    setAmount("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (+ income, - expense)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="form-actions">
        <button type="submit">
          Add Transaction
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={handleClear}
        >
          Clear Inputs
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;