// Result Display Component - Shows conversion result
import React from 'react';
import './ResultDisplay.css';

function ResultDisplay({ result }) {
  // Format numbers with commas for readability
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="result-display">
      <div className="result-card">
        {/* Converted Amount */}
        <div className="result-main">
          <div className="result-amount">
            {formatNumber(result.amount)} {result.from_currency}
          </div>
          <div className="result-equals">=</div>
          <div className="result-converted">
            {formatNumber(result.converted_amount)} {result.to_currency}
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="result-rate">
          <span className="rate-label">Exchange Rate:</span>
          <span className="rate-value">
            1 {result.from_currency} = {result.rate.toFixed(4)} {result.to_currency}
          </span>
        </div>

        {/* Timestamp */}
        <div className="result-timestamp">
          Converted at: {new Date(result.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
