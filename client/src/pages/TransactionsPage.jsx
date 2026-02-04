import React, { useState } from 'react';
import TransactionsList from '../components/TransactionsList';
import { Search, Filter } from 'lucide-react';

const TransactionsPage = ({ transactions, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' ? true : t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-muted mt-1">Manage all your income and expenses.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-10 bg-[#09090b] border-transparent focus:bg-[#000000] focus:border-violet-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-muted" />
          <select 
            className="bg-[#09090b] border-transparent focus:border-violet-500/50 cursor-pointer min-w-[150px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="border border-[#27272a] rounded-xl overflow-hidden shadow-sm bg-[#141417]">
        <TransactionsList transactions={filteredTransactions} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TransactionsPage;
