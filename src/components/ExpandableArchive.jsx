import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ExpandableArchive({ archivedTransactions, getMonthLabel }) {
  const [expandedMonths, setExpandedMonths] = useState({});

  const toggleMonth = (monthKey) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
    }));
  };

  if (!archivedTransactions || archivedTransactions.length === 0) {
    return (
      <motion.div
        className="archive-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Archived Months</h2>
        <p>No archived months yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="archive-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Archived Months</h2>

      <div className="archive-list">
        {archivedTransactions.map((archive, idx) => {
          const monthKey = archive.month;
          const isExpanded = expandedMonths[monthKey] || false;
          const label = getMonthLabel(archive.month, idx);

          return (
            <motion.div
              key={`${monthKey}-${idx}`}
              className="archive-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <button
                className="archive-toggle-btn"
                onClick={() => toggleMonth(monthKey)}
              >
                <span className="toggle-icon">{isExpanded ? "▼" : "▶"}</span>
                <strong>{label}</strong>
                <span className="archive-summary">
                  Income: ₹{archive.income} | Expense: ₹{Math.abs(archive.expense)} | Savings: ₹{archive.balance}
                </span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="archive-transactions"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="transactions-list">
                      {archive.transactions && archive.transactions.length > 0 ? (
                        archive.transactions.map((txn, txnIdx) => (
                          <motion.div
                            key={`${monthKey}-txn-${txnIdx}`}
                            className={`transaction-row ${txn.amount > 0 ? "income" : "expense"}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: txnIdx * 0.02 }}
                          >
                            <span className="txn-description">{txn.text}</span>
                            <span className={`txn-amount ${txn.amount > 0 ? "income-amount" : "expense-amount"}`}>
                              {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount)}
                            </span>
                          </motion.div>
                        ))
                      ) : (
                        <p className="no-transactions">No transactions in this month</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ExpandableArchive;
