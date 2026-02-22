// Currency Converter Form Component
import React, { useState } from 'react';
import './ConverterForm.css';

// List of common currencies
const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 
  'INR', 'MXN', 'BRL', 'ZAR', 'SGD', 'NZD', 'KRW', 'TRY'
];

function ConverterForm({ onSuccess }) {
  // Form state
  const [formData, setFormData] = useState({
    amount: '',
    from_currency: 'USD',
    to_currency: 'EUR'
  });

  // Loading state while API call is in progress
  const [loading, setLoading] = useState(false);

  // Error message state
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate amount
    if (!formData.amount || formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Check if currencies are the same
    if (formData.from_currency === formData.to_currency) {
      setError('Please select different currencies');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send conversion request to backend
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Pass result to parent component
        onSuccess(data.data);
      } else {
        setError(data.message || 'Conversion failed');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter-form">
      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            step="0.01"
            min="0"
            disabled={loading}
          />
        </div>

        {/* Currency Selection Row */}
        <div className="currency-row">
          {/* From Currency */}
          <div className="form-group">
            <label htmlFor="from_currency">From</label>
            <select
              id="from_currency"
              name="from_currency"
              value={formData.from_currency}
              onChange={handleChange}
              disabled={loading}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Icon */}
          <div className="swap-icon">⇄</div>

          {/* To Currency */}
          <div className="form-group">
            <label htmlFor="to_currency">To</label>
            <select
              id="to_currency"
              name="to_currency"
              value={formData.to_currency}
              onChange={handleChange}
              disabled={loading}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="convert-btn" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>
    </div>
  );
}

export default ConverterForm;
