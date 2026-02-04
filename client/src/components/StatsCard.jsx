import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCard = ({ title, value, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'income': return <TrendingUp size={24} className="text-emerald-400" />;
      case 'expense': return <TrendingDown size={24} className="text-rose-400" />;
      default: return <Wallet size={24} className="text-violet-400" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'income': return 'text-emerald-400';
      case 'expense': return 'text-rose-400';
      default: return 'text-violet-400';
    }
  };

  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-muted text-sm mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${getColor()}`}>${Number(value).toFixed(2)}</h3>
      </div>
      <div className={`p-3 rounded-full bg-opacity-10 ${type === 'income' ? 'bg-emerald-400' : type === 'expense' ? 'bg-rose-400' : 'bg-violet-400'}`}>
        {getIcon()}
      </div>
    </div>
  );
};

export default StatsCard;
