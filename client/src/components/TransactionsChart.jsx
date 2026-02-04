import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TransactionsChart = ({ transactions }) => {
  const processData = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });
    
    return Object.keys(categories).map(cat => ({
      name: cat,
      amount: categories[cat]
    }));
  };

  const data = processData();

  if (data.length === 0) {
    return (
      <div className="card h-full flex items-center justify-center text-muted">
        No expense data to display
      </div>
    );
  }

  return (
    <div className="card h-full">
      <h3 className="mb-4 text-lg">Expense Breakdown</h3>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#06b6d4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsChart;
