#!/bin/sh

# Wait for database to be ready (optional but good practice)
echo "Waiting for database to be ready..."

# Run migrations/setup
# These scripts use 'IF NOT EXISTS' so it's safe to run them every time
echo "Running database setup and migrations..."
node setup.js
node migrate_budgets.js

# Start the application
echo "Starting server..."
npm start
