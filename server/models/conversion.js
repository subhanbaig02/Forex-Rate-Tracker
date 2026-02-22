// Model for handling conversion database operations
const pool = require('../db/connection');

// Save a new conversion to the database
const saveConversion = async (fromCurrency, toCurrency, amount, convertedAmount, rate) => {
  const query = `
    INSERT INTO conversions (from_currency, to_currency, amount, converted_amount, rate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const values = [fromCurrency, toCurrency, amount, convertedAmount, rate];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Failed to save conversion: ' + error.message);
  }
};

// Get the last 10 conversions from database
const getConversionHistory = async () => {
  const query = `
    SELECT * FROM conversions
    ORDER BY created_at DESC
    LIMIT 10
  `;
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Failed to fetch history: ' + error.message);
  }
};

module.exports = {
  saveConversion,
  getConversionHistory
};
