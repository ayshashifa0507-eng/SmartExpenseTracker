import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter(
    (t) => t.amount < 0
  );

  const totalFood = expenses
    .filter((t) =>
      t.text.toLowerCase().includes("food")
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalTravel = expenses
    .filter((t) =>
      t.text.toLowerCase().includes("travel")
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalOther = expenses
    .filter(
      (t) =>
        !t.text.toLowerCase().includes("food") &&
        !t.text.toLowerCase().includes("travel")
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const data = {
    labels: ["Food", "Travel", "Other"],
    datasets: [
  {
    data: [
      totalFood,
      totalTravel,
      totalOther,
    ],
    backgroundColor: [
      "#10B981",
      "#3B82F6",
      "#F59E0B",
    ],
    borderColor: "#ffffff",
    borderWidth: 2,
  },
],
  };

  return (
    <div className="chart-container">
      <h2>Expense Analysis</h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;