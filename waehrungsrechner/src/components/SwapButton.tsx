import { ArrowUpDown } from 'lucide-react';

interface SwapButtonProps {
  onSwap: () => void;
}

export default function SwapButton({ onSwap }: SwapButtonProps) {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={onSwap}
        className="p-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-md text-gray-700"
        title="Währungen tauschen"
      >
        <ArrowUpDown size={16} color="#374151" />
      </button>
    </div>
  );
}
