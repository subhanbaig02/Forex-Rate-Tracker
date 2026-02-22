-- Create the database (run this first manually in PostgreSQL)
-- CREATE DATABASE forex_db;

-- Connect to forex_db and run this:

-- Table to store conversion history
CREATE TABLE IF NOT EXISTS conversions (
  id SERIAL PRIMARY KEY,                     -- Auto-incrementing ID
  from_currency VARCHAR(10) NOT NULL,        -- Source currency code (e.g., USD)
  to_currency VARCHAR(10) NOT NULL,          -- Target currency code (e.g., EUR)
  amount NUMERIC(15, 2) NOT NULL,            -- Amount to convert
  converted_amount NUMERIC(15, 2) NOT NULL,  -- Result after conversion
  rate NUMERIC(15, 6) NOT NULL,              -- Exchange rate used
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When conversion happened
);

-- Index for faster queries on recent conversions
CREATE INDEX IF NOT EXISTS idx_created_at ON conversions(created_at DESC);
