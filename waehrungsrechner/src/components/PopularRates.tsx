'use client';

import { useState, useEffect } from 'react';

interface PopularRatesProps {
  baseCurrency: string;
}

interface Rate {
  currency: string;
  rate: number;
  change: number;
}

const PopularRates: React.FC<PopularRatesProps> = ({ baseCurrency }) => {
  const [rates, setRates] = useState<Rate[]>([]);

  // Mock popular rates
  const mockRates: { [key: string]: Rate[] } = {
    EUR: [
      { currency: 'USD', rate: 1.09, change: 0.02 },
      { currency: 'GBP', rate: 0.85, change: -0.01 },
      { currency: 'CHF', rate: 0.96, change: 0.005 },
      { currency: 'JPY', rate: 161.75, change: 1.2 },
    ],
    USD: [
      { currency: 'EUR', rate: 0.92, change: -0.02 },
      { currency: 'GBP', rate: 0.78, change: -0.01 },
      { currency: 'CHF', rate: 0.88, change: 0.003 },
      { currency: 'JPY', rate: 148.35, change: 0.8 },
    ],
  };

  useEffect(() => {
    setRates(mockRates[baseCurrency] || []);
  }, [baseCurrency]);

  if (rates.length === 0) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Beliebte Wechselkurse ({baseCurrency})
      </h3>
      <div className="space-y-2">
        {rates.map((rate) => (
          <div
            key={rate.currency}
            className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-800 dark:text-white">
                {rate.currency}
              </span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-800 dark:text-white">
                {rate.rate.toFixed(4)}
              </div>
              <div
                className={`text-xs ${
                  rate.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {rate.change >= 0 ? '+' : ''}
                {rate.change.toFixed(3)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRates;
