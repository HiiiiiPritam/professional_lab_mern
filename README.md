# Lumina Finance

A premium personal finance dashboard built with the PERN stack (MySQL variant).

## Prerequisites
- Node.js
- MySQL Server

## Setup

### 1. Database Setup
Create a MySQL database and run the schema script:
1. Open your MySQL client (Workbench, etc).
2. Execute the contents of `server/schema.sql`.
   - This creates a database named `lumina_finance` and a `transactions` table with some dummy data.

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   - Check `.env` file. Update `DB_PASSWORD` if your local MySQL root user has a password.
4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000.

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on http://localhost:5173.

## Features
- **Dashboard**: Overview of Balance, Income, and Expenses.
- **Charts**: Visual breakdown of expenses using Recharts.
- **Transactions**: Add, View, and Delete transactions.
- **Premium UI**: Dark mode, glassmorphism, and responsive design.
