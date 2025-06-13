'use client';

import { useState, useEffect } from 'react';
import { ArrowUpDown, RefreshCw } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const currencies: Currency[] = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // Mock exchange rates - in a real app, you would fetch from an API
  const mockExchangeRates: ExchangeRates = {
    'EUR-USD': 1.09,
    'EUR-GBP': 0.85,
    'EUR-CHF': 0.96,
    'EUR-JPY': 161.75,
    'EUR-CAD': 1.48,
    'EUR-AUD': 1.63,
    'EUR-SEK': 11.45,
    'EUR-NOK': 11.85,
    'EUR-DKK': 7.46,
    'USD-EUR': 0.92,
    'USD-GBP': 0.78,
    'USD-CHF': 0.88,
    'USD-JPY': 148.35,
    'USD-CAD': 1.36,
    'USD-AUD': 1.50,
    'USD-SEK': 10.50,
    'USD-NOK': 10.87,
    'USD-DKK': 6.84,
    'GBP-EUR': 1.18,
    'GBP-USD': 1.28,
    'GBP-CHF': 1.13,
    'GBP-JPY': 190.25,
    'GBP-CAD': 1.74,
    'GBP-AUD': 1.92,
    'GBP-SEK': 13.47,
    'GBP-NOK': 13.94,
    'GBP-DKK': 8.78,
    'CHF-EUR': 1.04,
    'CHF-USD': 1.14,
    'CHF-GBP': 0.88,
    'CHF-JPY': 168.49,
    'CHF-CAD': 1.54,
    'CHF-AUD': 1.70,
    'CHF-SEK': 11.92,
    'CHF-NOK': 12.34,
    'CHF-DKK': 7.77,
  };

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // In a real application, you would fetch from a real API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setExchangeRates(mockExchangeRates);
      setLastUpdated(new Date().toLocaleTimeString('de-DE'));
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && exchangeRates) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        if (fromCurrency === toCurrency) {
          setConvertedAmount(numAmount);
        } else {
          const rateKey = `${fromCurrency}-${toCurrency}`;
          const rate = exchangeRates[rateKey];
          if (rate) {
            setConvertedAmount(numAmount * rate);
          } else {
            // Try reverse rate
            const reverseRateKey = `${toCurrency}-${fromCurrency}`;
            const reverseRate = exchangeRates[reverseRateKey];
            if (reverseRate) {
              setConvertedAmount(numAmount / reverseRate);
            }
          }
        }
      }
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Amount Input */}        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Betrag
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Betrag eingeben"
          />
        </div>

        {/* From Currency */}        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Von
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>        {/* Swap Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-md text-gray-700"
            title="Währungen tauschen"
          >
            <ArrowUpDown size={16} color="#374151" />
          </button>
        </div>

        {/* To Currency */}        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Nach
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
          <div className="text-center">            <div className="text-sm text-gray-700 mb-1">
              Ergebnis
            </div>
            <div className="text-xl font-semibold text-gray-900">
              {loading ? (
                <div className="flex items-center justify-center text-gray-700">
                  <RefreshCw className="mr-2" size={16} color="#374151" />
                  Berechne...
                </div>
              ) : (
                formatCurrency(convertedAmount, toCurrency)
              )}
            </div>
            {!loading && (
              <div className="text-sm text-gray-600 mt-1">
                {amount} {fromCurrency} = {convertedAmount.toFixed(4)} {toCurrency}
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button and Last Updated */}
        <div className="flex items-center justify-between">          <button
            onClick={fetchExchangeRates}
            disabled={loading}
            className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-gray-800 rounded-md text-sm disabled:opacity-50"
          >
            <RefreshCw className="mr-1" size={14} color="#374151" />
            Aktualisieren
          </button>
          {lastUpdated && (
            <div className="text-xs text-gray-700">
              Aktualisiert: {lastUpdated}
            </div>
          )}
        </div>
      </div>

      {/* Exchange Rate Info */}
      <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Wechselkurs Information
        </h3>
        <div className="text-sm text-gray-700">
          <div className="flex justify-between">
            <span>1 {fromCurrency} =</span>
            <span className="font-medium">
              {exchangeRates[`${fromCurrency}-${toCurrency}`]?.toFixed(4) || 
               (exchangeRates[`${toCurrency}-${fromCurrency}`] ? 
                (1 / exchangeRates[`${toCurrency}-${fromCurrency}`]).toFixed(4) : 
                'N/A')} {toCurrency}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>1 {toCurrency} =</span>
            <span className="font-medium">
              {exchangeRates[`${toCurrency}-${fromCurrency}`]?.toFixed(4) || 
               (exchangeRates[`${fromCurrency}-${toCurrency}`] ? 
                (1 / exchangeRates[`${fromCurrency}-${toCurrency}`]).toFixed(4) : 
                'N/A')} {fromCurrency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
