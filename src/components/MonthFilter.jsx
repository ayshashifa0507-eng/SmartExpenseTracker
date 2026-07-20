import React from "react";
import { motion } from "framer-motion";

function MonthFilter({ currentMonth, lastMonthKey, archivedMonths, selectedMonth, onMonthSelect, getMonthLabel }) {
  const options = [
    { value: "current", label: `Current Month (${getMonthLabel(currentMonth, 0)})` },
    { value: "last", label: `Last Month (${getMonthLabel(lastMonthKey, 0)})` },
    ...(archivedMonths.length > 0
      ? [{ value: "archived", label: "Archived Months", disabled: true }]
      : []),
    ...archivedMonths.map((archive, idx) => ({
      value: archive.month,
      label: getMonthLabel(archive.month, idx),
    })),
  ];

  return (
    <motion.div
      className="month-filter-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label htmlFor="month-select">View Transactions:</label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => onMonthSelect(e.target.value)}
        className="month-filter-select"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

export default MonthFilter;
