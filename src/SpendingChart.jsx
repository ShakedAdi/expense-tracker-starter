import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Spending by Category</h2>
        <p>No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="value" name="Amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
