import React, { useState } from 'react';
import { X, Target } from 'lucide-react';
import api from '../api';

const SetBudgetModal = ({ onClose, onSuccess, currentBudget }) => {
  const [amount, setAmount] = useState(currentBudget || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/budget', { amount });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Failed to set budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#141417] border border-[#27272a] p-6 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400">
             <Target size={24} />
           </div>
           <div>
             <h2 className="text-xl font-semibold">Set Monthly Budget</h2>
             <p className="text-sm text-muted">Track your spending goals</p>
           </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Monthly Limit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
              <input 
                type="number" 
                required
                step="0.01"
                className="w-full bg-[#1c1c1f] pl-8"
                placeholder="2000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full btn-primary justify-center mt-6"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Set Budget'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetBudgetModal;
