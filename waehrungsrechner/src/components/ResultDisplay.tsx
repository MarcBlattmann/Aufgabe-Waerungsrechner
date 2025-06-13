interface ResultDisplayProps {
  loading: boolean;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  formatCurrency: (amount: number, currencyCode: string) => string;
}

export default function ResultDisplay({ 
  loading, 
  amount, 
  fromCurrency, 
  toCurrency, 
  convertedAmount, 
  formatCurrency 
}: ResultDisplayProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
      <div className="text-center">
        <div className="text-sm text-gray-700 mb-1">
          Ergebnis
        </div>
        <div className="text-xl font-semibold text-gray-900">
          {loading ? (
            <div className="flex items-center justify-center text-gray-700">
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
  );
}
