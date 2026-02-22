// Controller for handling currency conversion logic
const axios = require('axios');
const { saveConversion, getConversionHistory } = require('../models/conversion');

// Free API for exchange rates (no API key needed for basic use)
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest';

// Get exchange rates for a base currency
const getExchangeRates = async (req, res) => {
  try {
    // Get base currency from query params (default to USD)
    const baseCurrency = req.query.base || 'USD';
    
    // Fetch rates from external API
    const response = await axios.get(`${EXCHANGE_API_URL}/${baseCurrency}`);
    
    // Return the rates data
    res.status(200).json({
      success: true,
      base: response.data.base,
      rates: response.data.rates,
      date: response.data.date
    });
    
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exchange rates'
    });
  }
};

// Convert currency and save to database
const convertCurrency = async (req, res) => {
  try {
    const { from_currency, to_currency, amount } = req.body;
    
    // Validate input
    if (!from_currency || !to_currency || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: from_currency, to_currency, amount'
      });
    }
    
    // Validate amount is a positive number
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    // Fetch latest exchange rates
    const response = await axios.get(`${EXCHANGE_API_URL}/${from_currency}`);
    const rates = response.data.rates;
    
    // Check if target currency exists
    if (!rates[to_currency]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency code'
      });
    }
    
    // Get the exchange rate
    const rate = rates[to_currency];
    
    // Calculate converted amount
    const convertedAmount = (amount * rate).toFixed(2);
    
    // Save conversion to database
    const savedConversion = await saveConversion(
      from_currency,
      to_currency,
      amount,
      convertedAmount,
      rate
    );
    
    // Return the result
    res.status(200).json({
      success: true,
      data: {
        from_currency,
        to_currency,
        amount: parseFloat(amount),
        converted_amount: parseFloat(convertedAmount),
        rate: rate,
        timestamp: savedConversion.created_at
      }
    });
    
  } catch (error) {
    console.error('Error converting currency:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to convert currency'
    });
  }
};

// Get conversion history
const getHistory = async (req, res) => {
  try {
    // Fetch last 10 conversions from database
    const history = await getConversionHistory();
    
    res.status(200).json({
      success: true,
      data: history
    });
    
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversion history'
    });
  }
};

module.exports = {
  getExchangeRates,
  convertCurrency,
  getHistory
};
