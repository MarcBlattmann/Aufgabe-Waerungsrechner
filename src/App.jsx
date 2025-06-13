import React, { useState, useEffect } from 'react';
import CurrencyInput from './components/CurrencyInput';
import CurrencySelect from './components/CurrencySelect';
import ResultDisplay from './components/ResultDisplay';
import ExchangeRateDisplay from './components/ExchangeRateDisplay';
import SwapButton from './components/SwapButton';
import { exchangeRates } from './data/exchangeRates';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState('');

  // Verfügbare Währungen aus den Wechselkursdaten
  const currencies = Object.keys(exchangeRates);

  // Konvertierung berechnen
  useEffect(() => {
    if (amount && !isNaN(amount) && amount > 0) {
      try {
        const rate = getExchangeRate(fromCurrency, toCurrency);
        const result = parseFloat(amount) * rate;
        setConvertedAmount(result);
        setExchangeRate(rate);
        setError('');
      } catch (err) {
        setError('Wechselkurs nicht verfügbar');
        setConvertedAmount(0);
        setExchangeRate(0);
      }
    } else {
      setConvertedAmount(0);
      setExchangeRate(0);
      setError('');
    }
  }, [amount, fromCurrency, toCurrency]);

  // Wechselkurs berechnen
  const getExchangeRate = (from, to) => {
    if (from === to) return 1;
    
    // Direkte Konvertierung zu EUR
    const fromRate = from === 'EUR' ? 1 : 1 / exchangeRates[from];
    const toRate = to === 'EUR' ? 1 : exchangeRates[to];
    
    return fromRate * toRate;
  };

  // Währungen tauschen
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Betrag ändern
  const handleAmountChange = (value) => {
    setAmount(value);
  };

  return (
    <div className="container">
      <div className="currency-converter">
        <h1 className="title">Währungsrechner</h1>
        
        <div className="converter-section">
          <div className="input-group">
            <CurrencyInput 
              value={amount}
              onChange={handleAmountChange}
              label="Betrag"
            />
            <CurrencySelect 
              value={fromCurrency}
              onChange={(value) => setFromCurrency(value)}
              currencies={currencies}
              label="Von"
            />
          </div>

          <SwapButton onClick={handleSwapCurrencies} />

          <div className="input-group">
            <div style={{ height: '69px' }}></div> {/* Spacer für Alignment */}
            <CurrencySelect 
              value={toCurrency}
              onChange={(value) => setToCurrency(value)}
              currencies={currencies}
              label="Nach"
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <ResultDisplay 
          amount={convertedAmount}
          currency={toCurrency}
        />

        <ExchangeRateDisplay 
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={exchangeRate}
        />
      </div>
    </div>
  );
}

export default App;
