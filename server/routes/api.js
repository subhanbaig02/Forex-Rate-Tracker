// API routes for currency conversion
const express = require('express');
const router = express.Router();
const {
  getExchangeRates,
  convertCurrency,
  getHistory
} = require('../controllers/conversionController');

// GET /api/rates?base=USD
// Fetch exchange rates for a base currency
router.get('/rates', getExchangeRates);

// POST /api/convert
// Convert currency and save to database
router.post('/convert', convertCurrency);

// GET /api/history
// Get last 10 conversions
router.get('/history', getHistory);

module.exports = router;
