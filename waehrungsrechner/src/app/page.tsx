import CurrencyConverter from "@/components/CurrencyConverter";
import Image from "next/image";

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
        
        {/* Image Block */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/677a67324f46785682af8d39/1736075122571-ATRWVVB4ALUNFZD458NA/blaubeeren-heidelbeeren-snack-gesund-vegan.jpg"
              alt="Decorative image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <CurrencyConverter />
      </div>
    </div>
  );
}
