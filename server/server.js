const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transactions ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add transaction
app.post('/api/transactions', async (req, res) => {
  const { description, amount, type, category } = req.body;
  if (!description || !amount || !type || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO transactions (description, amount, type, category) VALUES (?, ?, ?, ?)',
      [description, amount, type, category]
    );
    const newTransaction = { id: result.insertId, description, amount, type, category, date: new Date() };
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete transaction
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM transactions WHERE id = ?', [id]);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get stats
app.get('/api/stats', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
      FROM transactions
    `);
    
    const { total_income, total_expense } = rows[0];
    const balance = (total_income || 0) - (total_expense || 0);
    
    res.json({
      income: total_income || 0,
      expense: total_expense || 0,
      balance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Budget Endpoints
app.get('/api/budget', async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7); // YYYY-MM
  try {
    const [rows] = await db.query('SELECT * FROM budgets WHERE month = ?', [month]);
    res.json(rows[0] || { amount: 0, month });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/budget', async (req, res) => {
  const { amount, month } = req.body;
  const targetMonth = month || new Date().toISOString().slice(0, 7);
  
  if (!amount) return res.status(400).json({ error: 'Amount is required' });

  try {
    await db.query(`
      INSERT INTO budgets (amount, month) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE amount = VALUES(amount)
    `, [amount, targetMonth]);
    
    res.json({ message: 'Budget set successfully', amount, month: targetMonth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Insights Endpoint
app.get('/api/insights', async (req, res) => {
  const month = new Date().toISOString().slice(0, 7); // Current month YYYY-MM
  
  try {
    // 1. Get Monthly Budget
    const [budgetRows] = await db.query('SELECT amount FROM budgets WHERE month = ?', [month]);
    const budgetLimit = budgetRows[0] ? Number(budgetRows[0].amount) : 0;

    // 2. Get Monthly Expenses
    const [expenseRows] = await db.query(`
      SELECT SUM(amount) as total 
      FROM transactions 
      WHERE type = 'expense' AND DATE_FORMAT(date, '%Y-%m') = ?
    `, [month]);
    const totalExpense = Number(expenseRows[0].total) || 0;

    // 3. Get Top Category
    const [categoryRows] = await db.query(`
      SELECT category, SUM(amount) as total
      FROM transactions
      WHERE type = 'expense' AND DATE_FORMAT(date, '%Y-%m') = ?
      GROUP BY category
      ORDER BY total DESC
      LIMIT 1
    `, [month]);
    
    const topCategory = categoryRows[0] || { category: 'None', total: 0 };

    res.json({
      month,
      budget_limit: budgetLimit,
      total_expense: totalExpense,
      percent_used: budgetLimit > 0 ? Math.min((totalExpense / budgetLimit) * 100, 100) : 0,
      top_category: {
        name: topCategory.category,
        amount: Number(topCategory.total) || 0
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
