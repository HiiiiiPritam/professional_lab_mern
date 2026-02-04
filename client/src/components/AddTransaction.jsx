import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddTransaction = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(formData);
    setLoading(false);
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
        
        <h2 className="text-xl font-semibold mb-6">Add Transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Description</label>
            <input 
              type="text" 
              required
              className="w-full bg-[#1c1c1f]"
              placeholder="e.g. Grocery Shopping"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1.5">Amount</label>
              <input 
                type="number" 
                required
                step="0.01"
                className="w-full bg-[#1c1c1f]"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted mb-1.5">Type</label>
              <select 
                className="w-full bg-[#1c1c1f]"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted mb-1.5">Category</label>
            <input 
              type="text" 
              required
              className="w-full bg-[#1c1c1f]"
              placeholder="e.g. Food, Rent, Salary"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              list="categories"
            />
            <datalist id="categories">
              <option value="Food" />
              <option value="Transport" />
              <option value="Utilities" />
              <option value="Entertainment" />
              <option value="Health" />
              <option value="Work" />
            </datalist>
          </div>
          
          <button 
            type="submit" 
            className="w-full btn-primary justify-center mt-6"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
