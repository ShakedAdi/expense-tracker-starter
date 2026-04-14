import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const TICK_STYLE = { fill: '#4e607e', fontSize: 11, fontFamily: 'DM Mono, monospace' };
const AXIS_LINE  = { stroke: 'rgba(255,255,255,0.06)' };
const TOOLTIP_STYLE = {
  background: '#0d1525',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#dde4f0',
  fontFamily: 'DM Mono, monospace',
  fontSize: '13px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
};

function CategoryChart({ transactions, type, title, color }) {
  const byCategory = transactions
    .filter(t => t.type === type)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>{title}</h2>
        <p>No {type} data to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" tick={TICK_STYLE} axisLine={AXIS_LINE} tickLine={false} />
          <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
