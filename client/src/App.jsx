import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './api';
import Layout from './components/Layout';
import AddTransaction from './components/AddTransaction';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [transRes, statsRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/stats')
      ]);
      setTransactions(transRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    try {
      await api.post('/transactions', data);
      await fetchData();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await api.delete(`/transactions/${id}`);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete transaction');
    }
  };

  return (
    <BrowserRouter>
      <Layout onOpenAddModal={() => setShowModal(true)}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                transactions={transactions} 
                stats={stats} 
                onDelete={handleDelete} 
              />
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <TransactionsPage 
                transactions={transactions} 
                onDelete={handleDelete} 
              />
            } 
          />
        </Routes>
      </Layout>

      {/* Global Modal */}
      {showModal && (
        <AddTransaction 
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
