'use client';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  onClick, 
  disabled = false, 
  children, 
  variant = 'secondary',
  className = '' 
}: ButtonProps) {
  const baseClasses = "flex items-center px-3 py-1 border rounded-md text-sm disabled:opacity-50";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white" 
    : "bg-gray-200 hover:bg-gray-300 border-gray-400 text-gray-800";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
