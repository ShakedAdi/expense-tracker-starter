import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AXIS_COLOR = '#555872';

function CustomTooltip({ active, payload, label, color }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#21253a', border: '1px solid #2a2d3e', padding: '10px 14px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8b8fa8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, color }}>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
}

function CategoryChart({ transactions, type, title, color, emptyMessage }) {
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
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return (
    <div className="chart-container">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={28} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fill: AXIS_COLOR }}
            axisLine={{ stroke: '#2a2d3e' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: AXIS_COLOR }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            content={<CustomTooltip color={color} />}
            cursor={{ fill: `rgba(${r},${g},${b},0.06)` }}
          />
          <Bar dataKey="value" name="Amount" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
