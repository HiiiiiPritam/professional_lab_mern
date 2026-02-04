import React from 'react';
import { Trash2 } from 'lucide-react';

const TransactionsList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <h3 className="mb-4 text-lg">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-muted text-sm border-b border-zinc-800">
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium">Category</th>
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium text-right">Amount</th>
              <th className="py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors">
                <td className="py-3">{t.description}</td>
                <td className="py-3 text-sm text-muted">
                  <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs">
                    {t.category}
                  </span>
                </td>
                <td className="py-3 text-sm text-muted">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className={`py-3 text-right font-medium ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                </td>
                <td className="py-3 text-center">
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="p-2 text-muted hover:text-rose-400 hover:bg-rose-400/10 rounded-full transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-muted">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
