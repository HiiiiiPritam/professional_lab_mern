CREATE DATABASE IF NOT EXISTS lumina_finance;
USE lumina_finance;

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO transactions (description, amount, type, category, date) VALUES 
('Freelance Project', 1500.00, 'income', 'Work', NOW()),
('Groceries', 85.50, 'expense', 'Food', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Netflix Subscription', 15.00, 'expense', 'Entertainment', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Gym Membership', 45.00, 'expense', 'Health', DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Monthly Salary', 3500.00, 'income', 'Work', DATE_SUB(NOW(), INTERVAL 5 DAY)),
('Coffee', 5.50, 'expense', 'Food', NOW());
