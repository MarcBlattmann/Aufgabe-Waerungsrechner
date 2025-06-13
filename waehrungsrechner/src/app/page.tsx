import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Währungsrechner
          </h1>
          <p className="text-gray-600">
            Rechnen Sie zwischen verschiedenen Währungen um
          </p>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
}
