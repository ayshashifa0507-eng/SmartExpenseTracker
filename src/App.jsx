import { useState, useEffect, useMemo } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import MonthFilter from "./components/MonthFilter";
import MonthlySavings from "./components/MonthlySavings";
import SavingsChart from "./components/SavingsChart";
import ExpandableArchive from "./components/ExpandableArchive";
import ExpenseChart from "./components/ExpenseChart";
import { motion } from "framer-motion";
import SplashCursor from "./components/SplashCursor";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [currentMonth, setCurrentMonth] = useState(() => {
    return localStorage.getItem("currentMonth") || monthKey;
  });

  const [archivedTransactions, setArchivedTransactions] = useState(() => {
    const saved = localStorage.getItem("archivedTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState("current");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("currentMonth", currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    localStorage.setItem("archivedTransactions", JSON.stringify(archivedTransactions));
  }, [archivedTransactions]);

  const lastMonthKey = useMemo(() => {
    const [year, month] = currentMonth.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    date.setMonth(date.getMonth() - 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }, [currentMonth]);

  const getMonthLabel = (monthKey) => {
    if (!monthKey) return "";
    const [year, month] = monthKey.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  const monthlySavingsByMonth = useMemo(() => {
    const result = {};

    archivedTransactions.forEach((archive) => {
      const archiveIncome = Number(archive.income) || 0;
      const archiveExpense = Math.abs(Number(archive.expense) || 0);
      const archiveSavings = archiveIncome - archiveExpense;

      result[archive.month] = {
        income: archiveIncome,
        expense: archiveExpense,
        savings: archiveSavings,
        transactions: archive.transactions || [],
      };
    });

    result[currentMonth] = {
      income,
      expense: Math.abs(expense),
      savings: income - Math.abs(expense),
      transactions,
    };

    return result;
  }, [archivedTransactions, currentMonth, income, expense, transactions]);

  useEffect(() => {
    localStorage.setItem("monthlySavingsByMonth", JSON.stringify(monthlySavingsByMonth));
  }, [monthlySavingsByMonth]);

  const displayTransactions = useMemo(() => {
    if (selectedMonth === "current") {
      return transactions;
    }

    if (selectedMonth === "last") {
      const archived = archivedTransactions.find((a) => a.month === lastMonthKey);
      return archived ? archived.transactions : [];
    }

    const archived = archivedTransactions.find((a) => a.month === selectedMonth);
    return archived ? archived.transactions : [];
  }, [selectedMonth, transactions, archivedTransactions, lastMonthKey]);

  const deleteTransaction = (index) => {
    if (selectedMonth === "current") {
      setTransactions(transactions.filter((_, i) => i !== index));
      return;
    }

    const targetMonth = selectedMonth === "last" ? lastMonthKey : selectedMonth;
    setArchivedTransactions((prev) =>
      prev.map((archive) => {
        if (archive.month !== targetMonth) return archive;
        return {
          ...archive,
          transactions: archive.transactions.filter((_, i) => i !== index),
        };
      })
    );
  };

  useEffect(() => {
    if (currentMonth !== monthKey) {
      if (transactions.length > 0) {
        setArchivedTransactions((prev) => [
          ...prev,
          {
            month: currentMonth,
            transactions,
            income,
            expense,
            balance,
          },
        ]);
      }

      setTransactions([]);
      setCurrentMonth(monthKey);
      setSelectedMonth("current");
    }
  }, [currentMonth, monthKey, transactions, income, expense, balance]);

  return (
    <div className="app">
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="hero-wrapper">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          SMART EXPENSE TRACKER
        </motion.h1>
        <p className="subtitle">track . save . analyze</p>

        <nav className="top-nav">
          <a href="#transaction-history">Transaction History</a>
          <a href="#monthly-savings-dashboard">Monthly Savings Dashboard</a>
          <a href="#savings-comparison">Savings Comparison</a>
          <a href="#archived-months">Archived Months</a>
          <a href="#expense-analysis">Expense Analysis</a>
        </nav>
      </div>
      <div className="dashboard-summary-section">
        <div className="dashboard">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
          <h2>Balance</h2>
          <p>₹{balance}</p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Income</h2>
          <p>₹{income}</p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Expense</h2>
          <p>₹{Math.abs(expense)}</p>
        </motion.div>
      </div>
      </div>

      <section id="transaction-history" className="section-block">
        <SplashCursor />

        <ExpenseForm addTransaction={addTransaction} />

        <MonthFilter
          currentMonth={currentMonth}
          lastMonthKey={lastMonthKey}
          archivedMonths={archivedTransactions}
          selectedMonth={selectedMonth}
          onMonthSelect={setSelectedMonth}
          getMonthLabel={getMonthLabel}
        />

        <TransactionList
          transactions={displayTransactions}
          deleteTransaction={deleteTransaction}
        />
      </section>

      <section id="monthly-savings-dashboard" className="section-block">
        <MonthlySavings
          monthlySavingsByMonth={monthlySavingsByMonth}
          currentMonth={currentMonth}
          currentYear={Number(currentMonth.split("-")[0])}
          getMonthLabel={getMonthLabel}
        />
      </section>

      <section id="savings-comparison" className="section-block">
        <SavingsChart
          monthlySavingsByMonth={monthlySavingsByMonth}
          currentYear={Number(currentMonth.split("-")[0])}
          getMonthLabel={getMonthLabel}
        />
      </section>

      <section id="archived-months" className="section-block">
        <ExpandableArchive
          archivedTransactions={archivedTransactions}
          getMonthLabel={getMonthLabel}
        />
      </section>

      <section id="expense-analysis" className="section-block">
        <ExpenseChart transactions={transactions} />
      </section>
    </div>
  );
}

export default App;