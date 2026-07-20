function TransactionList({
  transactions,
  deleteTransaction,
}) {
  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={index}
            className={`transaction-item ${
              transaction.amount > 0
                ? "income-item"
                : "expense-item"
            }`}
          >
            <span>{transaction.text}</span>

            <div>
              ₹{transaction.amount}

              <button
                onClick={() =>
                  deleteTransaction(index)
                }
              >
                ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;