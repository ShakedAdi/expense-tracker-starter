import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IncomeChart({ transactions }) {
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(incomeByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Income by Category</h2>
        <p>No income data to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Income by Category</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="value" name="Amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeChart;
