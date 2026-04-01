import React, { useState, useEffect, useMemo } from 'react';
import TransactionsList from '../components/TransactionsList';
import { Search, Filter, Loader2 } from 'lucide-react';
import { currencyChange } from '../helpers/currencyChange';

const TransactionsPage = ({ transactions, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [isConverting, setIsConverting] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' ? true : t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  useEffect(() => {
    const convertAmounts = async () => {
      setIsConverting(true);
      if (targetCurrency === 'USD') {
        setDisplayTransactions(filteredTransactions.map(t => ({ ...t, displayCurrency: 'USD' })));
        setIsConverting(false);
        return;
      }
      try {
        const converted = await Promise.all(
          filteredTransactions.map(async (t) => {
            const newAmount = await currencyChange(t.amount, 'USD', targetCurrency);
            return { ...t, amount: newAmount, displayCurrency: targetCurrency };
          })
        );
        setDisplayTransactions(converted);
      } catch (error) {
        console.error("Failed to convert currency", error);
        setDisplayTransactions(filteredTransactions.map(t => ({ ...t, displayCurrency: 'USD' })));
      }
      setIsConverting(false);
    };

    convertAmounts();
  }, [filteredTransactions, targetCurrency]);

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
          <select 
            className="bg-[#09090b] border-transparent focus:border-violet-500/50 cursor-pointer min-w-[80px]"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>

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

      <div className="border border-[#27272a] rounded-xl overflow-hidden shadow-sm bg-[#141417] relative">
        {isConverting && (
          <div className="absolute inset-0 bg-[#141417]/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
          </div>
        )}
        <TransactionsList transactions={displayTransactions} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TransactionsPage;
