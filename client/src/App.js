// Main App component - Entry point for the React application
import React, { useState, useEffect } from 'react';
import './App.css';
import ConverterForm from './components/ConverterForm';
import ResultDisplay from './components/ResultDisplay';
import HistoryTable from './components/HistoryTable';

function App() {
  // State to store conversion result
  const [result, setResult] = useState(null);
  
  // State to store conversion history
  const [history, setHistory] = useState([]);
  
  // State to track if we need to refresh history
  const [refreshHistory, setRefreshHistory] = useState(false);

  // Fetch conversion history when component mounts or refreshHistory changes
  useEffect(() => {
    fetchHistory();
  }, [refreshHistory]);

  // Function to fetch history from backend
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/history');
      const data = await response.json();
      
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Callback when conversion is successful
  const handleConversionSuccess = (conversionData) => {
    setResult(conversionData);
    // Trigger history refresh
    setRefreshHistory(!refreshHistory);
  };

  return (
    <div className="app-container">
      <div className="app-card">
        {/* Header */}
        <header className="app-header">
          <h1>💱 Forex Currency Converter</h1>
          <p>Convert currencies with live exchange rates</p>
        </header>

        {/* Converter Form */}
        <ConverterForm onSuccess={handleConversionSuccess} />

        {/* Result Display */}
        {result && <ResultDisplay result={result} />}

        {/* History Table */}
        <HistoryTable history={history} />
      </div>
    </div>
  );
}

export default App;
