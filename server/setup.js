const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function setup() {
  console.log('Starting database setup...');
  
  // Connect to MySQL server (without selecting a specific database yet)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true // Enable multiple statements to run the full schema script
  });

  try {
    console.log('Connected to MySQL server.');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema script
    console.log('Executing schema.sql...');
    await connection.query(schemaSql);
    
    console.log('Database and tables set up successfully!');
    console.log('Seed data inserted.');
    
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await connection.end();
    process.exit();
  }
}

setup();
