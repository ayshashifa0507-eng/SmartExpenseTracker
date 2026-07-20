function BudgetTracker({ budget = 0, expense = 0, onBudgetChange }) {
  const percent = budget > 0 ? Math.round((expense / budget) * 100) : 0;
  const capped = Math.min(Math.max(percent, 0), 100);
  const remaining = Math.max(0, budget - expense);

  const handleBudgetChange = (e) => {
    const value = Number(e.target.value);
    if (onBudgetChange) onBudgetChange(isNaN(value) ? 0 : value);
  };

  return (
    <div className="budget-container">
      <h2>Budget Tracker</h2>

      <div className="budget-input-row">
        <label htmlFor="budget-input">Set budget</label>
        <input
          id="budget-input"
          type="number"
          min="0"
          value={budget}
          onChange={handleBudgetChange}
        />
      </div>

      <p>
        Budget: ₹{budget} • Spent: ₹{expense} • Remaining: ₹{remaining}
      </p>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={capped}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-fill"
          style={{ width: `${capped}%` }}
        ></div>
      </div>
    </div>
  );
}

export default BudgetTracker;
