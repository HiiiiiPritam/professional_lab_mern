import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import TransactionsChart from '../components/TransactionsChart';
import TransactionsList from '../components/TransactionsList';
import SetBudgetModal from '../components/SetBudgetModal';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';

const Dashboard = ({ transactions, stats, onDelete }) => {
  const [insightData, setInsightData] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  
  // Get only recent 5 transactions for dashboard
  const recentTransactions = transactions.slice(0, 5);

  const fetchInsights = async () => {
    try {
      const res = await api.get('/insights');
      setInsightData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [transactions]); // Refetch if transactions change

  const handleBudgetSuccess = () => {
    fetchInsights();
    setShowBudgetModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Overview
          </h1>
          <p className="text-muted mt-1">Here's what's happening with your finances today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Balance" value={stats.balance} type="balance" />
        <StatsCard title="Total Income" value={stats.income} type="income" />
        <StatsCard title="Total Expenses" value={stats.expense} type="expense" />
      </div>

      {/* Charts & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-h-[400px]">
           <TransactionsChart transactions={transactions} />
        </div>
        
        {/* Insight Card */}
        <div className="flex flex-col gap-6">
          <div className="card w-full bg-gradient-to-br from-violet-500/10 via-[#141417] to-[#141417] border-violet-500/20 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -top-6 -right-6 text-violet-500/5 rotate-12 group-hover:rotate-45 transition-transform duration-700">
              <Sparkles size={140} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                   <Sparkles size={20} />
                 </div>
                 <h3 className="font-semibold text-lg text-white">Smart Insight</h3>
              </div>
              
              {insightData ? (
                <div className="space-y-2">
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {insightData.top_category.amount > 0 ? (
                      <>Your financing is heavily weighted towards <span className="text-white font-medium">{insightData.top_category.name}</span> (${insightData.top_category.amount.toFixed(0)}).</>
                    ) : (
                      <>You haven't spent anything this month yet. Great start!</>
                    )}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {insightData.budget_limit > 0 
                      ? `You've used ${insightData.percent_used.toFixed(0)}% of your monthly budget.`
                      : "Set a budget to track your monthly progress."
                    }
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted">Loading insights...</p>
              )}

              <div className="pt-4">
                 <div className="flex justify-between text-xs font-medium mb-2">
                   <span className="text-gray-400">Monthly Budget</span>
                   <span className="text-violet-400">
                      {insightData?.budget_limit > 0 ? `${insightData.percent_used.toFixed(0)}% used` : 'No budget set'}
                   </span>
                 </div>
                 <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-1000" 
                      style={{ width: `${insightData?.percent_used || 0}%` }}
                    />
                 </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowBudgetModal(true)}
            className="card w-full p-4 flex items-center justify-between group hover:border-violet-500/30 transition-all cursor-pointer bg-[#141417] hover:bg-[#18181b]"
          >
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-violet-600 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">
                  <span className="text-2xl font-light">+</span>
               </div>
               <div className="text-left">
                 <h4 className="font-medium text-white group-hover:text-violet-200 transition-colors">Set Budget Goal</h4>
                 <p className="text-xs text-muted">
                    {insightData?.budget_limit > 0 ? `Current: $${insightData.budget_limit}` : 'Track your saving targets'}
                 </p>
               </div>
             </div>
             <ArrowRight size={18} className="text-muted group-hover:translate-x-1 group-hover:text-white transition-all" />
          </button>

          {/* Quick Tip */}
          <div className="px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs text-center text-zinc-500">
            💡 Pro tip: Categorize your transactions to get better insights.
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Link to="/transactions" className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
             View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="border border-[#27272a] rounded-xl overflow-hidden shadow-sm bg-[#141417]">
           <TransactionsList transactions={recentTransactions} onDelete={onDelete} />
        </div>
      </div>

      {showBudgetModal && (
        <SetBudgetModal 
          onClose={() => setShowBudgetModal(false)}
          onSuccess={handleBudgetSuccess}
          currentBudget={insightData?.budget_limit}
        />
      )}

    </div>
  );
};

export default Dashboard;
