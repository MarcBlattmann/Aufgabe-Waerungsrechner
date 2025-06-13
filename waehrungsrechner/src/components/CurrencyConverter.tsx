'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import InputField from './InputField';
import SelectField from './SelectField';
import SwapButton from './SwapButton';
import ResultDisplay from './ResultDisplay';
import ExchangeRateInfo from './ExchangeRateInfo';
import Button from './Button';

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
  const [lastUpdated, setLastUpdated] = useState<string>('');  const [convertedAmount, setConvertedAmount] = useState<number>(0);

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
      await new Promise(resolve => setTimeout(resolve, 500));
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
            setConvertedAmount(numAmount * rate);          } else {
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
        <InputField
          label="Betrag"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Betrag eingeben"
        />

        <SelectField
          label="Von"
          value={fromCurrency}
          onChange={setFromCurrency}
          options={currencies}
        />

        <SwapButton onSwap={swapCurrencies} />

        <SelectField
          label="Nach"
          value={toCurrency}
          onChange={setToCurrency}
          options={currencies}
        />

        <ResultDisplay
          loading={loading}
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={convertedAmount}
          formatCurrency={formatCurrency}
        />

        <div className="flex items-center justify-between">
          <Button
            onClick={fetchExchangeRates}
            disabled={loading}
          >
            <RefreshCw className="mr-1" size={14} color="#374151" />
            Aktualisieren
          </Button>
          {lastUpdated && (
            <div className="text-xs text-gray-700">
              Aktualisiert: {lastUpdated}
            </div>
          )}
        </div>
      </div>

      <ExchangeRateInfo
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRates={exchangeRates}
      />
    </div>
  );
}
