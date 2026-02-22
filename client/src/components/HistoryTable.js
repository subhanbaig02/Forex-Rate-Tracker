// History Table Component - Shows past conversions
import React from 'react';
import './HistoryTable.css';

function HistoryTable({ history }) {
  // Format numbers with commas
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show message if no history
  if (!history || history.length === 0) {
    return (
      <div className="history-section">
        <h2>Conversion History</h2>
        <div className="no-history">
          No conversions yet. Start converting to see your history here!
        </div>
      </div>
    );
  }

  return (
    <div className="history-section">
      <h2>Conversion History</h2>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Result</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="date-cell">{formatDate(item.created_at)}</td>
                <td className="currency-cell">{item.from_currency}</td>
                <td className="currency-cell">{item.to_currency}</td>
                <td className="amount-cell">
                  {formatNumber(item.amount)}
                </td>
                <td className="result-cell">
                  {formatNumber(item.converted_amount)}
                </td>
                <td className="rate-cell">{parseFloat(item.rate).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
