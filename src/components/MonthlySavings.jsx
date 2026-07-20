import React, { useMemo } from "react";
import { motion } from "framer-motion";

function formatAmount(val) {
  return `₹${Number(val).toLocaleString()}`;
}

function MonthlySavings({ monthlySavingsByMonth = {}, currentMonth, currentYear, getMonthLabel }) {
  const months = useMemo(() => {
    const cards = [];
    for (let i = 0; i < 12; i += 1) {
      const monthKey = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
      const saved = monthlySavingsByMonth[monthKey] || { income: 0, expense: 0, savings: 0 };
      cards.push({ monthKey, ...saved });
    }
    return cards;
  }, [monthlySavingsByMonth, currentYear]);

  const current = monthlySavingsByMonth[currentMonth] || { income: 0, expense: 0, savings: 0 };

  return (
    <motion.div
      className="monthly-savings-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Monthly Savings Dashboard</h2>

      <div className="current-month-card">
        <div className="month-card current-card">
          <h3>{getMonthLabel(currentMonth, 0)} (Current)</h3>
          <p>Income: {formatAmount(current.income)}</p>
          <p>Expense: {formatAmount(current.expense)}</p>
          <p className={current.savings >= 0 ? "positive" : "negative"}>
            Savings: {formatAmount(current.savings)}
          </p>
        </div>
      </div>

      <div className="month-cards-grid">
        {months.map((item) => {
          const label = getMonthLabel(item.monthKey, 0);
          const positive = item.savings >= 0;
          return (
            <motion.div
              key={item.monthKey}
              className="month-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.03 }}
            >
              <h3>{label}</h3>
              <div className="card-row">
                <span>Income</span>
                <strong>{formatAmount(item.income)}</strong>
              </div>
              <div className="card-row">
                <span>Expense</span>
                <strong>{formatAmount(item.expense)}</strong>
              </div>
              <div className="card-row savings-row">
                <span>Savings</span>
                <strong className={positive ? "positive" : "negative"}>
                  {formatAmount(item.savings)}
                </strong>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default MonthlySavings;
