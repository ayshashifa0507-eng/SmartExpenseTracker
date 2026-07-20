function BudgetTracker({ budget = 15000, expense }) {
  const percentage = (expense / budget) * 100;

  return (
    <div className="budget-container">
      <h2>Monthly Budget</h2>

      <p>Budget: ₹{budget}</p>
      <p>Spent: ₹{expense}</p>
      <p>Remaining: ₹{budget - expense}</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default BudgetTracker;