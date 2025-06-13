interface ExchangeRateInfoProps {
  fromCurrency: string;
  toCurrency: string;
  exchangeRates: { [key: string]: number };
}

export default function ExchangeRateInfo({ 
  fromCurrency, 
  toCurrency, 
  exchangeRates 
}: ExchangeRateInfoProps) {
  const getRate = (from: string, to: string) => {
    const directRate = exchangeRates[`${from}-${to}`];
    if (directRate) return directRate.toFixed(4);
    
    const reverseRate = exchangeRates[`${to}-${from}`];
    if (reverseRate) return (1 / reverseRate).toFixed(4);
    
    return 'N/A';
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        Wechselkurs Information
      </h3>
      <div className="text-sm text-gray-700">
        <div className="flex justify-between">
          <span>1 {fromCurrency} =</span>
          <span className="font-medium">
            {getRate(fromCurrency, toCurrency)} {toCurrency}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span>1 {toCurrency} =</span>
          <span className="font-medium">
            {getRate(toCurrency, fromCurrency)} {fromCurrency}
          </span>
        </div>
      </div>
    </div>
  );
}
