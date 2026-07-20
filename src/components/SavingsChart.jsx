import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function SavingsChart({ monthlySavingsByMonth = {}, currentYear, getMonthLabel }) {
  const chartData = useMemo(() => {
    const year = currentYear || new Date().getFullYear();
    return Array.from({ length: 12 }, (_, index) => {
      const monthKey = `${year}-${String(index + 1).padStart(2, "0")}`;
      const data = monthlySavingsByMonth[monthKey] || { savings: 0 };
      return {
        monthKey,
        month: getMonthLabel ? getMonthLabel(monthKey, index) : monthKey,
        savings: Number(data.savings) || 0,
      };
    });
  }, [monthlySavingsByMonth, currentYear, getMonthLabel]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="savings-chart-tooltip">
          <p>{data.month}</p>
          <p>₹{data.savings.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="savings-chart-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Savings Comparison</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#a5b4fc" style={{ fontSize: "0.85rem" }} />
            <YAxis stroke="#a5b4fc" style={{ fontSize: "0.85rem" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#c7d2fe", fontSize: "0.9rem" }} />
            <Bar
              dataKey="savings"
              fill="url(#savingsGradient)"
              radius={[8, 8, 0, 0]}
              name="Monthly Savings (₹)"
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default SavingsChart;
