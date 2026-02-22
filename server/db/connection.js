// Database connection setup using pg package
const { Pool } = require('pg');

// Create a connection pool to PostgreSQL
// This allows multiple database queries to run efficiently
const pool = new Pool({
  user: 'postgres',        // Your PostgreSQL username
  host: 'localhost',       // Database host
  database: 'forex_db',    // Database name
  password: 'admin',    // Your PostgreSQL password
  port: 5433,              // Default PostgreSQL port
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});

module.exports = pool;
